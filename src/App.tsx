import textData from 'mock-data/text-data'

export default function () {
  const { title, description } = textData

  const { companyRaised, companyRequired } = {
    companyRaised: 2450,
    companyRequired: 10000,
  }
  const companyRaisedPercentage = (
    (companyRaised / companyRequired) *
    100
  ).toFixed(1)

  return (
    <div className="container p-8">
      <section className="prose max-w-prose">
        <h1 className="font-title text-6xl mb-4 tracking-wide ">{title}</h1>
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
          <p className="font-body text-lg mb-2 last:mb-0 ">
            {paragraph.trim()}
          </p>
        ))}
      </section>
    </div>
  )
}
