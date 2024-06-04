import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "react-bootstrap";
import "./Events.css";
import {Link} from "react-router-dom";

export default function Events() {
    const data = getFirestore();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchData();
        document.title = 'Квитки';
    }, []);

    const collectionRef = collection(data, "events");

    const fetchData = async () => {
        let q = query(collectionRef);
        const data = await getDocs(q);
        let eventsData = [];
        data.docs.forEach(doc => {
            const name = doc.data()['name'];
            const artist = doc.data()['artist'];
            const city = doc.data()['city'];
            const location = doc.data()['location'];
            const date = doc.data()['date'];
            const price = doc.data()['price'];
            const image = doc.data()['image'];
            const details = doc.data()['details'];
            const dateString = date ? new Date(date.seconds * 1000).toLocaleDateString() : '';
            eventsData.push({id: doc.id, name, artist, city, location, dateString, price, image,
                details, ...doc.data()});
            setEvents(eventsData);
        })
    }

    return (
        <Container fluid>
            <Row className="event-row">
                {events.map((event, index) => (
                    <Col key={index}>
                        <div className="event-card">
                            <img src={event.image} alt="Event" className="event-image" />
                            <div className="event-artist">{event.artist}</div>
                            <div className="event-name">{event.name}</div>
                            <div className="event-city">{event.city}</div>
                            <div className="event-location">{event.location}</div>
                            <div className="event-date">{event.dateString}</div>
                            <div className="event-price">{event.price} грн</div>
                            <div className="event-button">
                                <Link to={`/event/${event.id}`}>
                                    <Button>Деталі</Button>
                                </Link>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}
