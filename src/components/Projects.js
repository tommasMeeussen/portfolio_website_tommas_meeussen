import { Container, Row, Col } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import { useEffect, useRef, useState } from "react";

export const Projects = () => {

    const projects = [
        {
            title: "TimeClock",
            description: "Design & Development",
            imgUrl: projImg1,
        },
        {
            title: "VinVault",
            description: "Design & Development",
            imgUrl: projImg2,
        },

    ];

    const ref1 = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);



    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!isIntersecting) {
                    setIsIntersecting(entry.isIntersecting);
                }
            },
        );
        observer.observe(ref1.current);
        return () => observer.disconnect();
    }, [isIntersecting]);


    return (
        <section className="projects" id="projects">
            <Container className="d-flex justify-content-center">
                <Row>
                    <Col>
                        <div >
                            <h2>Projects</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <Col size={12} ref={ref1} className={isIntersecting ? "animate__animated animate__slideInLeft " : ""}>
                                {
                                    projects.map((project, index) => {
                                        return (
                                            <Row >
                                                <ProjectCard
                                                    key={index}
                                                    {...project}
                                                />
                                            </Row>
                                        )
                                    })
                                }
                            </Col>


                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}