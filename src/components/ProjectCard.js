import { Col, Row, Container, Nav } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl }) => {
    return (
        // <Col >
        //     <div className="proj-imgbx">
        //         <img src={imgUrl} alt="projImg" />
        //         <div className="proj-txtx">
        //             <h4>{title}</h4>
        //             <span>{description}</span>
        //         </div>
        //     </div>
        // </Col>
        <Container className="d-flex justify-content-center project-card">
            <Row >

                <Col>

                    <h1 className="text-6xl">{title}</h1>
                    <p>{description}</p>
                    <Nav.Link className="con-link" href='#contact'>Let's connect</Nav.Link>
                </Col>
                <Col className="col-sm">
                    <img src={imgUrl} alt="Logo" />
                </Col>


            </Row>
        </Container>
    )
}