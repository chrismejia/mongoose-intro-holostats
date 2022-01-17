function singleNumberCoercer(value) {
  const coercedNum = +value.replace(/,/g, "");

  return coercedNum;
}

modules.export = singleNumberCoercer;
