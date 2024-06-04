import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getFirestore, doc, getDoc, Timestamp} from 'firebase/firestore';
import {Button} from "react-bootstrap";
import "./EventDetails.css";

export default function EventDetails() {
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const currentDate = new Date();

    const datePart = currentDate.toLocaleDateString('uk-UA', {
        month: 'long',
        day: 'numeric'
    });

    const timePart = currentDate.toLocaleTimeString('uk-UA', {
        hour: '2-digit',
        minute: '2-digit'
    });

    useEffect(() => {
        const fetchEvent = async () => {
            const db = getFirestore();
            const docRef = doc(db, "events", id);
            const docSnap = await getDoc(docRef);
            setEvent(docSnap.data());
        };
        fetchEvent();

        if (event) {
            document.title = event.artist;
        }

    }, [id, event]);

    const formatDate = (timestamp) => {
        if (timestamp instanceof Timestamp) {
            const date = timestamp.toDate();
            return date.toLocaleDateString('uk-UA', {
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        return "";
    };

    return (
        <div className="event">
            <div className="informer">
                <p>Зараз {`${datePart} ${timePart}`}</p>
            </div>
            {event && (
                <div className="event-details">
                    <div className="event-details-image">
                        <img src={event.image} alt="Event"/>
                    </div>
                    <div className="event-details-info">
                        <h2>{event.artist}</h2>
                        <h3>{event.name}</h3>
                        <p>{event.details}</p>
                        <p>{event.city}</p>
                        <div className="event-details-row">
                            <div className="event-details-pair">
                                <p>{formatDate(event.date)}</p>
                                <p>{event.location}</p>
                            </div>
                            <div className="event-details-pair">
                                <p>{event.price} грн</p>
                                <Button variant="dark">Замовити</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="map">
                <h3>Знайди потрібне місце</h3>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5589841.732761846!2d27.227764507317637!3d48.3794335026905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4737b25c5f342b2d%3A0xe95b86f6b2d5be75!2z0KHRgNCw0LnRgtC-0LzRltC90LDRjywg0LrRg9C70YzQutC40Lkg0LPQvtC70Y8!5e0!3m2!1suk!2sua!4v1699864385551!5m2!1suk!2sua"
                    width="600" height="450" style={{border: 0}} allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
}
