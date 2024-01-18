import Progressbar from 'components/Progressbar'
import textData from 'mock-data/text'

export default function InfoSection() {
  const { title, description } = textData

  return (
    <section className="prose max-w-prose mb-4">
      <h1 className="font-title text-6xl tracking-wide">{title}</h1>

      <Progressbar />

      {description.split('\n').map((paragraph) => (
        <p key={paragraph} className="font-body text-lg mb-2 last:mb-0 ">
          {paragraph.trim()}
        </p>
      ))}
    </section>
  )
}
