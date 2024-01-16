enum Key {
  "products",
}

type KeyStrings = keyof typeof Key;

export const saveDataToLocalStorage = (key: KeyStrings, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromLocalStorage = (key: KeyStrings): never | null => {
  const valueFromLocalStorage = localStorage.getItem(key);

  if (valueFromLocalStorage !== null) return JSON.parse(valueFromLocalStorage);
  return null;
};

// export const removeDataFromLocalStorage = (key) => {
//   // Lógica para remover dados do localStorage
// };
