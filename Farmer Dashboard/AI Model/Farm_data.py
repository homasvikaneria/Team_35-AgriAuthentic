from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn
import random
import time
from threading import Thread
from collections import deque

app = FastAPI()


# Declaring Global Variables
valid_time = 0
certification_status = "Not Certified"
certification_reasone = "Not Sufficient Data"
farmer_dashboard = {
    "certification_status": certification_status,
    "certification_reasone": certification_reasone
}
data_history = deque(maxlen=30)

#Function to generate Random Sensor Data

def generate_random_sensor_data():
    sensor_data = {
        "pH": round(random.uniform(6, 8), 2),
        "temperature": round(random.uniform(10, 25), 2),
        "soil_moisture": round(random.uniform(0, 100), 2),
        "ec":round(random.uniform(1,2.2),2),
        "nitrogen":round(random.uniform(15,35),2),
        "phosphorus":round(random.uniform(8,32),2),
        "potassium":round(random.uniform(90,260),2),
        "water_tds":round(random.uniform(90, 150),2),
    }
    return sensor_data


# This Function is used to Validate perfect Natural Farming Conditions

def validate_farming_conditions(sensor_data):
    global valid_time, certification_status, certification_reasone, farmer_dashboard
    all_valid = True
    faliures = []

    # Validation conditions
    thresholds = {
        "soil_moisture": (30, 70),
        "temperature": (15, 30),
        "pH": (6.5, 7.5),
        "ec": (1.2, 2.0),
        "nitrogen": (20, 40),
        "phosphorus": (10, 30),
        "potassium": (100, 250),
        "water_tds": (100, 500)
    }
    
    for key, (min_value , max_value) in thresholds.items():
        if not (min_value <= sensor_data[key] <= max_value):
            all_valid = False
            faliures.append(key)
            
    if all_valid:
        valid_time += 1
    else:
        valid_time = 0
        certification_reasone = "Issues detected: " + ", ".join([f"{key.replace('_', ' ').title()} out of range." for key in faliures])
        
    if valid_time >= 15:
        certification_status = "✅ Level-3 Certified (Fully Verfied)"
    elif valid_time >= 10:
        certification_status = "✅ Level-2 Certified (Partially Verified)"
    elif valid_time >= 5:
        certification_status = "✅ Level-1 Certified (Primary Certification)"
        
    else:
        certification_status = "❌ Not Certified"
        
    farmer_dashboard["certification_status"] = certification_status
    farmer_dashboard["certification_reasone"] = certification_reasone
    
    return farmer_dashboard, faliures

    # Real-time sensor data update thread
def update_sensor_data():
    while True:
        sensor_data = generate_random_sensor_data()
        certification_status = validate_farming_conditions(sensor_data)
        data_history.append(sensor_data)
        
        print("\n📡 Sensor Data Update:", sensor_data)
        print("📜 Certification Status:", certification_status)
        print("-" * 50)

        time.sleep(10)  
        
# Get request for the latest sensor data
@app.get('/api/sensor_data')
async def get_sensor_data():
    latest_data = list(data_history)[-1] if data_history else {}
    return JSONResponse(content={
        "sensor_data": latest_data,
        "certification_status": certification_status,
        "certification_reason": certification_reasone,
    })

# This is for run thread in Background
thread = Thread(target=update_sensor_data)
thread.daemon = True
thread.start()

if __name__ == "__main__":
    uvicorn.run("Farm_data:app", host="0.0.0.0", port=5000, reload=True)