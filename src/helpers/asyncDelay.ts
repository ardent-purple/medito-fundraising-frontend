export default function asyncDelay(delayMs: number) {
  return new Promise((res) => setTimeout(res, delayMs))
}
