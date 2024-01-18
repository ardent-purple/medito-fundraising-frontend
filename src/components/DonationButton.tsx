import { RefObject } from 'preact'
import { useEffect, useRef, useState } from 'preact/hooks'

const DonationButton = ({
  targetRef,
  handleScrollToPaymentForm,
}: {
  targetRef: RefObject<HTMLDivElement>
  handleScrollToPaymentForm: () => void
}) => {
  const buttonRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const targetElement = targetRef.current

    const handleScroll = () => {
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect()
        setIsVisible(!(rect.bottom <= window.innerHeight && rect.top >= 0))
      }
    }

    const observer = new IntersectionObserver(handleScroll, { threshold: 1 })

    if (targetElement) {
      observer.observe(targetElement)
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement)
      }
    }
  }, [targetRef])

  return (
    <button
      ref={buttonRef}
      className={`fixed text-body text-xl top-4 right-4 p-4 btn btn-lg btn-wide btn-success rounded-md ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300`}
      onClick={() => handleScrollToPaymentForm()}
    >
      Donate
    </button>
  )
}

export default DonationButton
