export const convertMask = (v) => {
  const result = v.split("").map((item, index) => {
    if (index < v.length - 2 && index > 1) {
      return "X";
    }

    return item;
  });

  return result.join("");
};
