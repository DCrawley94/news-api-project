// extract any functions you are using to manipulate your data, into this file

exports.reFormatTimeStamp = (unixNum) => {
  return new Date(unixNum);
};

exports.createRef = (list, key, value) => {
  let lookup = {};

  if (Object.keys(list).length) {
    list.forEach((item) => {
      lookup[item[key]] = item[value];
    });
  }

  return lookup;
};

exports.renameKeys = (list, keyToChange, newKey) => {
  const newList = list.map((listItem) => {
    let newItem = { ...listItem };
    newItem[newKey] = newItem[keyToChange];
    delete newItem[keyToChange];
    return newItem;
  });

  return newList;
};

exports.formatComments = (list, refObj, keyToChange, newKey) => {
  const newList = list.map((listItem) => {
    let newItem = { ...listItem };
    newItem[newKey] = refObj[newItem[keyToChange]];
    delete newItem[keyToChange];
    return newItem;
  });
  return newList;
};
