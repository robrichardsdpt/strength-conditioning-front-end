import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import ClientSignUp from '../SignUp/ClientSignUp'
import ClientSignIn from '../SignIn/ClientSignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Landing from '../Landing/Landing'
import Dashboard from '../Dashboard/Dashboard'
import CoachDashboard from '../Dashboard/CoachDashboard'
import ClientDashboard from '../Dashboard/ClientDashboard'
import Connect from '../Connect/Connect'
import CreateClient from '../CreateClient/CreateClient'
import AddClientInfo from '../AddClientInfo/AddClientInfo'
import AddWorkout from '../AddWorkout/AddWorkout'
import EditWorkout from '../EditWorkout/EditWorkout'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Landing />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/client-sign-up' render={() => (
            <ClientSignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/client-sign-in' render={() => (
            <ClientSignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/dashboard' render={() => (
            <Dashboard msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={this.state.user} path='/coach-dashboard' render={() => (
            <CoachDashboard
              msgAlert={this.msgAlert}
              user={this.state.user} />
          )} />
          <AuthenticatedRoute user={this.state.user} path='/create-client' render={() => (
            <CreateClient
              msgAlert={this.msgAlert}
              user={this.state.user} />
          )} />
          <AuthenticatedRoute user={this.state.user} path='/add-workout/:id' render={(userClientProps) => {
            const { match, history } = userClientProps
            const currentClientId = match.params.id
            return (
              <AddWorkout
                id={currentClientId}
                msgAlert={this.msgAlert}
                user={this.state.user}
                history={history} />
            )
          }} />
          <AuthenticatedRoute user={this.state.user} path='/edit-workout/:id' render={(userWorkoutProps) => {
            const { match, history } = userWorkoutProps
            const currentWorkoutId = match.params.id
            return (
              <EditWorkout
                id={currentWorkoutId}
                msgAlert={this.msgAlert}
                user={this.state.user}
                history={history}/>
            )
          }} />
          <AuthenticatedRoute user={this.state.user} path='/add-client-info' render={() => (
            <AddClientInfo
              msgAlert={this.msgAlert}
              user={this.state.user}
              client={this.state.client} />
          )} />
          <AuthenticatedRoute user={user} path='/client-dashboard/:id' render={(userClientProps) => {
            const { match, history } = userClientProps
            const currentClientId = match.params.id
            return (
              <ClientDashboard
                id={currentClientId}
                msgAlert={this.msgAlert}
                user={user}
                history={history}/>
            )
          }} />
          <AuthenticatedRoute user={this.state.user} path='/connect' render={() => (
            <Connect
              msgAlert={this.msgAlert}
              user={this.state.user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
