import {collection, getDocs, getFirestore, query} from "firebase/firestore";
import {useEffect, useState} from "react";
import "./Posts.css";
import CommentSection from "../components/CommentSection";
import {Button, Modal} from "react-bootstrap";

export default function Posts() {
    const data = getFirestore();
    const [posts, setPosts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState('');

    useEffect(() => {
        fetchData();
        document.title = 'Блог';
    }, []);

    const collectionRef = collection(data, "posts");

    const fetchData = async () => {
        let q = query(collectionRef);
        const data = await getDocs(q);
        let eventsData = [];
        data.docs.forEach(doc => {
            const name = doc.data()['name'];
            const text = doc.data()['text'];
            const image = doc.data()['image'];
            eventsData.push({id: doc.id, name, text, image, ...doc.data()});
            setPosts(eventsData);
        })
    }

    const handleOpenModal = (post) => {
        setCurrentPost(post);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            {posts.map((post, index) => (
                post.id < 5 &&
                <div className="post-card" key={index}>
                    <img src={post.image} alt="Post" className="post-image"
                         onClick={() => handleOpenModal(post)}/>
                    <Modal show={isOpen} onHide={handleCloseModal} centered size="lg">
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                            <img src={currentPost.image} alt="Зображення"
                                 className="large-image" style={{ width: '100%' }} />
                        </Modal.Body>
                    </Modal>
                    <div className="post-content">
                        <div className="post-title">{post.name}</div>
                        <div className="post-text">{post.text}</div>
                        <CommentSection postId={post.id} />
                    </div>
                </div>
            ))}
            {posts.map((post, index) => (
                post.id == 5 &&
                <div className="post-card" key={index}>
                    <iframe width="400" height="200" src={post.image}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <div className="post-content">
                        <div className="post-title">{post.name}</div>
                        <div className="post-text">{post.text}</div>
                        <CommentSection postId={post.id}/>
                    </div>
                </div>
            ))}
        </div>
    )
}
