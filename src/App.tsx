import FeedbackForm from 'components/FeedbackForm'
import InfoSection from 'components/InfoSection'
import QuestionsSection from 'components/QuestionsSection'

export default function () {
  return (
    <div className="container p-8 bg-slate-900">
      <InfoSection />

      <QuestionsSection />

      <FeedbackForm />
    </div>
  )
}
