import { Action } from '@ngrx/store';
import { Record }  from './records.reducer';

export const CREATE     = '[Records] Create'
export const UPDATE     = '[Records] Update'
export const DELETE     = '[Records] Delete'

export const QUERY      = '[Records] Query'
export const ADD_ALL    = '[Records] Add All'
export const SUCCESS    = '[Records] Successful firestore write'

export class Query implements Action {
    readonly type = QUERY;
    constructor(public name: string) { }
}

export class AddAll implements Action {
    readonly type = ADD_ALL;
    constructor(public records: Record[]) { }
}

export class Success implements Action {
    readonly type = SUCCESS;
    constructor() { }
}


export class Create implements Action {
    readonly type = CREATE;
    constructor(public records: Record) { }
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: string,
        public changes: Partial<Record>,
      ) { }
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: string) { }
}

export type RecordsActions
= Create
| Update
| Delete
| Query
| AddAll;