import { useAtom } from 'jotai'
import { useState } from 'preact/hooks'
import Currency from 'types/currency'
import currency from 'atoms/currency'
import donationAmount from 'atoms/donationAmount'

const PAYMENT_LINK_ENDPOINT = 'https://ardent-purple.com:42069/payment-link'

const getPaymentLinkQuery = (amount: number, currency: Currency) =>
  `${PAYMENT_LINK_ENDPOINT}?currency=${currency.toLowerCase()}&amount=${amount * 100}`

const CURRENCIES = Object.values(Currency)

export default function PaymentForm() {
  const [selectedCurrency, setSelectedCurrency] = useAtom(currency)
  const [amount, setAmount] = useAtom(donationAmount)
  const [paymentLinkLoading, setPaymentLinkLoading] = useState(false)

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency)
  }

  return (
    <form
      className="max-w-xl bg-gray-800 p-8 rounded-md shadow-md font-body"
      onSubmit={async (e) => {
        e.preventDefault()

        if (!amount) {
          return
        }

        setPaymentLinkLoading(true)

        const paymentLinkQuery = getPaymentLinkQuery(amount, selectedCurrency)
        console.log(paymentLinkQuery)
        const paymentLinkResponse = await fetch(paymentLinkQuery)
        const paymentLink = await paymentLinkResponse.text()
        setPaymentLinkLoading(false)
        if (!paymentLink) {
          // TODO: maybe add notification toast?
          return
        }

        window.open(paymentLink, '__blank')
      }}
    >
      <h2 className="text-3xl font-bold text-white mb-6 font-title tracking-wider">
        Donation Form
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <h4>Currency:</h4>
          {CURRENCIES.map((currency, index) => (
            <button
              key={index}
              className={`border px-4 py-2 rounded-md ${
                selectedCurrency === currency
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-700 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200'
              }`}
              onClick={() => handleCurrencyChange(currency)}
            >
              {currency}
            </button>
          ))}
        </div>

        <input
          type="number"
          className="w-full border px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter amount"
          required
          value={amount}
          onChange={(e) => setAmount(Number(e.currentTarget.value))}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          disabled={paymentLinkLoading}
        >
          {paymentLinkLoading ? (
            <span class="loading loading-spinner loading-md"></span>
          ) : (
            'Donate'
          )}
        </button>
      </div>
    </form>
  )
}
