import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  isThisWeek,
  isToday,
  isYesterday,
} from 'date-fns';

export const withDate = (timestamp: string) => {
  const currentDate = Date.now();
  const timestampDate = Date.parse(timestamp);
  if (isToday(timestampDate)) {
    const seconds = differenceInSeconds(currentDate, timestampDate);
    if (seconds <= 180) return 'Just now';
    const minutes = differenceInMinutes(currentDate, timestampDate);
    if (minutes <= 59) return `${minutes} min ago`;
    const hours = differenceInHours(currentDate, timestampDate);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (isYesterday(timestampDate)) {
    return `Yesterday`;
  }
  if (isThisWeek(timestampDate)) {
    return format(timestampDate, 'iiii, dd MMM');
  }

  return format(timestampDate, 'dd MMM yyyy');
};
