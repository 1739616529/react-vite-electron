
import rootStore, { RootStore } from "./module/Root";
import { createContext, useContext } from "react";
export interface Stores {
	RootStore: RootStore
}
function createAppStore(): Stores {
    return {
        RootStore: rootStore
    };
}

const appStores = createAppStore();

const StoreContext = createContext( appStores );

const getStores = () => useContext( StoreContext );

const useStore = () => {
    return getStores();
};

export { appStores, useStore, StoreContext };