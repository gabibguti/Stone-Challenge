from pymongo import MongoClient

print ("Testing connection")

client = MongoClient('mongodb+srv://gabriela:12345@clusterfuncionarios-t5r8m.mongodb.net/test?retryWrites=true&w=majority')

db = client.get_database('db_funcionarios')

records = db.db_funcionarios

print (records.count_documents({}))

print (list(records.find()))
