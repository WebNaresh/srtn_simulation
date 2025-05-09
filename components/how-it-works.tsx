"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "@/components/motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function HowItWorks() {
  const [step, setStep] = useState(1)

  const steps = [
    {
      title: "1. Processes arrive",
      description: "Multiple processes arrive at different times, each with its own burst time (execution time).",
      visual: (
        <div className="relative h-64 bg-slate-50 rounded-lg p-4 border">
          <div className="absolute top-4 left-0 w-full flex justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-slate-500 mb-1">Timeline</div>
              <div className="flex items-center justify-center">
                {[0, 1, 2, 3, 4, 5].map((time) => (
                  <div key={time} className="flex flex-col items-center mx-4">
                    <div className="h-4 border-l border-slate-300"></div>
                    <div className="text-xs font-medium text-slate-600">{time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-0 w-full">
            <div className="flex justify-around">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-purple-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2">
                  P1
                </div>
                <div className="text-xs text-slate-600">
                  <div>Arrival: 0</div>
                  <div>Burst: 8</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2">
                  P2
                </div>
                <div className="text-xs text-slate-600">
                  <div>Arrival: 1</div>
                  <div>Burst: 4</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-cyan-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2">
                  P3
                </div>
                <div className="text-xs text-slate-600">
                  <div>Arrival: 2</div>
                  <div>Burst: 2</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2. CPU executes P1",
      description: "The CPU starts executing the first process (P1) that arrives at time 0.",
      visual: (
        <div className="relative h-64 bg-slate-50 rounded-lg p-4 border">
          <div className="absolute top-4 left-0 w-full flex justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-slate-500 mb-1">Timeline</div>
              <div className="flex items-center justify-center">
                {[0, 1, 2, 3, 4, 5].map((time) => (
                  <div key={time} className="flex flex-col items-center mx-4">
                    <div className="h-4 border-l border-slate-300"></div>
                    <div className="text-xs font-medium text-slate-600">{time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-blue-200"
            >
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">CPU</div>
                <div className="mt-2 px-3 py-1 bg-purple-100 rounded-full text-purple-700 text-sm">Running P1</div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-0 w-full">
            <div className="flex justify-around">
              <motion.div
                animate={{ y: [0, -20, 0], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-purple-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2 border-2 border-yellow-400">
                  P1
                </div>
                <div className="text-xs text-slate-600">
                  <div>Remaining: 7</div>
                </div>
              </motion.div>

              <div className="flex flex-col items-center opacity-50">
                <div className="w-16 h-16 bg-blue-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2">
                  P2
                </div>
                <div className="text-xs text-slate-600">
                  <div>Not arrived</div>
                </div>
              </div>

              <div className="flex flex-col items-center opacity-50">
                <div className="w-16 h-16 bg-cyan-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2">
                  P3
                </div>
                <div className="text-xs text-slate-600">
                  <div>Not arrived</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "3. P2 arrives with shorter remaining time",
      description:
        "At time 1, P2 arrives with a burst time of 4. Since P1's remaining time (7) is greater than P2's burst time (4), the CPU switches to P2.",
      visual: (
        <div className="relative h-64 bg-slate-50 rounded-lg p-4 border">
          <div className="absolute top-4 left-0 w-full flex justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-slate-500 mb-1">Timeline</div>
              <div className="flex items-center justify-center">
                {[0, 1, 2, 3, 4, 5].map((time) => (
                  <div key={time} className="flex flex-col items-center mx-4">
                    <div
                      className={`h-4 border-l ${time === 1 ? "border-red-400 border-l-2" : "border-slate-300"}`}
                    ></div>
                    <div className={`text-xs font-medium ${time === 1 ? "text-red-500" : "text-slate-600"}`}>
                      {time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div className="w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-blue-200">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">CPU</div>
                <motion.div
                  initial={{ backgroundColor: "#EDE9FE", color: "#6D28D9" }}
                  animate={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 px-3 py-1 rounded-full text-sm"
                >
                  Switching to P2
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-0 w-full">
            <div className="flex justify-around">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2">
                  P1
                </div>
                <div className="text-xs text-slate-600">
                  <div>Remaining: 7</div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -20, 0], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2 border-2 border-yellow-400">
                  P2
                </div>
                <div className="text-xs text-slate-600">
                  <div>Burst: 4</div>
                  <div className="text-green-600 font-medium">Shorter!</div>
                </div>
              </motion.div>

              <div className="flex flex-col items-center opacity-50">
                <div className="w-16 h-16 bg-cyan-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2">
                  P3
                </div>
                <div className="text-xs text-slate-600">
                  <div>Not arrived</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "4. P3 arrives with even shorter time",
      description:
        "At time 2, P3 arrives with a burst time of 2. Since this is shorter than P2's remaining time (3), the CPU switches to P3.",
      visual: (
        <div className="relative h-64 bg-slate-50 rounded-lg p-4 border">
          <div className="absolute top-4 left-0 w-full flex justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-slate-500 mb-1">Timeline</div>
              <div className="flex items-center justify-center">
                {[0, 1, 2, 3, 4, 5].map((time) => (
                  <div key={time} className="flex flex-col items-center mx-4">
                    <div
                      className={`h-4 border-l ${time === 2 ? "border-red-400 border-l-2" : "border-slate-300"}`}
                    ></div>
                    <div className={`text-xs font-medium ${time === 2 ? "text-red-500" : "text-slate-600"}`}>
                      {time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div className="w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-blue-200">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">CPU</div>
                <motion.div
                  initial={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                  animate={{ backgroundColor: "#ECFDF5", color: "#0D9488" }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 px-3 py-1 rounded-full text-sm"
                >
                  Switching to P3
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-0 w-full">
            <div className="flex justify-around">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2">
                  P1
                </div>
                <div className="text-xs text-slate-600">
                  <div>Remaining: 7</div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2">
                  P2
                </div>
                <div className="text-xs text-slate-600">
                  <div>Remaining: 3</div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -20, 0], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-cyan-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2 border-2 border-yellow-400">
                  P3
                </div>
                <div className="text-xs text-slate-600">
                  <div>Burst: 2</div>
                  <div className="text-green-600 font-medium">Shortest!</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "5. Complete the shortest process first",
      description:
        "P3 completes execution at time 4. The CPU then switches to the process with the next shortest remaining time, which is P2.",
      visual: (
        <div className="relative h-64 bg-slate-50 rounded-lg p-4 border">
          <div className="absolute top-4 left-0 w-full flex justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-slate-500 mb-1">Timeline</div>
              <div className="flex items-center justify-center">
                {[0, 1, 2, 3, 4, 5].map((time) => (
                  <div key={time} className="flex flex-col items-center mx-4">
                    <div
                      className={`h-4 border-l ${time === 4 ? "border-green-400 border-l-2" : "border-slate-300"}`}
                    ></div>
                    <div className={`text-xs font-medium ${time === 4 ? "text-green-500" : "text-slate-600"}`}>
                      {time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div className="w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-blue-200">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">CPU</div>
                <motion.div
                  initial={{ backgroundColor: "#ECFDF5", color: "#0D9488" }}
                  animate={{ backgroundColor: "#DBEAFE", color: "#2563EB" }}
                  transition={{ duration: 0.5 }}
                  className="mt-2 px-3 py-1 rounded-full text-sm"
                >
                  Switching to P2
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-4 left-0 w-full">
            <div className="flex justify-around">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2">
                  P1
                </div>
                <div className="text-xs text-slate-600">
                  <div>Remaining: 7</div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -20, 0], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2 border-2 border-yellow-400">
                  P2
                </div>
                <div className="text-xs text-slate-600">
                  <div>Remaining: 3</div>
                  <div className="text-green-600 font-medium">Next shortest!</div>
                </div>
              </motion.div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-cyan-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold mb-2 opacity-50">
                  P3
                </div>
                <div className="text-xs text-green-600 font-medium">Completed!</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "6. Continue with remaining processes",
      description:
        "After P2 completes, P1 (with the longest burst time) gets the CPU until it completes. The algorithm always prioritizes the process with the shortest remaining time.",
      visual: (
        <div className="relative h-64 bg-slate-50 rounded-lg p-4 border">
          <div className="absolute top-4 left-0 w-full flex justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-slate-500 mb-1">Final Gantt Chart</div>
              <div className="flex h-12 w-full max-w-md mt-2 rounded-md overflow-hidden">
                <div className="bg-purple-500 w-1/12 flex items-center justify-center text-white text-xs">P1</div>
                <div className="bg-blue-500 w-3/12 flex items-center justify-center text-white text-xs">P2</div>
                <div className="bg-cyan-500 w-2/12 flex items-center justify-center text-white text-xs">P3</div>
                <div className="bg-blue-500 w-3/12 flex items-center justify-center text-white text-xs">P2</div>
                <div className="bg-purple-500 w-7/12 flex items-center justify-center text-white text-xs">P1</div>
              </div>
              <div className="flex max-w-md mt-1 justify-between px-2">
                <div className="text-xs">0</div>
                <div className="text-xs">1</div>
                <div className="text-xs">2</div>
                <div className="text-xs">4</div>
                <div className="text-xs">7</div>
                <div className="text-xs">14</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-0 w-full">
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-sm font-semibold text-slate-700 mb-2">Results</h4>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="font-medium text-purple-700">P1</div>
                    <div>Turnaround: 14</div>
                    <div>Waiting: 6</div>
                  </div>
                  <div>
                    <div className="font-medium text-blue-700">P2</div>
                    <div>Turnaround: 6</div>
                    <div>Waiting: 2</div>
                  </div>
                  <div>
                    <div className="font-medium text-cyan-700">P3</div>
                    <div>Turnaround: 2</div>
                    <div>Waiting: 0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12"
    >
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>How SRTN Works: Step-by-Step</span>
            <div className="text-sm font-normal text-slate-500">
              Step {step} of {steps.length}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{steps[step - 1].title}</h3>
            <p className="text-slate-600">{steps[step - 1].description}</p>
          </div>

          {steps[step - 1].visual}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              onClick={() => setStep(Math.min(steps.length, step + 1))}
              disabled={step === steps.length}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
