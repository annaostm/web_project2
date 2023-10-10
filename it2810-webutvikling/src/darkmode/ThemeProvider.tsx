import { useEffect, useState, createContext } from "react";

//Using Context API to handle darkmode
type ThemeContext = { dark: boolean; toggleDark: () => void };

export const ThemeContext = createContext<ThemeContext>(
  {} as ThemeContext
);

//On switch, values change depending on the boolean dark value that are passing to ThemeProvider
const ThemeProvider = ({children}:any) => {

    const [dark, setDark] = useState<boolean>(false);

    const toggleDark = () => {
      setDark(prevState => {
        localStorage.setItem("darkmode", JSON.stringify(!prevState))
        return !prevState
      
      });
    }

    useEffect(() => {
      const localStorageDark = JSON.parse(localStorage.getItem("darkmode")!);
      if(localStorageDark){
        setDark(localStorageDark);
      }
    },[])
    
    return (
      <ThemeContext.Provider value={{dark, toggleDark}}>
          {children}
      </ThemeContext.Provider>
    )
  }

export default ThemeProvider





