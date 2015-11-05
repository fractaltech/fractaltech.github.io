app('util.months', () => {
  const range = app('util.range');

  return function (monthStart, monthEnd) {
    if (monthEnd === undefined) {
      monthEnd = monthStart;
    }

    return range(monthStart, monthEnd+1);
  };
});