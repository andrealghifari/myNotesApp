import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db } from "../libs/firebase";

export const saveNotes = async (noteToSave, user) => {
  const userNotesRef = doc(db, "notes", user);

  try {
    const docSnapshot = await getDoc(userNotesRef);

    if (!docSnapshot.exists()) {
      return;
    }

    const dataNotes = docSnapshot.data().notes || [];

    const findDataIndex = dataNotes.findIndex(
      (note) => note.noteId === noteToSave.noteId
    );
    if (findDataIndex !== -1) {
      const updatedNotes = dataNotes.map((note) =>
        note.noteId === noteToSave.noteId ? noteToSave : note
      );
      await updateDoc(userNotesRef, { notes: updatedNotes });
    } else {
      await updateDoc(userNotesRef, { notes: arrayUnion({ ...noteToSave }) });
    }
  } catch (error) {
    return { success: false, message: `Error on saving note: ${error}` };
  }
};

export const deleteNote = (id) => {
  const notes = getAllNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);
  localStorage.setItem("notesapp-notes", JSON.stringify(filteredNotes));
};

export const emptyNote = () => {
  const notes = getAllNotes();
  localStorage.removeItem("notesapp-notes");
};
