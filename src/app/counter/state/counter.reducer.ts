import { createReducer, on } from "@ngrx/store";
import { changeChannelName, customIncrement, decrement, increment, reset } from "./counter.actions";
import { initialState } from './counter.state';

const _counterReducer = createReducer(
    initialState, on(increment, (state) => {
        return {
            ...state,
            counter: state.counter + 1
        }
    }), on(decrement, (state) => {
        let currentstate = state;
        let output = 0;
        if ((state.counter - 1) > 0) {
            output = state.counter - 1
        }
        return {
            ...state,
            counter: output
        }
    }), on(reset, (state) => {
        return {
            ...state,
            counter: 0
        }
    }), on(customIncrement, (state, action) => {
        console.log(action);
        let newState = action.value + state.counter;
        return {
            ...state,
            counter: newState
        }
    }), on(changeChannelName, (state) => {
        let newName = "channel Changed";
        return {
            ...state,
            channelName: newName
        }
    })
);

export function counterReducer(state: any, action: any) {
    return _counterReducer(state, action);
}