'use client'

import { motion } from 'framer-motion'
import { Globe, Activity } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto"
            >
              <Globe className="w-full h-full text-blue-500" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Activity className="w-6 h-6 text-blue-600" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            Loading Climate Data
          </h2>
          <p className="text-gray-600">
            Processing global climate datasets and generating insights...
          </p>
          <div className="flex items-center justify-center space-x-2">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-blue-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
