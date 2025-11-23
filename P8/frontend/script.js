// URL base del Gateway
//const API_URL = "http://localhost:8080/api";
//const API_URL = "http://api-gateway:8080/api";
const API_URL = "/api";

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

// Variables del DOM
const slider = document.getElementById("sliderButton");
const sliderTrack = document.getElementById("sliderTrack");
const sliderLabel = document.getElementById("sliderLabel");
const estadoSpan = document.querySelector("#estado span");
const listaEventos = document.getElementById("listaEventos");

// Datos
let pasoActual = 0;
let idConductor = 1;
let idServicio = 1;
let deslizando = false;
let posInicial = 0;

// Cargar información del conductor y servicio desde los microservicios
async function cargarDatos() {
  try {
    const conductorRes = await fetch(`${API_URL}/conductores`);
    const servicioRes = await fetch(`${API_URL}/servicios`);

    const [conductor] = await conductorRes.json();
    const [servicio] = await servicioRes.json();

    document.getElementById("nombreConductor").textContent = conductor.nombre;
    document.getElementById("apellidoConductor").textContent = conductor.apellido;
    document.getElementById("estadoConductor").textContent = conductor.estado;

    document.getElementById("lugarReunion").textContent = servicio.lugar_reunion;
    document.getElementById("destino").textContent = servicio.lugar_destino;
    document.getElementById("horaReunion").textContent = servicio.hora_reunion;
    document.getElementById("horaRegreso").textContent = servicio.hora_regreso;

    estadoSpan.textContent = acciones[pasoActual];
    sliderLabel.textContent = acciones[pasoActual];
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

// Registrar evento en el microservicio de eventos
async function registrarEvento() {
  const accion = acciones[pasoActual];
  const hora = new Date().toLocaleTimeString();

  // Mostrar evento en pantalla
  const li = document.createElement("li");
  li.textContent = `${accion} - ${hora}`;
  listaEventos.prepend(li);

  try {
    await fetch(`${API_URL}/eventos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_conductor: idConductor,
        id_servicio: idServicio,
        id_accion: pasoActual + 1
      }),
    });
  } catch (error) {
    console.error("Error al registrar evento:", error);
  }

  // Actualizar estado visible
  estadoSpan.textContent = accion;
  sliderLabel.textContent =
    pasoActual < acciones.length - 1
      ? acciones[pasoActual + 1]
      : "Servicio finalizado";
}

//Control manual del deslizador
slider.addEventListener("mousedown", (e) => {
  deslizando = true;
  posInicial = e.clientX;
});

document.addEventListener("mousemove", (e) => {
  if (!deslizando) return;

  const distancia = e.clientX - posInicial;
  const limite = sliderTrack.clientWidth - slider.clientWidth;

  // Mover visualmente
  if (distancia >= 0 && distancia <= limite) {
    slider.style.left = `${distancia}px`;
  }

  // Si llega al final -> registrar evento
  if (distancia > limite * 0.9) {
    deslizando = false;
    slider.style.left = "0";
    pasoActual++;
    if (pasoActual < acciones.length) {
      registrarEvento();
    } else {
      estadoSpan.textContent = "Servicio finalizado";
      sliderLabel.textContent = "✓";
      slider.style.background = "#2ecc71";
    }
  }
});

document.addEventListener("mouseup", () => {
  if (deslizando) {
    deslizando = false;
    slider.style.left = "0";
  }
});

// Inicialización
cargarDatos();
