import { Card } from "@/components/ui/card"
import { Users, BookOpen, GraduationCap } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-12 mb-6">
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
                <Users className="h-5 w-5 text-purple-600" />
                Group Members
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  Deepanjali Ishte
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Komal Ghadage
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                  Vivek Bhos
                </li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Project Details
              </h3>
              <ul className="space-y-2 text-slate-700">
                <li>FYMCA</li>
                <li>OSCN Project</li>
                <li>Operating Systems Concepts</li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800 mb-3">
                <GraduationCap className="h-5 w-5 text-cyan-600" />
                Project Guide
              </h3>
              <p className="text-slate-700">Professor Bhide Sir</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} SRTN Scheduling Algorithm Simulator</p>
          </div>
        </div>
      </Card>
    </footer>
  )
}
