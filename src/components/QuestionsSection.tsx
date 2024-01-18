import textData from 'mock-data/text'

const ACCORDION_NAME = 'QuestionsSection'

export default function QuestionsSection() {
  const { questions } = textData

  return (
    <section className="prose max-w-prose mb-4">
      <h2 className="font-title text-4xl tracking-wide">
        Frequently Asked Questions
      </h2>
      {questions.map(({ question, answer }) => (
        <div class="collapse collapse-arrow font-body" key={question}>
          <input type="radio" name={ACCORDION_NAME} />
          <div class="collapse-title text-xl font-medium">{question}</div>
          <div class="collapse-content">
            <p>{answer}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
