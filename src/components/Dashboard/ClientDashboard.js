import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'

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
      <div>
      </div>
    )
  }
}

export default Dashboard
