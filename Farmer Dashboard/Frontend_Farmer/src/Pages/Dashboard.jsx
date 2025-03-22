import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import * as Chart from 'chart.js';
import "chart.js/auto";

const API_URL = "http://127.0.0.1:5000/api/sensor_data";
const standardRanges = {
  soil_moisture: { min: 30, max: 70 },
  soil_temperature: { min: 15, max: 30 },
  pH: { min: 6.5, max: 7.5 },
  ec: { min: 1.2, max: 2.0 },
  nitrogen: { min: 20, max: 40 },
  phosphorus: { min: 10, max: 30 },
  potassium: { min: 100, max: 250 },
  water_tds: { min: 100, max: 500 },
};
const parameterIcons = {
  soil_moisture: "💧", soil_temperature: "🌡️", pH: "⚗️", ec: "⚡",
  nitrogen: "🌱", phosphorus: "🌿", potassium: "🍃", water_tds: "💦",
};
const formatParameterName = (name) => name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const CertificationProgressBar = ({ certification, certificationPercent }) => {
  const progress = certificationPercent || 0;
  let statusText = "";
  let statusIcon = "🌱";

  if (certification.includes("Full")) {
    statusText = "Full Organic Certification";
    statusIcon = "🏆";
  } else if (certification.includes("Intermediate")) {
    statusText = "Intermediate Certification";
    statusIcon = "🌿";
  } else {
    statusText = "Basic Certification";
  }

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border-l-4 border-green-500">
      <div className="px-6 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-700">Certification Progress</h2>
          <div className="bg-green-50 px-3 py-1 rounded-full">
            <span className="font-bold text-lg text-green-600">{progress}%</span>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-6 mb-6 overflow-hidden">
          <div
            className="h-6 rounded-full bg-gradient-to-r from-green-300 via-green-500 to-green-600 relative"
            style={{
              width: `${progress}%`,
              transition: "width 1s ease-in-out"
            }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
              {progress >= 20 ? `${progress}% Complete` : ""}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress >= 40 ? "bg-green-500 text-white" : "bg-gray-200"}`}>
              {progress >= 40 && <span className="text-xs">✓</span>}
            </div>
            <span className="text-sm mt-1 font-medium">Basic</span>
          </div>
          <div className="h-px bg-gray-200 flex-1 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress >= 70 ? "bg-green-500 text-white" : "bg-gray-200"}`}>
              {progress >= 70 && <span className="text-xs">✓</span>}
            </div>
            <span className="text-sm mt-1 font-medium">Intermediate</span>
          </div>
          <div className="h-px bg-gray-200 flex-1 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progress >= 100 ? "bg-green-500 text-white" : "bg-gray-200"}`}>
              {progress >= 100 && <span className="text-xs">✓</span>}
            </div>
            <span className="text-sm mt-1 font-medium">Full Organic</span>
          </div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center">
            <span className="text-2xl mr-2">{statusIcon}</span>
            <div>
              <p className="font-medium text-green-800">{statusText}</p>
              <p className="text-sm text-green-700 mt-1">
                {progress < 100 ? "Continue implementing sustainable practices to achieve full certification." : "Congratulations! You've achieved full organic certification."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificationDetails = ({ reason }) => (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden h-full border-l-4 border-green-500">
    <div className="p-6">
      <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center">
        <span className="text-2xl mr-2">📜</span>
        Certification Details
      </h3>
      <div className="p-4 bg-green-50 rounded-lg mb-3">
        <p className="text-gray-700">{reason}</p>
      </div>
      <div className="flex items-center p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
        <span className="text-xl mr-2">ℹ️</span>
        <p className="text-sm text-amber-700">Based on organic farming standards and sustainable agricultural practices.</p>
      </div>
    </div>
  </div>
);

const AIRecommendations = ({ suggestions }) => (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden border-l-4 border-green-500">
    <div className="p-6">
      <div className="flex items-center mb-6">
        <div className="bg-green-100 p-2 rounded-full mr-3">
          <span className="text-2xl">💡</span>
        </div>
        <h2 className="text-xl font-semibold text-green-700">Smart Farm Assistant</h2>
      </div>
      {suggestions.length > 0 ? (
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 border-l-4 border-green-400">
              <div className="mr-3 mt-1 bg-green-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <div>
                <p className="text-gray-700">{suggestion}</p>
                <div className="mt-2 flex justify-end">
                  <button className="text-xs text-green-600 hover:underline flex items-center">
                    Mark as done <span className="ml-1">✓</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-green-50 p-6 rounded-lg text-center border border-green-100">
          <span className="text-4xl mb-3 block">✅</span>
          <p className="text-lg font-medium text-green-700">All systems optimal!</p>
          <p className="text-sm text-green-600 mt-2">Your farm is performing excellently.</p>
        </div>
      )}
    </div>
  </div>
);

const TimelineGraph = () => {
  const [timelineView, setTimelineView] = useState("weekly");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const parameters = {
    soil_moisture: { min: 30, max: 70, color: "#3B82F6" },
    soil_temperature: { min: 15, max: 30, color: "#F97316" },
    pH: { min: 6.5, max: 7.5, color: "#8B5CF6" },
    ec: { min: 1.2, max: 2.0, color: "#06B6D4" },
    nitrogen: { min: 20, max: 40, color: "#10B981" },
    phosphorus: { min: 10, max: 30, color: "#EC4899" },
    potassium: { min: 100, max: 250, color: "#F59E0B" },
    water_tds: { min: 100, max: 500, color: "#6366F1" },
  };

  const generateTimelineData = (view) => {
    const labels = view === "weekly"
      ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      : ["Week 1", "Week 2", "Week 3", "Week 4"];

    const dataPoints = {};
    Object.keys(parameters).forEach(param => {
      const { min, max } = parameters[param];
      const midPoint = (min + max) / 2;
      const variance = (max - min) / 4;
      dataPoints[param] = labels.map((_, i) => {
        const trendFactor = view === "weekly"
          ? Math.sin((i / (labels.length - 1)) * Math.PI) * variance
          : (i < labels.length / 2 ? i / (labels.length / 2) : (labels.length - i) / (labels.length / 2)) * variance;
        return Math.max(min, Math.min(max, midPoint + trendFactor + (Math.random() * variance * 0.5)));
      });
    });
    return { labels, dataPoints };
  };

  useEffect(() => {
    const { labels, dataPoints } = generateTimelineData(timelineView);
    if (chartInstance.current) chartInstance.current.destroy();

    const datasets = Object.keys(parameters).map(param => {
      const { color } = parameters[param];
      return {
        label: formatParameterName(param),
        data: dataPoints[param],
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        hidden: !['soil_moisture', 'soil_temperature', 'pH'].includes(param),
      };
    });

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart.Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, usePointStyle: true, padding: 15 },
          },
          tooltip: {
            backgroundColor: "rgba(17, 24, 39, 0.8)",
            titleColor: "#F3F4F6",
            bodyColor: "#F3F4F6",
            padding: 12,
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function (context) {
                const paramName = context.dataset.label.toLowerCase().replace(' ', '_');
                const value = context.raw.toFixed(1);
                const { min, max } = parameters[paramName.toLowerCase().replace(' ', '_')] || {};
                let status = "";
                if (min && max) {
                  if (context.raw < min) status = " (Low)";
                  else if (context.raw > max) status = " (High)";
                  else status = " (Optimal)";
                }
                return `${context.dataset.label}: ${value}${status}`;
              }
            }
          },
        },
        scales: {
          y: { grid: { color: "rgba(107, 114, 128, 0.1)" }, ticks: { font: { size: 10 } } },
          x: { grid: { display: false } },
        },
        interaction: { mode: 'index', intersect: false },
        elements: { point: { radius: 2, hoverRadius: 5 } },
      },
    });
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [timelineView]);

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-6 border-l-4 border-green-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-green-700">Sensor Data Timeline</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimelineView("weekly")}
            className={`px-4 py-2 text-sm rounded-lg transition ${timelineView === "weekly" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >Weekly</button>
          <button
            onClick={() => setTimelineView("monthly")}
            className={`px-4 py-2 text-sm rounded-lg transition ${timelineView === "monthly" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >Monthly</button>
        </div>
      </div>
      <div className="h-80"><canvas ref={chartRef}></canvas></div>
      <div className="mt-4 text-sm text-gray-500 text-center">
        Toggle parameters visibility by clicking on their names in the legend below the chart
      </div>
    </div>
  );
};

