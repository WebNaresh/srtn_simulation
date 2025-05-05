"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { motion } from "@/components/motion"
import { Clock } from "lucide-react"

interface GanttItem {
  pid: string
  start: number
  end: number
}

interface GanttChartProps {
  data: GanttItem[]
}

export function GanttChart({ data }: GanttChartProps) {
  const [totalTime, setTotalTime] = useState(0)
  const [colors, setColors] = useState<Record<string, string>>({})
  const [gradients, setGradients] = useState<Record<string, string>>({})

  useEffect(() => {
    // Find the maximum end time
    const maxEnd = Math.max(...data.map((item) => item.end))
    setTotalTime(maxEnd)

    // Generate colors for each process
    const uniqueProcesses = Array.from(new Set(data.map((item) => item.pid)))
    const colorMap: Record<string, string> = {}
    const gradientMap: Record<string, string> = {}

    const colorPalette = [
      { bg: "bg-purple-500", gradient: "from-purple-500 to-purple-600" },
      { bg: "bg-blue-500", gradient: "from-blue-500 to-blue-600" },
      { bg: "bg-cyan-500", gradient: "from-cyan-500 to-cyan-600" },
      { bg: "bg-emerald-500", gradient: "from-emerald-500 to-emerald-600" },
      { bg: "bg-amber-500", gradient: "from-amber-500 to-amber-600" },
      { bg: "bg-rose-500", gradient: "from-rose-500 to-rose-600" },
      { bg: "bg-indigo-500", gradient: "from-indigo-500 to-indigo-600" },
      { bg: "bg-pink-500", gradient: "from-pink-500 to-pink-600" },
    ]

    uniqueProcesses.forEach((pid, index) => {
      if (pid === "Idle") {
        colorMap[pid] = "bg-gray-300"
        gradientMap[pid] = "from-gray-300 to-gray-400"
      } else {
        const colorIndex = index % colorPalette.length
        colorMap[pid] = colorPalette[colorIndex].bg
        gradientMap[pid] = colorPalette[colorIndex].gradient
      }
    })

    setColors(colorMap)
    setGradients(gradientMap)
  }, [data])

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Gantt Chart
        </CardTitle>
        <CardDescription>Visual representation of process execution over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-20 mb-8 rounded-md overflow-hidden border">
          <div className="absolute inset-0 flex">
            {data.map((item, index) => {
              const width = ((item.end - item.start) / totalTime) * 100
              const left = (item.start / totalTime) * 100

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100%" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`absolute h-full flex items-center justify-center text-white font-medium border-r border-white bg-gradient-to-r ${gradients[item.pid]}`}
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                  }}
                >
                  <span className="drop-shadow-md">{item.pid}</span>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="relative h-8 mb-8">
          <div className="absolute inset-0 flex">
            {Array.from({ length: totalTime + 1 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="absolute h-full flex flex-col items-center"
                style={{ left: `${(index / totalTime) * 100}%` }}
              >
                <div className="h-3 border-l border-slate-400"></div>
                <div className="text-xs font-medium text-slate-600">{index}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-slate-50 p-4 rounded-lg border">
          <h3 className="text-sm font-medium mb-3">Legend:</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(colors).map(([pid, color]) => (
              <div key={pid} className="flex items-center">
                <div className={`w-5 h-5 mr-2 rounded-md ${color}`}></div>
                <span className="text-sm font-medium">{pid}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
