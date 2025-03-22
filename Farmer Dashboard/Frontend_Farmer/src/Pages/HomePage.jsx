import React from 'react'
import GoogleLogin from '../Components/GoogleAuth'

function HomePage() {
  return (
    <div>Welcome to AgriAuthentic HomePage

        <div className="">
            <GoogleLogin />
        </div>
    </div>
  )
}

export default HomePage