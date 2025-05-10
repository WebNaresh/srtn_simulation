import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "@/components/motion"
import { BarChart, CheckCircle, XCircle, HelpCircle, ArrowRight } from "lucide-react"

export function AlgorithmComparison() {
  const algorithms = [
    {
      name: "SRTN",
      fullName: "Shortest Remaining Time Next",
      description: "Preemptive version of SJF that selects process with shortest remaining time",
      advantages: [
        "Minimizes average waiting time",
        "Optimal for minimizing average turnaround time",
        "Responsive to short processes",
      ],
      disadvantages: [
        "Requires knowledge of burst times in advance",
        "Can lead to starvation of longer processes",
        "Overhead due to frequent context switching",
      ],
      preemptive: true,
      complexity: "Medium",
      realWorld: "Real-time systems, interactive applications",
      performance: {
        avgWaiting: "Excellent",
        avgTurnaround: "Excellent",
        throughput: "Good",
        cpuUtilization: "Excellent",
        responseTime: "Excellent",
        overhead: "Medium",
        fairness: "Poor",
      },
    },
    {
      name: "FCFS",
      fullName: "First-Come, First-Served",
      description: "Processes are executed in the order they arrive in the ready queue",
      advantages: ["Simple to implement", "No starvation", "Fair in terms of arrival order"],
      disadvantages: [
        "Poor average waiting time",
        "Convoy effect (short processes wait behind long ones)",
        "Not responsive to process characteristics",
      ],
      preemptive: false,
      complexity: "Low",
      realWorld: "Batch processing systems",
      performance: {
        avgWaiting: "Poor",
        avgTurnaround: "Poor",
        throughput: "Poor",
        cpuUtilization: "Medium",
        responseTime: "Poor",
        overhead: "Low",
        fairness: "Medium",
      },
    },
    {
      name: "SJF",
      fullName: "Shortest Job First",
      description: "Non-preemptive algorithm that selects the process with the shortest burst time",
      advantages: [
        "Better average waiting time than FCFS",
        "Optimal for minimizing average waiting time (non-preemptive)",
        "Good for batch systems",
      ],
      disadvantages: [
        "Requires knowledge of burst times in advance",
        "Can lead to starvation of longer processes",
        "Not responsive to new short processes",
      ],
      preemptive: false,
      complexity: "Medium",
      realWorld: "Batch processing with known job lengths",
      performance: {
        avgWaiting: "Good",
        avgTurnaround: "Good",
        throughput: "Good",
        cpuUtilization: "Good",
        responseTime: "Medium",
        overhead: "Low",
        fairness: "Poor",
      },
    },
    {
      name: "RR",
      fullName: "Round Robin",
      description: "Each process gets a small unit of CPU time (time quantum), then is preempted",
      advantages: ["Fair allocation of CPU", "Good for time-sharing systems", "No starvation", "Good response time"],
      disadvantages: [
        "Higher average waiting time than SJF/SRTN",
        "Performance depends on time quantum selection",
        "High context switching overhead",
      ],
      preemptive: true,
      complexity: "Low",
      realWorld: "Time-sharing systems, interactive environments",
      performance: {
        avgWaiting: "Medium",
        avgTurnaround: "Medium",
        throughput: "Medium",
        cpuUtilization: "Good",
        responseTime: "Good",
        overhead: "High",
        fairness: "Excellent",
      },
    },
  ]

  const performanceColors = {
    Excellent: "bg-green-500",
    Good: "bg-emerald-400",
    Medium: "bg-amber-400",
    Poor: "bg-red-400",
    Low: "bg-green-400",
    High: "bg-red-400",
  }

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
            <BarChart className="h-5 w-5" />
            CPU Scheduling Algorithm Comparison
          </CardTitle>
          <CardDescription>
            Compare SRTN with other popular CPU scheduling algorithms to understand its strengths and weaknesses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden border">
              <thead className="bg-gradient-to-r from-slate-100 to-slate-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Algorithm</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Description</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Preemptive</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Key Advantages</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-slate-700">Key Disadvantages</th>
                </tr>
              </thead>
              <tbody>
                {algorithms.map((algo, index) => (
                  <tr key={algo.name} className={`border-t ${algo.name === "SRTN" ? "bg-purple-50" : ""}`}>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{algo.name}</div>
                      <div className="text-xs text-slate-500">{algo.fullName}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600 max-w-[200px]">{algo.description}</td>
                    <td className="py-3 px-4">
                      {algo.preemptive ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                        {algo.advantages.slice(0, 2).map((adv, i) => (
                          <li key={i}>{adv}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4">
                      <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                        {algo.disadvantages.slice(0, 2).map((dis, i) => (
                          <li key={i}>{dis}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold text-slate-800 mt-8 mb-4">Performance Comparison</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {algorithms.map((algo) => (
              <div
                key={`perf-${algo.name}`}
                className={`rounded-lg border p-4 ${
                  algo.name === "SRTN" ? "border-purple-200 bg-purple-50" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                      algo.name === "SRTN" ? "bg-gradient-to-r from-purple-600 to-blue-500" : "bg-slate-600"
                    }`}
                  >
                    {algo.name.charAt(0)}
                  </div>
                  <h4 className="font-medium text-slate-800">{algo.name}</h4>
                </div>

                <div className="space-y-2">
                  {Object.entries(algo.performance).map(([metric, rating]) => (
                    <div key={metric} className="flex items-center text-sm">
                      <div className="w-1/3 text-slate-600 capitalize">{metric.replace(/([A-Z])/g, " $1").trim()}:</div>
                      <div className="w-2/3 flex items-center gap-2">
                        <div
                          className={`h-3 rounded-full ${performanceColors[rating as keyof typeof performanceColors]}`}
                          style={{
                            width:
                              rating === "Excellent"
                                ? "100%"
                                : rating === "Good"
                                  ? "75%"
                                  : rating === "Medium"
                                    ? "50%"
                                    : "25%",
                          }}
                        ></div>
                        <span className="text-xs">{rating}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t text-sm text-slate-600">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                    <span>Best used in: {algo.realWorld}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Why SRTN Stands Out
            </h4>
            <p className="text-slate-700">
              SRTN provides the optimal average turnaround time and waiting time among all scheduling algorithms when
              all processes are available at the same time. It's particularly effective in environments where process
              burst times can be accurately estimated and where minimizing waiting time is critical, such as interactive
              systems and real-time applications with soft deadlines.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
