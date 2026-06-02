'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3,
  Brain,
  Zap,
  Shield,
  LucideIcon
} from 'lucide-react'

// Define types for insights data
type Insight = {
  id: number
  type: string
  title: string
  description: string
  impact: string
  confidence: number
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
}

// Generate insights data
const generateInsights = (): Insight[] => {
  return [
    {
      id: 1,
      type: 'trend',
      title: 'Accelerating Temperature Rise',
      description: 'Global temperatures are rising at an unprecedented rate of 0.18°C per decade, significantly faster than historical averages.',
      impact: 'high',
      confidence: 95,
      icon: TrendingUp,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 2,
      type: 'correlation',
      title: 'CO₂-Temperature Correlation',
      description: 'Strong positive correlation (r=0.85) between atmospheric CO₂ levels and global temperature anomalies.',
      impact: 'high',
      confidence: 98,
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 3,
      type: 'prediction',
      title: 'Sea Level Acceleration',
      description: 'Sea level rise is accelerating, with current rate of 3.3mm/year projected to increase to 5.2mm/year by 2030.',
      impact: 'critical',
      confidence: 92,
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 4,
      type: 'anomaly',
      title: 'Extreme Weather Events',
      description: 'Frequency of extreme weather events has increased by 40% over the past two decades, correlating with temperature rise.',
      impact: 'high',
      confidence: 88,
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 5,
      type: 'mitigation',
      title: 'Renewable Energy Growth',
      description: 'Global renewable energy capacity has grown by 15% annually, showing positive momentum in climate mitigation efforts.',
      impact: 'positive',
      confidence: 90,
      icon: Zap,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 6,
      type: 'model',
      title: 'ML Model Accuracy',
      description: 'Machine learning models achieve 94% accuracy in predicting temperature trends using multi-variable analysis.',
      impact: 'technical',
      confidence: 94,
      icon: Brain,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ]
}

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'critical': return 'text-red-600 bg-red-100'
    case 'high': return 'text-orange-600 bg-orange-100'
    case 'medium': return 'text-yellow-600 bg-yellow-100'
    case 'positive': return 'text-green-600 bg-green-100'
    case 'technical': return 'text-purple-600 bg-purple-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

const getImpactLabel = (impact: string) => {
  switch (impact) {
    case 'critical': return 'Critical'
    case 'high': return 'High'
    case 'medium': return 'Medium'
    case 'positive': return 'Positive'
    case 'technical': return 'Technical'
    default: return 'Unknown'
  }
}

export default function DataInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    setInsights(generateInsights())
  }, [])

  const filteredInsights = insights.filter(insight => {
    if (filter === 'all') return true
    return insight.type === filter
  })

  const categories = [
    { key: 'all', label: 'All Insights', icon: '📊' },
    { key: 'trend', label: 'Trends', icon: '📈' },
    { key: 'correlation', label: 'Correlations', icon: '🔗' },
    { key: 'prediction', label: 'Predictions', icon: '🔮' },
    { key: 'anomaly', label: 'Anomalies', icon: '⚠️' },
    { key: 'mitigation', label: 'Mitigation', icon: '🌱' },
    { key: 'model', label: 'Models', icon: '🤖' }
  ]

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setFilter(category.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
              filter === category.key
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInsights.map((insight, index) => {
          const Icon = insight.icon
          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedInsight(insight)}
              className={`${insight.bgColor} ${insight.borderColor} border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                  <Icon className={`h-5 w-5 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                      {getImpactLabel(insight.impact)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <span className="text-xs text-gray-600">
                        {insight.confidence}% confidence
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {insight.type.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Selected Insight Detail */}
      {selectedInsight && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${selectedInsight.bgColor} ${selectedInsight.borderColor} border rounded-lg p-6`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${selectedInsight.bgColor}`}>
                <selectedInsight.icon className={`h-6 w-6 ${selectedInsight.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedInsight.title}</h3>
                <p className="text-sm text-gray-600">
                  {selectedInsight.type.toUpperCase()} • {selectedInsight.confidence}% confidence
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedInsight(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <p className="text-gray-700 mb-4">{selectedInsight.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{selectedInsight.confidence}%</p>
              <p className="text-sm text-gray-600">Confidence Level</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {getImpactLabel(selectedInsight.impact)}
              </p>
              <p className="text-sm text-gray-600">Impact Level</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {selectedInsight.type.toUpperCase()}
              </p>
              <p className="text-sm text-gray-600">Analysis Type</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{insights.length}</p>
          <p className="text-sm text-gray-600">Total Insights</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {insights.filter(i => i.confidence >= 90).length}
          </p>
          <p className="text-sm text-gray-600">High Confidence</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {insights.filter(i => i.impact === 'critical' || i.impact === 'high').length}
          </p>
          <p className="text-sm text-gray-600">Critical/High Impact</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length)}%
          </p>
          <p className="text-sm text-gray-600">Avg Confidence</p>
        </div>
      </div>
    </div>
  )
}
