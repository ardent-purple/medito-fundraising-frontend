import { forwardRef } from 'preact/compat'
import { useAtom } from 'jotai'
import { useState } from 'preact/hooks'
import Currency from 'types/currency'
import currency from 'atoms/currency'
import donationAmount from 'atoms/donationAmount'

const PAYMENT_LINK_ENDPOINT = 'https://ardent-purple.com:42069/payment-link'

const getPaymentLinkQuery = (amount: number, currency: Currency) =>
  `${PAYMENT_LINK_ENDPOINT}?currency=${currency.toLowerCase()}&amount=${amount * 100}`

const CURRENCIES = Object.values(Currency)

const PaymentForm = forwardRef<HTMLDivElement, unknown>((_, ref) => {
  const [selectedCurrency, setSelectedCurrency] = useAtom(currency)
  const [amount, setAmount] = useAtom(donationAmount)
  const [paymentLinkLoading, setPaymentLinkLoading] = useState(false)

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency)
  }

  const handleFormSubmit = async () => {
    setPaymentLinkLoading(true)

    const paymentLinkQuery = getPaymentLinkQuery(amount, selectedCurrency)
    const paymentLinkResponse = await fetch(paymentLinkQuery)
    const paymentLink = await paymentLinkResponse.text()
    setPaymentLinkLoading(false)
    if (!paymentLink) {
      // TODO: maybe add notification toast?
      return
    }

    window.open(paymentLink, '__blank')
  }

  return (
    <div
      ref={ref}
      className="max-w-prose p-6 card card-bordered shadow-md bg-secondary-content"
    >
      <h2 className="text-3xl font-bold mb-6 font-title tracking-wider mt-0">
        Donation Form
      </h2>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between ">
          {CURRENCIES.map((currency, index) => (
            <button
              type="button"
              key={index}
              className={`btn btn-secondary mb-2 ${selectedCurrency === currency ? 'bg-accent text-accent-content' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                handleCurrencyChange(currency)
              }}
            >
              {currency}
            </button>
          ))}
        </div>

        <input
          type="number"
          className="w-full border px-4 py-2 rounded-md"
          placeholder="Enter amount"
          required
          value={amount}
          onChange={(e) => setAmount(Number(e.currentTarget.value))}
        />

        <button
          type="submit"
          className="w-full btn btn-primary text-2xl"
          disabled={paymentLinkLoading}
          onClick={() => handleFormSubmit()}
        >
          {paymentLinkLoading ? (
            <span class="loading loading-spinner loading-md"></span>
          ) : (
            'Donate'
          )}
        </button>
      </div>
    </div>
  )
})

export default PaymentForm
