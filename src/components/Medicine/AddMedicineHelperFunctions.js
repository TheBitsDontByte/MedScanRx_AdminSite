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
      .utc().toString();

    allAlerts.push({
      alertDateTime: new Date(nextAlert),
      takenDateTime: null,
      isActive: true
    });
  }

  return allAlerts;
};

// const calculateAlertsStartingTomorrow = ({
//   scheduledAlerts,
//   originalNumberOfDoses,
// }) => {
//   let allAlerts = [];
//   let daysToAdd = 1;
//   let dosesPerDay = scheduledAlerts.length
//   for (let i = 0; i < originalNumberOfDoses; i++) {
//     if (i !== 0 && i % dosesPerDay == 0) daysToAdd++;
//     let nextAlert = moment(scheduledAlerts[i % dosesPerDay])
//       .add(daysToAdd, "day")

//     allAlerts.push({alertDateTime: new Date(nextAlert), takenDateTime: null, isActive: true});
//   }

//   return allAlerts;
// };

export const calculateAlerts = (values, editing) => {
  if (editing) {
    return calculateAlertsStartingToday({
      scheduledAlerts: values.scheduledAlerts,
      originalNumberOfDoses: values.currentNumberOfDoses,
      dosesPerDay: values.dosesPerDay
    });
  }

  return calculateAlertsStartingToday(values);
};
