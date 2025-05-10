import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "@/components/motion"
import { FileText, ExternalLink, BookOpen, Award, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ResearchPaper() {
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
            <FileText className="h-5 w-5" />
            Academic Research & References
          </CardTitle>
          <CardDescription>Explore academic papers and research on CPU scheduling algorithms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Key Research Papers</h3>

              <div className="space-y-6">
                <div className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">A Comparative Study of CPU Scheduling Algorithms</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>2018</span>
                        <span>•</span>
                        <Users className="h-3 w-3" />
                        <span>Johnson et al.</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-2">
                        This paper compares various CPU scheduling algorithms including FCFS, SJF, SRTN, and Round Robin
                        in terms of average waiting time, turnaround time, and CPU utilization.
                      </p>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 h-auto text-purple-600 hover:text-purple-700 mt-2"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Paper
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">
                        Optimizing Response Time in Interactive Systems Using SRTN
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>2020</span>
                        <span>•</span>
                        <Users className="h-3 w-3" />
                        <span>Chen & Rodriguez</span>
                      </div>
                      <p className="text-sm text-slate-600 mt-2">
                        This research explores how SRTN scheduling can be optimized for interactive computing systems to
                        minimize user-perceived latency and improve overall system responsiveness.
                      </p>
                      <Button variant="link" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700 mt-2">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Paper
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Historical Context & Evolution</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">1960s</h4>
                    <p className="text-sm text-slate-600">
                      Early development of scheduling algorithms for mainframe computers. First-Come, First-Served
                      (FCFS) was the predominant approach.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">1970s</h4>
                    <p className="text-sm text-slate-600">
                      Introduction of Shortest Job First (SJF) and its preemptive variant, Shortest Remaining Time Next
                      (SRTN), to optimize process waiting times.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">1980s-1990s</h4>
                    <p className="text-sm text-slate-600">
                      Refinement of scheduling algorithms for time-sharing systems. Round Robin and priority-based
                      scheduling became popular for multi-user environments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">2000s-Present</h4>
                    <p className="text-sm text-slate-600">
                      Modern operating systems use complex hybrid scheduling algorithms that incorporate elements of
                      SRTN, priority scheduling, and fairness considerations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                <h4 className="font-medium text-purple-800 mb-2 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Did You Know?
                </h4>
                <p className="text-sm text-slate-700">
                  SRTN is theoretically optimal for minimizing average waiting time when all jobs are available at the
                  same time. However, in practice, it's often approximated since exact burst times are rarely known in
                  advance.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">Recommended Reading</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-lg border hover:shadow-md transition-shadow">
                <BookOpen className="h-5 w-5 text-purple-600 mb-2" />
                <h4 className="font-medium text-slate-800">Operating System Concepts</h4>
                <p className="text-xs text-slate-500">Silberschatz, Galvin, and Gagne</p>
                <p className="text-sm text-slate-600 mt-2">
                  The classic textbook covering CPU scheduling algorithms in depth.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-lg border hover:shadow-md transition-shadow">
                <BookOpen className="h-5 w-5 text-blue-600 mb-2" />
                <h4 className="font-medium text-slate-800">Modern Operating Systems</h4>
                <p className="text-xs text-slate-500">Andrew S. Tanenbaum</p>
                <p className="text-sm text-slate-600 mt-2">
                  Comprehensive coverage of scheduling algorithms with practical examples.
                </p>
              </div>

              <div className="p-4 bg-gradient-to-br from-slate-50 to-white rounded-lg border hover:shadow-md transition-shadow">
                <BookOpen className="h-5 w-5 text-cyan-600 mb-2" />
                <h4 className="font-medium text-slate-800">Advanced CPU Scheduling Techniques</h4>
                <p className="text-xs text-slate-500">Journal of Computing Systems</p>
                <p className="text-sm text-slate-600 mt-2">
                  Special issue focusing on modern adaptations of classic scheduling algorithms.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
