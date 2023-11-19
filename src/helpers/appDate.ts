import daysjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedDate from 'dayjs/plugin/localizedFormat';

daysjs.extend(relativeTime);
daysjs.extend(localizedDate);

export const diffForHummans = (timestamp: number): string => {
  return daysjs.unix(timestamp).fromNow();
};

export const humanFriendlyDate = (timestamp: number): string => {
  return daysjs.unix(timestamp).format('MMMM DD, YYYY [at] hh:mm A');
};
