import * as actions from './notes.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Main data interface
export interface Note {
    id?: string;
    name?: string;
    description?: string;
    label?: string[];
    color?: string;
    date?: Date;
    type?: string;
    archived?: boolean;
    pending_removal?: boolean;  
}


// Entity adapter
export const noteAdapter = createEntityAdapter<Note>();
export interface State extends EntityState<Note> { }


// Default data / initial state

const defaultNote = {
    ids: ['123'],
    entities: {
        '123': {
            id: '123',
            size: 'small'
        }
    }
}

export const initialState: State = noteAdapter.getInitialState();

// Reducer

export function noteReducer(
    state: State = initialState,
    action: actions.NotesActions) {

    switch (action.type) {

        case actions.ADD_ALL:
            return noteAdapter.addAll(action.notes, state);
        

        default:
            return state;
        }

}

// Create the default selectors

export const getNoteState = createFeatureSelector<State>('note');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = noteAdapter.getSelectors(getNoteState);


