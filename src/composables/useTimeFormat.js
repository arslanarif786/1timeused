export default function useTimeFormat() {

  const timeDiff = (date) => {

    const timeNow = Date.now()
    const time = new Date(date).getTime()
    const differenceInSeconds = (timeNow - time) / 1000;

    if (differenceInSeconds < 60) {
      return parseInt(differenceInSeconds) + "s ago";
    } else if (differenceInSeconds > 60 && differenceInSeconds < 3600) {
      return parseInt(differenceInSeconds / 60) + "m ago";
    } else if (differenceInSeconds > 3600 && differenceInSeconds < 86400) {
      return parseInt(differenceInSeconds / 3600) + "h ago";
    } else if (differenceInSeconds > 86400) {
      return parseInt(differenceInSeconds / 86400) + "d ago";
    }
  };

  return {
    timeDiff,
  };
}
