import { Dispatch, SetStateAction, useEffect, useState } from "react";
//Typescript translation, dispatch taken from:
//https://github.com/dotClique/project2-it2810/blob/master/src/helpers/hooks.ts
type StorageObject = typeof window.localStorage | typeof window.sessionStorage;
// useStorage, useLocalStorage and useSessionStorage is taken from:
// https://github.com/WebDevSimplified/useful-custom-react-hooks/blob/main/src/8-useStorage/useStorage.js

//Specific for information to be stored in LocalStorage 
 export function useLocalStorage<ValueType>(key: string,defaultValue: ValueType) {
  return useStorage(key, defaultValue, window.localStorage);
}

//Specific for information to be stored in SessionStorage
export function useSessionStorage<ValueType>(key: string, defaultValue: ValueType) {
  return useStorage(key, defaultValue, window.sessionStorage);
}
//Sets the value
function useStorage<ValueType>(key: string, defaultValue: ValueType, storageObject: StorageObject)
:[ValueType, Dispatch<SetStateAction<ValueType>>] {
  const [value, setValue] = useState<ValueType>(() => {
    const jsonvalue = storageObject.getItem(key);
    if (jsonvalue != null) {
      return JSON.parse(jsonvalue);
    }
    else{
    return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  return [value, setValue];
}


