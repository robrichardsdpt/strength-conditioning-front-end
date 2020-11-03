import React from 'react'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      image: ''
    }
  }
  // api call to get random image from Unsplash API
  componentDidMount () {

  } // componentDidMount

  render () {
    return (
      <div>
        Home
      </div>
    )
  }
}

export default Home
