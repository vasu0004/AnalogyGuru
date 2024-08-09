// src/components/Header.js
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

function Header() {
  return (
    <header className='hea'>
      <Navbar bg="light" expand="lg">
        <Container className='head'>
          
           
         
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link className='appname' href="#home">AnalogyGuru</Nav.Link>
              <Nav.Link className='headerobj' href="#home">Home</Nav.Link>
              <Nav.Link className='headerobj'href="#about">About</Nav.Link>
              <Nav.Link className='headerobj'href="#portfolio">Portfolio</Nav.Link>
              <Nav.Link className='headerobj'href="#services">WhatIDo</Nav.Link>
              <Nav.Link className='headerobj'href="#contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link className='ico' href="https://github.com/vasu0004" target="_blank"><FaGithub /></Nav.Link>
              <Nav.Link  className='ico'href="https://linkedin.com/in/vasantha-lakshmi-3b7941250" target="_blank"><FaLinkedin /></Nav.Link>
              <Nav.Link  className='ico'href="vasanthalakshmi.v04@gmail.com"><FaEnvelope /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;