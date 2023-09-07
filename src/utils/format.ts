import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC(unix: number, format?: 'YYYY-MM-DD HH:mm:ss') {
  const resultTime = dayjs.unix(unix).format('YYYY-MM-DD HH:mm:ss')
  return resultTime
}
