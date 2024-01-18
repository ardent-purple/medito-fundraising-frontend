import FeedbackForm from 'components/FeedbackForm'
import InfoSection from 'components/InfoSection'
import PaymentForm from 'components/PaymentForm'
import QuestionsSection from 'components/QuestionsSection'
import RewardSection from 'components/RewardSection'

export default function () {
  return (
    <div className="container p-8 bg-slate-900">
      <InfoSection />

      <QuestionsSection />

      <FeedbackForm />

      <PaymentForm />

      <RewardSection />
    </div>
  )
}
