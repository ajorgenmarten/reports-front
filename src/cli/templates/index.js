module.exports = {
    actionText: `
import { {name}State } from "."

export const exampleAction = async (state: {name}State, payload: any) =>  ({ text: payload })
`,

    indexText: `
import * as actions from "./actions";
import { createStore } from "../../libs/store";

export interface {name}State {
    text: string
}

const initialState: {name}State = {
    text: 'example'
}

export const use{name}Store = createStore(initialState, actions, '{name}')
`}