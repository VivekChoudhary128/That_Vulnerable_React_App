from flask import Flask, make_response, request
import json
import os

app = Flask(__name__)
username = 'a'
password = 'a'


@app.route("/check_credentials", methods=['POST', 'OPTIONS'])
def index():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_prelight_response()
    else:
        creds = json.loads(request.get_data())
        login = False
        message = 'Username and Password is wrong'
        if creds['username'] == username and creds['password'] == password:
            login = True
            message = 'Login Successful!!'
        elif creds['username'] == username and creds['password'] != password:
            login = False
            message = 'Password is Wrong!'
        elif creds['username'] != username and creds['password'] == password:
            login = False
            message = 'Username is Wrong!'

        return _corsify_actual_response({'login_state': login, 'message': message})


@app.route("/file_upload", methods=['POST', 'OPTIONS'])
def file_upload():
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_prelight_response()
    else:
        try:
            file = request.files['file']
            check_make_dir('./public/content/' + username)
            file.save("./public/content/" + username + '/' + file.filename)
            return _corsify_actual_response({'message': 'File Uploaded', 'filename': file.filename})
        except:
            return _corsify_actual_response({'message': 'Error occured, please try again'})


@app.route("/change_username", methods=['POST', 'OPTIONS'])
def change_user():
    global username
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_prelight_response()
    else:
        username_data = json.loads(request.get_data())
        if check_make_dir(f'./public/content/{username}'):
            pass
        else:
            if os.name == 'nt':
                os.system(
                    f'mkdir public\content\{username_data["new_username"]} && move public\content\{username}\* public\content\{username_data["new_username"]}\ && dir')
            else:
                os.system(
                    f'mkdir public/content/{username_data["new_username"]}; mv public/content/{username}/* public/content/{username_data["new_username"]}/ ; dir')

        username = username_data['new_username']
        return _corsify_actual_response({'message': 'Username Changed'})

# create a dir. if it doesn't exist


def check_make_dir(path):  # USE DOUBLE BACK SLASH.
    if not os.path.isdir(path):
        if os.name == 'nt':
            path = path.replace('/', '\\')
        os.system('mkdir ' + path)
        return True
    return False


def _build_cors_prelight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response


def _corsify_actual_response(response):
    response = make_response(response)
    response.headers.add("Access-Control-Allow-Origin",
                         "http://localhost:3000")
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    app.run(debug=True)
