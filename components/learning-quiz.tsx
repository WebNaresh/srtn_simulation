"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "@/components/motion"
import { CheckCircle, XCircle, HelpCircle, Award, RotateCcw } from "lucide-react"
import confetti from "canvas-confetti"

interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export function LearningQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const questions: Question[] = [
    {
      id: 1,
      text: "What does SRTN stand for?",
      options: [
        "Shortest Run Time Next",
        "Shortest Remaining Time Next",
        "System Response Time Network",
        "Scheduled Runtime Node",
      ],
      correctAnswer: 1,
      explanation:
        "SRTN stands for Shortest Remaining Time Next. It's a preemptive scheduling algorithm that prioritizes processes with the shortest remaining time to completion.",
    },
    {
      id: 2,
      text: "Which of the following is NOT a characteristic of the SRTN algorithm?",
      options: [
        "It is preemptive",
        "It minimizes average waiting time",
        "It guarantees fairness to all processes",
        "It requires knowledge of burst times",
      ],
      correctAnswer: 2,
      explanation:
        "SRTN does not guarantee fairness to all processes. In fact, longer processes may experience starvation if shorter processes keep arriving.",
    },
    {
      id: 3,
      text: "What happens in SRTN when a new process arrives with a burst time shorter than the remaining time of the currently running process?",
      options: [
        "The new process waits until the current process completes",
        "The current process is preempted and the new process starts executing",
        "Both processes execute simultaneously using time-sharing",
        "The scheduler randomly selects which process to run",
      ],
      correctAnswer: 1,
      explanation:
        "In SRTN, if a new process arrives with a burst time shorter than the remaining time of the currently running process, the current process is preempted (interrupted) and the new process starts executing.",
    },
    {
      id: 4,
      text: "Which of these algorithms is SRTN most closely related to?",
      options: [
        "First-Come, First-Served (FCFS)",
        "Round Robin (RR)",
        "Shortest Job First (SJF)",
        "Priority Scheduling",
      ],
      correctAnswer: 2,
      explanation:
        "SRTN is the preemptive version of Shortest Job First (SJF). While SJF selects the process with the shortest burst time but doesn't preempt, SRTN will preempt the current process if a new process arrives with a shorter remaining time.",
    },
    {
      id: 5,
      text: "What is the main disadvantage of the SRTN algorithm?",
      options: [
        "High implementation complexity",
        "Poor CPU utilization",
        "Requires knowledge of burst times in advance",
        "Cannot handle I/O-bound processes",
      ],
      correctAnswer: 2,
      explanation:
        "The main disadvantage of SRTN is that it requires knowledge of burst times in advance, which is often difficult to predict accurately in real systems.",
    },
  ]

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return
    setSelectedOption(optionIndex)
  }

  const handleCheckAnswer = () => {
    if (selectedOption === null) return

    setIsAnswered(true)
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setQuizCompleted(true)
      // Trigger confetti if score is good
      if (score >= 3) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const question = questions[currentQuestion]

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
            <HelpCircle className="h-5 w-5" />
            Test Your Knowledge
          </CardTitle>
          <CardDescription>Take this quiz to test your understanding of the SRTN scheduling algorithm</CardDescription>
        </CardHeader>
        <CardContent>
          {!quizCompleted ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-slate-500">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <div className="text-sm font-medium text-slate-500">Score: {score}</div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-6">{question.text}</h3>

                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: isAnswered ? 1 : 1.01 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedOption === index
                          ? isAnswered
                            ? index === question.correctAnswer
                              ? "bg-green-50 border-green-200"
                              : "bg-red-50 border-red-200"
                            : "bg-purple-50 border-purple-200"
                          : "bg-white hover:bg-slate-50"
                      }`}
                      onClick={() => handleOptionSelect(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm ${
                              selectedOption === index
                                ? isAnswered
                                  ? index === question.correctAnswer
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                  : "bg-purple-500"
                                : "bg-slate-200"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="text-slate-700">{option}</span>
                        </div>

                        {isAnswered && index === question.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                        {isAnswered && selectedOption === index && index !== question.correctAnswer && (
                          <XCircle className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className={`mt-6 p-4 rounded-lg ${
                      selectedOption === question.correctAnswer
                        ? "bg-green-50 border border-green-200"
                        : "bg-amber-50 border border-amber-200"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {selectedOption === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <HelpCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4
                          className={`font-medium mb-1 ${
                            selectedOption === question.correctAnswer ? "text-green-700" : "text-amber-700"
                          }`}
                        >
                          {selectedOption === question.correctAnswer ? "Correct!" : "Explanation:"}
                        </h4>
                        <p
                          className={`text-sm ${
                            selectedOption === question.correctAnswer ? "text-green-600" : "text-amber-600"
                          }`}
                        >
                          {question.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="flex justify-between">
                {!isAnswered ? (
                  <Button
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-6">
                <Award className="h-10 w-10" />
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-2">Quiz Completed!</h3>
              <p className="text-slate-600 mb-6">
                You scored {score} out of {questions.length}
              </p>

              <div className="w-full max-w-md mx-auto h-4 bg-slate-100 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{ width: `${(score / questions.length) * 100}%` }}
                ></div>
              </div>

              <div className="bg-white p-6 rounded-lg border shadow-sm mb-8">
                <h4 className="font-medium text-slate-700 mb-3">Your Performance:</h4>
                <div className="text-center">
                  {score === questions.length && (
                    <p className="text-green-600 font-medium">Perfect! You're an SRTN expert!</p>
                  )}
                  {score >= questions.length * 0.7 && score < questions.length && (
                    <p className="text-blue-600 font-medium">Great job! You have a solid understanding of SRTN.</p>
                  )}
                  {score >= questions.length * 0.4 && score < questions.length * 0.7 && (
                    <p className="text-amber-600 font-medium">
                      Good effort! You understand the basics but might want to review some concepts.
                    </p>
                  )}
                  {score < questions.length * 0.4 && (
                    <p className="text-red-600 font-medium">
                      You might want to review the SRTN algorithm concepts again.
                    </p>
                  )}
                </div>
              </div>

              <Button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Take Quiz Again
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
