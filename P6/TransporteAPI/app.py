from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

unidades = [
    {"id": 1, "ruta": "Línea 1", "conductor": "Juan Pérez", "estado": "activo", "ubicacion": "Base Central"},
    {"id": 2, "ruta": "Línea 2", "conductor": "María López", "estado": "mantenimiento", "ubicacion": "Taller Norte"}
]

@app.route('/')
def index():
    return render_template('index.html')

##Obtener todas las unidades
@app.route('/unidades', methods = ['GET'])
def obtener_uniades ():
    return jsonify(unidades) ##Combierte la lista en JSON

##Obtener una unidad específica con su id
@app.route('/unidades/<int:id>', methods = ['GET'])
def obtener_unidad(id):
    for u in unidades:
        if u["id"] == id:
            return jsonify(u)
    return jsonify({"mensaje": "Unidad no encontrada"}), 404

##Agregar una unidad 
@app.route('/unidades', methods = ['POST'])
def agregar_unidades():
    nueva = request.get_json()
    unidades.append(nueva)
    return jsonify({"mensaje": "Unidad agregada correctamente", "unidad": nueva}), 201

##Actualizar una unidad
@app.route('/unidades/<int:id>', methods = ['PUT'])
def actualizar_unidad(id):
    for u in unidades:
        if u["id"] == id:
            u.update(request.get_json())
            return jsonify({"mensaje": "Unidad actualizada", "unidad": u})
    return jsonify({"mensaje": "Unidad no encontrada"}), 404

##Eliminar una unidad
@app.route('/unidades/<int:id>', methods=['DELETE'])
def eliminar_unidad(id):
    for u in unidades:
        if u["id"] == id:
            unidades.remove(u)
            return jsonify({"mensaje": "Unidad eliminada"})
    return jsonify({"mensaje": "Unidad no encontrada"}), 404


if __name__ == '__main__':  
    app.run(debug=True)