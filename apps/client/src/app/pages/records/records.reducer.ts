import * as actions from './records.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

// Main data interface
export interface Record {
    id?: string;
    title?: string;
    content?: string;
    label?: string[];
    image: string;    
    date?: Date;
    type?: string;
    archived?: boolean;
    pending_removal?: boolean;  
  }


// Entity adapter
export const recordAdapter = createEntityAdapter<Record>();
export interface State extends EntityState<Record> { }


// Default data / initial state

const defaultRecord = {
    ids: ['123'],
    entities: {
        '123': {
            id: '123',
            size: 'small'
        }
    }
}

export const initialState: State = recordAdapter.getInitialState();

// Reducer

export function recordReducer(
    state: State = initialState,
    action: actions.RecordsActions) {

    switch (action.type) {

        case actions.ADD_ALL:
            return recordAdapter.addAll(action.records, state);
        

        default:
            return state;
        }

}

// Create the default selectors

export const getRecordState = createFeatureSelector<State>('record');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = recordAdapter.getSelectors(getRecordState);


