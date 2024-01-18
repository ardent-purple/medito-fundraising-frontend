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
    <div className="prose max-w-prose font-body">
      <h2 className="text-3xl font-bold  font-title tracking-wider">
        Donation Rewards
      </h2>
      {donationTiersData.map((tier, index) => (
        <div key={index} className="border border-gray-300 p-4 rounded mb-4">
          <h4 className="text-xl lg:text-2xl font-semibold my-0 mb-2">
            {tier.tier}
          </h4>
          <p className="border-l-8 border-l-primary mb-4 pl-4 text-l lg:text-xl">
            {tier.description}
          </p>
          <button
            className=" btn btn-primary text-xl lg:text-2xl py-2 px-4 rounded w-full"
            onClick={() => handleDonateClick(tier.donation)}
          >
            Donate ${tier.donation}
          </button>
        </div>
      ))}
    </div>
  )
}
