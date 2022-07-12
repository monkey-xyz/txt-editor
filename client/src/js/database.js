import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// POST to the database
export const putDb = async (content) => {
  console.log('Code POSTed');
  const jateDb = await openDB('jate', 1);
  const cde = jateDb.transaction('jate', 'readwrite');
  const store = cde.objectStore('jate');
  const request = store.add({ value: content });
  const result = await request;
  console.log('Code implanted', result);
};

// GET All operation for database
export const getDb = async () => {
  console.log('Code GET');
  const jateDb = await openDB('jate', 1);
  const cde = jateDb.transaction('jate', 'readonly');
  const store = cde.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
};

initdb();
