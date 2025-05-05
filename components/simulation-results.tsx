import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, BarChart2 } from "lucide-react"
import { motion } from "@/components/motion"

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
}

export function SimulationResults({ results, avgTurnaround, avgWaiting }: SimulationResultsProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" />
          Simulation Results
        </CardTitle>
        <CardDescription>Detailed results of the SRTN scheduling algorithm simulation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden mb-6">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold">Process ID</TableHead>
                <TableHead className="font-semibold">Arrival Time</TableHead>
                <TableHead className="font-semibold">Burst Time</TableHead>
                <TableHead className="font-semibold">Completion Time</TableHead>
                <TableHead className="font-semibold">Turnaround Time</TableHead>
                <TableHead className="font-semibold">Waiting Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((process, index) => (
                <motion.tr
                  key={process.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b"
                >
                  <TableCell>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold">
                      {process.id}
                    </span>
                  </TableCell>
                  <TableCell>{process.arrival}</TableCell>
                  <TableCell>{process.burst}</TableCell>
                  <TableCell>{process.completion}</TableCell>
                  <TableCell>
                    <span className="font-medium">{process.turnaround}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{process.waiting}</span>
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
            className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-medium text-purple-700">Average Turnaround Time</h3>
            </div>
            <p className="text-3xl font-bold text-purple-800">{avgTurnaround.toFixed(2)}</p>
            <p className="text-sm text-purple-600 mt-2">Average time from arrival to completion for all processes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-blue-700">Average Waiting Time</h3>
            </div>
            <p className="text-3xl font-bold text-blue-800">{avgWaiting.toFixed(2)}</p>
            <p className="text-sm text-blue-600 mt-2">Average time processes spend waiting in the ready queue</p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
