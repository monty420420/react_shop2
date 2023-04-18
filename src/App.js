import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './App.css';
import { useState } from 'react';
import a from './data.js'; //import

function App() {

  let [shoes] = useState();

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">shoeshop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div className='main-bg'></div>
    <div className='container'>
      <div className='row'>
           <div className='col-md-4'>
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%"></img>
            {/* <img src="/logo192.png" width="80%"></img> public폴더 이미지 불러오기 /이용*/}
            <h4>상품명</h4>
            <p>상품설명</p>
           </div>
           <div className='col-md-4'><img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%"></img>
           <h4>상품명</h4>
            <p>상품설명</p>
            </div>
           <div className='col-md-4'><img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%"></img>
           <h4>상품명</h4>
            <p>상품설명</p>
            </div>
      </div>
    </div>
    </div>
  );
}

export default App;
