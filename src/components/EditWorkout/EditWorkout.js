import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
import Modal from '../AddExercise/AddExerciseModal'

class EditWorkout extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      workout: {},
      exercise: {
        name: '',
        sets: '',
        repetitions: '',
        rx_rpe: '',
        rx_percentage: '',
        weight: '',
        notes: '',
        owner: ''
      },
      createWorkoutId: '',
      client: {
        name: '',
        email: '',
        notes: '',
        squat1RM: 0,
        squat1RM_goal: 0,
        bench1RM: 0,
        bench1RM_goal: 0,
        deadlift1RM: 0,
        deadlift1RM_goal: 0,
        total_goal: 0,
        estimated_total: 0
      },
      exercises: [],
      token: this.props.user.token,
      workoutId: this.props.id,
      showEdit: false
    }
  }

  showEditModal = () => {
    this.setState({
      showEdit: true
    })
  }

  hideEditModal = () => {
    this.setState({
      showEdit: false
    })
  }

  // handles all user input
  handleChange = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name of the input that the user typed in
    const workoutKey = event.target.name
    // make a copy of the state
    const workoutCopy = Object.assign({}, this.state.workout) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
    // Object.assign({}, object-to-copy) allows you to combine two objects
    // updating the key in our state with what the user typed in
    workoutCopy[workoutKey] = userInput
    workoutCopy['client'] = this.state.client.id
    // updating the state with our new copy
    this.setState({ workout: workoutCopy
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const workout = this.state.workout
    axios({
      url: `${apiUrl}/workouts/${this.props.id}`,
      method: 'PATCH',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      },
      data: {
        workout: workout
      }
    })
      .then((response) => this.setState({
        createdWorkoutId: response.data.workout.id
      })
      )
      .then(() => msgAlert({
        heading: 'New Workout Created With Success',
        message: messages.uploadWorkoutSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/edit-workout/${this.state.createdWorkoutId}`))
      .catch(error => {
        msgAlert({
          heading: 'Could not upload a new workout, failed with error: ' + error.messages,
          message: messages.uploadWorkoutFailure,
          variant: 'danger'
        })
      })
  }
  handleExerciseChange = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name of the input that the user typed in
    const exerciseKey = event.target.name
    // make a copy of the state
    const exerciseCopy = Object.assign({}, this.state.exercise) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
    // Object.assign({}, object-to-copy) allows you to combine two objects
    // updating the key in our state with what the user typed in
    exerciseCopy[exerciseKey] = userInput
    exerciseCopy['workout'] = this.state.workout.id
    // updating the state with our new copy
    this.setState({ exercise: exerciseCopy
    })
  }

  handleExerciseSubmit = (event) => {
    event.preventDefault()
    const { msgAlert, history } = this.props
    const exercise = this.state.exercise
    console.log(exercise)
    axios({
      url: `${apiUrl}/exercises/`,
      method: 'Post',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      },
      data: {
        exercise: exercise
      }
    })
      .then((response) =>
        this.setState({
          createdExerciseId: response.data.exercise.id
        })
      )
      .then(() => msgAlert({
        heading: 'New Workout Created With Success',
        message: messages.uploadWorkoutSuccess,
        variant: 'success'
      }))
      .then(() => {
        history.push(`/edit-workout/${this.state.createdWorkoutId}`)
        return axios({
          url: `${apiUrl}/exercises/`,
          method: 'GET',
          headers: {
            Authorization: 'Token ' + `${this.state.token}`
          }
        })
          .then(response => {
            console.log(response.data.exercises)
            this.setState({
              exercises: response.data.exercises
            })
          })
      })
      .catch(error => {
        msgAlert({
          heading: 'Could not upload a new workout, failed with error: ' + error.messages,
          message: messages.uploadWorkoutFailure,
          variant: 'danger'
        })
      })
  }
  componentDidMount () {
    axios({
      url: `${apiUrl}/workouts/${this.props.id}/`,
      method: 'GET',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      }
    })
      .then(response => {
        this.setState({
          workout: response.data.workout
        })
        return axios({
          url: `${apiUrl}/clients/${this.state.workout.client}/`,
          method: 'GET',
          headers: {
            Authorization: 'Token ' + `${this.state.token}`
          }
        })
      })
      .then(response => {
        this.setState({
          client: response.data.client
        })
      })
      .catch(console.error)
  } // componentDidMount

  render () {
    console.log(this.state)
    return (
      <div className='top-of-create'>
        <h1 className='email-addy'>{this.props.user.email}</h1>
        <div className='create-stack'>
          <div className='create-header'>
            <h3 className='title'>Create a new workout</h3>
          </div>
          <Col>
            <Form onSubmit={this.handleSubmit} >
              <h5 className='name'>Client: {this.state.client.name}</h5>
              <Form.Label className='title'><h5>Date:</h5></Form.Label>
              <Form.Control name='rx_date' id='rx_date' onChange={this.handleChange} type='text' value={this.state.workout.rx_date} />
              <Form.Label className='title'><h5>Notes:</h5></Form.Label>
              <Form.Control name='notes' id='notes' onChange={this.handleChange} type='text' value={this.state.workout.notes} />
              <Button variant='primary' type='submit' className='create-submit'> Submit </Button>
            </Form>
            <Button variant='primary' onClick={this.showEditModal}> Add Exercise </Button>
          </Col>
          <Modal show={this.state.showEdit} client={this.state.client} handleClose={this.hideEditModal} handleEditSubmit={this.handleEditSubmit} handleEditChanges={this.handEditChanges}>
            <Col className='coach-data'>
              <Form onSubmit={this.handleExerciseSubmit}>
                <h2 className='name'>{this.state.client.name}</h2>
                <h4 className='email-addy'>{this.state.client.email}</h4>
                <h4 className='title'>Client Goals: </h4> <p className='content'> {this.state.client.notes} </p>
                <h5 className='big3name'>Exercise: <Form.Control placeholder='Exercise Name' name='name' id='name' type='text' onChange={this.handleExerciseChange}/></h5>
                <h5 className='big3name'>Sets: <Form.Control placeholder='Number of Sets' name='sets' id='sets' type='number' min='0' onChange={this.handleExerciseChange}/></h5>
                <h5 className='big3name'>Repetitions: <Form.Control placeholder='Number of Repetitions' name='repetitions' id='repetitions' type='number' min='0' onChange={this.handleExerciseChange}/></h5>
                <h4 className='title'>Intensity (fill out one): </h4>
                <h5 className='big3name'>Percentage?: <Form.Control placeholder='% of 1RM target for work sets' name='rx_percentage' id='rx_percentage' type='number' min='0' onChange={this.handleExerciseChange}/></h5>
                <h5 className='big3name'>RPE?: <Form.Control placeholder='Target RPE' name='rx_rpe' id='rx_rpe' type='number' min='0' onChange={this.handleExerciseChange}/></h5>
                <h5 className='big3name'>Weight: <Form.Control placeholder={this.state.exercise.weight} name='weight' id='weight' type='number' min='0' onChange={this.handleExerciseChange}/></h5>
                <Button type='submit'>Update</Button>
              </Form>
            </Col>
          </Modal>
        </div>
      </div>
    )
  }
}
export default withRouter(EditWorkout)
