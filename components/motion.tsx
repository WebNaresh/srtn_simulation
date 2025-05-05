"use client"

import { type HTMLMotionProps, motion as framerMotion } from "framer-motion"
import type React from "react"

type MotionProps = HTMLMotionProps<"div"> & {
  children?: React.ReactNode
}

export const motion = {
  div: ({ children, ...props }: MotionProps) => <framerMotion.div {...props}>{children}</framerMotion.div>,
  tr: ({ children, ...props }: HTMLMotionProps<"tr"> & { children?: React.ReactNode }) => (
    <framerMotion.tr {...props}>{children}</framerMotion.tr>
  ),
}
