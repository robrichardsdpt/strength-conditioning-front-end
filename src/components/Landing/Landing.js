import React from 'react'
import axios from 'axios'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      image: ''
    }
  }
  // api call to get random image from Unsplash API
  componentDidMount () {
    axios.get('https://api.unsplash.com/photos/random/?query=powerlifting&client_id=Kp3egeqneLsGd6oaMxevKepWdJoLqviZxAxgjEx0p1Y')
      .then(response => {
        this.setState({
          image: response.data.urls.regular
        })
      })
      .catch(console.error)
  } // componentDidMount

  render () {
    const theme = {
      display: 'flex',
      justifyContent: 'center',
      backgroundImage: `url(${this.state.image})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '0',
      paddingTop: '66.64%'
    }
    return (
      <div style={theme}>

      </div>
    )
  }
}

export default Home
