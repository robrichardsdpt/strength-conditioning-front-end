import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#dashboard">Dashboard</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment><DropdownButton id="dropdown-basic-button" title="Sign Up">
    <Dropdown.Item href="#sign-up">Coach Sign Up</Dropdown.Item>
    <Dropdown.Item href="#client-sign-up">Lifter Sign Up</Dropdown.Item>
  </DropdownButton>
  <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      Lift Coach
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
