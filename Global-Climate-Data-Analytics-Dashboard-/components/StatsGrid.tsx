'use client'

import { motion } from 'framer-motion'
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

const stats = [
  {
    title: 'Global Temperature',
    value: '1.1°C',
    change: '+0.2°C',
    trend: 'up',
    icon: Thermometer,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    description: 'Above pre-industrial levels'
  },
  {
    title: 'Sea Level Rise',
    value: '3.3mm/year',
    change: '+0.1mm',
    trend: 'up',
    icon: Droplets,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    description: 'Global average'
  },
  {
    title: 'CO₂ Concentration',
    value: '417 ppm',
    change: '+2.5 ppm',
    trend: 'up',
    icon: Wind,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    description: 'Atmospheric levels'
  },
  {
    title: 'Climate Risk',
    value: 'High',
    change: 'Stable',
    trend: 'neutral',
    icon: AlertTriangle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    description: 'Global assessment'
  }
]

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        const isPositive = stat.trend === 'up'
        const isNegative = stat.trend === 'down'
        
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="stat-card card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="flex items-center space-x-1">
                {isPositive && <TrendingUp className="h-4 w-4 text-green-500" />}
                {isNegative && <TrendingDown className="h-4 w-4 text-red-500" />}
                {stat.trend === 'neutral' && <CheckCircle className="h-4 w-4 text-gray-500" />}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900">
                {stat.value}
              </p>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  isPositive ? 'text-green-600' : 
                  isNegative ? 'text-red-600' : 
                  'text-gray-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500">
                  vs last year
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {stat.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
