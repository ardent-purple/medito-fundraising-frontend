import { Suspense } from 'preact/compat'
import UserCount from 'components/UserCount'

export default function () {
  return (
    <div className="">
      <h1 className="font-title">Frontend template</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <UserCount />
      </Suspense>
    </div>
  )
}
