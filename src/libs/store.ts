import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Funcion generica para crear controlador de estado Zustand
 * @param initialState Estado inicial del almacen
 * @param actions Funciones que estaran disponibles en el dispatch
 * @param storeName Nombre que se le asigna al almacen para guardarlo en localstore
 * @returns 
 */
export function createStore<State, Actions>(initialState: State, actions: Actions, storeName: string) {
    type KeysAction = keyof typeof actions
    interface Dispatch {
        dispatch: (action: KeysAction, payload?: any) => void
    }
    const reducer = async (action: KeysAction, state: State, payload?: any) => {
        return await (actions[action] as CallableFunction)(state, payload)
    }
    return create(
        persist<State & Dispatch>((set, get) => ({
            ...initialState,
            dispatch: async (action, payload) => {
                const newState = await reducer(action, get(), payload)
                return set(newState)
            }
        }), { name: storeName})
    )
}