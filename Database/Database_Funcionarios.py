
# coding: utf-8

# In[ ]:


from flask import Flask, jsonify, request, session
from flask_cors import CORS

app = Flask(__name__)

funcionarios = [
    {"nome": "Lucas", "idade": 26, "cargo": "Gerente de Vendas", "id": "1008"},
    {"nome": "Amanda", "idade": 30, "cargo": "Diretora de Marketing", "id": "1502"}
]

CORS(app)

@app.route("/challenge/funcionarios", methods=["GET"])
def lista_funcionarios():
    return jsonify(funcionarios), 200

@app.route("/challenge/funcionarios/<string:id>", methods=["GET"])
def funcionario(id):
    filtered_funcionarios = [f for f in funcionarios if f["id"] == id]
    if len(filtered_funcionarios) > 0 :
        return jsonify(filtered_funcionarios), 200
    else: 
        return "Funcionario nao encontrado.", 404

@app.route("/challenge/funcionarios", methods=["POST"])
def criar_funcionario():
    novo_funcionario = request.get_json()
    if novo_funcionario :
        funcionarios.append(novo_funcionario)
        return "Funcionario adicionado com sucesso!", 201
    else:
        return "Erro. Funcionario nao pode ser adicionado.", 404

@app.route("/challenge/funcionarios", methods=["PUT"])
def alterar_idade():
    _id = request.args.get('id')
    _idade = request.args.get('idade')
    if _id and _idade :
        for f in funcionarios:
            if f["id"] == _id :
                f["idade"] = _idade
                return "Funcionario alterado com sucesso!", 200
    return "Funcionario nao encontrado.", 404

@app.route("/challenge/funcionarios", methods=["DELETE"])
def deletar_funcionario():
    _id = request.args.get('id')
    if _id :
        for f in funcionarios:
            if f["id"] == _id :
                funcionarios.remove(f)
                return "Funcionario removido com sucesso.", 200
    return "Funcionario nao encontrado.", 404 

if __name__ == "__main__":
    app.run()

