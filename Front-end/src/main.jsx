import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-ndbwm1xjrgcew5u0.us.auth0.com"
    clientId="UFnLKfN2Aqmz7BPPWQ3ukBBxxBuEpxNk"
    
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  
)
