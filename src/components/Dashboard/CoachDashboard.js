import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }
  // api call to get random image from Unsplash API
  componentDidMount () {

  } // componentDidMount

  render () {
    console.log(`you made it into ${this.state.user.name}'s coach specific dashboard.`)
    console.log(this.state.user)
    return (
      <Container>
        <h2 className="name">{this.state.user.name}</h2>
        <Row>
          <Col>
            <h4 className="email-addy">{this.state.user.email}</h4>
          </Col>
          <Col>
            <h6 className="bio">Bio: {this.state.user.bio}</h6>
          </Col>
        </Row>
        <Row>
          <Col className='coach-data'>
            <h4 className='title'>Total Clients Tracked:  </h4>
            <Row>
              <Col>
                <h4 className='title'>Your Clients: </h4>
              </Col>
            </Row>
          </Col>
          <Col className='coach-options'>
            <h4 className='title'>Coaching Options</h4>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Dashboard
