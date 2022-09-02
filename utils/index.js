/**
 * 时间格式化
 * @param {number} ms 剩余倒计时的时间，单位ms
 * @return {Array} ['hour:min:sec', 'day']
 */
export const formatTime = (ms) => {
  if (ms < 0) return ['00:00:00']
  const t = ms / 1000
  let sec = parseInt(t % 60, 10)
  let m = parseInt((t / 60) % 60, 10)
  const ho = parseInt(t / 60 / 60, 10)
  let h = parseInt(ho % 24, 10)
  const d = parseInt(ho / 24, 10)

  sec = sec >= 10 ? sec : `0${sec}`
  m = m >= 10 ? m : `0${m}`
  h = h >= 10 ? h : `0${h}`
  return d === 0 ? [`${h}:${m}:${sec}`] : [`${h}:${m}:${sec}`, `${d}`]
}
