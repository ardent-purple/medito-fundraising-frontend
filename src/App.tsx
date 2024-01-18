import DonationButton from 'components/DonationButton'
import FeedbackForm from 'components/FeedbackForm'
import InfoSection from 'components/InfoSection'
import PaymentForm from 'components/PaymentForm'
import PaymentNotification from 'components/PaymentNotification'
import QuestionsSection from 'components/QuestionsSection'
import RewardSection from 'components/RewardSection'

import { createRef } from 'preact'

export default function () {
  const paymentFormRef = createRef<HTMLDivElement>()

  const handleScrollToPaymentForm = () =>
    paymentFormRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="container p-8 bg-primary-content mx-auto font-body *:mx-auto">
      <InfoSection paymentForm={<PaymentForm ref={paymentFormRef} />} />

      <div class="divider divider-primary max-w-prose"></div>

      <QuestionsSection />

      <FeedbackForm />

      <div class="divider divider-primary max-w-prose"></div>

      <RewardSection handleScrollToPaymentForm={handleScrollToPaymentForm} />

      <DonationButton
        targetRef={paymentFormRef}
        handleScrollToPaymentForm={handleScrollToPaymentForm}
      />

      <PaymentNotification />
    </div>
  )
}
