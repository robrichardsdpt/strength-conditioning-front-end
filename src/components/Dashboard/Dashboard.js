import React from 'react'
import CoachDashboard from './CoachDashboard'
import ClientDashboard from './ClientDashboard'

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
    console.log(this.state.user)
    return (
      <div>
        { this.state.user.is_staff ? <CoachDashboard user={this.state.user} /> : <ClientDashboard user={this.state.user} /> }
      </div>
    )
  }
}

export default Dashboard
