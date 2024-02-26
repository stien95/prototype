import clsx from 'clsx'
import React from 'react'

export default function DividingLine({className}: {className?: string}) {
  return (
    <span className={clsx("w-full h-[2px] bg-gray-300 rounded-full", className)} />
  )
}
