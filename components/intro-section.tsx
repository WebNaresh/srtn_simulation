"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "@/components/motion"
import { ChevronDown, ExternalLink } from "lucide-react"
import { useState } from "react"

export function IntroSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Animated illustration */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 flex items-center justify-center">
              <div className="relative w-full max-w-sm h-64">
                {/* CPU */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center border-2 border-blue-200"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0px 4px 12px rgba(0, 0, 0, 0.1)",
                      "0px 8px 24px rgba(0, 0, 0, 0.15)",
                      "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CPU
                  </span>
                </motion.div>

                {/* Process 1 */}
                <motion.div
                  className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md flex items-center justify-center text-white font-bold"
                  initial={{ x: -100, y: 0 }}
                  animate={{ x: ["-100%", "50%", "150%"], y: ["0%", "50%", "150%"] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  P1
                  <div className="absolute -bottom-6 text-xs text-purple-700 font-normal">Burst: 8</div>
                </motion.div>

                {/* Process 2 */}
                <motion.div
                  className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md flex items-center justify-center text-white font-bold"
                  initial={{ x: 100, y: 0 }}
                  animate={{ x: ["100%", "0%", "-150%"], y: ["0%", "100%", "50%"] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
                >
                  P2
                  <div className="absolute -bottom-6 text-xs text-blue-700 font-normal">Burst: 4</div>
                </motion.div>

                {/* Process 3 */}
                <motion.div
                  className="absolute bottom-0 left-0 w-18 h-18 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg shadow-md flex items-center justify-center text-white font-bold"
                  initial={{ x: -80, y: 80 }}
                  animate={{ x: ["-80%", "0%", "80%"], y: ["80%", "0%", "-80%"] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
                >
                  P3
                  <div className="absolute -bottom-6 text-xs text-cyan-700 font-normal">Burst: 2</div>
                </motion.div>
              </div>
            </div>

            {/* Right side - Text content */}
            <div className="p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent mb-4">
                What is this project about?
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  This project demonstrates the <strong>Shortest Remaining Time Next (SRTN)</strong> CPU scheduling
                  algorithm, which is used by operating systems to efficiently manage multiple processes competing for
                  CPU time.
                </p>
                <p>
                  SRTN is a <strong>preemptive</strong> scheduling algorithm that always selects the process with the
                  smallest remaining execution time. If a new process arrives with a shorter burst time than the
                  remaining time of the current process, the CPU switches to the new process.
                </p>

                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-slate-700 mt-4">Real-world applications:</h3>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      <li>Time-sharing operating systems where quick response time is important</li>
                      <li>Real-time systems with varying task priorities</li>
                      <li>Interactive systems where user experience depends on quick responses</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-slate-700 mt-4">Why is this important?</h3>
                    <p>
                      Understanding CPU scheduling algorithms helps us design more efficient operating systems and
                      applications. SRTN minimizes the average waiting time for processes, making it optimal for systems
                      where response time is critical.
                    </p>

                   
                  </motion.div>
                )}

                <Button
                  variant="ghost"
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 mt-2 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100"
                >
                  {expanded ? "Show less" : "Learn more"}
                  <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
