const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDate = (dateString: string | undefined) => {
  if (dateString === undefined) {
    return "-";
  }
  const d = new Date(dateString);
  const monthName = months[d.getMonth()];
  const date = d.getDate();
  const year = d.getFullYear();

  // 4 Aug 2022

  return `${date} ${monthName} ${year}`;
};
