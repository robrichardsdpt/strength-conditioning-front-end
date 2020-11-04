import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class AddWorkout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      client: {
        name: '',
        email: '',
        notes: '',
        squat1RM: '',
        squat1RM_goal: '',
        bench1RM: '',
        bench1RM_goal: '',
        deadlift1RM: '',
        deadlift1RM_goal: '',
        total_goal: '',
        estimated_total: ''
      },
      token: this.props.user.token
    }
  }

  // handles all user input
  handleChange = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name of the input that the user typed in
    const clientKey = event.target.name
    // make a copy of the state
    const clientCopy = Object.assign({}, this.state.client) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
    // Object.assign({}, object-to-copy) allows you to combine two objects
    // updating the key in our state with what the user typed in
    clientCopy[clientKey] = userInput
    // updating the state with our new copy
    this.setState({ client: clientCopy
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const client = this.state.workout
    axios({
      url: `${apiUrl}/clients/`,
      method: 'PATCH',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      },
      data: {
        client: client
      }
    })
      .then((response) => this.setState({
        createdClientId: response.data.client.id
      })
      )
      .then(() => msgAlert({
        heading: 'New Client Added With Success',
        message: messages.uploadClientSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/profile'))
      .catch(error => {
        msgAlert({
          heading: 'Could not upload your client, failed with error: ' + error.messages,
          message: messages.uploadClientFailure,
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
            <h3>Add a client</h3>
          </div>
          <Col>
            <Form onSubmit={this.handleSubmit} >
              <Form.Label><h5>Name:</h5></Form.Label>
              <Form.Control name="name" id="name" onChange={this.handleChange} type="text" value={this.state.client.name} />
              <Form.Label><h5>Email:</h5></Form.Label>
              <Form.Control name="email" id="email" onChange={this.handleChange} type="email" value={this.state.client.email} />
              <Form.Label><h5>Notes:</h5></Form.Label>
              <Form.Control name="notes" id="notes" onChange={this.handleChange} type="text" value={this.state.client.notes} />
              <Row>
                <Col>
                  <h2>1RM data</h2>
                  <Form.Label><h5>Squat:</h5></Form.Label>
                  <Form.Control name="squat1RM" id="squat1RM" onChange={this.handleChange} type="number" value={this.state.client.squat1RM} />
                  <Form.Label><h5>Bench:</h5></Form.Label>
                  <Form.Control name="bench1RM" id="bench1RM" onChange={this.handleChange} type="number" value={this.state.client.bench1RM} />
                  <Form.Label><h5>Deadlift:</h5></Form.Label>
                  <Form.Control name="deadlift1RM" id="deadlift1RM" onChange={this.handleChange} type="number" value={this.state.client.deadlift1RM} />
                  <h5>Total: {this.state.client.estimated_total}</h5>
                </Col>
                <Col>
                  <h2>Goals</h2>
                  <Form.Label><h5>Squat:</h5></Form.Label>
                  <Form.Control name="squat1RM_goal" id="squat1RM_goal" onChange={this.handleChange} type="text" value={this.state.client.squat1RM_goal} />
                  <Form.Label><h5>Bench:</h5></Form.Label>
                  <Form.Control name="bench1RM_goal" id="bench1RM_goal" onChange={this.handleChange} type="text" value={this.state.client.bench1RM_goal} />
                  <Form.Label><h5>Deadlift:</h5></Form.Label>
                  <Form.Control name="deadlift1RM_goal" id="deadlift1RM_goal" onChange={this.handleChange} type="text" value={this.state.client.deadlift1RM_goal} />
                  <h5>Total: {this.state.client.total_goal}</h5>
                </Col>
              </Row>
              <Button variant='primary' type="submit" className='create-submit'> Submit </Button>
            </Form>
          </Col>
        </div>
      </div>
    )
  }
}
export default withRouter(AddWorkout)
