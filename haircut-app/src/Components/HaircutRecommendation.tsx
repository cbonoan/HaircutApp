import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/esm/Accordion";
import ListGroup from "react-bootstrap/esm/ListGroup";

interface IHaircutRecommendation {
    details: {
        haircutName: string,
        haircutInstructions: string,
        haircutStyling: string,
        hairLength: string,
    }
}

const HaircutRecommendation = ({ details }: IHaircutRecommendation) => {
    const {
        haircutName,
        haircutInstructions,
        hairLength: haircutLength,
        haircutStyling,
    } = details;

    return (
        <Card bg="dark" text="light" className="mb-3">
            <Card.Body>
                <Card.Title className="text-center mb-3">{haircutName}</Card.Title>

                <ListGroup variant="" className="mb-3">
                    <ListGroup.Item variant="dark"><strong>Hair Length: </strong>{haircutLength}</ListGroup.Item>
                </ListGroup>

                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Instructions for Hairstylist</Accordion.Header>
                        <Accordion.Body>
                            {haircutInstructions}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Instructions for Styling</Accordion.Header>
                        <Accordion.Body>
                            {haircutStyling}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
    );
}

export default HaircutRecommendation;