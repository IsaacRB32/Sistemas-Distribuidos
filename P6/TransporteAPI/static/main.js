let editando = false;
let idEditando = null;

document.addEventListener("DOMContentLoaded", obtenerUnidades);

// Mostrar alertas
function mostrarAlerta(mensaje, tipo = "success") {
  const alertaDiv = document.getElementById("alerta");
  alertaDiv.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  setTimeout(() => alertaDiv.innerHTML = "", 4000);
}

// GET
function obtenerUnidades() {
  fetch("/unidades")
    .then(r => r.json())
    .then(data => {
      const tabla = document.getElementById("tablaUnidades");
      tabla.innerHTML = "";
      data.forEach(u => {
        tabla.innerHTML += `
          <tr>
            <td>${u.id}</td>
            <td>${u.ruta}</td>
            <td>${u.conductor}</td>
            <td>${u.estado}</td>
            <td>${u.ubicacion}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editarUnidad(${u.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarUnidad(${u.id})">Eliminar</button>
            </td>
          </tr>`;
      });
    });
}

// POST o PUT
document.getElementById("formUnidad").addEventListener("submit", e => {
  e.preventDefault();
  const unidad = {
    id: parseInt(document.getElementById("id").value),
    ruta: document.getElementById("ruta").value,
    conductor: document.getElementById("conductor").value,
    estado: document.getElementById("estado").value,
    ubicacion: document.getElementById("ubicacion").value
  };

  if (editando) {
    fetch(`/unidades/${idEditando}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(unidad)
    }).then(r => {
      if (r.ok) {
        mostrarAlerta("Unidad actualizada correctamente");
        obtenerUnidades();
        cancelarEdicion();
      }
    });
  } else {
    fetch("/unidades", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(unidad)
    }).then(r => {
      if (r.ok) {
        mostrarAlerta("Unidad agregada correctamente");
        obtenerUnidades();
        e.target.reset();
      }
    });
  }
});

// EDITAR
function editarUnidad(id) {
  fetch(`/unidades/${id}`)
    .then(r => r.json())
    .then(u => {
      document.getElementById("id").value = u.id;
      document.getElementById("ruta").value = u.ruta;
      document.getElementById("conductor").value = u.conductor;
      document.getElementById("estado").value = u.estado;
      document.getElementById("ubicacion").value = u.ubicacion;
      editando = true;
      idEditando = id;
      document.getElementById("tituloForm").innerText = "Editar unidad";
    });
}

function cancelarEdicion() {
  editando = false;
  idEditando = null;
  document.getElementById("formUnidad").reset();
  document.getElementById("tituloForm").innerText = "Agregar nueva unidad";
}

// DELETE
function eliminarUnidad(id) {
  fetch(`/unidades/${id}`, { method: "DELETE" })
    .then(r => {
      if (r.ok) {
        mostrarAlerta("Unidad eliminada correctamente", "danger");
        obtenerUnidades();
      }
    });
}

