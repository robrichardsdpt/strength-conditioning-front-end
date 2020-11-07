import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
// import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
// import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import { FaRegEdit } from 'react-icons/fa'
import Modal from '../EditClient/EditClient'
import Form from 'react-bootstrap/Form'
import messages from '../AutoDismissAlert/messages'
import GetWorkouts from '../GetWorkouts/GetWorkouts'
import PercentageGraph from '../PercentageGraph/PercentageGraph'
import PercentOfTotal from '../PercentageGraph/PercentOfTotal'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
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
        coach: ''
      },
      token: this.props.user.token,
      showEdit: false,
      clientId: this.props.id
    }
  }

  showEditModal = () => {
    this.setState({
      showEdit: true
    })
  }

  hideEditModal = () => {
    this.setState({
      showEdit: false
    })
  }

  // handles all user input
  handleEditChanges = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name of the input that the user typed in
    const clientKey = event.target.name
    // make a copy of the state
    const clientCopy = Object.assign({}, this.state.client) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
    // Object.assign({}, object-to-copy) allows you to combine two objects
    // updating the key in our state with what the user typed in
    clientCopy[clientKey] = userInput
    const total = this.handleTotal(clientCopy.squat1RM, clientCopy.bench1RM, clientCopy.deadlift1RM)
    clientCopy['estimated_total'] = total
    // updating the state with our new copy
    this.setState({ client: clientCopy
    })
    console.log(this.state.client)
  }

  handleTotal = (squat, bench, deadlift) => {
    const total = parseInt(squat) + parseInt(bench) + parseInt(deadlift)
    return total
  }

  handleEditSubmit = (event) => {
    event.preventDefault()
    const { msgAlert } = this.props
    const client = this.state.client
    console.log(this.state.client)
    axios({
      url: `${apiUrl}/clients/${this.state.clientId}/`,
      method: 'PATCH',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      },
      data: {
        client: client
      }
    })
      .then((response) => {
        this.setState({
          showEdit: false
        })
        return (
          axios({
            url: `${apiUrl}/clients/${this.props.id}/`,
            method: 'GET',
            headers: {
              Authorization: 'Token ' + `${this.state.token}`
            }
          })
        )
      }
      )
      .then(response => {
        this.setState({
          client: response.data.client
        })
      })
      .then(() => msgAlert({
        heading: 'Client Updated With Success',
        message: messages.uploadClientSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Could not upload your client, failed with error: ' + error.messages,
          message: messages.uploadClientFailure,
          variant: 'danger'
        })
      })
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/clients/${this.props.id}/`,
      method: 'GET',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      }
    })
      .then(response => {
        this.setState({
          client: response.data.client
        })
      })
      .catch(console.error)
  } // componentDidMount

  render () {
    console.log(this.state.client.coach)
    console.log(`you made it into ${this.state.client.name}'s client specific dashboard.`)
    return (
      <Container>
        <Row>
          <Col>
            <h2 className="name">{this.state.client.name}</h2>
          </Col>
        </Row>
        <Row>
          <Col className= 'left-pane'>
            <Row>
              <Col>
                <h4 className="email-addy">{this.state.client.email}</h4>
              </Col>
            </Row>
            <Row>
              <Col className='coach-data'>
                <h4 className='title'>Current percentage of total: </h4>
                <PercentOfTotal clearUser={this.clearUser} user={this.state.token} data= {this.state.client} squat = {this.state.client.squat1RM} bench = {this.state.client.bench1RM} deadlift = {this.state.client.deadlift1RM}/>
                <span className= 'icon iconLink' onClick={this.showEditModal}><FaRegEdit /></span>
                <h4 className='title'>Client Goals: </h4> <p className='content'> {this.state.client.notes} </p>
                <h5 className='client1RM'>Current Squat 1RM: {this.state.client.squat1RM}</h5>
                <h5 className='client1RMGoal'>Squat 1RM Goal: {this.state.client.squat1RM_goal}</h5>
                <PercentageGraph clearUser={this.clearUser} user={this.state.token} data= {this.state.client} current = {this.state.client.squat1RM} goal = {this.state.client.squat1RM_goal}/>
                <h5 className='client1RM'>Current Bench 1RM: {this.state.client.bench1RM}</h5>
                <h5 className='client1RMGoal'>Bench 1RM Goal: {this.state.client.bench1RM_goal}</h5>
                <PercentageGraph clearUser={this.clearUser} user={this.state.token} data= {this.state.client} current = {this.state.client.bench1RM} goal = {this.state.client.bench1RM_goal}/>
                <h5 className='client1RM'>Current Deadlift 1RM: {this.state.client.deadlift1RM}</h5>
                <h5 className='client1RMGoal'>Deadlift 1RM Goal: {this.state.client.deadlift1RM_goal}</h5>
                <PercentageGraph clearUser={this.clearUser} user={this.state.token} data= {this.state.client} current = {this.state.client.deadlift1RM} goal = {this.state.client.deadlift1RM_goal}/>
                <h5 className='client1RM'>Current Total: {this.state.client.estimated_total}</h5>
                <h5 className='client1RMGoal'>Total Goal: {this.state.client.total_goal}</h5>
                <PercentageGraph clearUser={this.clearUser} user={this.state.token} data= {this.state.client} current = {this.state.client.estimated_total} goal = {this.state.client.total_goal}/>
              </Col>
            </Row>
          </Col>

          <Col className= 'right-pane'>
            <Row>
              <Col>
              </Col>
              <Col>
                {/* <h5 className= 'icon'><FaRegEdit /></h5> */}
              </Col>
            </Row>
            <Row className='coach-options'>
              <Col>
                <h4 className='title'>Client Options:</h4>
                <GetWorkouts
                  id={this.state.clientId}
                  user={this.state.token}/>
              </Col>
            </Row>
            <Row>
              <Col><Link to={`/add-workout/${this.state.client.id}`}><Button>Add Workout</Button></Link>
              </Col>
              <Col><Link to='/dashboard'><Button>Coach Dashboard</Button></Link>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal show={this.state.showEdit} client={this.state.client} handleClose={this.hideEditModal} handleEditSubmit={this.handleEditSubmit} handleEditChanges={this.handEditChanges}>
          <Col className='coach-data'>
            <Form onSubmit={this.handleEditSubmit}>
              <h2 className="name">{this.state.client.name}</h2>
              <h4 className="email-addy">{this.state.client.email}</h4>
              <h4 className='title'>Client Goals: </h4> <p className='content'> {this.state.client.notes} </p>
              <h5 className='big3name'>Squat: <Form.Control value={this.state.client.squat1RM_goal} name='squat1RM_goal' id='squat1RM_goal' type='number' min='0' onChange={this.handleEditChanges}/></h5>
              <h5 className='big3name'>Bench: <Form.Control value={this.state.client.bench1RM_goal} name='bench1RM_goal' id='bench1RM_goal' type='number' min='0' onChange={this.handleEditChanges}/></h5>
              <h5 className='big3name'>Deadlift: <Form.Control value={this.state.client.deadlift1RM_goal} name='deadlift1RM_goal' id='deadlift1RM_goal' type='number' min='0' onChange={this.handleEditChanges}/></h5>
              <h5 className='big3name'>Total: <Form.Control value={this.state.client.total_goal} name='total_goal' id='total_goal' type='number' min='0' onChange={this.handleEditChanges}/></h5>
              <h4 className='title'>Current 1RM Statistics: </h4>
              <h5 className='big3name'>Squat: <Form.Control value={this.state.client.squat1RM} name="squat1RM" id="squat1RM" type="number" min='0' onChange={this.handleEditChanges}/></h5>
              <h5 className='big3name'>Bench: <Form.Control value={this.state.client.bench1RM} name="bench1RM" id="bench1RM" type="number" min='0' onChange={this.handleEditChanges}/></h5>
              <h5 className='big3name'>Deadlift: <Form.Control value={this.state.client.deadlift1RM} name="deadlift1RM" id="deadlift1RM" type="number" min='0' onChange={this.handleEditChanges}/></h5>
              <h5 className='big3name'>Total: {this.state.client.estimated_total}</h5>
              <Button className='updateButton' type='submit'>Update</Button>
            </Form>
          </Col>
        </Modal>
      </Container>
    )
  }
}

export default Dashboard
