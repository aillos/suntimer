import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import setColorAndImage from "./setBodyColor.js";

function RootComponent() {
    const [sunRise, setSunRise] = useState('');
    const [sunSet, setSunSet] = useState('');
    const [current, setCurrent] = useState('');
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(success, error);

        function success(position) {
            const { latitude, longitude } = position.coords;
            const date = new Date();
            const timezoneOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
            const today = (new Date(date - timezoneOffset)).toISOString().slice(0, 10);
            console.log(today);
            fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${today}&formatted=0`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        const sunriseTime = new Date(data.results.sunrise);
                        const sunsetTime = new Date(data.results.sunset);

                        const localSunriseTime = sunriseTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                        const localSunsetTime = sunsetTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

                        setSunRise('Sunrise ☀️ ' + localSunriseTime);
                        setSunSet('Sunset 🌙 ' + localSunsetTime);
                        setCurrent("Current time: " + new Date().toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));

                        const imageSrc = setColorAndImage(new Date(), sunsetTime, sunriseTime);
                        setImageSrc(imageSrc);

                    } else {
                        console.error('Error fetching sun times:', data.status);
                    }
                })
                .catch(error => {
                    console.error('Error fetching sun times:', error);
                });
        }

        function error(error) {
            console.error(`ERROR(${error.code}): ${error.message}`);
        }

        const intervalId = setInterval(() => {
            setCurrent("Current time: " + new Date().toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div className="time" id="current">{current}</div>
            <App imageSrc={imageSrc} />
            <div className="time" id="sunRise">{sunRise}</div>
            <div className="time" id="sunSet">{sunSet}</div>
            <div id="credits">
                API by <a href="https://sunrise-sunset.org/" target="_blank" rel="noopener noreferrer">sunrise-sunset.org</a>
            </div>
        </div>

    );
}

const container = document.getElementById('root');
if (container !== null) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <RootComponent />
        </React.StrictMode>
    );
}
