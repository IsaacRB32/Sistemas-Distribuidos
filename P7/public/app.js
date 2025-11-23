//CASA
//const API_URL = "http://192.168.100.78:3000"; // URL base de la API

//ESCUELA
const API_URL = ""; // URL base de la API


// Secuencia de acciones del conductor
const acciones = [
  "Iniciar servicio",
  "Llegué al punto de reunión",
  "Iniciar viaje al destino",
  "Llegué al destino",
  "Iniciar regreso",
  "Llegué al punto de origen",
  "Regresar a base",
  "Finalizar servicio"
];

let pasoActual = 0;
let idServicio = 1;
let idConductor = 1;

const boton = document.getElementById("boton");
const estado = document.getElementById("estado");

//Cargar datos del servicio
async function cargarServicio() {
  try {
    const res = await fetch(`${API_URL}/servicios/${idConductor}`);
    const servicios = await res.json();

    if (servicios.length > 0) {
      const s = servicios[0];
      document.getElementById("servicio-id").textContent = s.id_servicio;
      document.getElementById("destino").textContent = s.lugar_destino;
      document.getElementById("hora-reunion").textContent = s.hora_reunion;
      idServicio = s.id_servicio;
    } else {
      estado.textContent = "No hay servicios asignados.";
    }
  } catch (err) {
    console.error(err);
    estado.textContent = "Error al cargar servicio.";
  }
}

//Registrar evento en la API
async function registrarEvento() {
  const idAccion = pasoActual + 1;
  const accion = acciones[pasoActual];

  try {
    const res = await fetch(`${API_URL}/eventos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_servicio: idServicio,
        id_conductor: idConductor,
        id_accion: idAccion
      })
    });

    const data = await res.json();
    if (res.ok) {
      estado.textContent = `${accion} registrado (${data.evento.fecha_hora})`;
      pasoActual++;
      if (pasoActual < acciones.length) {
        boton.textContent = acciones[pasoActual];
      } else {
        boton.disabled = true;
        boton.textContent = "Servicio finalizado";
      }
    } else {
      estado.textContent = "Error: " + (data.error || data.mensaje);
    }
  } catch (err) {
    console.error("Error al registrar evento:", err);
    estado.textContent = "No se pudo conectar con el servidor.";
  }
}

// Registro del Service Worker (solo si el navegador lo soporta)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) =>
        console.log("Service Worker registrado:", reg.scope)
      )
      .catch((err) =>
        console.log("Error al registrar Service Worker:", err)
      );
  });
}



boton.addEventListener("click", registrarEvento);
window.onload = cargarServicio;
