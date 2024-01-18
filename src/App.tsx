import FeedbackForm from 'components/FeedbackForm'
import InfoSection from 'components/InfoSection'
import PaymentNotification from 'components/PaymentNotification'
import QuestionsSection from 'components/QuestionsSection'
import RewardSection from 'components/RewardSection'

export default function () {
  return (
    <div className="container p-8 bg-primary-content mx-auto font-body *:mx-auto">
      <InfoSection />

      <QuestionsSection />

      <FeedbackForm />

      <RewardSection />

      <PaymentNotification />
    </div>
  )
}
