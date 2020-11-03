import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#">Home</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment><DropdownButton id="dropdown-basic-button" title="Coach Options">
    <Dropdown.Item href="#sign-up">Sign Up</Dropdown.Item>
    <Dropdown.Item href="#sign-in">Sign In</Dropdown.Item>
  </DropdownButton>
  <DropdownButton id="dropdown-basic-button" title="Client Options">
    <Dropdown.Item href="#client-sign-up">Sign Up</Dropdown.Item>
    <Dropdown.Item href="#client-sign-in">Sign In</Dropdown.Item>
  </DropdownButton>
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
