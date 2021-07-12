export const About = () => {
    return (
        <h1 classNameName='about_css'>this is a good website.</h1>
    )
}

export const Feedback = () => {
    return (
        <div>
            <img src='/feedback.jpg' alt='no meme juice today guys' style={{ position: 'absolute', height: '90%', left: '30%' }}></img>
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
            <h5 style={{position:'absolute', top: '90%'}}>Go ahead, hack me.</h5>
            <h5 style={{position:'absolute', top: '90%', right: '1%'}}>:')</h5>
        </div>
    );
}

export default Home;