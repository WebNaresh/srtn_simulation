import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Info, Clock, Cpu, ArrowRight, Users, BookOpen, GraduationCap } from "lucide-react"

interface AlgorithmExplanationProps {
  presentationMode?: boolean
}

export function AlgorithmExplanation({ presentationMode = false }: AlgorithmExplanationProps) {
  const textClass = presentationMode ? "text-lg" : ""

  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          About SRTN Algorithm
        </CardTitle>
        <CardDescription>Understanding the Shortest Remaining Time Next scheduling algorithm</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Project Team Information */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border">
          <h3
            className={`text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2 ${presentationMode ? "text-2xl" : ""}`}
          >
            <Users className="h-5 w-5 text-purple-600" />
            Project Team
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4
                className={`font-medium text-purple-700 mb-2 flex items-center gap-1 ${presentationMode ? "text-xl" : ""}`}
              >
                <Users className="h-4 w-4" />
                Group Members
              </h4>
              <ul className="space-y-2">
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-purple-500">•</span>
                  <span>Deepanjali Ishte</span>
                </li>
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-purple-500">•</span>
                  <span>Komal Ghadage</span>
                </li>
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-purple-500">•</span>
                  <span>Vivek Bhos</span>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className={`font-medium text-blue-700 mb-2 flex items-center gap-1 ${presentationMode ? "text-xl" : ""}`}
              >
                <BookOpen className="h-4 w-4" />
                Project Details
              </h4>
              <ul className="space-y-2">
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-blue-500">•</span>
                  <span>FYMCA</span>
                </li>
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-blue-500">•</span>
                  <span>OSCN Project</span>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className={`font-medium text-cyan-700 mb-2 flex items-center gap-1 ${presentationMode ? "text-xl" : ""}`}
              >
                <GraduationCap className="h-4 w-4" />
                Project Guide
              </h4>
              <ul className="space-y-2">
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-cyan-500">•</span>
                  <span>Mr. Bhide Sir</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
          <h3 className={`text-xl font-semibold text-purple-800 mb-3 ${presentationMode ? "text-2xl" : ""}`}>
            What is SRTN?
          </h3>
          <p className={`text-slate-700 mb-4 ${textClass}`}>
            Shortest Remaining Time Next (SRTN) is a preemptive scheduling algorithm that selects the process with the
            smallest amount of time remaining until completion.
          </p>
          <p className={`text-slate-700 ${textClass}`}>
            SRTN is the preemptive version of the Shortest Job First (SJF) algorithm. It continuously monitors the
            remaining execution time of processes and can preempt the current process if a new process arrives with a
            shorter remaining time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle
                className={`text-blue-700 flex items-center gap-2 ${presentationMode ? "text-xl" : "text-lg"}`}
              >
                <Clock className="h-5 w-5" />
                Key Characteristics
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-3">
                <li className={`flex gap-2 ${textClass}`}>
                  <ArrowRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Preemptive scheduling algorithm</span>
                </li>
                <li className={`flex gap-2 ${textClass}`}>
                  <ArrowRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Prioritizes processes with shortest remaining time</span>
                </li>
                <li className={`flex gap-2 ${textClass}`}>
                  <ArrowRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Minimizes average waiting time</span>
                </li>
                <li className={`flex gap-2 ${textClass}`}>
                  <ArrowRight className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Requires knowledge of burst times in advance</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-purple-100">
            <CardHeader className="bg-purple-50">
              <CardTitle
                className={`text-purple-700 flex items-center gap-2 ${presentationMode ? "text-xl" : "text-lg"}`}
              >
                <Cpu className="h-5 w-5" />
                Algorithm Steps
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ol className={`space-y-3 list-decimal pl-5 ${textClass}`}>
                <li className="pl-2">Sort processes by arrival time</li>
                <li className="pl-2">At each time unit, select the process with the shortest remaining time</li>
                <li className="pl-2">Execute the selected process for one time unit</li>
                <li className="pl-2">
                  If a new process arrives, compare its burst time with the remaining time of the current process
                </li>
                <li className="pl-2">If the new process has a shorter burst time, preempt the current process</li>
                <li className="pl-2">Repeat until all processes are complete</li>
              </ol>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl border">
          <h3 className={`text-xl font-semibold text-slate-800 mb-3 ${presentationMode ? "text-2xl" : ""}`}>
            Advantages & Disadvantages
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4
                className={`font-medium text-green-700 mb-2 flex items-center gap-1 ${presentationMode ? "text-xl" : ""}`}
              >
                <span className="inline-block w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">
                  +
                </span>
                Advantages
              </h4>
              <ul className="space-y-2">
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-green-500">•</span>
                  <span>Minimizes average waiting time</span>
                </li>
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-green-500">•</span>
                  <span>Optimal for minimizing average turnaround time</span>
                </li>
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-green-500">•</span>
                  <span>Responsive to short processes</span>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className={`font-medium text-red-700 mb-2 flex items-center gap-1 ${presentationMode ? "text-xl" : ""}`}
              >
                <span className="inline-block w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-bold">
                  -
                </span>
                Disadvantages
              </h4>
              <ul className="space-y-2">
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-red-500">•</span>
                  <span>Requires knowledge of burst times in advance</span>
                </li>
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-red-500">•</span>
                  <span>Can lead to starvation of longer processes</span>
                </li>
                <li className={`text-slate-700 flex gap-2 ${textClass}`}>
                  <span className="text-red-500">•</span>
                  <span>Overhead due to frequent context switching</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
