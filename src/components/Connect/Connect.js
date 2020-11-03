import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'

class Connect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      clients: [],
      users: []
    }
  }

  componentDidMount () {
    // get index request
    axios({
      url: `${apiUrl}/coaches/`,
      method: 'GET',
      headers: {
        Authorization: 'Token ' + `${this.state.user.token}`
      }
    })
      .then(response => {
        this.setState({
          users: response.data.users
        })
      })
      .catch(console.error)

  //   axios({
  //     url: `${apiUrl}/clients/`,
  //     method: 'GET',
  //     headers: {
  //       Authorization: 'Token ' + `${this.state.user.token}`
  //     }
  //   })
  //     .then(response => {
  //       this.setState({
  //         clients: response.data.users
  //       })
  //     })
  //     .catch(console.error)
  }

  render () {
    console.log(`you made it into ${this.state.user.name}'s connection page.`)
    console.log(this.state.user)
    console.log(`${this.state.clients}`)
    const coachingStaff = []
    const clients = []
    this.state.users.map(user => {
      if (user.is_staff === true) {
        coachingStaff.push(user)
      } else {
        clients.push(user)
      }
    })

    const jsxCoach = coachingStaff.map(user => {
      return (
        <div key={user.id} size="4" className="stack">
          <Col className='card-header'>
            <h5>{user.name}</h5>
            Email:  {user.email}
          </Col>
        </div>
      )
    })

    return (
      <Container>
        <Row>
          <Col><h2 className='email-addy'>{this.state.user.email}</h2>
            <h3 className='search-title'>Connect with other coaches</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            {jsxCoach}
          </Col>
          <Col>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Connect
