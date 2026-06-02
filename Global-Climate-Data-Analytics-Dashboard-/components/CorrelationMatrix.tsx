'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Define types for correlation data
type CorrelationData = {
  variables: string[]
  correlations: {
    [key: string]: {
      [key: string]: number
    }
  }
}

// Generate correlation matrix data
const generateCorrelationData = (): CorrelationData => {
  const variables = ['Temperature', 'CO₂', 'Sea Level', 'Precipitation', 'Humidity', 'Wind Speed']
  
  // Create a realistic correlation matrix
  const correlations = {
    'Temperature': { 'CO₂': 0.85, 'Sea Level': 0.72, 'Precipitation': -0.15, 'Humidity': 0.23, 'Wind Speed': -0.31 },
    'CO₂': { 'Sea Level': 0.68, 'Precipitation': -0.08, 'Humidity': 0.18, 'Wind Speed': -0.25 },
    'Sea Level': { 'Precipitation': 0.12, 'Humidity': 0.15, 'Wind Speed': -0.18 },
    'Precipitation': { 'Humidity': 0.45, 'Wind Speed': 0.38 },
    'Humidity': { 'Wind Speed': 0.22 }
  }
  
  return { variables, correlations }
}

const getCorrelationColor = (value: number) => {
  const absValue = Math.abs(value)
  if (absValue >= 0.8) return 'bg-red-500'
  if (absValue >= 0.6) return 'bg-orange-500'
  if (absValue >= 0.4) return 'bg-yellow-500'
  if (absValue >= 0.2) return 'bg-green-500'
  return 'bg-gray-300'
}

const getCorrelationStrength = (value: number) => {
  const absValue = Math.abs(value)
  if (absValue >= 0.8) return 'Very Strong'
  if (absValue >= 0.6) return 'Strong'
  if (absValue >= 0.4) return 'Moderate'
  if (absValue >= 0.2) return 'Weak'
  return 'Very Weak'
}

export default function CorrelationMatrix() {
  const [data, setData] = useState<CorrelationData | null>(null)
  const [selectedVariable, setSelectedVariable] = useState<string | null>(null)

  useEffect(() => {
    setData(generateCorrelationData())
  }, [])

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Variable Selector */}
      <div className="flex flex-wrap gap-2">
        {data.variables.map((variable) => (
          <button
            key={variable}
            onClick={() => setSelectedVariable(variable)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedVariable === variable
                ? 'bg-purple-100 text-purple-700 border border-purple-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {variable}
          </button>
        ))}
      </div>

      {/* Correlation Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Variable</th>
                {data.variables.map((variable) => (
                  <th key={variable} className="px-4 py-3 text-center text-sm font-medium text-gray-500">
                    {variable}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.variables.map((rowVar, rowIndex) => (
                <tr key={rowVar} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{rowVar}</td>
                  {data.variables.map((colVar, colIndex) => {
                    let correlation = 0
                    if (rowIndex === colIndex) {
                      correlation = 1.0
                    } else if (rowIndex < colIndex) {
                      correlation = data.correlations[rowVar]?.[colVar] || 0
                    } else {
                      correlation = data.correlations[colVar]?.[rowVar] || 0
                    }
                    
                    return (
                      <td key={colVar} className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center space-y-1">
                          <div 
                            className={`w-8 h-8 rounded-full ${getCorrelationColor(correlation)} flex items-center justify-center text-white text-xs font-bold`}
                            title={`${correlation.toFixed(2)} - ${getCorrelationStrength(correlation)}`}
                          >
                            {correlation.toFixed(1)}
                          </div>
                          <span className="text-xs text-gray-500">
                            {getCorrelationStrength(correlation)}
                          </span>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Selected Variable Analysis */}
      {selectedVariable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200"
        >
          <h3 className="font-bold text-lg text-gray-900 mb-4">
            {selectedVariable} Correlations
          </h3>
          <div className="space-y-3">
            {Object.entries(data.correlations[selectedVariable] || {}).map(([variable, correlation]) => (
              <div key={variable} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{variable}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getCorrelationColor(correlation)}`}
                      style={{ width: `${Math.abs(correlation) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 w-12 text-right">
                    {correlation.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Very Strong (≥0.8)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span>Strong (≥0.6)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Moderate (≥0.4)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Weak (≥0.2)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <span>Very Weak (&lt;0.2)</span>
        </div>
      </div>
    </div>
  )
}
