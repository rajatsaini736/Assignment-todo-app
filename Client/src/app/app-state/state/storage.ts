export const getThisState = (stateName: string) => {
  try {
    const serializedState = localStorage.getItem(stateName);

    if (serializedState === null) return undefined;
    
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const getItem = (itemName: string) => {
  const items = getThisState(itemName);

  if (items === undefined) {
    return itemName == 'user' ? { user: undefined } : { tasks: [] }
  }
  return items;
}

export const saveItem = (key: string, data: any) => {
  const serializedState = JSON.stringify(data);
  localStorage.setItem(key, serializedState);
}

export const getItemByKey = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);

    if (serializedState === null) return undefined;
    
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const deleteItemByKey = (key: string) => localStorage.removeItem(key);

export const emptyLocalStorage = (reducerKeys: any) => {
  try {
    if (reducerKeys != undefined && reducerKeys.length) {
      reducerKeys.forEach((key: string) => {
        localStorage.removeItem(key);
      })
    }
  } catch (err) {

  }
}

export const clearStorage = () => localStorage.clear();