import { useAtom } from 'jotai'
import formatNumber from 'helpers/formatNumber'
import userCount from 'atoms/userCount'

export default function () {
  const [fetchedUserCount] = useAtom(userCount)
  return (
    <p className="font-body">User count: {formatNumber(fetchedUserCount)}</p>
  )
}
