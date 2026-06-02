'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { AlertTriangle, TrendingUp, Calendar, Target } from 'lucide-react'

// Define types for prediction data
type PredictionData = {
  year: number
  temperature: number
  confidence: number
  scenario?: string
}

// Generate prediction data
const generatePredictionData = (): PredictionData[] => {
  const historical = Array.from({ length: 10 }, (_, i) => ({
    year: 2014 + i,
    temperature: 14.2 + i * 0.15 + (Math.random() - 0.5) * 0.3,
    confidence: 95
  }))
  
  const predictions = Array.from({ length: 15 }, (_, i) => ({
    year: 2024 + i,
    temperature: 15.5 + i * 0.18 + (Math.random() - 0.5) * 0.4,
    confidence: Math.max(60, 95 - i * 2),
    scenario: i < 5 ? 'optimistic' : i < 10 ? 'realistic' : 'pessimistic'
  }))
  
  return [...historical, ...predictions]
}

const scenarios = [
  {
    name: 'Optimistic',
    description: 'Strong climate action, rapid decarbonization',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    icon: '🌱'
  },
  {
    name: 'Realistic',
    description: 'Current policies continue, moderate action',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: '📊'
  },
  {
    name: 'Pessimistic',
    description: 'Limited action, business as usual',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    icon: '⚠️'
  }
]

export default function PredictionsPanel() {
  const [data, setData] = useState<PredictionData[]>([])
  const [selectedScenario, setSelectedScenario] = useState<string>('realistic')
  const [timeframe, setTimeframe] = useState<string>('10')

  useEffect(() => {
    setData(generatePredictionData())
  }, [])

  const filteredData = data.filter(item => {
    const years = parseInt(timeframe)
    return item.year >= 2024 - years
  })

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{`Year: ${label}`}</p>
          <p className="text-blue-600">
            Temperature: {payload[0].value.toFixed(2)}°C
          </p>
          <p className="text-gray-600">
            Confidence: {item.confidence}%
          </p>
          {item.scenario && (
            <p className="text-sm text-gray-500">
              Scenario: {item.scenario}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  const getScenarioData = () => {
    const currentYear = new Date().getFullYear()
    return filteredData.filter(item => {
      if (item.year < currentYear) return true
      if (selectedScenario === 'optimistic') return item.scenario === 'optimistic' || item.scenario === 'realistic'
      if (selectedScenario === 'realistic') return item.scenario === 'realistic'
      if (selectedScenario === 'pessimistic') return item.scenario === 'pessimistic' || item.scenario === 'realistic'
      return true
    })
  }

  const scenarioData = getScenarioData()
  const currentTemp = scenarioData[scenarioData.length - 1]?.temperature || 0
  const tempIncrease = currentTemp - (scenarioData[0]?.temperature || 0)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Climate Scenario
          </label>
          <select
            value={selectedScenario}
            onChange={(e) => setSelectedScenario(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {scenarios.map((scenario) => (
              <option key={scenario.name.toLowerCase()} value={scenario.name.toLowerCase()}>
                {scenario.icon} {scenario.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timeframe
          </label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
            <option value="20">20 Years</option>
            <option value="30">30 Years</option>
          </select>
        </div>
      </div>

      {/* Scenario Description */}
      <div className={`p-4 rounded-lg border ${scenarios.find(s => s.name.toLowerCase() === selectedScenario)?.borderColor} ${scenarios.find(s => s.name.toLowerCase() === selectedScenario)?.bgColor}`}>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-2xl">{scenarios.find(s => s.name.toLowerCase() === selectedScenario)?.icon}</span>
          <h3 className={`font-bold ${scenarios.find(s => s.name.toLowerCase() === selectedScenario)?.color}`}>
            {scenarios.find(s => s.name.toLowerCase() === selectedScenario)?.name} Scenario
          </h3>
        </div>
        <p className="text-sm text-gray-700">
          {scenarios.find(s => s.name.toLowerCase() === selectedScenario)?.description}
        </p>
      </div>

      {/* Prediction Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={scenarioData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="temperature"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#predictionGradient)"
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Projected Temperature</h4>
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {currentTemp.toFixed(1)}°C
          </p>
          <p className="text-sm text-gray-600">
            {timeframe} year projection
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200"
        >
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-gray-900">Temperature Rise</h4>
          </div>
          <p className="text-2xl font-bold text-green-600">
            +{tempIncrease.toFixed(1)}°C
          </p>
          <p className="text-sm text-gray-600">
            From baseline
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200"
        >
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <h4 className="font-semibold text-gray-900">Risk Level</h4>
          </div>
          <p className="text-2xl font-bold text-orange-600">
            {tempIncrease > 2 ? 'High' : tempIncrease > 1 ? 'Medium' : 'Low'}
          </p>
          <p className="text-sm text-gray-600">
            Climate risk
          </p>
        </motion.div>
      </div>
    </div>
  )
}
