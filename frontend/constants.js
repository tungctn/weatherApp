// export const API_KEY = "46a9246bebba16d42b36aac3fc3ba8af";
// export const API_KEY = "4d469d165109399aabceaf38db39bb65";
// export const API_KEY = "728b0ee6df5687559812bd3169ad77d7";
export const API_KEY = "c598de62108b5c93a8212f54dc4b2fe0";
// api key 1: 46a9246bebba16d42b36aac3fc3ba8af
// api key for dev: 4d469d165109399aabceaf38db39bb65
export const convertCelsiusToFahrenheit = (celsius) => {
  return ((celsius * 9) / 5 + 32).toFixed(1);
};

export const convertCelsiusToKelvin = (celsius) => {
  return (celsius + 273.15).toFixed(1);
};

// convert km/h to m/s
export const convertKmToMs = (km) => {
  return (km / 3.6).toFixed(2);
};

// convert km/h to mph
export const convertKmToMph = (km) => {
  return (km / 1.609).toFixed(2);
};

// convert mbar to atm
export const convertMbarToAtm = (mbar) => {
  return (mbar / 1013.25).toFixed(2);
};
