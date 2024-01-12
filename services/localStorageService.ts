enum Key {
  "products",
}

type KeyStrings = keyof typeof Key;

export const saveDataToLocalStorage = (key: KeyStrings, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromLocalStorage = (key: KeyStrings) => {
  const valueFromLocalStorage = localStorage.getItem(key);

  if (valueFromLocalStorage !== null) return JSON.parse(valueFromLocalStorage);
  throw new Error(
    "The value is not present in the localStorage for the provided key"
  );
};

export const removeDataFromLocalStorage = (key) => {
  // Lógica para remover dados do localStorage
};
