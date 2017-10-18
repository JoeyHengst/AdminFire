import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as algoliasearch  from 'algoliasearch';
const ALGOLIA_ID = functions.config().algolia.appid;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.adminkey;
const ALGOLIA_INDEX_NAME = "notes";
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
// Update the search index every time a note is written.
export const onNoteCreated = functions.firestore.document("notes/{noteId}").onCreate(event => {
    // Get the note document
    const note = event.data.data();

    // Add an "objectID" field which Algolia requires
    note.objectID = event.params.postId;

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(note);
});
