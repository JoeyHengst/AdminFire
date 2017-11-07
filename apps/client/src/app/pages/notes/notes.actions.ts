import { Action } from '@ngrx/store';
import { Note }  from './notes.reducer';

export const CREATE     = '[Notes] Create'
export const UPDATE     = '[Notes] Update'
export const DELETE     = '[Notes] Delete'

export const QUERY      = '[Notes] Query'
export const ADD_ALL    = '[Notes] Add All'
export const SUCCESS    = '[Notes] Successful firestore write'

export class Query implements Action {
    readonly type = QUERY;
    constructor() { }
}

export class AddAll implements Action {
    readonly type = ADD_ALL;
    constructor(public notes: Note[]) { }
}

export class Success implements Action {
    readonly type = SUCCESS;
    constructor() { }
}


export class Create implements Action {
    readonly type = CREATE;
    constructor(public notes: Note) { }
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: string,
        public changes: Partial<Note>,
      ) { }
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: string) { }
}

export type NotesActions
= Create
| Update
| Delete
| Query
| AddAll;