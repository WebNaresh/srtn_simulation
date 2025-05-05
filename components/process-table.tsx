"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, List } from "lucide-react"
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
      <Card className="border-dashed border-2 border-slate-200 bg-slate-50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
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
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
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
                  className="border-b"
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
      </CardContent>
    </Card>
  )
}
