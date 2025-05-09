"use client"

import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"

interface ConfettiEffectProps {
  isActive: boolean
  duration?: number
  colors?: string[]
  pieces?: number
}

export function ConfettiEffect({
  isActive,
  duration = 5000,
  colors = ["#8B5CF6", "#3B82F6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"],
  pieces = 500,
}: ConfettiEffectProps) {
  const { width, height } = useWindowSize()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isActive) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isActive, duration])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={pieces}
        gravity={0.2}
        colors={colors}
        tweenDuration={5000}
      />
    </div>
  )
}
