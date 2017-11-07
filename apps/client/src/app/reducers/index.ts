import { noteReducer } from './../pages/notes/notes.reducer';
import { ActionReducerMap } from '@ngrx/store';


export const reducers: ActionReducerMap<any> = {
    note: noteReducer
};