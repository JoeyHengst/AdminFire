import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp(functions.config().firebase);

/// Organize cloud functions based on logical roles
import * as notes from './notes';

/// Export functions you want deployed
export const onNoteCreated = notes.onNoteCreated;