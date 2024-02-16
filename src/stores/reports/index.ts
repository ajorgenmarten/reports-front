
import * as actions from "./actions";
import { createStore } from "../../libs/store";

export interface ReportsState {
    text: string
}

const initialState: ReportsState = {
    text: 'before'
}

export const useReportsStore = createStore(initialState, actions, 'Reports')
