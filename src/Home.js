import { useState, useRef, useEffect } from "react";
import './home.css'

export const About = () => {
    return (
        <h1 classNameName='about_css'>this is a good website.</h1>
    )
}

const base_url = 'http://localhost:5000'

export const Feedback = () => {
    const [comments, set_comments] = useState([])
    const new_comment = useRef()

    useEffect(() => {
        fetch(base_url + '/api/get_comments', {
            method: 'GET',
        }).then(
            response => response.json()
        ).then((e) => {
            set_comments([...comments, e.comments])
        }
        ).catch(() => {
            console.log('error in getting comments')
        }
        );
    }, [])

    const send_comment = (e) => {
        e.preventDefault()
        fetch(base_url + '/api/set_comment', {
            method: 'POST',
            body: new_comment.current.value
        }).then(
            response => response.json()
        ).then((e) => {
            console.log('comment added')
            // set_comments(e.comments)
        }
        ).catch(() => {
            console.log('error in getting comments')
        }
        );
    }

    return (
        <div>
            {comments !== undefined ? comments.map((com, key) => (com !== '[]' ?
                <input type="text" className="form-control" id={key} key={key} defaultValue={com} disabled /> : null
            )) : null
            }
            <h4>add a new comment</h4>
            <input type="text" className="form-control" id="new_comment" ref={new_comment} placeholder="..." />
            <span>            </span>
            <button id='add_comm' onClick={send_comment}>Add comment</button>
        </div>
    )
}

export const Contact = () => {
    return (
        <div>
            contact me : vivek.choudhary@ncr.com
        </div>
    )
}

export const Navbar = ({ children }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">SecureWebsite.org</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/feedback">Feedback</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>
            {children}
        </div>
    )
}
export const Home = () => {
    return (
        <div>
            <h1>Welcome to a very secure website</h1>
            <h5 style={{ position: 'absolute', top: '90%' }}>Go ahead, hack me.</h5>
            <h5 style={{ position: 'absolute', top: '90%', right: '1%' }}>:')</h5>
        </div>
    );
}

export default Home;