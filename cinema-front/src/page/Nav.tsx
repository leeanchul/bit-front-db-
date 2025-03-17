import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import axios from "axios";

function CustomNav() {
    const navigate = useNavigate()
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand >Cinema</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => navigate('/movie/movieAll/1')}>영화목록</Nav.Link>
                        <Nav.Link onClick={() => navigate('/cinema/cinemaAll/1')}>극장목록</Nav.Link>
                        <Nav.Link onClick={() => navigate('/cinema/cinemaTest/1')}>극장목록(TEST)</Nav.Link>
                        <Nav.Link onClick={() => navigate('/user')}>사용자 정보</Nav.Link>
                        <Nav.Link onClick={() => navigate('/info')}>내 정보</Nav.Link>
                    </Nav>
                    <Nav className="d-flex">
                        <Button variant="dark" onClick={()=>{
                            navigate('/')
                            localStorage.removeItem("token")
                            delete axios.defaults.headers.common["Authorization"];
                        }}>로그아웃</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CustomNav;