import { deleteNote, getAllNotes, saveNotes } from "./api";

const main = () => {
  saveNotes({
    title: "Today's Agenda at Office",
    body: "List of agenda : Learning how to make small notes app integrated with Firebase",
  });
  saveNotes({
    title: "Today's Agenda at Office",
    body: "List of agenda : Fixing bugs and defect",
  });
  saveNotes({
    title: "Today's Agenda at Office",
    body: "List of agenda : Redesign layout for existing app",
  });

  // deleteNote(840153)

  // console.log(getAllNotes());
};

export default main;