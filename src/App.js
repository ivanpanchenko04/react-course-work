import './App.css';
import Events from "./pages/Events";
import {initializeApp} from "firebase/app";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EventDetails from "./pages/EventDetails";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";

function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyCxfvX3B6PMp_PWzkqoUUszJmPZTCCFvbg",
        authDomain: "ticketsapp-ec3bf.firebaseapp.com",
        projectId: "ticketsapp-ec3bf",
        storageBucket: "ticketsapp-ec3bf.appspot.com",
        messagingSenderId: "674619519792",
        appId: "1:674619519792:web:2448e997ebc24751dd4ef5",
        measurementId: "G-4PND10WQDE"
    };

    initializeApp(firebaseConfig);

    return (
        <div className="App">
            <Header/>
            <div className="App-pages">
                <Router>
                    <Routes>
                        <Route path="/" element={<Events/>}/>
                        <Route path="/event/:id" element={<EventDetails/>}/>
                        <Route path="/posts" element={<Posts/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                    </Routes>
                </Router>
            </div>
            <div className="App-footer">
                <Footer/>
            </div>
        </div>
    );
}

export default App;
