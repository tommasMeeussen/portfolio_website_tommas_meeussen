import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap"
import { ArrowRightCircle } from "react-bootstrap-icons";
import memoji from "../assets/img/tom_memoji.png"
import 'animate.css';

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const toRotate = ["Web Developer", "Web Designer", "Software Developer"]
    const [delta, setDelta] = useState('');
    const period = 2000;
    const ref1 = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(true);


    useEffect(() => {
        let ticker = setInterval(() => {
            tick()
        }, delta)

        return () => { clearInterval(ticker) };
    }, [text])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
        );
        observer.observe(ref1.current);
        return () => observer.disconnect();
    }, []);


    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 1.2)
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }

    }

    return (
        <div className="banner" id="home">
            <div ref={ref1} className={isIntersecting ? 'bannerCard animate__animated animate__slideInRight' : 'bannerCard'}>
                <Container className="d-flex justify-content-center">
                    <Row>
                        <Col>
                            <img src={memoji} alt="Logo" />
                            <h1>{"Hi, Im Tommas Meeussen"}<br /><span className="wrap">- {text}</span></h1>
                            <span className="tagline">Welcome to my portfolio</span>
                            <p>I am a highly motivated and progress-focused software developer, with a track record of initiative and dependability.</p>
                            <Nav.Link className="con-link" href='#contact'>Let's connect <ArrowRightCircle size={25} /></Nav.Link>
                        </Col>
                    </Row>

                </Container>
            </div>
        </div >

    )
}

