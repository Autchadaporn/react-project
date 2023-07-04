import { useState, useEffect } from 'react';
import "./App.css";
import AppHeader from "./components/AppHeader.js";
import CandyItem from "./components/CandyItem.js";
import candies from "./data/candy";
import CandyPost from "./components/CandyPost.js";
// import AppSearch from './components/AppSearch';
import "./components/Note.css"
// import PreviewProduct from './components/PreviewProduct.js'
// import { eventWrapper } from '@testing-library/user-event/dist/utils';

const startNote = {
  content: '',
  author: ''
}

function App() {
  // const [selectedCandy, setSelectedCandy] = useState(null)
  // const [searchText, setSearchText] = useState('')
  const [note, setNote] = useState({
    content: '',
    author: ''
  })

  const [allNotes, setAllNotes] = useState([])
  const [editNote, setEditNote] = useState(null)
  const [count, setcount] = useState(0)

  useEffect(() => {
    console.log('use effect')
  }, []) // จะทำงานแค่ครั้งแรกตอนใช้ component

  useEffect(() => {
    console.log('use effect' + count)
  }, [count]) // จะทำงานเมื่อค่า count มีการเปลี่ยนแปลง

  function onNoteValueChange (event) {
    const {name, value} =  event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }

  function onEditNoteValueChange (event) {
    const {name, value} =  event.target;
    setEditNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }

  function onNoteSubmit (event) {
    event.preventDefault()

    setAllNotes((prevAllNotes) => {
      const newNote = {...note}
      newNote.id = Date.now().toString();
      return [newNote, ...prevAllNotes]
      
    })

    setNote(startNote)
  }

  function onEditNoteSubmit(event) {
    event.preventDefault();
    setAllNotes((prevAllNotes) => {
      return prevAllNotes.map((theNote) => {
        if (theNote.id !== editNote.id) return theNote;
        return editNote
      })
    })
    setEditNote(null)
  }

  function onNoteDeleta (noteId) {
    setAllNotes((prevAllNotes) => {
        return prevAllNotes.filter(theNote => theNote.id !== noteId )
    })
  }

  // function onOpenCandyClick (theCandy) {
  //   setSelectedCandy(theCandy)
  // }

  // function onCloseCandyClick () {
  //   setSelectedCandy(null)
  // }

  // const filteredCandies = candies.filter((candy) => {
  //   return candy.title.includes(searchText)
  // })
  // const candyElements = filteredCandies.map((candy, index) => {
  //   return <CandyItem key={index} candy={candy} onOpenCandyClick={onOpenCandyClick}/>
  // })

  // let candyPost = null;
  // if (!!selectedCandy) {
  //   candyPost = <CandyPost  candy={selectedCandy} onCloseCandyClick={onCloseCandyClick}/>
  // }

  // Elements
  const noteElement = allNotes.map((theNote) => {
    return (
      <div  key={theNote.id} className='app-note'>
        <p>{theNote.content}</p>
        <h5>{theNote.author}</h5>
        <p>
          <a onClick={() => {setEditNote(theNote)}}>Edit</a>
          <span> | </span>
          <a onClick={() => {onNoteDeleta(theNote.id)} }>Delete</a>
        </p>
      </div>
    )
  })

  let editNoteElement = null;
  if (!!editNote) {
    editNoteElement = (
      <div className='app-edit-note'>
        <form onSubmit={onEditNoteSubmit}>
            <p>
            <textarea 
              className='note-input'
              type="text"
              placeholder='บันทึกโน๊ต'
              rows="3"
              name="content"
              value={editNote.content}
              onChange={onEditNoteValueChange}
            ></textarea>
            </p>
            <p>
            <input 
              className='note-input'
              type="text"
              placeholder='ผู้บันทึก'
              name="author"
              value={editNote.author}
              onChange={onEditNoteValueChange}
            ></input>
            </p>
            <p>
              <button type='submit' className='note-input-btn'>แก้ไขโน๊ต</button>
            </p>
          </form>
      </div>
    )
  }

  return (
    <div className="app">
      <AppHeader />
      {/* <section>
        <PreviewProduct />
      </section> */}
      <section className='app-section'>
        <div className='app-container'>
          
          <div className="app-grid">
            {/* {candyElements} */}
          </div>
        </div>
      </section>
      <section className="note-section">
        <div className='app-container'>
          <form onSubmit={onNoteSubmit}>
            <p>
            <textarea 
              className='note-input'
              type="text"
              placeholder='บันทึกโน๊ต'
              rows="3"
              name="content"
              value={note.content}
              onChange={onNoteValueChange}
            ></textarea>
            </p>
            <p>
            <input 
              className='note-input'
              type="text"
              placeholder='ผู้บันทึก'
              name="author"
              value={note.author}
              onChange={onNoteValueChange}
            ></input>
            </p>
            <p>
              <button type='submit' className='note-input-btn'>เพิ่มโน๊ต</button>
            </p>
          </form>
          <div className='app-notes'>
              {noteElement}
          </div>
        </div>
        {editNoteElement}
      </section>
      <section className='use-effect'>
        <div className='app-container'>
          <button onClick={() => {setcount(prev => prev + 1)}}>{count}</button>
        </div>
      </section>
      {/* {candyPost} */}
    </div>
  );
}

export default App;
