import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { withRouter, Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
import Modal from '../AddExercise/AddExerciseModal'
import { FaSearch } from 'react-icons/fa'
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'

class EditWorkout extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
    this.state = {
      workout: {
        id: '',
        notes: '',
        client: '',
        date: ''
      },
      exercise: {
        id: '',
        name: '',
        sets: '',
        repetitions: '',
        rx_rpe: '',
        rx_percentage: '',
        weight: '',
        notes: ''
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
      showEdit: false,
      valueOfDropdown: 'Click drop down to choose.',
      dropdownButtonTitle: 'Set Intensity',
      nameOfDropdown: ''
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

  handleDropdownClick = (event) => {
    const userInput = event.target.name
    let title = ''
    let value = ''
    if (userInput === 'rx_percentage') {
      title = 'Percent of 1RM'
      value = 'i.e. 75'
    } else if (userInput === 'rx_rpe') {
      title = 'RPE'
      value = 'i.e. 7'
    } else if (userInput === 'weight') {
      title = 'Weight'
      value = 'i.e. 315'
    }
    // updating the state with our new copy
    this.setState({
      valueOfDropdown: value,
      dropdownButtonTitle: title,
      nameOfDropdown: userInput
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
    console.log(this.state.workout)
    axios({
      url: `${apiUrl}/workouts/${this.props.id}/`,
      method: 'PATCH',
      headers: {
        Authorization: 'Token ' + `${this.state.token}`
      },
      data: {
        workout: workout
      }
    })
      .then(() => msgAlert({
        heading: 'Workout Updated With Success',
        message: messages.uploadWorkoutSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/edit-workout/${this.state.workout.id}`))
      .catch(error => {
        msgAlert({
          heading: 'Could not upload a new workout, failed with error: ' + error.messages,
          message: messages.uploadWorkoutFailure,
          variant: 'danger'
        })
      })
  }

  handleIntensityChange = (event) => {
    // get the value that the user typed in
    const userInput = event.target.value
    // get the name of the input that the user typed in
    const exerciseKey = event.target.name
    // make a copy of the state
    console.log(this.state.exercise.name)
    if (exerciseKey === 'rx_percentage') {
      let targetWeight = 0
      let targetRPE = 0
      let roundTargetWeight = 0
      if (this.state.exercise.name.toLowerCase() === 'squat') {
        targetWeight = Math.floor((userInput / 100) * this.state.client.squat1RM)
        roundTargetWeight = Math.ceil(targetWeight / 5) * 5
        targetRPE = Math.floor(userInput / 10)
      } else if (this.state.exercise.name.toLowerCase() === 'deadlift') {
        targetWeight = Math.floor((userInput / 100) * this.state.client.deadlift1RM)
        roundTargetWeight = Math.ceil(targetWeight / 5) * 5
        targetRPE = Math.floor(userInput / 10)
      } else if (this.state.exercise.name.toLowerCase() === 'bench' || this.state.exercise.name.toLowerCase() === 'bench press') {
        targetWeight = Math.floor((userInput / 100) * this.state.client.bench1RM)
        roundTargetWeight = Math.ceil(targetWeight / 5) * 5
        targetRPE = Math.floor(userInput / 10)
      }
      const exerciseCopy = Object.assign({}, this.state.exercise) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
      // Object.assign({}, object-to-copy) allows you to combine two objects
      // updating the key in our state with what the user typed in
      exerciseCopy['rx_percentage'] = userInput
      exerciseCopy['rx_rpe'] = targetRPE
      exerciseCopy['weight'] = roundTargetWeight
      exerciseCopy['workout'] = this.state.workout.id
      // updating the state with our new copy
      this.setState({ exercise: exerciseCopy
      })
    } else if (exerciseKey === 'rx_rpe') {
      let targetWeight = 0
      let targetPercent = 0
      if (this.state.exercise.name.toLowerCase() === 'squat') {
        targetWeight = Math.floor((userInput / 10) * this.state.client.squat1RM)
        targetPercent = userInput * 10
      } else if (this.state.exercise.name.toLowerCase() === 'deadlift') {
        targetWeight = Math.floor((userInput / 10) * this.state.client.deadlift1RM)
        targetPercent = userInput * 10
      } else if (this.state.exercise.name.toLowerCase() === 'bench' || this.state.exercise.name.toLowerCase() === 'bench press') {
        targetWeight = Math.floor((userInput / 10) * this.state.client.bench1RM)
        targetPercent = userInput * 10
      }
      const exerciseCopy = Object.assign({}, this.state.exercise) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
      // Object.assign({}, object-to-copy) allows you to combine two objects
      // updating the key in our state with what the user typed in
      exerciseCopy['rx_rpe'] = userInput
      exerciseCopy['rx_percentage'] = targetPercent
      exerciseCopy['weight'] = targetWeight
      exerciseCopy['workout'] = this.state.workout.id
      // updating the state with our new copy
      this.setState({ exercise: exerciseCopy
      })
    } else if (exerciseKey === 'weight') {
      let targetPercent = 0
      let targetRPE = 0
      if (this.state.exercise.name.toLowerCase() === 'squat') {
        targetPercent = Math.floor((userInput / this.state.client.squat1RM) * 100)
        targetRPE = Math.floor(userInput / this.state.client.squat1RM * 10)
      } else if (this.state.exercise.name.toLowerCase() === 'deadlift') {
        targetPercent = Math.floor((userInput / this.state.client.deadlift1RM) * 100)
        targetRPE = Math.floor(userInput / this.state.client.deadlift1RM * 10)
      } else if (this.state.exercise.name.toLowerCase() === 'bench' || this.state.exercise.name.toLowerCase() === 'bench press') {
        targetPercent = Math.floor((userInput / this.state.client.bench1RM) * 100)
        targetRPE = Math.floor(userInput / this.state.client.squat1RM * 10)
      }
      const exerciseCopy = Object.assign({}, this.state.exercise) // to get the original state of the run and to copy it into another object to bypass inability to assign to a state
      // Object.assign({}, object-to-copy) allows you to combine two objects
      // updating the key in our state with what the user typed in
      exerciseCopy['rx_percentage'] = targetPercent
      exerciseCopy['rx_rpe'] = targetRPE
      exerciseCopy['weight'] = userInput
      exerciseCopy['workout'] = this.state.workout.id
      this.setState({ exercise: exerciseCopy
      })
    }
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
  const { msgAlert } = this.props
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
        createdExerciseId: response.data.exercise.id,
        showEdit: false
      })
    )
    .then(() => msgAlert({
      heading: 'New Exercise Created With Success',
      message: messages.uploadExerciseSuccess,
      variant: 'success'
    }))
    .then(() => {
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
        heading: 'Could not upload a new Exercise, failed with error: ' + error.messages,
        message: messages.uploadExerciseFailure,
        variant: 'danger'
      })
    })
}

handleDeleteExercise = (event) => {
  const { msgAlert } = this.props
  const exerciseId = event.target.name
  axios({
    url: `${apiUrl}/exercises/${exerciseId}/`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token ' + `${this.state.token}`
    }
  })
    .then(() => msgAlert({
      heading: 'Successfully Deleted Exercise',
      message: messages.deleteExerciseSuccess,
      variant: 'success'
    }))
    .then(() => {
      return axios({
        url: `${apiUrl}/exercises/`,
        method: 'GET',
        headers: {
          Authorization: 'Token ' + `${this.state.token}`
        }
      })
    }
    )
    .then(response => {
      console.log(response.data.exercises)
      this.setState({
        exercises: response.data.exercises
      })
    })
    .catch(error => {
      msgAlert({
        heading: 'Could not delete the exercise, failed with error: ' + error.messages,
        message: messages.deleteExerciseFailure,
        variant: 'danger'
      })
    })
    .catch(console.error)
}

handleDeleteExerciseCancel = (event) => (
  console.log(event.target)
)

handleDeleteWorkout = (event) => {
  const { msgAlert, history } = this.props
  const workoutId = event.target.name
  axios({
    url: `${apiUrl}/workouts/${workoutId}/`,
    method: 'DELETE',
    headers: {
      Authorization: 'Token ' + `${this.state.token}`
    }
  })
    .then(() => msgAlert({
      heading: 'Successfully Deleted Workout',
      message: messages.deleteWorkoutSuccess,
      variant: 'success'
    }))
    .then(() => history.push(`/client-dashboard/${this.state.client.id}`))
    .catch(console.error)
}

handleDeleteWorkoutCancel = (event) => (
  console.log('cancel')
)

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
    .catch(console.error)
} // componentDidMount

render () {
  console.log(this.state)
  const jsxExerciseList = this.state.exercises.map(exercise => {
    if (exercise.workout === this.state.workout.id) {
      return (
        <div key={exercise.id} size="4" className='exercise-header'>
          <Row className ='row-exercise-db'>
            <Col className='card-header'>
              <h5><Link to={`/exercise-dashboard/${exercise.id}`}><FaSearch className='magnifying-glass'/></Link>
                &emsp; {exercise.name}
              </h5>
            </Col>
            <Col>
              <DropdownButton
                as={InputGroup.Prepend}
                variant="primary"
                title="Delete Exercise"
                id="input-group-dropdown-1"
              >
                <Dropdown.Item name={exercise.id} eventKey={exercise.id} onClick={this.handleDeleteExercise}>Delete</Dropdown.Item>
                <Dropdown.Item name={exercise.id} eventKey={exercise.id} onClick={this.handleDeleteExerciseCancel}>Cancel</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row>
            <Col>
              Sets: &emsp; {exercise.sets}
            </Col>
            <Col>
              Repetitions: &emsp; {exercise.repetitions}
            </Col>
            <Col>
            Percentage target: &emsp; {exercise.rx_percentage}
            </Col>
            <Col>
          RPE target: &emsp; {exercise.rx_rpe}
            </Col>
            <Col>
          Target work weight: &emsp; {exercise.weight}
            </Col>
          </Row>
        </div>
      )
    }
  })
  return (
    <div className='top-of-create'>
      <h1 className='email-addy'>{this.props.user.email}</h1>
      <div className='create-stack'>
        <div className='create-header'>
          <h3 className='title'>Make Changes to Your Workout:</h3>
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
          <Link to={`/client-dashboard/${this.state.client.id}`}><Button variant='primary'> Return to Client Dashboard</Button></Link>
          {jsxExerciseList}
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
              <h4 className='title'>Intensity (based on): </h4>
              <InputGroup className="mb-3">
                <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  title={this.state.dropdownButtonTitle}
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item name='rx_percentage' onClick={this.handleDropdownClick}>Percentage</Dropdown.Item>
                  <Dropdown.Item name='rx_rpe' onClick={this.handleDropdownClick}>RPE</Dropdown.Item>
                  <Dropdown.Item name='weight' onClick={this.handleDropdownClick}>Weight used</Dropdown.Item>
                </DropdownButton>
                <FormControl aria-describedby="basic-addon1" name={this.state.nameOfDropdown} placeholder={this.state.valueOfDropdown}type='number' min='0' step='0.1' onChange={this.handleIntensityChange}/>
              </InputGroup>
              <h5 className='big3name'>Percentage: {this.state.exercise.rx_percentage} </h5>
              <h5 className='big3name'>RPE: {this.state.exercise.rx_rpe}</h5>
              <h5 className='big3name'>Weight: {this.state.exercise.weight}</h5>
              <h5 className='big3name'>Notes: <Form.Control placeholder='Notes' name='notes' id='names' type='text' onChange={this.handleExerciseChange}/></h5>
              <Button type='submit'>Update</Button>
            </Form>
          </Col>
        </Modal>
        <DropdownButton
          as={InputGroup.Prepend}
          variant="secondary"
          title="Delete Workout"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item name={this.state.workout.id} onClick={this.handleDeleteWorkout}>Delete</Dropdown.Item>
          <Dropdown.Item name='cancel' onClick={this.handleDeleteWorkoutCancel}>Cancel</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  )
}
}
export default withRouter(EditWorkout)
