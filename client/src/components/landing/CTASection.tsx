import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, Wallet, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-blue-900/20">
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-500/5 to-blue-500/5" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* Floating Icons */}
      <motion.div 
        className="absolute top-20 left-20 text-emerald-400/20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <Shield size={48} />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/2 right-20 text-blue-400/20"
        animate={{ 
          y: [0, 25, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 3
        }}
      >
        <Zap size={56} />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            <Wallet className="w-4 h-4 mr-2" />
            Start Earning Today
          </div>
        </motion.div>

        <motion.h2 
          className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            Ready to
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Maximize
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Your Yields?
          </span>
        </motion.h2>

        <motion.p 
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join the future of DeFi yield optimization. Connect your wallet and start 
          earning higher returns with our advanced AI-powered strategies.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-12 py-6 text-xl font-semibold shadow-2xl shadow-emerald-500/25 group"
          >
            <Wallet className="mr-3 h-6 w-6" />
            Connect Wallet
            <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-12 py-6 text-xl font-semibold"
          >
            View Documentation
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50">
            <Shield className="h-6 w-6 text-emerald-400" />
            <span className="text-slate-300 font-medium">Audited Smart Contracts</span>
          </div>
          <div className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50">
            <Zap className="h-6 w-6 text-blue-400" />
            <span className="text-slate-300 font-medium">Instant Transactions</span>
          </div>
          <div className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50">
            <Wallet className="h-6 w-6 text-purple-400" />
            <span className="text-slate-300 font-medium">Non-Custodial</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}