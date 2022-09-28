import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Plus } from 'react-feather';
import './PopModal.css';

export function PopModal({ show, handleClose, refreasher }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [background, setBackground] = useState('#F9F5EB')
  const [foreBackground, setForeBackground] = useState("#FFFFFF")
  const [priority, setPriority] = useState('normal')

  const handleAdd = () => {
    const saveData = JSON.parse(localStorage.getItem('myNotes')) || []
    if (!title || !content) {
      return alert('Title and Content is required')
    }
    let newData = {
      id: Date.now(),
      title,
      content,
      priority,
      background,
      foreBackground,
      date: new Date().toLocaleDateString()
    }
    saveData.push(newData)
    localStorage.setItem('myNotes', JSON.stringify(saveData))
    setTitle('')
    setContent('')
    setPriority('normal')
    handleClose()
    refreasher()
  }
  const handleCancel = () => {
    setTitle('')
    setContent('')
    setPriority('normal')
    handleClose()
  }

  const handleColor = (bg, fg) => {
    setBackground(bg)
    setForeBackground(fg)
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control type="text" className='form-control mb-3 ' placeholder='Enter title' value={title} onChange={e => setTitle(e.target.value)} />
            <Form.Label className='mb-1'>Priority</Form.Label>
            <Form.Select className='form-control mb-3' value={priority} onChange={e => setPriority(e.target.value)}>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </Form.Select>
            <Form.Control className='mb-3' style={{ height: '180px', resize: 'none' }} as="textarea" placeholder="Enter Notes..." value={content} onChange={e => setContent(e.target.value)} />
            {/* form them selection */}
            <DropdownButton title='Select Theme' variant="primary" drop='end'>
              <Dropdown.Item href='#/action1' onClick={() => handleColor('#54BAB9', '#9ED2C6')}>
                <div className="d-flex">
                  <div className="circle" style={{ backgroundColor: '#54BAB9' }}></div>
                  <div className="circle mx-3" style={{ backgroundColor: '#9ED2C6' }}></div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href='#/action2' onClick={() => handleColor('#FFFE898', '#FFF8BC')}>
                <div className="d-flex">
                  <div className="circle" style={{ backgroundColor: '#FFFE898' }}></div>
                  <div className="circle mx-3" style={{ backgroundColor: '#FFF8BC' }}></div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href='#/action3' onClick={() => handleColor('#AFB4FF', '#B1E1FF')}>
                <div className="d-flex">
                  <div className="circle" style={{ backgroundColor: '#AFB4FF' }}></div>
                  <div className="circle mx-3" style={{ backgroundColor: '#B1E1FF' }}></div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href='#/action4' onClick={() => handleColor('#F9F5EB', '#FFFFFF')}>
                <div className="d-flex ">
                  <div className="circle" style={{ backgroundColor: '#F9F5EB' }}></div>
                  <div className="circle mx-3 " style={{ backgroundColor: '#FFFFFF' }}></div>
                  Default
                </div>
              </Dropdown.Item>

            </DropdownButton>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          <Plus /> Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


