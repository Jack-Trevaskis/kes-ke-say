export default function serialiseDate(date: number) {
  const _date = new Date(date)

  const monthString = (month: number) => {
    // Need to move to a separate utility function
    let monthString = ''

    if (month === 1) monthString = 'Jan'
    if (month === 2) monthString = 'Feb'
    if (month === 3) monthString = 'Mar'
    if (month === 4) monthString = 'Apr'
    if (month === 5) monthString = 'May'
    if (month === 6) monthString = 'Jun'
    if (month === 7) monthString = 'Jul'
    if (month === 8) monthString = 'Aug'
    if (month === 9) monthString = 'Sep'
    if (month === 10) monthString = 'Oct'
    if (month === 11) monthString = 'Nov'
    if (month === 12) monthString = 'Dec'

    return monthString
  }

  const hour = _date.getHours()
  const minute = _date.getMinutes()

  const month = _date.getMonth() + 1
  const day = _date.getDate()
  const year = _date.getFullYear()

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentDay = currentDate.getDate()
  const currentYear = currentDate.getFullYear()

  const isThisYear = currentYear === year
  const isToday = currentMonth === month && currentDay === day && isThisYear

  const displayTime = hour + ':' + minute
  const displayDay = isToday ? 'Today' : `${monthString(month)} ${day}`
  const displayYear = isThisYear ? '' : ', ' + year

  return displayDay + displayYear + ' at ' + displayTime
}
