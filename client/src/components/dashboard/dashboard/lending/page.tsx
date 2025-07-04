"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, TrendingUp, Users, Plus } from "lucide-react"

interface LendingPool {
  id: string
  name: string
  apy: string
  tvl: string
  tvlUSD: string
  utilization: string
  minDeposit: string
  yourDeposit: string
  earned: string
  risk: "low" | "medium" | "high"
}

export default function LendingPage() {
  const [selectedPool, setSelectedPool] = useState<LendingPool | null>(null)
  const [lendAmount, setLendAmount] = useState("")

  const lendingPools: LendingPool[] = [
    {
      id: "btc-pool-1",
      name: "BTC Lending Pool Alpha",
      apy: "8.5",
      tvl: "1,247.5",
      tvlUSD: "74.8M",
      utilization: "78",
      minDeposit: "0.001",
      yourDeposit: "2.5000",
      earned: "0.2134",
      risk: "low",
    },
    {
      id: "btc-pool-2",
      name: "BTC High Yield Pool",
      apy: "12.3",
      tvl: "892.3",
      tvlUSD: "53.5M",
      utilization: "92",
      minDeposit: "0.01",
      yourDeposit: "1.2500",
      earned: "0.1547",
      risk: "medium",
    },
    {
      id: "btc-pool-3",
      name: "BTC Stable Pool",
      apy: "6.8",
      tvl: "2,156.8",
      tvlUSD: "129.4M",
      utilization: "65",
      minDeposit: "0.0001",
      yourDeposit: "0.0000",
      earned: "0.0000",
      risk: "low",
    },
    {
      id: "btc-pool-4",
      name: "BTC Premium Pool",
      apy: "15.7",
      tvl: "456.2",
      tvlUSD: "27.4M",
      utilization: "95",
      minDeposit: "0.1",
      yourDeposit: "0.0000",
      earned: "0.0000",
      risk: "high",
    },
  ]

  const getRiskColor = (risk: "low" | "medium" | "high"): string => {
    switch (risk) {
      case "low":
        return "bg-white/20 text-white"
      case "medium":
        return "bg-orange-500/20 text-orange-500"
      case "high":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-neutral-500/20 text-neutral-300"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-wider">LENDING POOLS</h1>
          <p className="text-sm text-neutral-400">Lend your Bitcoin and earn competitive yields</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Position
          </Button>
        </div>
      </div>

      {/* Lending Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">YOUR DEPOSITS</p>
                <p className="text-2xl font-bold text-white font-mono">3.75 BTC</p>
              </div>
              <Bitcoin className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">TOTAL EARNED</p>
                <p className="text-2xl font-bold text-white font-mono">0.368 BTC</p>
              </div>
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">AVG APY</p>
                <p className="text-2xl font-bold text-orange-500 font-mono">9.2%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 tracking-wider">ACTIVE POOLS</p>
                <p className="text-2xl font-bold text-white font-mono">2</p>
              </div>
              <Users className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lending Pools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {lendingPools.map((pool) => (
          <Card
            key={pool.id}
            className="bg-neutral-900 border-neutral-700 hover:border-orange-500/50 transition-colors cursor-pointer"
            onClick={() => setSelectedPool(pool)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-sm font-bold text-white tracking-wider">{pool.name}</CardTitle>
                  <p className="text-xs text-neutral-400 mt-1">Min deposit: {pool.minDeposit} BTC</p>
                </div>
                <Badge className={getRiskColor(pool.risk)}>{pool.risk.toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-neutral-400 mb-1">APY</div>
                  <div className="text-2xl font-bold text-orange-500 font-mono">{pool.apy}%</div>
                </div>
                <div>
                  <div className="text-xs text-neutral-400 mb-1">TVL</div>
                  <div className="text-lg font-bold text-white font-mono">{pool.tvl} BTC</div>
                  <div className="text-xs text-neutral-400">${pool.tvlUSD}</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-400">Utilization</span>
                  <span className="text-white font-mono">{pool.utilization}%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${pool.utilization}%` }}
                  ></div>
                </div>
              </div>

              {Number.parseFloat(pool.yourDeposit) > 0 && (
                <div className="pt-2 border-t border-neutral-700">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-neutral-400 mb-1">Your Deposit</div>
                      <div className="text-white font-mono">{pool.yourDeposit} BTC</div>
                    </div>
                    <div>
                      <div className="text-neutral-400 mb-1">Earned</div>
                      <div className="text-white font-mono">{pool.earned} BTC</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs">
                  {Number.parseFloat(pool.yourDeposit) > 0 ? "Add More" : "Lend"}
                </Button>
                {Number.parseFloat(pool.yourDeposit) > 0 && (
                  <Button
                    variant="outline"
                    className="flex-1 border-neutral-700 text-neutral-400 hover:bg-neutral-800 text-xs bg-transparent"
                  >
                    Withdraw
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pool Detail Modal */}
      {selectedPool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-neutral-900 border-neutral-700 w-full max-w-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-white tracking-wider">{selectedPool.name}</CardTitle>
                <p className="text-sm text-neutral-400">Lend Bitcoin and earn {selectedPool.apy}% APY</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setSelectedPool(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">POOL DETAILS</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Current APY:</span>
                        <span className="text-orange-500 font-mono">{selectedPool.apy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Total Value Locked:</span>
                        <span className="text-white font-mono">{selectedPool.tvl} BTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Utilization Rate:</span>
                        <span className="text-white font-mono">{selectedPool.utilization}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Risk Level:</span>
                        <Badge className={getRiskColor(selectedPool.risk)}>{selectedPool.risk.toUpperCase()}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-neutral-300 tracking-wider mb-2">LEND BITCOIN</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-neutral-400 mb-1 block">Amount (BTC)</label>
                        <Input
                          type="number"
                          placeholder="0.0000"
                          value={lendAmount}
                          onChange={(e) => setLendAmount(e.target.value)}
                          className="bg-neutral-800 border-neutral-600 text-white font-mono"
                        />
                      </div>

                      <div className="text-xs text-neutral-400 space-y-1">
                        <div className="flex justify-between">
                          <span>Estimated Monthly Earnings:</span>
                          <span className="text-white font-mono">
                            {lendAmount
                              ? (
                                  (Number.parseFloat(lendAmount) * Number.parseFloat(selectedPool.apy)) /
                                  100 /
                                  12
                                ).toFixed(6)
                              : "0.000000"}{" "}
                            BTC
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Minimum Deposit:</span>
                          <span className="text-white font-mono">{selectedPool.minDeposit} BTC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-neutral-700">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">Lend Bitcoin</Button>
                <Button
                  variant="outline"
                  className="border-neutral-700 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 bg-transparent"
                >
                  View Pool Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
