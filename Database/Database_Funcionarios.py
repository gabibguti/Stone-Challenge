
# coding: utf-8

# In[ ]:


from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'db_funcionarios'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/db_funcionarios'

mongo = PyMongo(app)

CORS(app)

@app.route("/challenge/funcionarios", methods=["GET"])
def lista_funcionarios():
    _funcionarios = mongo.db.db_funcionarios
    output = []

    for f in _funcionarios.find():
        output.append({"id": str(f["_id"]), "nome": f["nome"], "cargo": f["cargo"], "idade": f["idade"]})

    return jsonify(output), 200

@app.route("/challenge/funcionarios/<string:id>", methods=["GET"])
def funcionario(id):
    _funcionarios = mongo.db.db_funcionarios

    f = _funcionarios.find_one({"_id": ObjectId(id)})

    if f:
        output = {"id": str(f["_id"]), "nome": f["nome"], "cargo": f["cargo"], "idade": f["idade"]}
        return jsonify(output), 200
    else:
        return "Erro. Funcionario nao encontrado.", 404

@app.route("/challenge/funcionarios", methods=["POST"])
def criar_funcionario():
    _funcionarios = mongo.db.db_funcionarios

    novo_f = request.get_json()

    f_db_id = _funcionarios.insert({"nome": novo_f["nome"], "cargo": novo_f["cargo"], "idade": novo_f["idade"]})
    novo_funcionario = _funcionarios.find_one({"_id" : f_db_id})

    if novo_funcionario:
        output = {"id": str(novo_funcionario["_id"]), "nome": novo_funcionario["nome"], "cargo": novo_funcionario["cargo"], "idade": novo_funcionario["idade"]}
        return jsonify(output), 201
    else:
        return "Erro ao adicionar funcionario.", 404

@app.route("/challenge/funcionarios", methods=["PUT"])
def alterar_funcionario():
    _funcionarios = mongo.db.db_funcionarios

    _id = request.args.get('id')
    _idade = request.args.get('idade')
    _cargo = request.args.get('cargo')
    _nome = request.args.get('nome')

    existent_f = _funcionarios.find_one({"_id": ObjectId(_id)})

    if existent_f :
        if _nome:
            _funcionarios.find_one_and_update({"_id": ObjectId(_id)}, {'$set': {"nome": _nome}}, upsert=False)
        if _cargo:
            _funcionarios.find_one_and_update({"_id": ObjectId(_id)}, {'$set': {"cargo": _cargo}}, upsert=False)
        if _idade:
            _idade = int(_idade)
            _funcionarios.find_one_and_update({"_id": ObjectId(_id)}, {'$set': {"idade": _idade}}, upsert=False)

        final_f = _funcionarios.find_one({"_id": ObjectId(_id)})

        if final_f:
            output = {"id": str(final_f["_id"]), "nome": final_f["nome"], "cargo": final_f["cargo"], "idade": final_f["idade"]}
            return jsonify(output), 201

    return "Funcionario nao existe.", 404

@app.route("/challenge/funcionarios", methods=["DELETE"])
def deletar_funcionario():
    _funcionarios = mongo.db.db_funcionarios

    _id = request.args.get('id')

    response = _funcionarios.delete_one({"_id": ObjectId(_id)})

    if response.deleted_count == 1 :
        return jsonify({"result": "Funcionario deletado com sucesso"}), 200
    return "Funcionario nao pode ser removido.", 404

if __name__ == "__main__":
    app.run()

