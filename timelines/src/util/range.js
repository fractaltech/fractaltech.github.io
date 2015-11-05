app('util.range', () => {
  return function (start, cutoff) {
    if (cutoff === undefined) {
      cutoff = start;
      start = 0;
    }

    const range = [];
    for (let i=start;i<cutoff;i++) {
      range.push(i);
    }

    return range;
  }
});