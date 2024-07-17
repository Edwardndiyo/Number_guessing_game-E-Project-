from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import logging

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'APTECH_ENROLLMENTAPP_DB'
app.config['MYSQL_PASSWORD'] = 'EW36a844r**#'
app.config['MYSQL_DB'] = 'number_guessing_game'

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

    cursor = mysql.connection.cursor()
    cursor.execute('INSERT INTO users (full_name, email, number, username, password) VALUES (%s, %s, %s, %s, %s)',
                   (full_name, email, number, username, hashed_password))
    mysql.connection.commit()
    cursor.close()
    
    return jsonify({'success': True, 'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
    user = cursor.fetchone()
    cursor.close()

    if user and check_password_hash(user[5], password):  # Assuming password is the 5th column (index 4)
        
        return jsonify({'success': True, 'message': 'Login successful'}), 200
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

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

    cursor = mysql.connection.cursor()
    cursor.execute('INSERT INTO userfeedback (username, email, feedback) VALUES (%s, %s, %s)',
                   (username, email, feedback))
    mysql.connection.commit()
    cursor.close()
    
    return jsonify({'message': 'Feedback submitted successfully'}), 201

@app.route('/get_feedbacks', methods=['GET'])
def get_feedbacks():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT username, feedback FROM userfeedback')
    feedbacks = cursor.fetchall()
    cursor.close()

    feedback_list = [{'name': feedback[0], 'comment': feedback[1]} for feedback in feedbacks]

    return jsonify(feedback_list), 200

@app.route('/get_leaderboard', methods=['GET'])
def get_leaderboard():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT username, beginner, amateur, pro, totalscore FROM leaderboard')
    leaderboard = cursor.fetchall()
    cursor.close()

    leaderboard_list = [{'username': entry[0], 'beginnerScore': entry[1], 'amateurScore': entry[2], 'proScore': entry[3], 'totalScore': entry[4]} for entry in leaderboard]

    return jsonify(leaderboard_list), 200

@app.route('/get_highest_score/<username>', methods=['GET'])
def get_highest_score(username):
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT totalscore FROM leaderboard WHERE username = %s', (username,))
    result = cursor.fetchone()
    cursor.close()

    if result:
        highest_score = result[0]
    else:
        highest_score = 0

    return jsonify({'highestScore': highest_score}), 200



@app.route('/update_scores', methods=['POST'])
def update_scores():
    data = request.get_json()
    username = data['username']
    beginner = data['beginner']
    amateur = data['amateur']
    pro = data['pro']
    totalscore = data['totalscore']

    logging.debug(f"Received update_scores request: username={username}, beginner={beginner}, amateur={amateur}, pro={pro}, totalscore={totalscore}")

    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM leaderboard WHERE username = %s', (username,))
    user = cursor.fetchone()

    if user:
        cursor.execute('UPDATE leaderboard SET beginner = %s, amateur = %s, pro = %s, totalscore = %s WHERE username = %s', 
                       (beginner, amateur, pro, totalscore, username))
    else:
        cursor.execute('INSERT INTO leaderboard (username, beginner, amateur, pro, totalscore) VALUES (%s, %s, %s, %s, %s)', 
                       (username, beginner, amateur, pro, totalscore))
    
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'Scores updated successfully'}), 200



@app.route('/get_profile/<username>', methods=['GET'])
def get_profile(username):
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT full_name, email, number, username FROM users WHERE username = %s', (username,))
    user = cursor.fetchone()
    cursor.close()

    if user:
        user_data = {
            'full_name': user[0],
            'email': user[1],
            'number': user[2],
            'username': user[3]
        }
        return jsonify(user_data), 200
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/get_game_records/<username>', methods=['GET'])
def get_game_records(username):
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT beginner, amateur, pro, totalscore FROM leaderboard WHERE username = %s', (username,))
    records = cursor.fetchone()
    cursor.close()

    if records:
        records_data = {
            'beginner': records[0],
            'amateur': records[1],
            'pro': records[2],
            'total': records[3]
        }
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

    cursor = mysql.connection.cursor()
    cursor.execute('SELECT password FROM users WHERE username = %s', (username,))
    user = cursor.fetchone()

    if user and check_password_hash(user[0], old_password):
        hashed_password = generate_password_hash(new_password, method='pbkdf2:sha256')
        cursor.execute('UPDATE users SET full_name = %s, email = %s, number = %s, password = %s WHERE username = %s',
                       (full_name, email, number, hashed_password, username))
        mysql.connection.commit()
        cursor.close()
        return jsonify({'success': True, 'message': 'Profile updated successfully'}), 200
    else:
        cursor.close()
        return jsonify({'success': False, 'message': 'Old password is incorrect'}), 401

@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data['name']
    email = data['email']
    message = data['message']

    cursor = mysql.connection.cursor()
    cursor.execute('INSERT INTO contact (Name, email, message) VALUES (%s, %s, %s)', (name, email, message))
    mysql.connection.commit()
    cursor.close()

    # Send email
    send_email(name, email, message)

    return jsonify({'message': 'Contact message submitted successfully'}), 201

def send_email(name, email, message):
    sender_email = 'NdiyoEdward@gmail.com'
    sender_password = 'nhta zxnx xdas bngl'
    receiver_email = email

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = f'Number_Guessing_Game - Contact Form Submission from {name}'

    body = f'Name: {name}\nEmail: {email}\nMessage: {message}'
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(sender_email, sender_password)
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)
        server.quit()
        print('Email sent successfully')
    except Exception as e:
        print(f'Failed to send email: {e}')

if __name__ == '__main__':
    app.run(debug=True)
