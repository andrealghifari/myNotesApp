export const getAllNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
  return notes.sort((a, b) => {
    return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
  });
};
export const saveNotes = (noteToSave) => {
  const notes = getAllNotes();
  const existing = notes.find((note) => note.id === noteToSave.id);

  if (existing) {
    existing.title = noteToSave.title;
    existing.body = noteToSave.body;
    existing.updated = new Date().toISOString();
  } else {
    noteToSave.id = Math.floor(Math.random() * 1000000);
    noteToSave.updated = new Date().toISOString();
    notes.push(noteToSave);
  }

  localStorage.setItem("notesapp-notes", JSON.stringify(notes));
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
