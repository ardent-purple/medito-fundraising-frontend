import financeData from 'mock-data/finance-data'
import getPercentage from 'helpers/getPercentage'
import textData from 'mock-data/text-data'

export default function InfoSection() {
  const { title, description } = textData

  const { companyRaised, companyRequired } = financeData
  const companyRaisedPercentage = getPercentage(companyRaised, companyRequired)

  return (
    <section className="prose max-w-prose mb-4">
      <h1 className="font-title text-6xl tracking-wide">{title}</h1>
      <div className="flex items-center font-body font-medium text-xl">
        <div className="flex flex-col">
          <span>{companyRaised}$</span>
          <span>{companyRaisedPercentage}%</span>
        </div>
        <progress
          className="progress progress-primary mx-2"
          value={companyRaised}
          max={companyRequired}
        ></progress>
        <span className="">{companyRequired}$</span>
      </div>
      {description.split('\n').map((paragraph) => (
        <p key={paragraph} className="font-body text-lg mb-2 last:mb-0 ">
          {paragraph.trim()}
        </p>
      ))}
    </section>
  )
}
