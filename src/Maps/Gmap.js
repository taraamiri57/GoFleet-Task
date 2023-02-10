import React, { useEffect, useState } from "react";
import {
    MARGIN_MEDIUM
} from "./../Utils/Constants";
var localData = require('./../Data/data.json')

const Map = () => {
    const [map, setMap] = useState(null);
    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
    const [data]= useState(localData);

    useEffect(() => {
        const loadScript = (src) => {
            const tag = document.createElement("script");
            tag.src = src;
            tag.async = true;
            document.body.appendChild(tag);

            return new Promise((resolve) => {
                tag.onload = () => {
                    resolve();
                };
            });
        };

        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyAjKSZss3Ct635YCj5F62IuXalXuwNV20I&callback=initMap`,

        ).then(() => {
            const initMap = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const currentLocation = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            
                            setMap(
                                new window.google.maps.Map(document.getElementById("map"), {
                                    zoom: 8,
                                    center: currentLocation,
                                })
                            );
                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                } else {
                    console.error("Geolocation is not supported by this browser.");
                }
            };
            initMap();
        });
    }, []);

    useEffect(() => {
        if (map) {
            data.map((item) => {
                console.log(item.latitude)
                if (typeof item.longitude !== 'number') {
                    console.error('Longitude must be a number');
                    return;
                }
                const location = { lat: item.latitude, lng: item.longitude };

                new window.google.maps.Marker({
                    position: location,
                    map: map,
                });
            });
        }
    }, [map, data]);

    return (
        <div>
            <div id="map" style={{
                marginTop: `${MARGIN_MEDIUM}px`,
                height: "500px", width: "935px"
            }} />
            </div>
    );
};

export default Map;