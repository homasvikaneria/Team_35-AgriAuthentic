import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Orders() {

const [orders, setorders] = useState([])
const [Loading, setLoading] = useState(true)

const farmer_id = '64b50c9e1c9d440000a1b2d1'

useEffect(()=>{
  const fetchOrders = async () => {
    const response = await axios.get(`https://agriauthenic-poc-backend.onrender.com/order/farmer/${farmer_id}`)

    console.log(response.data)
    setorders(response.data.data)
  }

  fetchOrders()
},[])
  return (
    <>
    
    </>
  )
}

export default Orders