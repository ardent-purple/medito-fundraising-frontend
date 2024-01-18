import { useAtom } from 'jotai'
import Currency from 'types/currency'
import currency from 'atoms/currency'
import donationAmount from 'atoms/donationAmount'
import donationTiersData from 'mock-data/donation-tiers'

export default function RewardSection() {
  const [, setSelectedCurrency] = useAtom(currency)
  const [, setDonationAmount] = useAtom(donationAmount)

  const handleDonateClick = (amount: number) => {
    setDonationAmount(amount)
    setSelectedCurrency(Currency.USD)
  }

  return (
    <div className="max-w-2xl p-4 font-body">
      <h2 className="text-3xl font-bold mb-4 font-title tracking-wider">
        Donation Rewards
      </h2>
      {donationTiersData.map((tier, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded mb-4">
          <h3 className="text-xl font-semibold mb-2">{tier.tier}</h3>
          <p className="text-gray-600 mb-4">{tier.description}</p>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => handleDonateClick(tier.donation)}
          >
            Donate ${tier.donation}
          </button>
        </div>
      ))}
    </div>
  )
}
