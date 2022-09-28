import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Plus, RefreshCcw, Search, Trash } from 'react-feather';
import { useState } from 'react';

export function MainNavbar({ handleShow, data, setData, refreasher }) {
  const [searchValue, setSearchValue] = useState('')
  const deleteAll = () => {
    const pass = window.confirm('Are you sure you want to delete all notes?')
    if (!pass) {
      return
    }
    localStorage.removeItem('myNotes')

    // 
    refreasher()
  }
  const sorter = (value) => {
    if (value === 'latest') {
      data.sort((a, b) => b.id - a.id)
    }
    if (value === 'oldest') {
      data.sort((a, b) => a.id - b.id)
    }
    if (value === 'high') {
      data.sort((a, b) => a.priority.localeCompare(b.priority))
    }
    if (value === 'normal') {
      data.sort((a, b) => b.priority.localeCompare(a.priority))
    }
    setData([...data])
  }

  const search = (e) => {
    e.preventDefault()
    let newData;
    if (searchValue) {
      newData = data.filter(note => note.title.toLowerCase().includes(searchValue.toLowerCase()))
      setData([...newData])
    } else {
      refreasher()
    }
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#" className='fw-bolder fs-1 text-danger'>NOTES</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
          <Nav
            className="align-items-lg-center align-items-md-start"
            style={{ maxHeight: '341px' }}
            navbarScroll
          >
            <NavDropdown title="Sort By:" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#/latest" onClick={() => sorter('latest')}>Latest First</NavDropdown.Item>
              <NavDropdown.Item href="#/oldest" onClick={() => sorter('oldest')}>Oldest First</NavDropdown.Item>
              <NavDropdown.Item href="#/high" onClick={() => sorter('high')}>
                Priority High
              </NavDropdown.Item>
              <NavDropdown.Item href="#/normal" onClick={() => sorter('normal')}>
                Priority Normal
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item className='mx-2'><button className='nav-link btn btn-sm btn-info text-light px-2 my-3' onClick={handleShow}><Plus /> Add New</button></Nav.Item>
            <Nav.Item className='mx-2'><button className='nav-link btn btn-sm btn-danger text-light px-2 my-3' onClick={deleteAll}><Trash /> Delete All</button></Nav.Item>
          </Nav>
          <Form className="d-flex my-2" onSubmit={search}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button variant="outline-primary" type='submit'>{searchValue ? <Search /> : <RefreshCcw />}</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
