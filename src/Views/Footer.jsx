
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

const Footer = () => {
  return (
    <footer className="bg-primary text-light mt-5 p-4">
      <Container>
        <Row className="align-items-center">
          <Col md={4}>
            <Link to={'/Home'}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/4483/4483015.png"
                alt="Logo"
                style={{ width: '70px' }} 
              />
            </Link>
          </Col>
          <Col md={8}>
            <p className="text-center">
              &copy; {new Date().getFullYear()} GlowUp. Todos los derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
