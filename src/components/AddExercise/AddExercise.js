import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class AddExercise extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      workout: {
        client: '',
        rx_date: '',
        notes: '',
        owner: ''
      },
      exercise: {
        name: '',
        sets: '',
        repetitions: '',
        rx_rpe: '',
        rx_percentage: '',
        weight: '',
        notes: '',
        workout: ''
      },
      token: this.props.user.token,
      createdExerciseId: ''
    }
  }

  // handles all user input
  handleChange = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name of the input that the user typed in
    const exerciseKey = event.target.name
    // make a copy of the state
    const exerciseCopy = Object.assign({}, this.state.exercise) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
    // Object.assign({}, object-to-copy) allows you to combine two objects
    // updating the key in our state with what the user typed in
    exerciseCopy[exerciseKey] = userInput
    exerciseCopy['workout'] = this.state.workout.id
    // updating the state with our new copy
    this.setState({ exercise: exerciseCopy
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const exercise = this.state.exercise
    axios({
      url: `${apiUrl}/exercises/`,
      method: 'POST',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      },
      data: {
        exercise: exercise
      }
    })
      .then((response) => this.setState({
        exerciseId: response.data.exercise.id
      })
      )
      .then(() => msgAlert({
        heading: 'New Exercise Created With Success',
        message: messages.uploadExerciseSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/profile'))
      .catch(error => {
        msgAlert({
          heading: 'Could not upload a new exercise, failed with error: ' + error.messages,
          message: messages.uploadExerciseFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    return (
      <div className='top-of-create'>
        <h1 className='user-name'>{this.props.user.email}</h1>
        <div className='create-stack'>
          <div className='create-header'>
            <h3>Add an exercise to your workout</h3>
          </div>
          <Col>
            <Form onSubmit={this.handleSubmit} >
              <Form.Label><h5>Exercise:</h5></Form.Label>
              <Form.Control
                name='name'
                id='name'
                type='text'
                placeholder='Name of desired exercise'
                onChange={this.handleChange}
              />
              <Form.Label><h5>Sets:</h5></Form.Label>
              <Form.Control name='sets' id='sets' onChange={this.handleChange} type='number' placeholder='number of sets' min='0'/>
              <Form.Label><h5>Repetitions:</h5></Form.Label>
              <Form.Control name='repetitions' id='repetitions' onChange={this.handleChange} type='number' placeholder='number of repetitions' min='0'/>
              <Form.Label><h5>Target rpe between 1-10 (optional):</h5></Form.Label>
              <Form.Control name='rx_rpe' id='rx_rpe' onChange={this.handleChange} type='number' placeholder='rpe' min='0'/>
              <Form.Label><h5>Target percentage (optional):</h5></Form.Label>
              <Form.Control name='rx_percentage' id='rx_percentage' onChange={this.handleChange} type='number' placeholder='target percentage' min='0'/>
              <Form.Label><h5>Target weight:</h5></Form.Label>
              <Form.Control name='weight' id='weight' onChange={this.handleChange} type='number' placeholder='weight' min='0'/>
              <Form.Label><h5>Notes:</h5></Form.Label>
              <Form.Control name='notes' id='notes' onChange={this.handleChange} type='text' placeholder='notes' />
              <Button variant='primary' type='submit' className='create-submit'> Submit </Button>
            </Form>
          </Col>
        </div>
      </div>
    )
  }
}
export default withRouter(AddExercise)
