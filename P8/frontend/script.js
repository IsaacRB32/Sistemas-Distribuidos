const API_URL = "http://localhost:8080/api";
const id_conductor = 1;
const id_servicio = 1;

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

// Elementos DOM
const slider = document.getElementById("sliderButton"); 
const sliderTrack = document.getElementById("sliderTrack");
const label = document.getElementById("sliderLabel");
const estado = document.querySelector("#estado span");
const listaEventos = document.getElementById("listaEventos");

// Datos del conductor
const nombreConductor = document.getElementById("nombreConductor");
const apellidoConductor = document.getElementById("apellidoConductor");
const estadoConductor = document.getElementById("estadoConductor");

// Datos del servicio
const lugarReunion = document.getElementById("lugarReunion");
const destino = document.getElementById("destino");
const horaReunion = document.getElementById("horaReunion");
const horaRegreso = document.getElementById("horaRegreso");

let dragging = false;
let startX;
let currentX;


//   CARGAR DATOS DEL CONDUCTOR
async function cargarConductor() {
  try {
    const res = await fetch(`${API_URL}/conductores/${id_conductor}`);
    const data = await res.json();

    if (data) {
      nombreConductor.textContent = data.nombre || "No disponible";
      apellidoConductor.textContent = data.apellido || "No disponible";
      estadoConductor.textContent = data.estado || "Activo";
      estadoConductor.style.color =
        data.estado === "activo" ? "#2ecc71" : "#e74c3c";
    }
  } catch (err) {
    console.error("Error al cargar conductor:", err);
    nombreConductor.textContent = "Error de conexión";
  }
}


//   CARGAR DETALLES DEL SERVICIO
async function cargarServicio() {
  try {
    const res = await fetch(`${API_URL}/servicios/conductor/${id_conductor}`);
    const data = await res.json();

    if (data && data.length > 0) {
      const servicio = data[0];
      lugarReunion.textContent = servicio.lugar_reunion;
      destino.textContent = servicio.lugar_destino;
      horaReunion.textContent = servicio.hora_reunion;
      horaRegreso.textContent = servicio.hora_regreso;
      estado.textContent = servicio.estado;
    } else {
      lugarReunion.textContent = "No hay servicios asignados";
      destino.textContent = "--";
      horaReunion.textContent = "--";
      horaRegreso.textContent = "--";
    }
  } catch (err) {
    console.error("Error al cargar servicio:", err);
    lugarReunion.textContent = "Error de conexión";
  }
}


//   BOTÓN DESLIZANTE
slider.addEventListener("mousedown", (e) => {
  dragging = true;
  startX = e.clientX;
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  e.preventDefault();

  const trackWidth = sliderTrack.offsetWidth - slider.offsetWidth;
  currentX = e.clientX - startX;

  if (currentX < 0) currentX = 0;
  if (currentX > trackWidth) currentX = trackWidth;

  slider.style.left = currentX + "px";
});

document.addEventListener("mouseup", async () => {
  if (!dragging) return;
  dragging = false;

  const trackWidth = sliderTrack.offsetWidth - slider.offsetWidth;

  if (currentX >= trackWidth - 10) {
    await registrarEvento();
  }

  slider.style.left = "0px";
});


//   REGISTRAR EVENTO
async function registrarEvento() {
  if (pasoActual >= acciones.length) {
    alert("Servicio ya finalizado");
    return;
  }

  const accion = acciones[pasoActual];
  label.textContent = "Enviando...";

  try {
    const res = await fetch(`${API_URL}/eventos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_servicio,
        id_conductor,
        id_accion: pasoActual + 1,
      }),
    });
    //obj js
    const data = await res.json();

    if (res.ok) {
      estado.textContent = data.nuevo_estado;
      estado.style.color = data.nuevo_estado === "Finalizado" ? "#2ecc71" : "#3498db";

      const hora = new Date().toLocaleTimeString();
      const li = document.createElement("li");
      li.textContent = `${accion} - ${hora}`;
      listaEventos.prepend(li);

      pasoActual++;
      label.textContent =
        pasoActual < acciones.length ? acciones[pasoActual] : "Servicio finalizado";
    } else {
      alert("Error: " + data.error);
      label.textContent = accion;
    }
  } catch (err) {
    console.error(err);
    alert("Error al conectar con el servidor.");
    label.textContent = accion;
  }
}

//   INICIO
cargarConductor();
cargarServicio();
