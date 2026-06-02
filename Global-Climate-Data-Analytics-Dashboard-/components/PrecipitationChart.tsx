'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { motion } from 'framer-motion'

// Define types for precipitation data
type PrecipitationData = {
  month: string
  precipitation: number
  temperature: number
  humidity: number
}

type RegionalData = {
  name: string
  value: number
  color: string
}

// Generate realistic precipitation data
const generatePrecipitationData = (): PrecipitationData[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map((month, index) => {
    const seasonalPattern = Math.sin((index - 2) * Math.PI / 6) * 20 + 50
    const randomVariation = (Math.random() - 0.5) * 30
    const precipitation = Math.max(0, seasonalPattern + randomVariation)
    
    return {
      month,
      precipitation: parseFloat(precipitation.toFixed(1)),
      temperature: 20 + Math.sin((index - 2) * Math.PI / 6) * 10 + (Math.random() - 0.5) * 5,
      humidity: 60 + Math.sin((index - 2) * Math.PI / 6) * 20 + (Math.random() - 0.5) * 10
    }
  })
}

const generateRegionalData = (): RegionalData[] => {
  return [
    { name: 'Tropical', value: 35, color: '#3b82f6' },
    { name: 'Temperate', value: 28, color: '#10b981' },
    { name: 'Arid', value: 20, color: '#f59e0b' },
    { name: 'Polar', value: 17, color: '#8b5cf6' }
  ]
}

export default function PrecipitationChart() {
  const [data, setData] = useState<PrecipitationData[]>([])
  const [regionalData, setRegionalData] = useState<RegionalData[]>([])
  const [chartType, setChartType] = useState<string>('bar')

  useEffect(() => {
    setData(generatePrecipitationData())
    setRegionalData(generateRegionalData())
  }, [])

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{`Month: ${label}`}</p>
          <p className="text-blue-600">
            Precipitation: {payload[0].value}mm
          </p>
          <p className="text-green-600">
            Temperature: {payload[0].payload.temperature.toFixed(1)}°C
          </p>
          <p className="text-purple-600">
            Humidity: {payload[0].payload.humidity.toFixed(1)}%
          </p>
        </div>
      )
    }
    return null
  }

  const PieTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-blue-600">
            Coverage: {payload[0].value}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'bar', label: 'Monthly Trends', icon: '📊' },
          { key: 'pie', label: 'Regional Distribution', icon: '🥧' }
        ].map((type) => (
          <button
            key={type.key}
            onClick={() => setChartType(type.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
              chartType === type.key
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{type.icon}</span>
            <span>{type.label}</span>
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
          {chartType === 'bar' ? (
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
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
              <Bar 
                dataKey="precipitation" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={regionalData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {regionalData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {data.length > 0 ? 
              (data.reduce((sum, item) => sum + item.precipitation, 0) / data.length).toFixed(1) 
              : '0.0'
            }mm
          </p>
          <p className="text-sm text-gray-600">Average Monthly</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {data.length > 0 ? 
              Math.max(...data.map(item => item.precipitation)).toFixed(1) 
              : '0.0'
            }mm
          </p>
          <p className="text-sm text-gray-600">Peak Month</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {data.length > 0 ? 
              data.reduce((sum, item) => sum + item.precipitation, 0).toFixed(0) 
              : '0'
            }mm
          </p>
          <p className="text-sm text-gray-600">Annual Total</p>
        </div>
      </div>
    </div>
  )
}
