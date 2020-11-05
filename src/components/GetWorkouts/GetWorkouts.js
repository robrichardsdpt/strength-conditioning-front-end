import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
// import Row from 'react-bootstrap/Row'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

class GetWorkouts extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      user: this.props.user,
      id: parseInt(this.props.id),
      editWorkout: false,
      workoutStats: false,
      workouts: []
    }
  }

  // editWorkoutClick = (event) => {
  //   event.preventDefault()
  //   this.setState({
  //     editWorkout: true
  //   })
  // }

  // handleWorkoutChange = (event) => {
  //   // get the value that the user typed in
  //   const userInput = event.target.value
  //   // get the name of the input that the user typed in
  //   const userKey = event.target.name
  //   // make a copy of the state
  //   const userCopy = Object.assign({}, this.state.user) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
  //   // Object.assign({}, object-to-copy) allows you to combine two objects
  //   // updating the key in our state with what the user typed in
  //   userCopy[userKey] = userInput
  //   // updating the state with our new copy
  //   this.setState({ user: userCopy
  //   })
  // }

  // handleWorkoutSubmit = (event) => {
  //   event.preventDefault()
  //   const { msgAlert, history } = this.props
  //   const workout = this.state.workout
  //   axios({
  //     url: `${apiUrl}/workouts/${this.state.workouts.id}/`,
  //     method: 'PATCH',
  //     headers: {
  //       Authorization: 'Token ' + `${this.state.token}`
  //     },
  //     data: {
  //       workout: workout
  //     }
  //   })
  //     .then((response) => this.setState({
  //       workout: workout
  //     })
  //     )
  //     .then(() => msgAlert({
  //       heading: 'Workout updated With Success',
  //       //  message: messages.uploadClientSuccess,
  //       variant: 'success'
  //     }))
  //     .then(() => history.push('/dashboard'))
  //     .catch(error => {
  //       msgAlert({
  //         heading: 'Could not update your workout, failed with error: ' + error.messages,
  //         //      message: messages.uploadClientFailure,
  //         variant: 'danger'
  //       })
  //     })
  // }
  // api call to get random image from Unsplash API
  componentDidMount () {
    axios({
      url: `${apiUrl}/workouts/`,
      method: 'GET',
      headers: {
        Authorization: 'Token ' + `${this.state.user}`
      }
    })
      .then(response => {
        console.log(response.data.workouts)
        const workoutArrayForClient = []
        console.log(this.state.id)
        for (let i = 0; i < response.data.workouts.length; i++) {
          if (response.data.workouts[i].client === this.state.id) {
            workoutArrayForClient.push(response.data.workouts[i])
          }
        }
        this.setState({
          workouts: workoutArrayForClient
        })
      })
      .catch(console.error)
  } // componentDidMount

  render () {
    console.log(`you made it into ${this.state.id}'s workout component.`)
    const jsxWorkoutList = this.state.workouts.map(workout => {
      return (
        <div key={workout.id} size="4" className="stack">
          <Col className='card-header'>
            <h5 className= 'client-name'>{workout.rx_date}  <Link to={`/workout-dashboard/${workout.id}`}><FaSearch/></Link></h5>
            Notes:  {workout.notes}
          </Col>
        </div>
      )
    })
    return (
      <Container>
        <Col className='coach-data'>
          <h4 className='title'>Total Workouts:   {this.state.workouts.length}</h4>
          {jsxWorkoutList}
        </Col>
      </Container>
    )
  }
}

export default GetWorkouts
