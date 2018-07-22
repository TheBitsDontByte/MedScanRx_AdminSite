import moment from "moment";

const calculateAlertsStartingToday = ({
  scheduledAlerts,
  originalNumberOfDoses,
  dosesPerDay
}) => {
  let allAlerts = [];
  let startingIndex = -1;
  for (let i = 0; i < scheduledAlerts.length; i++) {
    if (moment(scheduledAlerts[i]).isAfter(moment())) {
      startingIndex = i;
      break;
    }
  }

  //Ughhhhhhh on this TODO cleanup refactor
  let daysToAdd = startingIndex >= 0 ? 0 : 1;
  let loopCounter =
    startingIndex >= 0
      ? +startingIndex + +originalNumberOfDoses
      : originalNumberOfDoses;
  startingIndex = startingIndex >= 0 ? startingIndex : 0;

  for (let i = startingIndex; i < loopCounter; i++) {
    if (i !== 0 && i % dosesPerDay == 0) daysToAdd++;
    let nextAlert = moment(scheduledAlerts[i % dosesPerDay])
      .add(daysToAdd, "day")
      .format("YYYYMMDD HH:mm:ss");

    allAlerts.push(nextAlert);
  }

  return allAlerts;
};

const calculateAlertsStartingTomorrow = ({
  scheduledAlerts,
  originalNumberOfDoses,
}) => {
  let allAlerts = [];
  let daysToAdd = 1;
  let dosesPerDay = scheduledAlerts.length
console.log("tommorow values", scheduledAlerts, originalNumberOfDoses, dosesPerDay)
  for (let i = 0; i < originalNumberOfDoses; i++) {
    if (i !== 0 && i % dosesPerDay == 0) daysToAdd++;
    let nextAlert = moment(scheduledAlerts[i % dosesPerDay])
      .add(daysToAdd, "day")
      .format("YYYYMMDD HH:mm:ss");

    allAlerts.push(nextAlert);
  }

  return allAlerts;
};

export const calculateAlerts = (values, editing) => {
  if (editing) {
    return values.startDay === "today"
      ? calculateAlertsStartingToday({
          scheduledAlerts: values.scheduledAlerts,
          originalNumberOfDoses: values.currentNumberOfDoses,
          dosesPerDay: values.dosesPerDay
        })
      : calculateAlertsStartingTomorrow({
          scheduledAlerts: values.scheduledAlerts,
          originalNumberOfDoses: values.currentNumberOfDoses,
          dosesPerDay: values.dosesPerDay
        });
  }

  return values.startDay === "today"
    ? calculateAlertsStartingToday(values)
    : calculateAlertsStartingTomorrow(values);
};
