import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { FaRegEdit, FaSearch } from 'react-icons/fa'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      clients: [],
      editBio: false
    }
  }

  editBioClick = (event) => {
    event.preventDefault()
    this.setState({
      editBio: true
    })
  }

  handleBioChange = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name of the input that the user typed in
    const userKey = event.target.name
    // make a copy of the state
    const userCopy = Object.assign({}, this.state.user) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
    // Object.assign({}, object-to-copy) allows you to combine two objects
    // updating the key in our state with what the user typed in
    userCopy[userKey] = userInput
    // updating the state with our new copy
    this.setState({ user: userCopy
    })
  }

  handleBioSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const user = this.state.user
    axios({
      url: `${apiUrl}/users/${this.state.user.id}`,
      method: 'PATCH',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      },
      data: {
        user: user
      }
    })
      .then((response) => this.setState({
        user: user
      })
      )
      .then(() => msgAlert({
        heading: 'New Bio Added With Success',
        //  message: messages.uploadClientSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/dashboard'))
      .catch(error => {
        msgAlert({
          heading: 'Could not update your bio, failed with error: ' + error.messages,
          //      message: messages.uploadClientFailure,
          variant: 'danger'
        })
      })
  }
  // api call to get random image from Unsplash API
  componentDidMount () {
    axios({
      url: `${apiUrl}/clients/`,
      method: 'GET',
      headers: {
        Authorization: 'Token ' + `${this.state.user.token}`
      }
    })
      .then(response => {
        this.setState({
          clients: response.data.clients
        })
      })
      .catch(console.error)
  } // componentDidMount

  render () {
    let jsxBioContent
    console.log(`you made it into ${this.state.user.name}'s coach specific dashboard.`)
    console.log(this.state.user)
    console.log(this.state.editBio)
    console.log(this.state.clients)
    const jsxClientList = this.state.clients.map(client => {
      return (
        <div key={client.id} size="4" className="stack">
          <Col className='card-header'>
            <h5 className= 'client-name'>{client.name}  <Link to={`/client-dashboard/${client.id}`}><FaSearch className='magnifying-glass'/></Link></h5>
            Email:  {client.email}
          </Col>
        </div>
      )
    })
    if (this.state.editBio === false) {
      jsxBioContent = (
        <div>{this.state.user.bio}</div>
      )
    } else {
      return (
        <div>
          <Form onSubmit={this.handleBioSubmit} >
            <Form.Control name="bio" id="bio" onChange={this.handleBioChange} type="text" placeholder="bio" />
            <Button variant='primary' type="submit" className='create-submit'> Submit </Button>
          </Form>
        </div>
      )
    }
    return (
      <Container>
        <Row>
          <Col>
            <h2 className="name">{this.state.user.name}</h2>
          </Col>
        </Row>
        <Row>
          <Col className= 'left-pane'>
            <Row>
              <Col>
                <h4 className="email-addy">{this.state.user.email}</h4>
              </Col>
            </Row>
            <Row>
              <Col className='coach-data'>
                <h4 className='title'>Total Clients Tracked:   {this.state.clients.length}</h4>
                <h4 className='title'>Your Clients: </h4>
                {jsxClientList}
              </Col>
            </Row>
          </Col>

          <Col className= 'right-pane'>
            <Col className='bio-container'>
              <h6 className="bio">Bio: </h6>
            </Col>
            <Row>
              <Col>
                {jsxBioContent}
              </Col>
              <Col>
                <h5 className= 'icon'><FaRegEdit /></h5>
              </Col>
            </Row>
            <Row className='coach-options'>
              <Col>
                <h4 className='title'>Coaching Options:</h4>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Dashboard
