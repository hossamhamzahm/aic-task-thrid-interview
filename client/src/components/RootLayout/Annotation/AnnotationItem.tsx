import React, { MouseEventHandler, useEffect, useState } from "react";
import { Card, ListGroup, Spinner, Button, Form } from "react-bootstrap";
import config from "../../../config";
import axios from "axios";


interface Image {
    id: string;
    file_name: string;
    category: string;
    file_extension?: string;
}


const AnnotationItem: React.FC = () => {
    const [image, setImage] = useState<Image>({id: "", file_name: "", category: ""})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<undefined | Error>(undefined);

    const handle_submit = (e: MouseEvent<HTMLInputElement>) => {

    }

    const fetch_image = async () => {
        try{
            const req = await axios.get(`${config.base_url}/annotations`)
            console.log(req.data)
            setImage(req.data)
            setIsLoading(false)
        }
        catch(e: unknown){
            console.log(e);
        }
    }

    useEffect(() => {
        fetch_image()
    }, []);


    if (error) {
        return <code className="d-block m-auto">{error.message}</code>
    }
    
    if(isLoading){
        return <Spinner className="d-block m-auto" animation="border" variant="primary" />
    }

    return (
        <Card className="m-auto" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${config.base_url}/images/${image.id}`} />
            <Card.Body>
                <Card.Title>Classify the above image</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    <Form.Select>
                        <option>Category</option>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                        <option value="neither">Neither</option>
                    </Form.Select>
                </ListGroup.Item>
                
                <ListGroup.Item>Add extra annotation</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <form>
                    <Button variant="danger" onClick={handle_submit}>Send</Button>
                </form>
            </Card.Body>
        </Card>
    )
}

export default AnnotationItem;