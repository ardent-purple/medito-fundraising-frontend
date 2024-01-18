import { useAtom } from 'jotai'
import Currency from 'types/currency'
import currency from 'atoms/currency'
import donationAmount from 'atoms/donationAmount'

const CURRENCIES = Object.values(Currency)

export default function PaymentForm() {
  const [selectedCurrency, setSelectedCurrency] = useAtom(currency)
  const [amount, setAmount] = useAtom(donationAmount)

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency)
  }

  return (
    <div className="max-w-xl bg-gray-800 p-8 rounded-md shadow-md font-body">
      <h2 className="text-3xl font-bold text-white mb-6 font-title tracking-wider">
        Payment Form
      </h2>

      <div className="space-y-4">
        <div className="flex space-x-4">
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
          value={amount}
          onChange={(e) => setAmount(Number(e.currentTarget.value))}
        />

        <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
          Donate
        </button>
      </div>
    </div>
  )
}
