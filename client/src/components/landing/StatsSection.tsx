import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, DollarSign, Users, Globe } from 'lucide-react'

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })
  const [counters, setCounters] = useState({
    tvl: 0,
    apy: 0,
    users: 0,
    protocols: 0
  })

  const stats = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      value: '$2.4B+',
      target: 2400000000,
      label: 'Total Value Locked',
      prefix: '$',
      suffix: 'B+',
      key: 'tvl'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: '15.2%',
      target: 15.2,
      label: 'Average APY',
      prefix: '',
      suffix: '%',
      key: 'apy'
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: '50K+',
      target: 50000,
      label: 'Active Users',
      prefix: '',
      suffix: 'K+',
      key: 'users'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      value: '25+',
      target: 25,
      label: 'Supported Protocols',
      prefix: '',
      suffix: '+',
      key: 'protocols'
    }
  ]

  useEffect(() => {
    if (!isInView) return

    const animateCounters = () => {
      stats.forEach((stat) => {
        let startValue = 0
        const endValue = stat.key === 'tvl' ? 2.4 : stat.key === 'users' ? 50 : stat.target
        const duration = 2000
        const increment = endValue / (duration / 16)
        
        const timer = setInterval(() => {
          startValue += increment
          if (startValue >= endValue) {
            startValue = endValue
            clearInterval(timer)
          }
          
          setCounters(prev => ({
            ...prev,
            [stat.key]: startValue
          }))
        }, 16)
      })
    }

    const timeout = setTimeout(animateCounters, 500)
    return () => clearTimeout(timeout)
  }, [isInView])

  const formatValue = (value: number, key: string) => {
    if (key === 'tvl') return `$${value.toFixed(1)}B+`
    if (key === 'apy') return `${value.toFixed(1)}%`
    if (key === 'users') return `${Math.floor(value)}K+`
    return `${Math.floor(value)}+`
  }

  return (
    <section ref={ref} className="relative py-24 bg-slate-800/50">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-blue-900/20" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Trusted by DeFi Leaders
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join thousands of users who trust YieldMax for their DeFi yield optimization needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <div className="text-center p-8 rounded-3xl bg-slate-900/50 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm">
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {stat.icon}
                </motion.div>
                
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-3">
                  {formatValue(counters[stat.key as keyof typeof counters], stat.key)}
                </div>
                
                <div className="text-slate-400 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}