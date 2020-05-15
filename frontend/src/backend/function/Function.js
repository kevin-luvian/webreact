export const parseDayFromDate = date => {
  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return dayNames[date.getDay()];
};

export const parseMonthFromDate = date => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  return monthNames[date.getMonth()];
};

export const parseMonthToInt = month_str => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  for (let i = 0; i < monthNames.length; i++) {
    if (monthNames[i] === month_str) return i;
  }
  return -1;
};

export const parseDate = date_param => {
  return [
    date_param.getFullYear(),
    ("0" + (date_param.getMonth() + 1)).slice(-2),
    ("0" + date_param.getDate()).slice(-2)
  ].join("-");
};

export const convertToDate = dateStr_param => {
  let date = dateStr_param.split("-");
  return new Date(date[0], parseInt(date[1]) - 1, date[2]);
};

export const compareNum = (a, b) => {
  if (a - b > 0) return 1;
  else if (a - b < 0) return -1;
  return 0;
};

export const dateSort = () => {
  return (a, b) => {
    let aDate = a["date"].split("-");
    let bDate = b["date"].split("-");
    let res = 0;

    // compare year
    res = compareNum(parseInt(aDate[0]), parseInt(bDate[0]));
    if (res === 0) {
      // compare month
      res = compareNum(parseInt(aDate[1]), parseInt(bDate[1]));
      if (res === 0) {
        // compare day
        res = compareNum(parseInt(aDate[2]), parseInt(bDate[2]));
      }
    }
    return res;
  };
};
