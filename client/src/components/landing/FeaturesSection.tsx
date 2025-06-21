import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Shield, Zap, BarChart3, Brain, Lock, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Optimization",
      description: "Machine learning algorithms continuously analyze market conditions to optimize your yield strategies in real-time.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Risk Management",
      description: "Advanced risk assessment tools protect your investments with automated stop-loss and portfolio rebalancing.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Auto-Compounding",
      description: "Maximize returns with automated reward harvesting and reinvestment across multiple DeFi protocols.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive portfolio tracking with detailed performance metrics and yield projections.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Institutional Security",
      description: "Multi-signature wallets and audited smart contracts ensure your funds are always protected.",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Cross-Chain Support",
      description: "Access yield opportunities across Ethereum, Polygon, Arbitrum, and other major blockchains.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ]

  return (
    <section id="strategies" ref={ref} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-slate-900">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{ y }}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Advanced DeFi Strategies
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Leverage cutting-edge technology to maximize your cryptocurrency yields 
            while minimizing risk through diversified strategies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full p-8 bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 backdrop-blur-sm">
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className={`absolute -inset-2 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}