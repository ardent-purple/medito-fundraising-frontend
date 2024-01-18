import { createRef } from 'preact'
import ReCAPTCHA from 'react-google-recaptcha'

const RECAPTCHA_SITE_KEY = '6LdqqU8pAAAAABKZr7HI84xZSRaYXo9o548RAVRH'
const RECAPTCHA_SIZE = 'invisible'

export default function FeedbackForm() {
  const captchaRef = createRef<ReCAPTCHA>()

  return (
    <section className="prose max-w-prose mb-4">
      <h2 className="font-title text-4xl tracking-wide ">
        Still have questions? Contact us!
      </h2>
      <form
        className="card card-bordered flex flex-col bg-secondary-content p-6"
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
          <div className="label">
            <span className="label-text ">What is your name?</span>
          </div>
          <input
            name="name"
            type="text"
            required
            placeholder="Your name"
            className="input input-bordered input-primary w-full "
          />
        </label>
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text ">What is your e-mail?</span>
          </div>
          <input
            type="email"
            required
            name="email"
            placeholder="Your email"
            className="input input-bordered input-primary w-full"
          />
        </label>
        <label className="form-control w-full mb-4">
          <div className="label">
            <span className="label-text ">Your question</span>
          </div>
          <textarea
            name="question"
            className="textarea textarea-primary textarea-bordered h-24 "
            placeholder="Your question"
            required
          ></textarea>
        </label>
        <ReCAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          ref={captchaRef}
          size={RECAPTCHA_SIZE}
        />
        <button type="submit" className="btn btn-primary w-full text-xl">
          Submit
        </button>
      </form>
    </section>
  )
}
