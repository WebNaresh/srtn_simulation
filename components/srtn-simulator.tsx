"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Play, RefreshCw, Plus, Info, Clock, Cpu } from "lucide-react"
import { GanttChart } from "@/components/gantt-chart"
import { ProcessTable } from "@/components/process-table"
import { SimulationResults } from "@/components/simulation-results"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlgorithmExplanation } from "@/components/algorithm-explanation"
import { motion } from "@/components/motion"

interface Process {
  id: string
  arrival: number
  burst: number
  remaining?: number
  completion?: number
  turnaround?: number
  waiting?: number
}

interface GanttItem {
  pid: string
  start: number
  end: number
}

export function SRTNSimulator() {
  const [processes, setProcesses] = useState<Process[]>([])
  const [arrivalTime, setArrivalTime] = useState("")
  const [burstTime, setBurstTime] = useState("")
  const [results, setResults] = useState<Process[]>([])
  const [ganttChart, setGanttChart] = useState<GanttItem[]>([])
  const [avgTurnaround, setAvgTurnaround] = useState<number | null>(null)
  const [avgWaiting, setAvgWaiting] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("input")
  const [isSimulating, setIsSimulating] = useState(false)

  // Add sample processes for demo
  const addSampleProcesses = () => {
    const sampleProcesses: Process[] = [
      { id: "P1", arrival: 0, burst: 8 },
      { id: "P2", arrival: 1, burst: 4 },
      { id: "P3", arrival: 2, burst: 9 },
      { id: "P4", arrival: 3, burst: 5 },
    ]
    setProcesses(sampleProcesses)
  }

  const addProcess = () => {
    try {
      const arrival = Number.parseInt(arrivalTime)
      const burst = Number.parseInt(burstTime)

      if (isNaN(arrival) || isNaN(burst)) {
        throw new Error("Please enter valid numbers")
      }

      if (arrival < 0 || burst <= 0) {
        throw new Error("Arrival time must be ≥ 0 and burst time must be > 0")
      }

      const newProcess: Process = {
        id: `P${processes.length + 1}`,
        arrival,
        burst,
      }

      setProcesses([...processes, newProcess])
      setArrivalTime("")
      setBurstTime("")
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const resetAll = () => {
    setProcesses([])
    setResults([])
    setGanttChart([])
    setAvgTurnaround(null)
    setAvgWaiting(null)
    setError(null)
    setActiveTab("input")
  }

  const removeProcess = (index: number) => {
    const updatedProcesses = [...processes]
    updatedProcesses.splice(index, 1)

    // Reassign process IDs
    const renamedProcesses = updatedProcesses.map((p, idx) => ({
      ...p,
      id: `P${idx + 1}`,
    }))

    setProcesses(renamedProcesses)
  }

  const runSimulation = () => {
    if (processes.length === 0) {
      setError("Please add processes first")
      return
    }

    setIsSimulating(true)

    // Sort processes by arrival time
    const sortedProcesses = [...processes].sort((a, b) => a.arrival - b.arrival)

    // Create a copy for simulation
    const simulationProcesses = sortedProcesses.map((p) => ({
      ...p,
      remaining: p.burst,
    }))

    const remainingTime: Record<string, number> = {}
    const completionTime: Record<string, number> = {}

    simulationProcesses.forEach((p) => {
      remainingTime[p.id] = p.burst
    })

    let time = 0
    let complete = 0
    const ganttChart: GanttItem[] = []

    while (complete < simulationProcesses.length) {
      // Find processes that have arrived and still have remaining time
      const readyProcesses = simulationProcesses.filter((p) => p.arrival <= time && remainingTime[p.id] > 0)

      if (readyProcesses.length > 0) {
        // Sort by remaining time
        readyProcesses.sort((a, b) => remainingTime[a.id] - remainingTime[b.id])

        const currentProcess = readyProcesses[0]

        // Add to Gantt chart or extend last entry
        if (ganttChart.length === 0 || ganttChart[ganttChart.length - 1].pid !== currentProcess.id) {
          ganttChart.push({
            pid: currentProcess.id,
            start: time,
            end: time + 1,
          })
        } else {
          ganttChart[ganttChart.length - 1].end = time + 1
        }

        // Decrement remaining time
        remainingTime[currentProcess.id]--

        // Check if process is complete
        if (remainingTime[currentProcess.id] === 0) {
          completionTime[currentProcess.id] = time + 1
          complete++
        }
      } else {
        // CPU idle
        if (ganttChart.length === 0 || ganttChart[ganttChart.length - 1].pid !== "Idle") {
          ganttChart.push({
            pid: "Idle",
            start: time,
            end: time + 1,
          })
        } else {
          ganttChart[ganttChart.length - 1].end = time + 1
        }
      }

      time++
    }

    // Calculate turnaround and waiting times
    const results = simulationProcesses.map((p) => {
      const completion = completionTime[p.id]
      const turnaround = completion - p.arrival
      const waiting = turnaround - p.burst

      return {
        ...p,
        completion,
        turnaround,
        waiting,
      }
    })

    // Calculate averages
    const totalTurnaround = results.reduce((sum, p) => sum + (p.turnaround || 0), 0)
    const totalWaiting = results.reduce((sum, p) => sum + (p.waiting || 0), 0)
    const avgTurnaround = totalTurnaround / results.length
    const avgWaiting = totalWaiting / results.length

    // Simulate a delay for animation purposes
    setTimeout(() => {
      setResults(results)
      setGanttChart(ganttChart)
      setAvgTurnaround(avgTurnaround)
      setAvgWaiting(avgWaiting)
      setError(null)
      setActiveTab("results")
      setIsSimulating(false)
    }, 800)
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="space-y-8">
      {error && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="input" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Process Input</span>
            <span className="sm:hidden">Input</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span className="hidden sm:inline">Simulation Results</span>
            <span className="sm:hidden">Results</span>
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">About SRTN</span>
            <span className="sm:hidden">About</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add Process
                </CardTitle>
                <CardDescription>Enter the arrival time and burst time for each process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 items-end">
                  <div>
                    <Label htmlFor="arrival-time" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Arrival Time
                    </Label>
                    <Input
                      id="arrival-time"
                      type="number"
                      min="0"
                      value={arrivalTime}
                      onChange={(e) => setArrivalTime(e.target.value)}
                      className="w-24 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="burst-time" className="flex items-center gap-1">
                      <Cpu className="h-4 w-4" />
                      Burst Time
                    </Label>
                    <Input
                      id="burst-time"
                      type="number"
                      min="1"
                      value={burstTime}
                      onChange={(e) => setBurstTime(e.target.value)}
                      className="w-24 mt-1"
                    />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={addProcess}
                      className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Process
                    </Button>
                    <Button variant="outline" onClick={resetAll}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset All
                    </Button>
                    <Button variant="secondary" onClick={addSampleProcesses}>
                      Load Sample Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ProcessTable processes={processes} onRemove={removeProcess} />
          </motion.div>

          {processes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mt-8"
            >
              <Button
                size="lg"
                onClick={runSimulation}
                disabled={processes.length === 0 || isSimulating}
                className="px-8 py-6 text-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 shadow-lg transition-all hover:shadow-xl"
              >
                {isSimulating ? (
                  <>
                    <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Simulating...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Run SRTN Simulation
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {results.length > 0 ? (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <SimulationResults results={results} avgTurnaround={avgTurnaround || 0} avgWaiting={avgWaiting || 0} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <GanttChart data={ganttChart} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mt-8"
              >
                <Button variant="outline" size="lg" onClick={() => setActiveTab("input")} className="px-8">
                  Back to Input
                </Button>
              </motion.div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <Cpu className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-medium text-slate-700 mb-2">No Simulation Results</h3>
              <p className="text-slate-500 mb-6">Run a simulation to see the results here</p>
              <Button onClick={() => setActiveTab("input")}>Go to Process Input</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="about">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <AlgorithmExplanation />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
