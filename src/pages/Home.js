import { useState, useEffect } from 'react'
import Row from 'react-bootstrap/Row';
import { MainNavbar, Note, PopModal } from '../components'
import { Frown } from 'react-feather';

export const Home = () => {
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)
  const refreasher = () => {
    setData(JSON.parse(localStorage.getItem('myNotes')) || [])
  }
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('myNotes')) || [])
  }, [])
  return (
    <>
      <MainNavbar handleShow={handleShow} data={data} setData={setData} refreasher={refreasher} />
      {showModal && <PopModal show={showModal} handleClose={handleClose} refreasher={refreasher} />}
      {/* Notes  */}
      {/* <Container> */}
      <Row className='justify-content-between mx-0 p-5'>
        {!data.length ? (
          <h1 className="text-center display-1 fw-light text-secondary my-5">
            <Frown size={100} /> No Notes. Create New One.
          </h1>
        ) : (
          data.map(note => (
            <Note key={note.id} note={note} refreasher={refreasher} />
          ))
        )}
      </Row>
      {/* </Container> */}
    </>
  )
}