import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, BarChart2, HelpCircle } from "lucide-react"
import { motion } from "@/components/motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Process {
  id: string
  arrival: number
  burst: number
  completion?: number
  turnaround?: number
  waiting?: number
}

interface SimulationResultsProps {
  results: Process[]
  avgTurnaround: number
  avgWaiting: number
  presentationMode?: boolean
}

export function SimulationResults({
  results,
  avgTurnaround,
  avgWaiting,
  presentationMode = false,
}: SimulationResultsProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 border-b border-green-100 text-center"
      >
        <span className="text-green-600 font-medium flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-party-popper"
          >
            <path d="M5.8 11.3 2 22l10.7-3.79"></path>
            <path d="M4 3h.01"></path>
            <path d="M22 8h.01"></path>
            <path d="M15 2h.01"></path>
            <path d="M22 20h.01"></path>
            <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10"></path>
            <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17"></path>
            <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7"></path>
            <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z"></path>
          </svg>
          Simulation completed successfully!
        </span>
      </motion.div>

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" />
          Simulation Results
        </CardTitle>
        <CardDescription>Detailed results of the SRTN scheduling algorithm simulation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden mb-6 shadow-sm">
          <Table>
            <TableHeader className="bg-gradient-to-r from-slate-50 to-white">
              <TableRow>
                <TableHead className="font-semibold">Process ID</TableHead>
                <TableHead className="font-semibold">Arrival Time</TableHead>
                <TableHead className="font-semibold">Burst Time</TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center gap-1">
                    Completion Time
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">The time at which the process completes its execution</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center gap-1">
                    Turnaround Time
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            The total time taken from arrival to completion (Completion Time - Arrival Time)
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center gap-1">
                    Waiting Time
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">
                            The time a process waits in the ready queue (Turnaround Time - Burst Time)
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((process, index) => (
                <motion.tr
                  key={process.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b hover:bg-slate-50"
                >
                  <TableCell>
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold ${
                        presentationMode ? "w-10 h-10 text-lg" : ""
                      }`}
                    >
                      {process.id}
                    </span>
                  </TableCell>
                  <TableCell className={presentationMode ? "text-lg" : ""}>{process.arrival}</TableCell>
                  <TableCell className={presentationMode ? "text-lg" : ""}>{process.burst}</TableCell>
                  <TableCell className={presentationMode ? "text-lg" : ""}>{process.completion}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${presentationMode ? "text-lg" : ""}`}>{process.turnaround}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${presentationMode ? "text-lg" : ""}`}>{process.waiting}</span>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className={`font-medium text-purple-700 ${presentationMode ? "text-xl" : "text-lg"}`}>
                Average Turnaround Time
              </h3>
            </div>
            <p className={`font-bold text-purple-800 ${presentationMode ? "text-4xl" : "text-3xl"}`}>
              {avgTurnaround.toFixed(2)}
            </p>
            <p className={`text-purple-600 mt-2 ${presentationMode ? "text-base" : "text-sm"}`}>
              Average time from arrival to completion for all processes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className={`font-medium text-blue-700 ${presentationMode ? "text-xl" : "text-lg"}`}>
                Average Waiting Time
              </h3>
            </div>
            <p className={`font-bold text-blue-800 ${presentationMode ? "text-4xl" : "text-3xl"}`}>
              {avgWaiting.toFixed(2)}
            </p>
            <p className={`text-blue-600 mt-2 ${presentationMode ? "text-base" : "text-sm"}`}>
              Average time processes spend waiting in the ready queue
            </p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
