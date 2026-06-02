'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Define types for climate data
type ClimateData = {
  name: string
  lat: number
  lng: number
  temp: number
  co2: number
  risk: string
}

// Generate realistic climate data for different regions
const generateClimateData = (): ClimateData[] => {
  return [
    { name: 'North America', lat: 45.0, lng: -100.0, temp: 8.5, co2: 415, risk: 'Medium' },
    { name: 'Europe', lat: 54.0, lng: 15.0, temp: 9.2, co2: 410, risk: 'Low' },
    { name: 'Asia', lat: 35.0, lng: 100.0, temp: 12.8, co2: 425, risk: 'High' },
    { name: 'Africa', lat: 0.0, lng: 20.0, temp: 25.3, co2: 400, risk: 'High' },
    { name: 'South America', lat: -15.0, lng: -60.0, temp: 22.1, co2: 405, risk: 'Medium' },
    { name: 'Australia', lat: -25.0, lng: 135.0, temp: 21.5, co2: 420, risk: 'High' },
    { name: 'Antarctica', lat: -80.0, lng: 0.0, temp: -50.0, co2: 380, risk: 'Critical' },
    { name: 'Arctic', lat: 80.0, lng: 0.0, temp: -15.0, co2: 390, risk: 'Critical' }
  ]
}

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'Low': return '#10b981'
    case 'Medium': return '#f59e0b'
    case 'High': return '#ef4444'
    case 'Critical': return '#dc2626'
    default: return '#6b7280'
  }
}

const getTempColor = (temp: number) => {
  if (temp < 0) return '#3b82f6'
  if (temp < 10) return '#10b981'
  if (temp < 20) return '#f59e0b'
  if (temp < 30) return '#f97316'
  return '#ef4444'
}

export default function WorldMap() {
  const [data, setData] = useState<ClimateData[]>([])
  const [selectedRegion, setSelectedRegion] = useState<ClimateData | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0])
  const [zoom, setZoom] = useState<number>(2)

  useEffect(() => {
    setData(generateClimateData())
  }, [])

  const handleRegionClick = (region: ClimateData) => {
    setSelectedRegion(region)
    setMapCenter([region.lat, region.lng])
    setZoom(4)
  }

  return (
    <div className="space-y-4">
      {/* Region Selector */}
      <div className="flex flex-wrap gap-2">
        {data.map((region) => (
          <button
            key={region.name}
            onClick={() => handleRegionClick(region)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              selectedRegion?.name === region.name
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {region.name}
          </button>
        ))}
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="map-container"
      >
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          key={`${mapCenter[0]}-${mapCenter[1]}-${zoom}`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {data.map((region, index) => (
            <CircleMarker
              key={region.name}
              center={[region.lat, region.lng]}
              radius={Math.max(8, Math.min(20, Math.abs(region.temp) * 0.8))}
              pathOptions={{
                fillColor: getTempColor(region.temp),
                color: getRiskColor(region.risk),
                weight: 2,
                opacity: 1,
                fillOpacity: 0.7
              }}
              eventHandlers={{
                click: () => handleRegionClick(region)
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-gray-900 mb-2">{region.name}</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Temperature:</span> {region.temp}°C</p>
                    <p><span className="font-medium">CO₂:</span> {region.co2} ppm</p>
                    <p><span className="font-medium">Risk Level:</span> 
                      <span className={`ml-1 px-2 py-1 rounded text-xs ${
                        region.risk === 'Low' ? 'bg-green-100 text-green-800' :
                        region.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        region.risk === 'High' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {region.risk}
                      </span>
                    </p>
                  </div>
                </div>
              </Popup>
              
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="text-center">
                  <div className="font-bold">{region.name}</div>
                  <div className="text-sm">{region.temp}°C</div>
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </motion.div>

      {/* Selected Region Details */}
      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200"
        >
          <h3 className="font-bold text-lg text-gray-900 mb-3">{selectedRegion.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{selectedRegion.temp}°C</p>
              <p className="text-sm text-gray-600">Average Temperature</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{selectedRegion.co2} ppm</p>
              <p className="text-sm text-gray-600">CO₂ Concentration</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${
                selectedRegion.risk === 'Low' ? 'text-green-600' :
                selectedRegion.risk === 'Medium' ? 'text-yellow-600' :
                selectedRegion.risk === 'High' ? 'text-orange-600' :
                'text-red-600'
              }`}>
                {selectedRegion.risk}
              </p>
              <p className="text-sm text-gray-600">Climate Risk</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
