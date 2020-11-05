import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class AddWorkout extends React.Component {
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
        owner: ''
      },
      createWorkoutId: '',
      client: this.props.client,
      token: this.props.user.token,
      clientId: this.props.id
    }
  }

  // handles all user input
  handleChange = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name of the input that the user typed in
    const workoutKey = event.target.name
    // make a copy of the state
    const workoutCopy = Object.assign({}, this.state.workout) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
    // Object.assign({}, object-to-copy) allows you to combine two objects
    // updating the key in our state with what the user typed in
    workoutCopy[workoutKey] = userInput
    // updating the state with our new copy
    this.setState({ workout: workoutCopy
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const workout = this.state.workout
    axios({
      url: `${apiUrl}/workouts/`,
      method: 'POST',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      },
      data: {
        workout: workout
      }
    })
      .then((response) => this.setState({
        createdWorkoutId: response.data.workout.id
      })
      )
      .then(() => msgAlert({
        heading: 'New Workout Created With Success',
        message: messages.uploadWorkoutSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/client-dashboard/'))
      .catch(error => {
        msgAlert({
          heading: 'Could not upload a new workout, failed with error: ' + error.messages,
          message: messages.uploadWorkoutFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    console.log(this.state)
    return (
      <div className='top-of-create'>
        <h1 className='user-name'>{this.props.user.email}</h1>
        <div className='create-stack'>
          <div className='create-header'>
            <h3>Create a new workout</h3>
          </div>
          <Col>
            <Form onSubmit={this.handleSubmit} >
              <Form.Label><h5>Client:</h5></Form.Label>
              <Form.Control
                name="client"
                id="client"
                type="text"
                placeholder="Name"
                onChange={this.handleChange}
              />
              <Form.Label><h5>DateRx:</h5></Form.Label>
              <Form.Control name="date" id="date" onChange={this.handleChange} type="text" placeholder="When" />
              <Form.Label><h5>Notes:</h5></Form.Label>
              <Form.Control name="notes" id="notes" onChange={this.handleChange} type="text" placeholder="notes" />
              <Button variant='primary' type="submit" className='create-submit'> Submit </Button>
            </Form>
          </Col>
        </div>
      </div>
    )
  }
}
export default withRouter(AddWorkout)
