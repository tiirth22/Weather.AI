'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { motion } from 'framer-motion'

// Define types for temperature data
type TemperatureData = {
  year: number
  temperature: number
  anomaly: number
  co2: number
  seaLevel: number
}

// Generate realistic temperature data
const generateTemperatureData = (): TemperatureData[] => {
  const years = Array.from({ length: 20 }, (_, i) => 2004 + i)
  return years.map(year => {
    const baseTemp = 14.5 + (year - 2004) * 0.02 // Gradual warming trend
    const seasonalVariation = Math.sin((year - 2004) * 0.5) * 0.3
    const randomVariation = (Math.random() - 0.5) * 0.4
    
    return {
      year,
      temperature: parseFloat((baseTemp + seasonalVariation + randomVariation).toFixed(2)),
      anomaly: parseFloat((baseTemp - 14.5 + seasonalVariation + randomVariation).toFixed(2)),
      co2: 375 + (year - 2004) * 2.1 + Math.random() * 5,
      seaLevel: 0 + (year - 2004) * 3.2 + Math.random() * 2
    }
  })
}

export default function TemperatureChart() {
  const [data, setData] = useState<TemperatureData[]>([])
  const [selectedMetric, setSelectedMetric] = useState<string>('temperature')

  useEffect(() => {
    setData(generateTemperatureData())
  }, [])

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{`Year: ${label}`}</p>
          <p className="text-blue-600">
            {selectedMetric === 'temperature' && `Temperature: ${payload[0].value}°C`}
            {selectedMetric === 'anomaly' && `Anomaly: ${payload[0].value}°C`}
            {selectedMetric === 'co2' && `CO₂: ${payload[0].value} ppm`}
            {selectedMetric === 'seaLevel' && `Sea Level: ${payload[0].value} mm`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Metric Selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'temperature', label: 'Temperature', color: 'text-red-500' },
          { key: 'anomaly', label: 'Anomaly', color: 'text-orange-500' },
          { key: 'co2', label: 'CO₂ Levels', color: 'text-blue-500' },
          { key: 'seaLevel', label: 'Sea Level', color: 'text-green-500' }
        ].map((metric) => (
          <button
            key={metric.key}
            onClick={() => setSelectedMetric(metric.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedMetric === metric.key
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {metric.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={selectedMetric}
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#colorGradient)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {data.length > 0 ? (data[data.length - 1] as any)[selectedMetric]?.toFixed(2) : '0.00'}
          </p>
          <p className="text-sm text-gray-600">Current Value</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {data.length > 0 ? 
              (((data[data.length - 1] as any)[selectedMetric] - (data[0] as any)[selectedMetric]) / data.length).toFixed(3) 
              : '0.000'
            }
          </p>
          <p className="text-sm text-gray-600">Annual Change</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {data.length > 0 ? 
              ((data[data.length - 1] as any)[selectedMetric] - (data[0] as any)[selectedMetric]).toFixed(2) 
              : '0.00'
            }
          </p>
          <p className="text-sm text-gray-600">Total Change</p>
        </div>
      </div>
    </div>
  )
}
