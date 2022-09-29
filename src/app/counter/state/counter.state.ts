export interface CounterState{
    counter: number;
    channelName: string;
}

export const initialState : CounterState = {
    counter: 6,
    channelName: 'The Code Base'
}