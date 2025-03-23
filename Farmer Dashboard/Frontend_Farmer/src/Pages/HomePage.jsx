// Team_35-AgriAuthentic/Farmer Dashboard/Frontend_Farmer/src/Pages/HomePage.jsx
import React from 'react';
import GoogleLogin from '../Components/GoogleAuth';
import { useTranslation } from "react-i18next";
import Navbar from '../Components/Navbar';

function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      {t("WelcomeMessage")}
      <div className="">
        <GoogleLogin />
      </div>
    </div>
  );
}

export default HomePage;