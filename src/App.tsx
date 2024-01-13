import ReCAPTCHA from 'react-google-recaptcha'

import { createRef } from 'preact'
import textData from 'mock-data/text-data'

export default function () {
  const { title, description, questions } = textData

  const { companyRaised, companyRequired } = {
    companyRaised: 2450,
    companyRequired: 10000,
  }
  const companyRaisedPercentage = (
    (companyRaised / companyRequired) *
    100
  ).toFixed(1)

  const captchaRef = createRef<ReCAPTCHA>()

  return (
    <div className="container p-8 bg-slate-900">
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
      <section className="prose max-w-prose mb-4">
        <h2 className="font-title text-4xl tracking-wide">
          Frequently Asked Questions
        </h2>
        {questions.map(({ question, answer }) => (
          <div class="collapse collapse-arrow font-body" key={question}>
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">{question}</div>
            <div class="collapse-content">
              <p>{answer}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="prose max-w-prose mb-4">
        <h2 className="font-title text-4xl tracking-wide">
          Still have questions? Contact us!
        </h2>
        <form
          className="card card-bordered flex flex-col bg-slate-700 p-4"
          onSubmit={async (e) => {
            e.preventDefault()
            if (!captchaRef.current) {
              return
            }
            const token = await captchaRef.current.executeAsync()
            captchaRef.current.render()
            if (!token) {
              // TODO: add toast maybe?
              return
            }
            console.log(token)
            // TODO: add send form logic (backend required)
          }}
        >
          <label className="form-control w-full mb-2">
            <div class="label">
              <span class="label-text">What is your name?</span>
            </div>
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              class="input input-bordered input-primary w-full invalid:border-pink-500 invalid:outline-pink-200"
            />
          </label>
          <label className="form-control w-full  mb-2">
            <div class="label">
              <span class="label-text">What is your e-mail?</span>
            </div>
            <input
              type="email"
              required
              name="email"
              placeholder="Your email"
              class="input input-bordered input-primary w-full invalid:border-pink-500 invalid:outline-pink-200"
            />
          </label>
          <label class="form-control w-full mb-4">
            <div class="label">
              <span class="label-text">Your question</span>
            </div>
            <textarea
              name="question"
              class="textarea textarea-primary textarea-bordered h-24 invalid:border-pink-500 invalid:outline-pink-200"
              placeholder="Your question"
              required
            ></textarea>
          </label>
          <ReCAPTCHA
            sitekey="6LdqqU8pAAAAABKZr7HI84xZSRaYXo9o548RAVRH"
            ref={captchaRef}
            size="invisible"
          />
          <button type="submit" className="btn btn-primary w-full text-xl ">
            Submit
          </button>
        </form>
      </section>
    </div>
  )
}
