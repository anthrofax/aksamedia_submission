export function getLocalStorageData(id: string) {
  if (typeof window !== "undefined") {
    try {
      const result = JSON.parse(localStorage.getItem(id) || "null") || "";

      if (!result) throw new Error();

      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  return null;
}

export function addLocalStorageData(id: string, data: unknown): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(id, JSON.stringify(data));
    }
  } catch (err) {
    console.log(err);
  }
}

export function deleteLocalStorageData(id: string): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem(id);
    }
  } catch (err) {
    console.log(err);
  }
}

export const saveProductToLocalStorage = (data: {
  id: number;
  name: string;
  description: string;
}): void => {
  localStorage.setItem("items", JSON.stringify(data));
};
