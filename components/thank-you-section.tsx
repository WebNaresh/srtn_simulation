import { Card, CardContent } from "@/components/ui/card"
import { motion } from "@/components/motion"
import { Heart, ThumbsUp, Award } from "lucide-react"

export function ThankYouSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 py-8"
    >
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-2"></div>
        <CardContent className="p-8">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-6"
            >
              <Heart className="h-8 w-8" />
            </motion.div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
              Thank You!
            </h2>

            <p className="text-slate-600 max-w-2xl mx-auto mb-6 text-lg">
              Thank you for exploring our SRTN Scheduling Algorithm Simulator. We hope this tool has helped you
              understand how the Shortest Remaining Time Next algorithm works.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
                <ThumbsUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800 mb-2">Easy to Use</h3>
                <p className="text-purple-700 text-sm">
                  Designed with simplicity in mind to make learning CPU scheduling algorithms accessible.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm">
                <Award className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800 mb-2">Educational</h3>
                <p className="text-blue-700 text-sm">
                  Visualize and understand complex scheduling concepts through interactive simulations.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-xl border border-cyan-200 shadow-sm">
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="flex justify-center mb-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-600"
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
                </motion.div>
                <h3 className="font-semibold text-cyan-800 mb-2">Engaging</h3>
                <p className="text-cyan-700 text-sm">
                  Interactive elements and visual feedback make learning operating systems concepts fun.
                </p>
              </div>
            </div>

            <div className="mt-10 text-slate-500 text-sm">
              <p>FYMCA OSCN Project | Operating Systems Concepts</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
