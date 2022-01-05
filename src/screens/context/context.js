import AsyncStorageLib from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, createContext } from 'react';

export const AppContext = createContext();


export const Provider = (props) => {
  const [cart, setCart] = useState([]);
  const[orderdata,setorderdata]=useState({})
  const[uri,seturi]=useState({})
  const[User,setUser]=useState([])
  
  return (
    <AppContext.Provider value={{item1:[cart, setCart],item2:[orderdata,setorderdata],item3:[uri,seturi]}}>
      {props.children}
    </AppContext.Provider>
  )
}