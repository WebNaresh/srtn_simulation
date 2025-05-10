"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion } from "@/components/motion"
import { BarChart2, PieChart, Activity, Play, Pause, RotateCcw } from "lucide-react"

interface Process {
  id: string
  arrival: number
  burst: number
  remaining?: number
  completion?: number
  turnaround?: number
  waiting?: number
  start?: number
  response?: number
}

interface GanttItem {
  pid: string
  start: number
  end: number
}

export function AdvancedVisualization() {
  const [activeTab, setActiveTab] = useState("timeline")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [maxTime, setMaxTime] = useState(14)
  const [processes, setProcesses] = useState<Process[]>([
    { id: "P1", arrival: 0, burst: 8, start: 0, response: 0, completion: 14, turnaround: 14, waiting: 6 },
    { id: "P2", arrival: 1, burst: 4, start: 1, response: 0, completion: 7, turnaround: 6, waiting: 2 },
    { id: "P3", arrival: 2, burst: 2, start: 2, response: 0, completion: 4, turnaround: 2, waiting: 0 },
  ])
  const [ganttChart, setGanttChart] = useState<GanttItem[]>([
    { pid: "P1", start: 0, end: 1 },
    { pid: "P2", start: 1, end: 2 },
    { pid: "P3", start: 2, end: 4 },
    { pid: "P2", start: 4, end: 7 },
    { pid: "P1", start: 7, end: 14 },
  ])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= maxTime) {
            setIsPlaying(false)
            return maxTime
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, maxTime])

  const resetAnimation = () => {
    setCurrentTime(0)
    setIsPlaying(false)
  }

  const getProcessStateAtTime = (process: Process, time: number): string => {
    // Find if the process is running at this time
    const isRunning = ganttChart.some((item) => item.pid === process.id && item.start <= time && item.end > time)

    if (time < process.arrival) return "Not Arrived"
    if (isRunning) return "Running"
    if (process.completion && time >= process.completion) return "Completed"
    return "Waiting"
  }

  const getProcessColorAtTime = (process: Process, time: number): string => {
    const state = getProcessStateAtTime(process, time)
    if (state === "Not Arrived") return "bg-slate-200 text-slate-500"
    if (state === "Running") return "bg-green-500 text-white"
    if (state === "Completed") return "bg-blue-500 text-white"
    return "bg-amber-400 text-white" // Waiting
  }

  const getProcessRemainingTime = (process: Process, time: number): number => {
    if (time < process.arrival) return process.burst
    if (process.completion && time >= process.completion) return 0

    // Calculate remaining time based on how much has been executed so far
    let executedTime = 0
    ganttChart.forEach((item) => {
      if (item.pid === process.id) {
        const start = Math.min(time, item.end)
        const end = Math.max(item.start, Math.min(time, item.end))
        executedTime += Math.max(0, end - start)
      }
    })
    return process.burst - executedTime
  }

  // Calculate metrics for charts
  const avgWaitingTime = processes.reduce((sum, p) => sum + (p.waiting || 0), 0) / processes.length
  const avgTurnaroundTime = processes.reduce((sum, p) => sum + (p.turnaround || 0), 0) / processes.length
  const avgResponseTime = processes.reduce((sum, p) => sum + (p.response || 0), 0) / processes.length

  const waitingTimeData = processes.map((p) => ({ name: p.id, value: p.waiting || 0 }))
  const turnaroundTimeData = processes.map((p) => ({ name: p.id, value: p.turnaround || 0 }))

  const cpuUtilizationData = [
    {
      name: "CPU Busy",
      value:
        maxTime -
        ganttChart.filter((item) => item.pid === "Idle").reduce((sum, item) => sum + (item.end - item.start), 0),
    },
    {
      name: "CPU Idle",
      value: ganttChart.filter((item) => item.pid === "Idle").reduce((sum, item) => sum + (item.end - item.start), 0),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Advanced Visualization
          </CardTitle>
          <CardDescription>
            Interactive visualizations to better understand the SRTN scheduling algorithm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger
                value="timeline"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
              >
                <Activity className="h-4 w-4" />
                <span>Process Timeline</span>
              </TabsTrigger>
              <TabsTrigger
                value="metrics"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
              >
                <BarChart2 className="h-4 w-4" />
                <span>Performance Metrics</span>
              </TabsTrigger>
              <TabsTrigger
                value="utilization"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
              >
                <PieChart className="h-4 w-4" />
                <span>CPU Utilization</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-6">
              <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-slate-800">Process Timeline Animation</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={resetAnimation} className="flex items-center gap-1">
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </Button>
                    <Button
                      variant={isPlaying ? "destructive" : "default"}
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center gap-1"
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-medium text-slate-500 mb-2">Current Time: {currentTime}</div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: `${(currentTime / maxTime) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-6">
                  {processes.map((process) => (
                    <div key={process.id} className="relative">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center font-medium">
                          {process.id}
                        </div>
                        <div>
                          <div className="font-medium text-slate-800">{process.id}</div>
                          <div className="text-xs text-slate-500">
                            Arrival: {process.arrival} | Burst: {process.burst}
                          </div>
                        </div>
                        <div className="ml-auto text-sm">
                          <span className={`px-2 py-1 rounded-full ${getProcessColorAtTime(process, currentTime)}`}>
                            {getProcessStateAtTime(process, currentTime)}
                          </span>
                        </div>
                        <div className="w-20 text-right text-sm font-medium">
                          Remaining:{" "}
                          <span className="text-blue-600">{getProcessRemainingTime(process, currentTime)}</span>
                        </div>
                      </div>

                      <div className="h-8 bg-slate-100 rounded-md overflow-hidden relative">
                        {/* Timeline markers */}
                        {Array.from({ length: maxTime + 1 }).map((_, i) => (
                          <div
                            key={i}
                            className="absolute h-full border-l border-slate-200"
                            style={{ left: `${(i / maxTime) * 100}%` }}
                          ></div>
                        ))}

                        {/* Process execution blocks */}
                        {ganttChart
                          .filter((item) => item.pid === process.id)
                          .map((item, idx) => (
                            <div
                              key={idx}
                              className={`absolute h-full bg-gradient-to-r from-purple-500 to-blue-500 ${
                                currentTime >= item.start ? "opacity-100" : "opacity-30"
                              }`}
                              style={{
                                left: `${(item.start / maxTime) * 100}%`,
                                width: `${((item.end - item.start) / maxTime) * 100}%`,
                                clipPath:
                                  currentTime > item.start && currentTime < item.end
                                    ? `inset(0 ${
                                        100 - ((currentTime - item.start) / (item.end - item.start)) * 100
                                      }% 0 0)`
                                    : currentTime <= item.start
                                      ? "inset(0 100% 0 0)"
                                      : "inset(0 0 0 0)",
                              }}
                            ></div>
                          ))}

                        {/* Current time marker */}
                        <div
                          className="absolute h-full border-l-2 border-red-500 z-10"
                          style={{ left: `${(currentTime / maxTime) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="text-sm font-medium text-slate-700 mb-2">Timeline Legend:</div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-green-500"></div>
                      <span className="text-sm text-slate-600">Running</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-amber-400"></div>
                      <span className="text-sm text-slate-600">Waiting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
                      <span className="text-sm text-slate-600">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-slate-200"></div>
                      <span className="text-sm text-slate-600">Not Arrived</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-6">Performance Metrics</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-700 mb-1">Average Waiting Time</div>
                    <div className="text-2xl font-bold text-purple-800">{avgWaitingTime.toFixed(2)}</div>
                    <div className="text-xs text-purple-600 mt-1">Time processes spend waiting in the ready queue</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-700 mb-1">Average Turnaround Time</div>
                    <div className="text-2xl font-bold text-blue-800">{avgTurnaroundTime.toFixed(2)}</div>
                    <div className="text-xs text-blue-600 mt-1">Time from arrival to completion for all processes</div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg border border-cyan-200">
                    <div className="text-sm text-cyan-700 mb-1">Average Response Time</div>
                    <div className="text-2xl font-bold text-cyan-800">{avgResponseTime.toFixed(2)}</div>
                    <div className="text-xs text-cyan-600 mt-1">
                      Time from arrival to first CPU burst for all processes
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-slate-700 mb-4">Waiting Time Comparison</h4>
                    <div className="h-64 relative">
                      {waitingTimeData.map((item, index) => (
                        <div key={index} className="flex items-center mb-4">
                          <div className="w-16 text-sm font-medium text-slate-700">{item.name}</div>
                          <div className="flex-1 h-8 bg-slate-100 rounded-md overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.value / 10) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                              className="absolute h-full bg-gradient-to-r from-purple-500 to-purple-600"
                            ></motion.div>
                            <div className="absolute inset-0 flex items-center justify-end pr-2">
                              <span className="text-sm font-medium text-slate-700">{item.value}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-700 mb-4">Turnaround Time Comparison</h4>
                    <div className="h-64 relative">
                      {turnaroundTimeData.map((item, index) => (
                        <div key={index} className="flex items-center mb-4">
                          <div className="w-16 text-sm font-medium text-slate-700">{item.name}</div>
                          <div className="flex-1 h-8 bg-slate-100 rounded-md overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.value / 15) * 100}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                              className="absolute h-full bg-gradient-to-r from-blue-500 to-blue-600"
                            ></motion.div>
                            <div className="absolute inset-0 flex items-center justify-end pr-2">
                              <span className="text-sm font-medium text-slate-700">{item.value}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="utilization" className="space-y-6">
              <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-6">CPU Utilization</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <motion.circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="20" />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          stroke="url(#gradient)"
                          strokeWidth="20"
                          strokeDasharray="251.2"
                          initial={{ strokeDashoffset: 251.2 }}
                          animate={{
                            strokeDashoffset: 251.2 - (cpuUtilizationData[0].value / maxTime) * 251.2,
                          }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          transform="rotate(-90 50 50)"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#3B82F6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold text-slate-800">
                          {Math.round((cpuUtilizationData[0].value / maxTime) * 100)}%
                        </div>
                        <div className="text-sm text-slate-500">CPU Utilization</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-700 mb-4">CPU Time Breakdown</h4>
                    <div className="space-y-4">
                      {cpuUtilizationData.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium text-slate-700">{item.name}</div>
                            <div className="text-sm font-medium text-slate-700">
                              {item.value} units ({Math.round((item.value / maxTime) * 100)}%)
                            </div>
                          </div>
                          <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.value / maxTime) * 100}%` }}
                              transition={{ duration: 1 }}
                              className={`h-full ${
                                index === 0 ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-slate-300"
                              }`}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h5 className="font-medium text-blue-700 mb-2">Process CPU Time Distribution</h5>
                      <div className="space-y-3">
                        {processes.map((process) => {
                          const processTime = ganttChart
                            .filter((item) => item.pid === process.id)
                            .reduce((sum, item) => sum + (item.end - item.start), 0)
                          return (
                            <div key={process.id}>
                              <div className="flex justify-between items-center mb-1">
                                <div className="text-sm text-slate-700">{process.id}</div>
                                <div className="text-sm text-slate-700">
                                  {processTime} units ({Math.round((processTime / maxTime) * 100)}%)
                                </div>
                              </div>
                              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(processTime / maxTime) * 100}%` }}
                                  transition={{ duration: 1 }}
                                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-80"
                                ></motion.div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
