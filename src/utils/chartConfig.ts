export const getChartConfig = (
  data: number[],
  label: string,
  labels?: number[],
  backgroundColor?: string
) => {
  return {
    labels: labels && labels.length > 0 ? labels : getTimeSegments(data.length),
    datasets: [
      {
        label,
        backgroundColor: backgroundColor ?? '#f87979',
        data
      }
    ]
  }
}

const getTimeSegments = (segments: number) => {
  const now = new Date()
  const minutesPerSegment = (24 * 60) / segments
  const times = []

  for (let i = segments - 1; i >= 0; i--) {
    const segmentTime = new Date(now.getTime() - i * minutesPerSegment * 60000)

    const hours = segmentTime.getHours().toString().padStart(2, '0')
    const minutes = segmentTime.getMinutes().toString().padStart(2, '0')

    times.push(`${hours}:${minutes}`)
  }

  return times
}
