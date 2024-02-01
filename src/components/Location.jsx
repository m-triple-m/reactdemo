import { Icon } from 'leaflet';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

const Location = () => {

    const doctorLocations = [
        {
            name: 'Dr. A',
            lat: 26.8462874,
            long: 80.9488722,
            speciality: 'Cardiologist'
        },

        {
            name: 'Dr. B',
            lat: 26.8469834,
            long: 80.9482894,
            speciality: 'General Physician'

        },

        {
            name: 'Dr. C',
            lat: 26.8469842,
            long: 80.9489245,
            speciality: 'Dentist'
        }
    ];

    const [coords, setCoords] = useState([])
    const [selDoc, setSelDoc] = useState(null);

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            // doSomething(position.coords.latitude, position.coords.longitude);
            setCoords([position.coords.latitude, position.coords.longitude])
            console.log(position.coords.latitude, position.coords.longitude);
        });
    }


    useEffect(() => {
        getCurrentLocation();
    }, [])


    return (
        <div>
            <MapContainer style={{ width: 1200, height: 800 }} center={[26.8467, 80.9462]} zoom={20} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    doctorLocations.map((doctor) => {
                        return (
                            <Marker position={[doctor.lat, doctor.long]}>
                                <Popup>
                                    <h2>{doctor.name}</h2>
                                    <p>{doctor.speciality}</p>
                                    <button onClick={() => setSelDoc(doctor)}>Select</button>
                                </Popup>
                            </Marker>
                        )
                    })

                }

                {
                    coords.length > 0 && <Marker position={coords}>
                        <Popup>
                            You are here
                        </Popup>
                    </Marker>
                }
            </MapContainer>
            {
                selDoc && <div>
                    <h2>{selDoc.name}</h2>
                    <p>{selDoc.speciality}</p>
                </div>
            }
        </div>
    )
}

export default Location