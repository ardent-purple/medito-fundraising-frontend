import { useEffect, useState } from 'react'
import financeData from 'mock-data/finance'
import getPercentage from 'helpers/getPercentage'

const ANIMATION_DURATION_MS = 1500

export default function Progressbar() {
  const { companyRaised, companyRequired } = financeData

  const [animatedValue, setAnimatedValue] = useState(0)
  const companyRaisedPercentage = getPercentage(animatedValue, companyRequired)

  useEffect(() => {
    let startTime: number | null

    const animateProgressBar = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp
      }

      const progress = Math.min(
        (timestamp - startTime) / ANIMATION_DURATION_MS,
        1
      )
      setAnimatedValue(progress * companyRaised)

      if (progress < 1) {
        requestAnimationFrame(animateProgressBar)
      }
    }

    requestAnimationFrame(animateProgressBar)

    // Clean up function
    return () => {
      startTime = null
    }
  }, [companyRaised])

  return (
    <div className="flex items-center font-body font-medium text-xl">
      <div className="flex flex-col">
        <span>{animatedValue.toFixed(2)}$</span>
        <span>{companyRaisedPercentage}%</span>
      </div>
      <progress
        className={`progress progress-primary mx-2 transition-transform duration-${ANIMATION_DURATION_MS}`}
        value={animatedValue}
        max={companyRequired}
      ></progress>
      <span>{companyRequired}$</span>
    </div>
  )
}
