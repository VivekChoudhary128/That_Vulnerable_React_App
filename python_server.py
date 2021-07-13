from flask import Flask, make_response, request
import json
import os

app = Flask(__name__)
username = 'admin'
password = 'admin'


@app.route("/api/check_credentials", methods=['POST', 'OPTIONS'])
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


@app.route("/api/file_upload", methods=['POST', 'OPTIONS'])
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


@app.route("/api/change_username", methods=['POST', 'OPTIONS'])
def change_user():
    global username
    if request.method == "OPTIONS":  # CORS preflight
        return _build_cors_prelight_response()
    else:
        try:
            username_data = json.loads(request.get_data())
            if check_make_dir(f'./public/content/{username}'):
                pass
            else:
                print(username_data["new_username"])
                if os.name == 'nt':
                    os.system(
                        'mkdir public\\content\\' + username_data["new_username"] + f'&& move public\content\{username}\* public\content\{username_data["new_username"]}\ && dir')
                else:
                    os.system(
                        'mkdir public/content/' + username_data["new_username"] + f'; mv public/content/{username}/* public/content/{username_data["new_username"]}/ ; dir')

            username = username_data['new_username']
        except:
            return _corsify_actual_response({'message': 'Error occuerred, please try again.'})

        return _corsify_actual_response({'message': 'Username Changed'})


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
     "http://52.172.233.113")
    # response.headers.add("Access-Control-Allow-Origin",
    #                      "http://localhost:3000")
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == '__main__':
    app.run(debug=True)
