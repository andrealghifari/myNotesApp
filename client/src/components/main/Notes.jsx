import React from "react";
import { useEffect, useState } from "react";
import { deleteNote, emptyNote, getAllNotes, saveNotes } from "../../helper/api";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import noteImg from "../../assets/img/write-letter.png";
import Alert from "../alert/Alert";

const Notes = () => {
  const [listNotes, setListNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const handleAddNote = () => {
    const newNote = {
      id: Math.floor(Math.random() * 1000000),
      title: "",
      body: "",
      updated: new Date().toISOString(),
    };
    setListNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  };

  const saveNewNote = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const { title, body } = Object.fromEntries(data);

    if (title && body) {
      const updatedNote = {
        id: currentNoteId,
        title,
        body,
        updated: new Date().toISOString(),
      };
      //update note in the list
      setListNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === currentNoteId ? updatedNote : note
        )
      );

      //save updated data to the server
      saveNotes(updatedNote);

      toast.success("Successfully saved!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error(
        <div>
          Please input <strong>Title</strong> and <strong>Body</strong> of a
          note
        </div>,
        {
          theme: "light",
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  useEffect(() => {
    const data = getAllNotes();
    const sortedData = data.sort(
      (a, b) => new Date(b.updated) - new Date(a.updated)
    );
    setListNotes(sortedData);
    // emptyNote()
  }, []);
  console.log(listNotes);
  console.log(`currentNoteId`, currentNoteId);
  return (
    <div className="notes" id="app">
      <Alert/>
      <div className="notes_sidebar">
        <span className="notes_icon">
          <img src={noteImg} alt="" />
          myNotes.
        </span>
        <button className="notes_add" onClick={handleAddNote}>
          Add a note
        </button>
        <div className="notes_list">
          {listNotes &&
            listNotes.map((note) => (
              <div
                className="notes_list_item notes_list_item--selected"
                key={note.id}
                onClick={() => setCurrentNoteId(note.id)}
              >
                <div className="notes_small_title" name="notes_small_title">
                  {note.title === "" ? "Enter a title." : note.title}
                </div>
                <div className="notes_small_body" name="notes_small_body">
                  {note.body.length > 50
                    ? `${note.body.substring(0, 50)}...`
                    : note.body}
                </div>
                <div className="notes_small_updated" name="notes_small_updated">
                  {format(note.updated, "MMM d yyyy h:mm a")}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="notes_preview">
        {listNotes.length > 0 ? (
          <form onSubmit={saveNewNote}>
            <input
              className="notes_title"
              name="title"
              type="text"
              placeholder="Enter a title."
              defaultValue={
                listNotes.find((note) => note.id === currentNoteId)?.title || ""
              }
            />
            <textarea
              className="notes_body"
              name="body"
              id=""
              placeholder="Share your thoughtful mind.."
              defaultValue={
                listNotes.find((note) => note.id === currentNoteId)?.body || ""
              }
            ></textarea>
            <button className="notes_save" type="submit">
              Save
            </button>
          </form>
        ) : (
          <p style={{ fontSize: "1.5rem" }}>
            No notes available. Click <strong>Add a note</strong> to create one!
          </p>
        )}
      </div>
    </div>
  );
};

export default Notes;
