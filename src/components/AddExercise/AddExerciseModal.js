import React from 'react'
import Button from 'react-bootstrap/Button'

const Modal = ({ handleClose, show, children, handleExerciseSubmit, handleExerciseChanges }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <Button onClick={handleClose}>close</Button>
      </section>
    </div>
  )
}

export default Modal
