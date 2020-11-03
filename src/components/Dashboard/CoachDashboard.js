import React from 'react'

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
    return (
      <div>
      </div>
    )
  }
}

export default Dashboard
