import { useState } from "react";
import ControlPanel from "./ControlPanel";
import './Admin.css';

const Admin = () => {
    const [creds, set_creds] = useState({ username: '', password: '' })
    const [login_state, set_login_state] = useState({ message: '', login: false })
    const base_url = '' // http://localhost:5000

    const sendCreds = (e) => {
        e.preventDefault()
        fetch(base_url + '/api/check_credentials', {
            method: 'POST',
            body: JSON.stringify(creds),
            headers: {
                'Access-Control-Allow-Origin': 'localhost:5000',
                'Access-Control-Allow-Credentials': true
            }
        }).then(response => response.json())
            .then(data => {
                if (data['login_state'] === true) {
                    localStorage.setItem('username', creds['username'])
                }
                set_login_state({ login: data['login_state'], message: data['message'] })
            })
            .catch((error) => {
                set_login_state({ login: false, message: 'An error occured, please try again.' })
            });
    }

    return (
        <div>
            {login_state.login === true ? <ControlPanel username={creds['username']} base_url={base_url}/> :
                <div className='login_component'>
                    <h2>Login Into Admin Panel</h2>
                    <form method="post">
                        <div className="container">
                            <label htmlFor="uname"><b>Username</b></label>
                            <input type="text" placeholder="Enter Username" name="uname" required onChange={(e) => { set_creds({ ...creds, username: e.target.value }) }} />
                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" required onChange={(e) => { set_creds({ ...creds, password: e.target.value }) }} />
                            <button type="submit" onClick={sendCreds}>Login</button>
                        </div>
                    </form>
                    <br></br>
                    <h3>{!login_state.login ? login_state.message : null}</h3>
                </div >}
        </div>
    );
}

export default Admin;