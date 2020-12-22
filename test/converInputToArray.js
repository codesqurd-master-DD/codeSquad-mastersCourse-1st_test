const converInputToArray = (text) => {
  const temp_arr = text.split("");
  const result = [];
  for (let i = 0; i < temp_arr.length; i++) {
    if (temp_arr[i] !== "2" && temp_arr[i] !== "'") {
      if (temp_arr[i + 1] === "'") {
        result.push(temp_arr[i] + temp_arr[i + 1]);
      } else if (temp_arr[i + 1] === "2") {
        result.push(temp_arr[i]);
        result.push(temp_arr[i]);
      } else {
        result.push(temp_arr[i]);
      }
    }
  }
  return result;
};
