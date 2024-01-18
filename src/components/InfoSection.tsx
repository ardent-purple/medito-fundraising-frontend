import { ReactNode } from 'preact/compat'
import Progressbar from 'components/Progressbar'
import textData from 'mock-data/text'

interface IProps {
  paymentForm: ReactNode
}

export default function InfoSection({ paymentForm }: IProps) {
  const { title, description } = textData

  return (
    <section className="prose max-w-prose mb-4">
      <h1 className="font-title text-6xl tracking-wide">{title}</h1>

      <Progressbar />

      <div class="divider divider-primary"></div>

      {paymentForm}

      {description.split('\n').map((paragraph) => (
        <p
          key={paragraph}
          className=" text-lg lg:text-xl text-justify mb-2 last:mb-0 "
        >
          {paragraph.trim()}
        </p>
      ))}
    </section>
  )
}
