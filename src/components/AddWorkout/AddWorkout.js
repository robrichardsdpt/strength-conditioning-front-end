import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
import 'react-datepicker/dist/react-datepicker.css'

class CreateRun extends React.Component {
  constructor (props) {
    super(props)
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
      token: this.props.user.token
    }
  }

  // handles all user input
  handleChange = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name of the input that the user typed in
    const workoutKey = event.target.name
    // make a copy of the state
    const workoutCopy = Object.assign({}, this.state.run) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
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
    const run = this.state.run
    axios({
      url: `${apiUrl}/runs/`,
      method: 'POST',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      },
      data: {
        run: run
      }
    })
      .then((response) => this.setState({
        createdRunId: response.data.run.id
      })
      )
      .then(() => msgAlert({
        heading: 'New Run Created With Success',
        message: messages.uploadRunSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/profile'))
      .catch(error => {
        msgAlert({
          heading: 'Could not upload new run, failed with error: ' + error.messages,
          message: messages.uploadRunFailure,
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
            <h3>Create a new run</h3>
          </div>
          <Col>
            <Form onSubmit={this.handleSubmit} >
              <Form.Label><h5>Date:</h5></Form.Label>
              <Form.Control
                name="date"
                id="date"
                type="date"
                placeholder="MM/DD/YYYY"
                onChange={ this.handleChange}
              />
              <Form.Label><h5>Time taken(HH:MM:SS):</h5></Form.Label>
              <Form.Control name="time" id="time" onChange={this.handleTimeChange} type="text" placeholder="00:00:00" />
              <Form.Label><h5>Distance (miles):</h5></Form.Label>
              <Form.Control name="distance" id="distance" onChange={this.handleChange} type="number" min="0" placeholder="0.00" step="0.01" />
              <Form.Label><h5>Difficulty (0-10 with 10 being most difficult, 0 being you were sleeping):</h5></Form.Label>
              <Form.Control name="rpe" id="rpe" onChange={this.handleChange} type="number" min="0" max="10" placeholder="0-10" step="0.1" />
              <Form.Label><h5>Location (Be as specific as you like):</h5></Form.Label>
              <Form.Control name="location" id="location" onChange={this.handleChange} type="text" placeholder="Great Park, AnyTown" />
              <Form.Label><h5>Any comments on the run:</h5></Form.Label>
              <Form.Control name="notes" id="notes" onChange={this.handleChange} type="text" placeholder="Some great philosophical findings from this run." />
              <Button variant='primary' type="submit" className='create-submit'> Submit </Button>
            </Form>
          </Col>
        </div>
      </div>
    )
  }
}
export default withRouter(CreateRun)
