import './panel.css'
import { useRef, useState } from "react";

const ControlPanel = ({ username }) => {
    const ip_file = useRef()
    const user_name = useRef()
    const [message, set_message] = useState({ 'message': '' })

    const upload_file = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', ip_file.current.files[0])

        fetch('http://localhost:5000/file_upload', {
            method: 'POST',
            body: formData,
        }).then(
            response => response.json()
        ).then((e) => {
            if (e.message === 'File Uploaded') {
                var host = window.location.protocol + '//' + window.location.host + '/'
                var exist_files = localStorage.getItem('content')
                if (exist_files != null) {
                    localStorage.setItem('content', exist_files + ';' + host + 'content/' + username + '/' + e.filename)
                } else {
                    localStorage.setItem('content', host + 'content/' + username + '/' + e.filename)
                }
            }
            set_message({ 'message': e.message })
            ip_file.current.value = ''
        }
        ).catch(() => {
            set_message({ 'message': 'An error occured please try again.' })
            ip_file.current.value = ''
        }
        );
    }

    const change_username = (e) => {
        e.preventDefault()
        var username = user_name.current.value;

        fetch('http://localhost:5000/change_username', {
            method: 'POST',
            body: JSON.stringify({ 'new_username': username })
        }).then(
            response => response.json()
        ).then((e) => {
            set_message({ 'message': e.message })
        }
        ).catch(() => {
            set_message({ 'message': 'An error occured please try again.' })
        }
        );
    }

    const open_link_tab = (link) => {
        window.location.href = link;
    }

    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="file_upload_label">Upload Notes to Devs.</label>
                    <input type="file" className="form-control-file" ref={ip_file} id="file_upload" />
                </div>
                <button type="submit" className="btn btn-primary upload_file" onClick={upload_file}>Upload</button>
            </form>
            <br></br>
            <h5> Uploaded Notes </h5>
            <div>
                {
                    localStorage.getItem('content').split(';').map((file_url, key) => (
                        <div>
                            <a href={file_url} target='_blank' >{file_url}</a>
                            <br></br>
                        </div>
                    ))
                }
            </div>
            <br></br>
            <h5> Change Your Username </h5>
            <div className="form-group">
                <label htmlFor="new_username">Enter New Username: </label>
                <span>  </span>
                <input type="text" className="form-control" id="new_username" ref={user_name} placeholder="..." />
            </div>
            <button type="submit" className="btn btn-primary submit_username" onClick={change_username}>Submit</button>
            <h3>{message.message.length > 0 ? message.message : null}</h3>
        </div>
    );
}

export default ControlPanel;