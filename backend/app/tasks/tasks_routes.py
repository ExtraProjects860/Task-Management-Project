from flask import (
    Blueprint,
    render_template,
    request,
    jsonify
)

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route("/", methods=["GET", "POST"])
def tasks():
    if request.method == "POST":
        # Lógica de criação de tarefas
        pass
    return jsonify({}), 200
    
@tasks_bp.route("/<int:task_id>", methods=["GET", "PUT"])
def task_edit(task_id):
    if request.method == "PUT":
        # Lógica de edição de tarefas
        pass
    # jsonify({}), 200
    return render_template("", task_id=task_id), 200

@tasks_bp.route("/<int:task_id/complete>", methods=["PATCH"])
def task_complete(task_id):
    # Lógica para marcar tarefa como concluída
    pass
    # jsonify({}), 200
    return render_template("", task_id=task_id)

@tasks_bp.route("/<int:task_id/assign>", methods=["PATCH"])
def task_assign(task_id):
    # Lógica para atribuir tarefas a outro usuário
    pass
    # jsonify({}), 200
    return render_template("", task_id=task_id)