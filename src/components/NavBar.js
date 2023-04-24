import { Navbar, Container, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import tom from '../assets/img/tom.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';


export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(true);
        }

        window.addEventListener("scroll", onscroll);

        return () => window.removeEventListener("scroll", onscroll)
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    return (
        <Navbar expand="lg" className={scrolled ? "scrolled animate__animated animate__slideInLeft" : ""}>
            <Container>
                <Navbar.Brand href="#home">
                    <img src={tom} alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" >
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                        <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
                        <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
                    </Nav>
                    <span className="navbar-text">
                        <div className="social-icon">
                            <a href='#'><img src={navIcon1} alt="" /></a>
                            <a href='#'><img src={navIcon2} alt="" /></a>
                            <a href='#'><img src={navIcon3} alt="" /></a>
                        </div>
                        <Nav.Link href="#contact" id="vvd" onClick={() => onUpdateActiveLink('contact')}>Let's Connect</Nav.Link>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}