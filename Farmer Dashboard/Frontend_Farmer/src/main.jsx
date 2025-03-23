import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

const domain = 'dev-z8esj8egvt4kiktw.us.auth0.com';
const client_id = 'yWb8BJdsDuYfDdG3UKf0xgvMvhDB6UKl';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={client_id}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
);