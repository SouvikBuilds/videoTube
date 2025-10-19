const API_KEY = "AIzaSyAnMcbvWGYALmQ3qf2h2CyfhYAX-fTvaNY";

export const valueConverter = (value) => {
  if (value >= 1000000) {
    return Math.floor(value / 1000000) + "M";
  } else if (value > 1000) {
    return Math.floor(value / 1000) + "K";
  } else {
    return value;
  }
};

export default API_KEY;
