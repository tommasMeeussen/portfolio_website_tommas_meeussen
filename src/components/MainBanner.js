import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap"
import { ArrowRightCircle } from "react-bootstrap-icons";
import memoji from "../assets/img/tom_memoji_crop.png"
import 'animate.css';

export const Banner = () => {
    //  const [loopNum, setLoopNum] = useState(0);
    // const [isDeleting, setIsDeleting] = useState(false);
    const text = "Software Developer";
    // const [text, setText] = useState('');
    // const toRotate = ["Web Developer", "Web Designer", "Software Developer"]
    //  const [delta, setDelta] = useState('');
    //const period = 2000;
    const ref1 = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(true);

    // const tick = useCallback(() => {
    //     let i = loopNum % toRotate.length;
    //     let fullText = toRotate[i];
    //     let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

    //     setText(updatedText);

    //     if (isDeleting) {
    //         setDelta(prevDelta => prevDelta / 1.2)
    //     }

    //     if (!isDeleting && updatedText === fullText) {
    //         setIsDeleting(true);
    //         setDelta(period);
    //     } else if (isDeleting && updatedText === '') {
    //         setIsDeleting(false);
    //         setLoopNum(loopNum + 1);
    //         setDelta(500);
    //     }

    // }, [toRotate, isDeleting, loopNum, text.length]);


    // useEffect(() => {
    //     let ticker = setInterval(() => {
    //         tick()
    //     }, delta)

    //     return () => { clearInterval(ticker) };
    // }, [tick, delta])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!isIntersecting) {

                    setIsIntersecting(true);
                }
            },
        );
        observer.observe(ref1.current);
        return () => observer.disconnect();
    }, [isIntersecting]);




    return (
        <section className="banner" id="home" >
            <Container fluid className=".flex-wrap-reverse align-items-center d-flex justify-content-center">
                <Row ref={ref1} className={isIntersecting ? 'bannerCard animate__animated animate__slideInRight  align-items-center d-flex justify-content-center' : 'bannerCard'}>

                    <Col className=".order-sm-2 justify-content-center col-8 ">

                        <h1 className="text-6xl">{"Hi, Im Tommas Meeussen"}<br /><span className="wrap">- {text}</span></h1>
                        <p>I am a highly motivated and progress-focused software developer, with a track record of initiative and dependability. Multidisciplinary developer with a passion for problem solving and creativity </p>
                        <Nav.Link className="con-link" href='#contact'>Let's connect <ArrowRightCircle size={25} /></Nav.Link>
                    </Col>
                    <Col className="col-auto align-items-center d-flex justify-content-center ">
                        <img src={memoji} alt="Logo" />
                    </Col>


                </Row>
            </Container>
        </section >

    )
}

