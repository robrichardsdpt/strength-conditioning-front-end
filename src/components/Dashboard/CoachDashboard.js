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
        <Row>
          <Col><h2 className="email-addy">{this.state.user.email}</h2>
          </Col>
        </Row>
        <Row>
          <Col className='coach-data'>
          </Col>
          <Col className='coach-options'>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Dashboard
