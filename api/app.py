import os, jwt
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from validate import validate_email_and_password, validate_user #validate_book
from models import User, db
from flask_cors import CORS
from auth_middleware import token_required

load_dotenv()

app = Flask(__name__, static_folder="../dist", static_url_path="/")
cors=CORS(app, resources={r'/api/v1/*':{'origins':'*'} })

SECRET_KEY = os.environ.get('SECRET_KEY') or 'kizomba'
print(SECRET_KEY)

app.config['SECRET_KEY']=SECRET_KEY

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/test')
def create_test():
    try:

        user = {
                "name": "Marty Montana",
                "email": "Marty@montana.com",
                "password": "MartyMontana233*",
        }

        if not user:
            return {
                "message": "Please provide user details",
                "data": None,
                "error": "Bad request"
            }, 400
        is_validated = validate_user(**user)
        if is_validated is not True:
            return dict(message='Invalid data', data=None, error=is_validated), 400
        user = User().create(**user)
        if not user:
            return {
                "message": "User already exists",
                "error": "Conflict",
                "data": None
            }, 409
        return {
            "message": "Successfully created new user",
            "data": user
        }, 201
    except Exception as e:
        return {
            "message": "Something went wrong",
            "error": str(e),
            "data": None
        }, 500

@app.route('/api/v1')
def index_api():
    return "<h1 style='background-color: yellow; text-align: center;'>Server V1 is up!</h1>"



@app.route("/api/v1/users/", methods=['POST'])
def add_user():
    try:
        user = request.json
        if not user:
            return {
                "message": "Please provide user details",
                "data": None,
                "error": "Bad request"
            }, 400
        is_validated = validate_user(**user)
        if is_validated is not True:
            return dict(message='Invalid data', data=None, error=is_validated), 400
        user = User().create(**user)
        if not user:
            return {
                "message": "User already exists",
                "error": "Conflict",
                "data": None
            }, 409
        return {
            "message": "Successfully created new user",
            "data": user
        }, 201
    except Exception as e:
        return {
            "message": "Something went wrong",
            "error": str(e),
            "data": None
        }, 500

@app.route("/api/v1/users/login", methods=["POST"])
def login():
    try:
        data = request.json
        if not data:
            return {
                "message": "Please provide user details",
                "data": None,
                "error": "Bad request"
            }, 400
        # validate input
        is_validated = validate_email_and_password(data.get('email'), data.get('password'))
        if is_validated is not True:
            return dict(message='Invalid data', data=None, error=is_validated), 400
        user = User().login(
            data["email"],
            data["password"]
        )
        if user:
            try:
                # token should expire after 24 hrs
                user["token"] = jwt.encode(
                    {"user_id": user["_id"]},
                    app.config["SECRET_KEY"],
                    algorithm="HS256"
                )
                return {
                    "message": "Successfully fetched auth token",
                    "data": user
                }
            except Exception as e:
                return {
                    "error": "Something went wrong",
                    "message": str(e)
                }, 500
        return {
            "message": "Error fetching auth token!, invalid email or password",
            "data": None,
            "error": "Unauthorized"
        }, 404
    except Exception as e:
        return {
                "message": "Something went wrong!",
                "error": str(e),
                "data": None
        }, 500

@app.route("/api/v1/users/profile", methods=["GET"])
@token_required
def get_current_user(current_user):
    return jsonify({
        "message": "successfully retrieved user profile",
        "data": current_user
    })

# @app.route("/api/v1/users/", methods=["PUT"])
# @token_required
# def update_user(current_user):
#     try:
#         user = request.json
#         if user.get("name"):
#             user = User().update(current_user["_id"], user["name"])
#             return jsonify({
#                 "message": "successfully updated account",
#                 "data": user
#             }), 201
#         return {
#             "message": "Invalid data, you can only update your account name!",
#             "data": None,
#             "error": "Bad Request"
#         }, 400
#     except Exception as e:
#         return jsonify({
#             "message": "failed to update account",
#             "error": str(e),
#             "data": None
#         }), 400


'''MY UPDATE '''
@app.route("/api/v1/users/update/singles", methods=["PATCH"])
@token_required
def update_user(current_user):
    try:
        user = request.json
        if user:
            user = User().update(current_user["_id"], user)
            return jsonify({
                "message": "successfully updated account",
                "data": user
            }), 201
        return {
            "message": "Invalid data!",
            "data": None,
            "error": "Bad Request"
        }, 400
    except Exception as e:
        return jsonify({
            "message": "failed to update account",
            "error": str(e),
            "data": None
        }), 400

@app.route("/api/v1/users/update/pusharray", methods=["PATCH"])
@token_required
def update_push_recipe(current_user):
    try:
        user = request.json
        if user:
            user = User().update_recipes_push(current_user["_id"], user)
            return jsonify({
                "message": "successfully updated account",
                "data": user
            }), 201
        return {
            "message": "Invalid data!",
            "data": None,
            "error": "Bad Request"
        }, 400
    except Exception as e:
        return jsonify({
            "message": "failed to update account",
            "error": str(e),
            "data": None
        }), 400

@app.route("/api/v1/users/update/pullarray", methods=["PATCH"])
@token_required
def update_pull_recipe(current_user):
    try:
        user = request.json
        if user:
            user = User().update_recipes_pull(current_user["_id"], user)
            return jsonify({
                "message": "successfully updated account",
                "data": user
            }), 201
        return {
            "message": "Invalid data!",
            "data": None,
            "error": "Bad Request"
        }, 400
    except Exception as e:
        return jsonify({
            "message": "failed to update account",
            "error": str(e),
            "data": None
        }), 400

@app.route("/api/v1/users/disable", methods=["PATCH"])
@token_required
def disable_user(current_user):
    try:
        User().disable_account(current_user["_id"])
        return jsonify({
            "message": "successfully disabled acount",
            "data": None
        }), 204
    except Exception as e:
        return jsonify({
            "message": "failed to disable account",
            "error": str(e),
            "data": None
        }), 400

@app.errorhandler(403)
def forbidden(e):
    return jsonify({
        "message": "Forbidden",
        "error": str(e),
        "data": None
    }), 403

@app.errorhandler(404)
def forbidden(e):
    return jsonify({
        "message": "Endpoint Not Found",
        "error": str(e),
        "data": None
    }), 404

if __name__ == '__main__':
    app.run(debug=True)