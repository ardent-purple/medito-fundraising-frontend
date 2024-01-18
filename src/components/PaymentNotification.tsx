import { useEffect, useRef, useState } from 'preact/hooks'
import Currency from 'types/currency'
import asyncDelay from 'helpers/asyncDelay'

const POLLING_DELAY = 7000
const TOAST_DELAY = 1500

const CURRENCIES = Object.values(Currency)

interface INotification {
  amount: number
  currency: Currency
}

// replace with real API calls
function mockFetchPaymentNotifications() {
  const randomAmount = Math.floor(Math.random() * 2) + 1 // 1-3

  const notificationsArray: INotification[] = []

  for (let i = 0; i < randomAmount; i++) {
    const amount = Math.ceil(Math.random() * 100) // from 1 to 100
    const currencyIndex = Math.floor(Math.random() * CURRENCIES.length)
    const currency = CURRENCIES[currencyIndex]
    notificationsArray.push({
      amount,
      currency,
    })
  }

  return notificationsArray
}

function useNotificationsPolling() {
  const [currentNotifications, setCurrentNotifications] = useState<
    INotification[]
  >([])

  useEffect(() => {
    const startPolling = async () => {
      for (;;) {
        await asyncDelay(POLLING_DELAY)
        const notifications = mockFetchPaymentNotifications()
        setCurrentNotifications(notifications)
      }
    }
    void startPolling()
  }, [])

  return currentNotifications
}

export default function PaymentNotification() {
  const notifications = useNotificationsPolling()
  const [showToast, setShowToast] = useState(Boolean(notifications.length))
  const timeoutRef = useRef<number>()

  useEffect(() => {
    if (notifications.length) {
      clearTimeout(timeoutRef.current)
      setShowToast(true)
      timeoutRef.current = setTimeout(() => setShowToast(false), TOAST_DELAY)
    }
  }, [notifications.length])

  return (
    <div
      className={`toast toast-top toast-center transition-transform  ${showToast ? '' : '-translate-y-full'}`}
    >
      {notifications.map(({ amount, currency }) => (
        <div className="alert alert-success">
          <span>
            New {amount}
            {currency} donation!
          </span>
        </div>
      ))}
    </div>
  )
}
