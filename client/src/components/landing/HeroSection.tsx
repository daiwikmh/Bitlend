import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, TrendingUp, DollarSign, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const stats = [
    { value: '$2.4B+', label: 'Total Value Locked' },
    { value: '15.2%', label: 'Average APY' },
    { value: '50K+', label: 'Active Users' }
  ]

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900">
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{ y }}
        >
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 text-emerald-400/20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <TrendingUp size={64} />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/3 right-1/4 text-blue-400/20"
        animate={{ 
          y: [0, 15, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      >
        <DollarSign size={48} />
      </motion.div>

      <motion.div 
        className="absolute bottom-1/4 right-1/3 text-purple-400/20"
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 4
        }}
      >
        <Zap size={56} />
      </motion.div>

      {/* Scrolling Logo Animation */}
      <div className="absolute top-12 left-0 w-full z-20 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute"
            animate={{ 
              x: [-100, window?.innerWidth || 1200 + 100]
            }}
            transition={{ 
              duration: 15 + i * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 2
            }}
            style={{ top: `${i * 60}px` }}
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <span className="absolute w-2 h-2 rounded-full bg-emerald-400 top-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
              <span className="absolute w-2 h-2 rounded-full bg-blue-400 left-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
              <span className="absolute w-2 h-2 rounded-full bg-purple-400 right-0 top-1/2 transform -translate-y-1/2 opacity-80"></span>
              <span className="absolute w-2 h-2 rounded-full bg-pink-400 bottom-0 left-1/2 transform -translate-x-1/2 opacity-80"></span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center max-w-6xl mx-auto px-4"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            Maximize Your Crypto Yields
          </div>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-white via-emerald-200 to-blue-200 bg-clip-text text-transparent">
            Optimize
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your DeFi
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Returns
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Advanced yield optimization strategies powered by AI. Maximize your returns 
          across multiple DeFi protocols with institutional-grade risk management.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl shadow-emerald-500/25 group"
          >
            Start Optimizing
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-4 text-lg font-semibold"
          >
            View Strategies
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
}