import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState([]);
  const url = "https://keep-api.onrender.com/api/data";

  useEffect(() => {
    
    const getData = async () => {

      //get notes from mongodb
      const { data } = await axios.get(url);
      setNotes(data);

      // console.log(data);
    }

    getData();
  }, [])
  



  const addNote = async (note) => {
    setNotes([...notes, note]);

    //add note to mongodb
    const { title, content } = note;
    await axios.post(url, { title, content });
  }


  const deleteNote = async (id) => {
    setNotes((prevNotes) => prevNotes.filter((item) => item._id !== id));

    //delete note from mongodb
    await axios.delete(`${url}/${id}`);
  }


  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={note._id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
