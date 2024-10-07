import React from "react";
import { useEffect, useState } from "react";
import { deleteNote, emptyNote, saveNotes } from "../../helper/api";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import noteImg from "../../assets/img/write-letter.png";
import Alert from "../alert/Alert";
import { toast } from "react-toastify";
import { auth, db } from "../../libs/firebase";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../libs/state/userStore";
import { useNavigate } from "react-router-dom";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Notes = () => {
  const [listNotes, setListNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  const handleAddNote = () => {
    const newNote = {
      noteId: Math.floor(Math.random() * 1000000),
      title: "",
      body: "",
      updated: new Date().toISOString(),
    };
    setListNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.noteId);
  };
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logoutUser());
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  const saveNewNote = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const { title, body } = Object.fromEntries(data);

    if (title && body) {
      const updatedNote = {
        noteId: currentNoteId,
        title,
        body,
        updated: new Date().toISOString(),
      };

      //save updated data to the firestore
      const updatedNotes = saveNotes(updatedNote, currentUser.id);

      console.log(`saved notes: `, updatedNotes);

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
    const unsub = onSnapshot(doc(db, "notes", currentUser.id), async (res) => {
      if (res.exists()) {
        const dataNotes = res.data().notes || [];
        const sortedData = dataNotes.sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
        setListNotes(sortedData);
      } else {
        // console.log("No notes document found for this user");
        setListNotes([]); // Clear the list if no notes are found
      }
    });

    return () => {
      unsub();
    };
  }, [currentUser]);
  // console.log(listNotes);
  // console.log(`currentNoteId`, currentNoteId);
  // console.log(`currentUser: `, currentUser);
  return (
    <div className="notes" id="app">
      <Alert />
      <div className="notes_sidebar">
        <span className="notes_icon">
          <img src={noteImg} alt="" />
          MyNotes.
        </span>
        <div className="notes_welcome">
          <h2>Welcome {currentUser.username} </h2>
          <p>Share the brilliant ideas!</p>
        </div>
        <div className="notes_button">
          <button className="notes_add" onClick={handleAddNote}>
            Add a note
          </button>
          <button className="notes_logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
       
        <div className="notes_list">
          {listNotes &&
            listNotes.map((note) => (
              <div
                className="notes_list_item notes_list_item--selected"
                key={note.noteId}
                onClick={() => setCurrentNoteId(note.noteId)}
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
              value={
                listNotes.find((note) => note.noteId === currentNoteId)
                  ?.title || ""
              }
              onChange={(e) => {
                const updatedTitle = e.target.value;
                setListNotes((prevNotes) =>
                  prevNotes.map((note) =>
                    note.noteId === currentNoteId
                      ? { ...note, title: updatedTitle }
                      : note
                  )
                );
              }}
            />
            <textarea
              className="notes_body"
              name="body"
              placeholder="Share your thoughtful mind.."
              value={
                listNotes.find((note) => note.noteId === currentNoteId)?.body ||
                ""
              }
              onChange={(e) => {
                const updatedBody = e.target.value;
                setListNotes((prevNotes) =>
                  prevNotes.map((note) =>
                    note.noteId === currentNoteId
                      ? { ...note, body: updatedBody }
                      : note
                  )
                );
              }}
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
