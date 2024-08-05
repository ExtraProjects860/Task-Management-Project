from main import app
from main.emailservice import EmailService
from flask import request, jsonify

@app.route("/send-email", methods=["POST"])
def send_email():
    data = request.get_json()
    recipient = data.get("recipient")
    subject = data.get("subject")
    message = data.get("message")
    token = data.get("token")
    
    emailService = EmailService()
    
    try:
        emailService.send_email(recipient, subject, message, token)
        return jsonify({'status': 'Password reset token sent to your email'}), 200
    except Exception as e:
        return jsonify({'status': 'Failed to send email', 'error': str(e)}), 500

# posteiormente implementar rotas de sugestão de tarefas e análise de dados

# @app.route('/suggest-tasks', methods=['GET'])

# @app.route('/analyze-data', methods=['GET'])