import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function formatUTC(utsString: string, format?: 'YYYY-MM-DD HH:mm:ss') {
  const resultTime = dayjs.utc(utsString).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
  return resultTime
}
