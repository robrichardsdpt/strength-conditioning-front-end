import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'

class CreateClient extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      client: {
        name: '',
        email: '',
        notes: '',
        squat1RM: 0,
        squat1RM_goal: 0,
        bench1RM: 0,
        bench1RM_goal: 0,
        deadlift1RM: 0,
        deadlift1RM_goal: 0,
        total_goal: 0,
        estimated_total: 0,
        coach: this.props.user.id
      },
      createdClientId: '',
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
    const client = this.state.client
    axios({
      url: `${apiUrl}/clients/`,
      method: 'POST',
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
      .then(() => history.push('/dashboard'))
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
        <h1 className='email-addy'>{this.props.user.email}</h1>
        <div className='create-stack'>
          <div className='create-header'>
            <h3 className= 'name'>Add a client</h3>
          </div>
          <Col>
            <Form onSubmit={this.handleSubmit} >
              <Form.Label className='title'><h5>Name:</h5></Form.Label>
              <Form.Control name="name" id="name" onChange={this.handleChange} type="text" placeholder="Client Name" />
              <Form.Label className='title'><h5>Email:</h5></Form.Label>
              <Form.Control name="email" id="email" onChange={this.handleChange} type="text" placeholder="client@email.com" />
              <Form.Label className='title'><h5>Notes:</h5></Form.Label>
              <Form.Control name="notes" id="notes" onChange={this.handleChange} type="text" placeholder="notes" />
              <Button variant='primary' type="submit" className='create-submit'> Submit </Button>
            </Form>
          </Col>
        </div>
      </div>
    )
  }
}
export default withRouter(CreateClient)
