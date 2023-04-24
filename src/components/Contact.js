import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import emailjs from '@emailjs/browser';
//import 'animate.css';

export const Contact = () => {
    const formInitialDetails = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    }
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});
    const ref1 = useRef(null);

    const [isVisible, setIsVisible] = useState(true);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault(); // prevents the page from reloading when you hit “Send”
        setButtonText("Sending...");

        emailjs.sendForm('service_ykb7ga5', 'template_ka6249a', form.current, 'yKAvIpBOqkEUeLMqy')
            .then((result) => {
                // show the user a success message
                setStatus({ succes: true, message: 'Message sent successfully' });
                setButtonText("Send");
                setFormDetails(formInitialDetails)


            }, (error) => {
                // show the user an error
                setStatus({ succes: false, message: 'Something went wrong, please try again later.' });
                setButtonText("Send");

            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Sending...");
        let response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(formDetails),
        });
        setButtonText("Send");
        let result = await response.json();
        setFormDetails(formInitialDetails);
        if (result.code == 200) {
            setStatus({ succes: true, message: 'Message sent successfully' });
        } else {
            setStatus({ succes: false, message: 'Something went wrong, please try again later.' });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
        );
        observer.observe(ref1.current);
        return () => observer.disconnect();
    }, []);


    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }



    return (
        <section className="contact" id="contact">
            <Container>
                <Row className="align-items-center">
                    <Col size={24} md={12}>
                        <div ref={ref1}>
                            <h2 className={isVisible ? "animate__animated animate__slideInLeft" : ""}>Get In Touch</h2>
                            <form ref={form} onSubmit={sendEmail}>
                                <Row>
                                    <Col size={12} sm={6} className={isVisible ? "animate__animated animate__slideInLeft px-1" : "px-1"}>
                                        <input type="text" value={formDetails.firstName} placeholder="First Name" name="user_name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                                    </Col>
                                    <Col size={12} sm={6} className={isVisible ? "animate__animated animate__slideInRight px-1" : "px-1"}>
                                        <input type="text" value={formDetails.lasttName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)} />
                                    </Col>
                                    <Col size={12} sm={6} className={isVisible ? "animate__animated animate__slideInLeft px-1" : "px-1"}>
                                        <input type="email" value={formDetails.email} placeholder="Email Address" name="user_email" onChange={(e) => onFormUpdate('email', e.target.value)} />
                                    </Col>
                                    <Col size={12} sm={6} className={isVisible ? "animate__animated animate__slideInRight px-1" : "px-1"}>
                                        <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)} />
                                    </Col>
                                    <Col size={12} className={isVisible ? "animate__animated animate__slideInRight px-1" : "px-1"}>
                                        <textarea rows="6" value={formDetails.message} placeholder="Message" name="message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                                        <button type="submit" className="submit-button"><span>{buttonText}</span></button>
                                    </Col>
                                </Row>
                                <Row>
                                    {
                                        status.message &&
                                        <Col>
                                            <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                        </Col>
                                    }
                                </Row>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}