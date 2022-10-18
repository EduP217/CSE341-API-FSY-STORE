const addTimeToDateAfterDate = (date, qtyTime, typeTime) => {
  if (typeTime === "D") {
    date += qtyTime * 24 * 60 * 60 * 1000;
  }

  return date;
};

module.exports = {
  addTimeToDateAfterDate,
};
