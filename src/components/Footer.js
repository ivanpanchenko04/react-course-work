import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-item">
                    <span>AllTickets</span>
                </div>
                <div className="footer-item">
                    <a href="/" className="footer-link">Квитки</a>
                    <a href="/posts" className="footer-link">Блог</a>
                </div>
                <div className="footer-item">
                    <a href="/profile" className="footer-link">Created by Ivan Panchenko</a>
                </div>
            </div>
        </footer>
    );
}
