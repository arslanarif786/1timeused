export const getPersistentData = (key, minutes) => {
  const storedData = localStorage.getItem(key);
  const lastLoadedTime = localStorage.getItem(key + '_loaded_time');
  const validLoadedTime = minutes * 60 * 1000;

  if (storedData && lastLoadedTime && (Date.now() - lastLoadedTime) < validLoadedTime) {
    return JSON.parse(storedData);
  }

  return null;
}

export const persistData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(key + '_loaded_time', Date.now());
}


