export const parseDayFromDate = (date_param) =>{
  var res = "";
  switch (date_param.getDay()) {
    case 1:
      res = "Monday";
      break;
    case 2:
      res = "Tuesday";
      break;
    case 3:
      res = "Wednesday";
      break;
    case 4:
      res = "Thursday";
      break;
    case 5:
      res = "Friday";
      break;
    case 6:
      res = "Saturday";
      break;
    case 0:
      res = "Sunday";
      break;
    default:
      res = "all";
  }
  return res;
}