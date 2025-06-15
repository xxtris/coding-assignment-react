import { useContext } from 'react';
import { createContext } from 'react';
import { RootStore } from '../stores/rootStore';

const rootStore = new RootStore();
export const StoreContext = createContext(rootStore);

export const useStore = () => useContext(StoreContext);