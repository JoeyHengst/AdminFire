import { noteReducer } from './../pages/notes/notes.reducer';
import { recordReducer } from './../pages/records/records.reducer';
import { ActionReducerMap } from '@ngrx/store';


export const reducers: ActionReducerMap<any> = {
    note: noteReducer,
    record: recordReducer
};