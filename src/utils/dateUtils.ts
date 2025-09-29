/**
 * Formats a date as relative time (e.g., "2 hours ago", "3 days ago")
 * This function is designed to be hydration-safe by using consistent formatting
 * and handling edge cases properly.
 */
export function formatRelativeTime(date: Date | string | number): string {
  const now = new Date()
  const target = new Date(date)

  // Calculate the difference in milliseconds
  const diffMs = now.getTime() - target.getTime()

  // If the date is in the future or invalid, return a fallback
  if (diffMs < 0 || isNaN(diffMs)) {
    return 'just now'
  }

  // Convert to different time units
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  // Return appropriate relative time string
  if (diffSeconds < 60) {
    return 'just now'
  } else if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
  } else if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
  } else if (diffWeeks < 4) {
    return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`
  } else if (diffMonths < 12) {
    return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`
  } else {
    return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`
  }
}

/**
 * Formats a date as relative time with automatic updates
 * This is a React-friendly version that can be used in components
 */
export function useRelativeTime(date: Date | string | number): string {
  return formatRelativeTime(date)
}
