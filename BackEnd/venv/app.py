from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import smtplib
from datetime import datetime 
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import firebase_admin
from firebase_admin import credentials, firestore

# Path to your Firebase Admin SDK private key file
cred = credentials.Certificate('../functions/number-guessing-game-3423e-firebase-adminsdk-ivpc1-58e0208867.json')
firebase_admin.initialize_app(cred)

# Initialize Firestore DB
db = firestore.client()


import logging

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)


# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'APTECH_ENROLLMENTAPP_DB'
app.config['MYSQL_PASSWORD'] = 'EW36a844r**#'
app.config['MYSQL_DB'] = 'number_guessing_game'

# app.config['MYSQL_HOST'] = '172.20.10.1'
# app.config['MYSQL_USER'] = 'if0_36998956'
# app.config['MYSQL_PASSWORD'] = 'hcHaNXYUZ0'
# app.config['MYSQL_DB'] = 'if0_36998956_number_guessing_game'


mysql = MySQL(app)




@app.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request received'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

    data = request.get_json()
    full_name = data['full_name']
    email = data['email']
    number = data['number']
    username = data['username']
    password = data['password']

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    try:
        # Create user with Firebase Authentication
        user = auth.create_user(
            email=email,
            password=password,
            display_name=full_name
        )

        # Save user details in Firestore
        user_ref = db.collection('users').document(username)
        user_ref.set({
            'full_name': full_name,
            'email': email,
            'number': number,
            'password': hashed_password
        })
        return jsonify({'success': True, 'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user_ref = db.collection('users').document(username).get()
    if user_ref.exists:
        user_data = user_ref.to_dict()
        if check_password_hash(user_data['password'], password):
            return jsonify({'success': True, 'message': 'Login successful'}), 200
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    else:
        return jsonify({'success': False, 'message': 'User not found'}), 404

@app.route('/feedback', methods=['POST', 'OPTIONS'])
def feedback():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request received'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

    data = request.get_json()
    username = data['username']
    email = data['email']
    feedback = data['feedback']

    db.collection('userfeedback').add({
        'username': username,
        'email': email,
        'feedback': feedback
    })

    return jsonify({'message': 'Feedback submitted successfully'}), 201

@app.route('/get_feedbacks', methods=['GET'])
def get_feedbacks():
    feedbacks_ref = db.collection('userfeedback').stream()
    feedback_list = [{'name': feedback.id, 'comment': feedback.to_dict()['feedback']} for feedback in feedbacks_ref]
    return jsonify(feedback_list), 200

@app.route('/get_leaderboard', methods=['GET'])
def get_leaderboard():
    leaderboard_ref = db.collection('leaderboard').stream()
    leaderboard_list = [{'username': entry.id, **entry.to_dict()} for entry in leaderboard_ref]
    return jsonify(leaderboard_list), 200

@app.route('/get_highest_score/<username>', methods=['GET'])
def get_highest_score(username):
    leaderboard_ref = db.collection('leaderboard').document(username).get()
    if leaderboard_ref.exists:
        highest_score = leaderboard_ref.to_dict().get('totalscore', 0)
        return jsonify({'highestScore': highest_score}), 200
    else:
        return jsonify({'highestScore': 0}), 200

@app.route('/update_player_history', methods=['POST'])
def update_player_history():
    data = request.get_json()
    username = data['username']
    beginner = data['beginner']
    amateur = data['amateur']
    pro = data['pro']
    totalscore = data['totalscore']
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    db.collection('player_history').add({
        'username': username,
        'beginner': beginner,
        'amateur': amateur,
        'pro': pro,
        'totalscore': totalscore,
        'date': current_time
    })

    return jsonify({'message': 'Player history updated successfully'}), 200

@app.route('/update_scores', methods=['POST'])
def update_scores():
    data = request.get_json()
    username = data['username']
    beginner = data['beginner']
    amateur = data['amateur']
    pro = data['pro']
    totalscore = data['totalscore']

    leaderboard_ref = db.collection('leaderboard').document(username)
    if leaderboard_ref.get().exists:
        leaderboard_ref.update({
            'beginner': beginner,
            'amateur': amateur,
            'pro': pro,
            'totalscore': totalscore
        })
    else:
        leaderboard_ref.set({
            'beginner': beginner,
            'amateur': amateur,
            'pro': pro,
            'totalscore': totalscore
        })

    return jsonify({'message': 'Scores updated successfully'}), 200

@app.route('/get_profile/<username>', methods=['GET'])
def get_profile(username):
    user_ref = db.collection('users').document(username).get()
    if user_ref.exists:
        user_data = user_ref.to_dict()
        return jsonify(user_data), 200
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/get_game_records/<username>', methods=['GET'])
def get_game_records(username):
    records_ref = db.collection('player_history').where('username', '==', username).stream()
    records_data = [{'beginner': record.to_dict()['beginner'],
                     'amateur': record.to_dict()['amateur'],
                     'pro': record.to_dict()['pro'],
                     'total': record.to_dict()['totalscore'],
                     'date': record.to_dict()['date']} for record in records_ref]
    if records_data:
        return jsonify(records_data), 200
    else:
        return jsonify({'message': 'Records not found'}), 404

@app.route('/update_profile', methods=['POST'])
def update_profile():
    data = request.get_json()
    full_name = data['full_name']
    email = data['email']
    number = data['number']
    username = data['username']
    old_password = data['oldPassword']
    new_password = data['newPassword']

    user_ref = db.collection('users').document(username).get()
    if user_ref.exists:
        user_data = user_ref.to_dict()
        if check_password_hash(user_data['password'], old_password):
            hashed_password = generate_password_hash(new_password, method='pbkdf2:sha256')
            user_ref.update({
                'full_name': full_name,
                'email': email,
                'number': number,
                'password': hashed_password
            })
            return jsonify({'success': True, 'message': 'Profile updated successfully'}), 200
        else:
            return jsonify({'success': False, 'message': 'Incorrect old password'}), 401
    else:
        return jsonify({'success': False, 'message': 'User not found'}), 404





if __name__ == '__main__':
    app.run(debug=True)
