"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, List, AlertCircle } from "lucide-react"
import { motion } from "@/components/motion"

interface Process {
  id: string
  arrival: number
  burst: number
}

interface ProcessTableProps {
  processes: Process[]
  onRemove: (index: number) => void
}

export function ProcessTable({ processes, onRemove }: ProcessTableProps) {
  if (processes.length === 0) {
    return (
      <Card className="border-dashed border-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-4">
            <List className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-medium text-slate-700 mb-2">No Processes Added</h3>
          <p className="text-slate-500 text-center max-w-md">
            Add processes with arrival and burst times to start the simulation
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5" />
          Process List
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {processes.length} {processes.length === 1 ? "process" : "processes"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden shadow-sm">
          <Table>
            <TableHeader className="bg-gradient-to-r from-slate-50 to-white">
              <TableRow>
                <TableHead className="font-semibold">Process ID</TableHead>
                <TableHead className="font-semibold">Arrival Time</TableHead>
                <TableHead className="font-semibold">Burst Time</TableHead>
                <TableHead className="w-[100px] font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.map((process, index) => (
                <motion.tr
                  key={process.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b hover:bg-slate-50"
                >
                  <TableCell className="font-medium">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold">
                      {process.id}
                    </span>
                  </TableCell>
                  <TableCell>{process.arrival}</TableCell>
                  <TableCell>{process.burst}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        {processes.length > 0 && processes.length < 3 && (
          <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
            <p className="text-sm text-amber-700">
              For a meaningful demonstration of the SRTN algorithm, it's recommended to add at least 3 processes with
              different arrival and burst times.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
