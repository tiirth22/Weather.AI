'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  TrendingUp, 
  Globe, 
  BarChart3,
  Map,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

import Header from '@/components/Header'
import StatsGrid from '@/components/StatsGrid'
import TemperatureChart from '@/components/TemperatureChart'
import PrecipitationChart from '@/components/PrecipitationChart'
import CorrelationMatrix from '@/components/CorrelationMatrix'
import PredictionsPanel from '@/components/PredictionsPanel'
import DataInsights from '@/components/DataInsights'
import LoadingSpinner from '@/components/LoadingSpinner'

// Dynamically import WorldMap with SSR disabled
const WorldMap = dynamic(() => import('@/components/WorldMap'), {
  ssr: false,
  loading: () => <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">Loading map...</div>
})

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(2023)
  const [selectedRegion, setSelectedRegion] = useState('Global')
  const [data, setData] = useState(null)

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      setLoading(true)
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      setLoading(false)
    }
    
    loadData()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Global Climate Analytics
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive analysis of global climate data with advanced statistical modeling, 
            interactive visualizations, and predictive insights for environmental research.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <StatsGrid />
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Temperature Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Thermometer className="h-6 w-6 text-red-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Temperature Trends</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">Live Data</span>
                </div>
              </div>
              <TemperatureChart />
            </div>
          </motion.div>

          {/* World Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Global Overview</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <Map className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Interactive</span>
                </div>
              </div>
              <WorldMap />
            </div>
          </motion.div>
        </div>

        {/* Secondary Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Precipitation Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Droplets className="h-6 w-6 text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Precipitation Patterns</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Statistical</span>
                </div>
              </div>
              <PrecipitationChart />
            </div>
          </motion.div>

          {/* Correlation Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Variable Correlations</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-gray-600">ML Analysis</span>
                </div>
              </div>
              <CorrelationMatrix />
            </div>
          </motion.div>
        </div>

        {/* Predictions and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Climate Predictions</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">ML Model</span>
                </div>
              </div>
              <PredictionsPanel />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-6 w-6 text-indigo-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Data Insights</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm text-gray-600">Analytics</span>
                </div>
              </div>
              <DataInsights />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>Climate Data Analytics Dashboard</strong> - Advanced Data Science Portfolio Project
            </p>
            <p className="text-sm">
              Built with Next.js, React, D3.js, and advanced statistical modeling techniques
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