const Graph = ({ title, data, min, max }) => {
  const latestValue = data[data.length - 1];
  let status = "optimal";
  let statusColor = "#10B981";
  if (latestValue < min) { status = "low"; statusColor = "#F59E0B"; } 
  else if (latestValue > max) { status = "high"; statusColor = "#EF4444"; }

  const chartData = {
    labels: data.map((_, index) => `T-${data.length - index}`).reverse(),
    datasets: [
      {
        label: title,
        data: [...data].reverse(),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: "#3B82F6",
      },
      {
        label: "Min Range",
        data: Array(data.length).fill(min),
        borderColor: "#10B981",
        borderDash: [5, 5],
        borderWidth: 1,
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Max Range",
        data: Array(data.length).fill(max),
        borderColor: "#EF4444",
        borderDash: [5, 5],
        borderWidth: 1,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.8)",
        titleColor: "#F3F4F6",
        bodyColor: "#F3F4F6",
        padding: 12,
        borderColor: "rgba(107, 114, 128, 0.3)",
        borderWidth: 1,
      },
    },
    scales: {
      y: { grid: { color: "rgba(107, 114, 128, 0.1)" }, ticks: { font: { size: 10 } } },
      x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 0 } },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4 hover:shadow-xl transition duration-300 border-l-4 border-green-500">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <span className="text-2xl mr-2">{parameterIcons[title.toLowerCase().replace(' ', '_')] || '📊'}</span>
          <h3 className="text-lg font-semibold text-green-700">{title}</h3>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-xl mr-2">{latestValue.toFixed(1)}</span>
          <div className={`px-2 py-1 rounded-full text-xs font-medium`} style={{backgroundColor: statusColor, color: 'white'}}>
            {status.toUpperCase()}
          </div>
        </div>
      </div>
      <div className="h-48"><Line data={chartData} options={options} /></div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <div>Min: <span className="font-medium text-green-600">{min}</span></div>
        <div>Optimal Range</div>
        <div>Max: <span className="font-medium text-red-600">{max}</span></div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [certification, setCertification] = useState("");
  const [certificationPercent, setCertificationPercent] = useState(0);
  const [reason, setReason] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get(API_URL);
      setSensorData(response.data.sensor_history || []);
      setCertification(response.data.certification_status);
      setReason(response.data.certification_reason);
      setSuggestions(response.data.suggestions);
      setCertificationPercent(response.data.certification_percent || (
        response.data.certification_status.includes("Full") ? 100 : 
        response.data.certification_status.includes("Intermediate") ? 70 : 40
      ));
      setLoading(false);
      setTimeout(() => setRefreshing(false), 500);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        <p className="mt-4 text-green-700">Loading farm data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl mr-3">🌾</span>
            <h1 className="text-xl font-bold text-green-700">FarmData</h1>
          </div>
          <button 
            onClick={fetchData}
            className="bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center hover:bg-green-200 transition"
          >
            <span className={`mr-2 ${refreshing ? 'animate-spin' : ''}`}>↻</span>
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <CertificationProgressBar certification={certification} certificationPercent={certificationPercent} />
          </div>
          <div className="lg:col-span-1">
            <CertificationDetails reason={reason} />  
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sensorData.length > 0 &&
            Object.keys(standardRanges).map((key) => (
              <Graph
                key={key}
                title={formatParameterName(key)}
                data={sensorData.map((d) => d[key])}
                min={standardRanges[key].min}
                max={standardRanges[key].max}
              />
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <TimelineGraph />
          </div>
          <div className="lg:col-span-1">
            <AIRecommendations suggestions={suggestions} />
          </div>
        </div>

        <footer className="mt-12 text-center text-green-700 text-sm bg-green-100 p-3 rounded-lg">
          <p>Data refreshes automatically every 10 seconds • Last updated {new Date().toLocaleTimeString()}</p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;