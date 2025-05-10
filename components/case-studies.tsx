"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion } from "@/components/motion"
import { BookOpen, Server, Laptop, Smartphone, Play } from "lucide-react"

interface CaseStudy {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  scenario: string
  processes: Array<{
    id: string
    arrival: number
    burst: number
  }>
  explanation: string
}

export function CaseStudies({ onLoadScenario }: { onLoadScenario: (processes: any[]) => void }) {
  const [activeTab, setActiveTab] = useState("web-server")

  const caseStudies: CaseStudy[] = [
    {
      id: "web-server",
      title: "Web Server Request Handling",
      icon: <Server className="h-5 w-5 text-blue-500" />,
      description: "How a web server might prioritize different types of requests using SRTN",
      scenario:
        "A web server receives various requests: static file serving (quick), API calls (medium), and database queries (longer). SRTN helps ensure quick responses for simple requests.",
      processes: [
        { id: "Static", arrival: 0, burst: 2 },
        { id: "API", arrival: 1, burst: 4 },
        { id: "DB", arrival: 2, burst: 8 },
        { id: "Static", arrival: 3, burst: 1 },
        { id: "API", arrival: 4, burst: 3 },
      ],
      explanation:
        "In this scenario, static file requests are processed quickly, while longer database operations wait. This improves perceived performance as users get quick responses for simple requests.",
    },
    {
      id: "os-tasks",
      title: "Operating System Task Scheduling",
      icon: <Laptop className="h-5 w-5 text-purple-500" />,
      description: "How modern operating systems might use SRTN-like algorithms for task scheduling",
      scenario:
        "An operating system juggles background tasks, user applications, and system processes with different priorities and execution times.",
      processes: [
        { id: "SysProc", arrival: 0, burst: 3 },
        { id: "UserApp", arrival: 1, burst: 6 },
        { id: "BgTask", arrival: 2, burst: 9 },
        { id: "SysProc", arrival: 4, burst: 2 },
        { id: "UserApp", arrival: 5, burst: 4 },
      ],
      explanation:
        "Operating systems use sophisticated scheduling algorithms derived from SRTN to balance system responsiveness with throughput. System processes often get priority but can be preempted by shorter tasks.",
    },
    {
      id: "mobile-app",
      title: "Mobile App Responsiveness",
      icon: <Smartphone className="h-5 w-5 text-emerald-500" />,
      description: "How mobile devices prioritize UI rendering vs background processing",
      scenario:
        "A mobile app needs to handle UI animations (must be quick), data processing, and network operations while maintaining a responsive interface.",
      processes: [
        { id: "UI", arrival: 0, burst: 1 },
        { id: "Data", arrival: 0, burst: 5 },
        { id: "Network", arrival: 2, burst: 7 },
        { id: "UI", arrival: 3, burst: 1 },
        { id: "UI", arrival: 6, burst: 2 },
      ],
      explanation:
        "Mobile devices prioritize UI thread operations to maintain a responsive interface. SRTN-like scheduling ensures animations remain smooth even when background tasks are running.",
    },
  ]

  const activeCase = caseStudies.find((cs) => cs.id === activeTab) || caseStudies[0]

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
            <BookOpen className="h-5 w-5" />
            Real-World Case Studies
          </CardTitle>
          <CardDescription>Explore how SRTN scheduling applies to real-world computing scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              {caseStudies.map((study) => (
                <TabsTrigger
                  key={study.id}
                  value={study.id}
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600"
                >
                  {study.icon}
                  <span className="hidden sm:inline">{study.title}</span>
                  <span className="sm:hidden">{study.id.split("-")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center flex-shrink-0">
                  {activeCase.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">{activeCase.title}</h3>
                  <p className="text-slate-600">{activeCase.description}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-slate-700 mb-2">Scenario:</h4>
                <p className="bg-slate-50 p-4 rounded-lg border text-slate-600">{activeCase.scenario}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-slate-700 mb-2">Process Mix:</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden border">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="py-2 px-4 text-left text-sm font-medium text-slate-700">Process</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-slate-700">Arrival Time</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-slate-700">Burst Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeCase.processes.map((process, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2 px-4 text-sm text-slate-700">{process.id}</td>
                          <td className="py-2 px-4 text-sm text-slate-700">{process.arrival}</td>
                          <td className="py-2 px-4 text-sm text-slate-700">{process.burst}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-slate-700 mb-2">Why SRTN Works Here:</h4>
                <p className="text-slate-600">{activeCase.explanation}</p>
              </div>

              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => onLoadScenario(activeCase.processes)}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Load This Scenario
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
