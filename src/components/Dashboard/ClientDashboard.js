import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      client: {},
      token: this.props.user.token
    }
  }
  // api call to get random image from Unsplash API
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
                <h4 className='title'>Total Workouts Tracked:   </h4>
                <h4 className='title'>Client Goals: </h4> <p className='content'> {this.state.client.notes}</p>
                <h4 className='title'>Stats: </h4>
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
              </Col>
            </Row>
            <Row>
              <Col><Link to='/dashboard'><Button>Coach Dashboard</Button></Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Dashboard
