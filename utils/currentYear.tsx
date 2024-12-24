import moment from "moment";

const getCurrentYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  if (month >= 0 && month <= 6) {
    return `${year - 1}2`;
  }
  if (month >= 7 && month <= 9) {
    return `${year - 1}3`;
  }
  return `${year}1`;
};
export const semesterYear = getCurrentYear();

export const getDateByWeek = (
  week: number,
  year: number,
  dayOfWeek: number
) => {
  const date = moment()
    .year(year)
    .week(week)
    .startOf("week")
    .add(dayOfWeek - 1, "days");

  return new Date(date.format("YYYY-MM-DD"));
};
