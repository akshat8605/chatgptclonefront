'use client'
import { createGlobalState } from 'react-hooks-global-state';



const initialState = { 
  auth: null, 
  loading: false, 
 };
const { useGlobalState, setGlobalState } = createGlobalState(initialState);



export { useGlobalState, setGlobalState }

