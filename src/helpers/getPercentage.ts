export default function getPercentage(
  part: number,
  total: number,
  fractionDigits = 1
) {
  return ((part / total) * 100).toFixed(fractionDigits)
}
