import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Rating } from 'react-simple-star-rating';
import './Note.css';
import { Check, PenTool, Trash } from 'react-feather';

export const Note = ({ note, refreasher }) => {
  const [rating, setRating] = useState(note.priority === 'high' ? 100 : 0)
  const [edit, setEdit] = useState(false)
  const [content, setContent] = useState(note.content)
  const { id, background, foreBackground } = note;
  let savedData = JSON.parse(localStorage.getItem('myNotes')) || [];

  const handlDelete = () => {
    const pass = window.confirm('Are you sure you want to delete this notes?')
    if (!pass) {
      return
    }
    if (savedData.length) {
      let newData = savedData.filter(data => data.id !== note.id)
      localStorage.setItem('myNotes', JSON.stringify(newData))
      //
      // window.location.reload();
      refreasher()
    }
  }

  const handleEdit = () => {
    let idx = savedData.findIndex(x => x.id === id)
    savedData[idx].content = content;
    localStorage.setItem('myNotes', JSON.stringify(savedData))
    setEdit(false)
    //
    // window.location.reload();
    refreasher()
  }

  const handleRating = () => {
    // let idx = savedData.findIndex(x => x.id === id)
    setRating(prevRate => {
      if (prevRate === 100) {
        prevRate = 0;
      } else {
        prevRate = 100;
      }
    })

  }

  return (
    <Col sm={6} md={4} lg={3} className='px-2 h-100 mb-5'>
      <Card className='shadow' style={{ backgroundColor: background }}>
        <Card.Body>
          <Card.Title className='note-title text-center w-100'>
            <div className="note-priority text-center text-light shadow">
              <p className="text-light fw-light mn-0">Priority</p>
              <Rating ratingValue={rating} iconsCount={1} transition={true} className='note-rate' onClick={handleRating} />
              {rating === 100 ? (
                <p className="fw-bold text-warning">High</p>
              ) : (
                <p className="fw-light ">Normal</p>
              )}
            </div>
            <h2 className="fw-light">{note.title}</h2>
          </Card.Title>
          <Card.Text>
            <Form.Control
              as="textarea"
              disabled={!edit}
              style={{ backgroundColor: foreBackground, resize: 'none', height: '180px', overflow: 'scroll', paddingTop: '28px' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Card.Text>
          <div className="d-flex my-2 justify-content-between">
            {!edit ? (
              <Button variant='outline-warning' size="sm" className=' shadow' onClick={() => setEdit(true)}><PenTool /></Button>
            ) : (
              <Button variant='outline-primary' size="sm" className=' shadow' onClick={handleEdit}><Check /></Button>
            )}
            <Button variant='outline-danger' size="sm" className=' shadow' onClick={handlDelete}><Trash /></Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}
