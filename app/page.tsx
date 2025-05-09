import { SRTNSimulator } from "@/components/srtn-simulator"
import { Footer } from "@/components/footer"
import { IntroSection } from "@/components/intro-section"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <div className="inline-block mb-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            FYMCA OSCN Project
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
            SRTN Scheduling Simulator
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Shortest Remaining Time Next (SRTN) is a preemptive scheduling algorithm that selects the process with the
            smallest remaining burst time.
          </p>
        </header>
        <Footer />

        <IntroSection />

        <HowItWorks />

        <SRTNSimulator />

      </div>
    </main>
  )
}
