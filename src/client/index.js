/*
    reactjs-abdelhady-site project created and maintained by Abdelhady "H2O" Salah.
    (c) 2022 Abdelhady Salah <hadysalah1455@gmail.com> (https://github.com/h2o-creator/reactjs-abdelhady-site)
    All Rights Reserved.
    Licensed under the GNU GPL v3 License.
    License file is included in the root directory and has the name "LICENSE"
*/

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from 'Components/App'
import 'Styles/main.scss'
import './i18n.js'
import 'Resources/img/favicon/favicon.ico'
import 'Resources/img/favicon/favicon-32x32.png'
import 'Resources/img/favicon/favicon-16x16.png'
import 'Resources/img/favicon/apple-touch-icon.png'
import 'Resources/img/favicon/android-chrome-512x512.png'
import 'Resources/img/favicon/android-chrome-192x192.png'

const titleElement = document.createElement('title')
const headElement = document.querySelector('head')
titleElement.textContent = process.env.WEBSITE_NAME
headElement.appendChild(titleElement)

ReactDOM.hydrate(
    <React.StrictMode>
        <Suspense fallback=''>
            <App />
        </Suspense>
    </React.StrictMode>,
    document.querySelector('#root')
)

// Reference: https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack
// Check that the mode is production (no need for PWA in dev mode)
if (process.env.NODE_ENV === 'production') {
    // Check that service workers are supported
    if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
        });
    }
}