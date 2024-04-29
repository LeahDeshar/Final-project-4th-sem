import React, { useContext, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ServiceContext } from '../utils/ServContext';

const AddressAutocomplete = () => {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState('');

  const LocationMarker = () => {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    const { updateServiceAddress} =useContext(ServiceContext)
    const serviceAddress =address 
    // TEST
    console.log("serAs",serviceAddress)
    
    const handleMarkerDragEnd = (e) => {
      const marker = e.target;
      const newPosition = marker.getLatLng();
      setPosition(newPosition);
      getAddressFromCoordinates(newPosition);
    };

     


    const getAddressFromCoordinates = async (latlng) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`,
          {
            headers: {
              'User-Agent': 'Mozilla/5.0',
              Accept: 'application/json',
            },
          }
        );
        const data = await response.json();
    
        // Extract the specific address part you want
        const fullAddress = data?.display_name || 'Address not found';
        const specificAddress = fullAddress.split(',').splice(0,5)
    
        setAddress(specificAddress);
        updateServiceAddress(specificAddress);
    
        // console.log(specificAddress);
      } catch (error) {
        console.log('Error retrieving address:', error);
      }
    };
    
    
    
    
    
    
    return position === null ? null : (
      <Marker position={position} draggable={true} eventHandlers={{ dragend: handleMarkerDragEnd }} icon={markerIcon}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  // Define custom marker icon
  const markerIcon = L.icon({
    iconUrl: '/assets/marker-icon.png',
    iconSize: [41, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    // shadowUrl: 'marker-shadow.png',
    // shadowSize: [41, 41],
    shadowAnchor: [12.5, 41],
  });

  return (
    <MapContainer center={{ lat: 27.700769, lng: 85.300140 }} zoom={13} style={{ height: '400px', width: '100%', borderRadius:"25px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default AddressAutocomplete;
