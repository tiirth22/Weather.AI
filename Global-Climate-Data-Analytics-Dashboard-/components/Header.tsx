'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Menu, 
  X, 
  Download, 
  Settings, 
  RefreshCw,
  Database,
  BarChart3
} from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Climate Analytics</h1>
              <p className="text-xs text-gray-600">Data Science Dashboard</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center space-x-8"
          >
            <a href="#overview" className="text-gray-700 hover:text-blue-600 transition-colors">
              Overview
            </a>
            <a href="#analysis" className="text-gray-700 hover:text-blue-600 transition-colors">
              Analysis
            </a>
            <a href="#predictions" className="text-gray-700 hover:text-blue-600 transition-colors">
              Predictions
            </a>
            <a href="#insights" className="text-gray-700 hover:text-blue-600 transition-colors">
              Insights
            </a>
          </motion.nav>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
              <RefreshCw className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
              <Download className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
              <Settings className="h-5 w-5" />
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 py-4"
          >
            <nav className="flex flex-col space-y-4">
              <a href="#overview" className="text-gray-700 hover:text-blue-600 transition-colors">
                Overview
              </a>
              <a href="#analysis" className="text-gray-700 hover:text-blue-600 transition-colors">
                Analysis
              </a>
              <a href="#predictions" className="text-gray-700 hover:text-blue-600 transition-colors">
                Predictions
              </a>
              <a href="#insights" className="text-gray-700 hover:text-blue-600 transition-colors">
                Insights
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
