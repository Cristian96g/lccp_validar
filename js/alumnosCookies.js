// Obtener el ID del registro desde el almacenamiento local
const registroId = localStorage.getItem("registroId");

if (registroId) {
  // Obtener los datos del registro desde la API
  const registroUrl =
    "https://lccp-6f2e6-default-rtdb.firebaseio.com/registro/" +
    registroId +
    ".json";
  fetch(registroUrl)
    .then(response => response.json())
    .then(data => {
      // Obtener el nombre y apellido del registro
      const nombreApellido = data.nombreyapellido;

      // Mostrar el mensaje de bienvenida
      document.getElementById("bienvenido").textContent =
        "Bienvenido " + nombreApellido;
      // Obtener el curso del registro
      const curso = data.curso;

      // Obtener los datos del curso desde la API
      const cursosUrl =
        "https://lccp-6f2e6-default-rtdb.firebaseio.com/cursos.json";
      fetch(cursosUrl)
        .then(response => response.json())
        .then(cursosData => {
          console.log("cursosData", cursosData)
          // Buscar el curso que coincida con el nombre del curso del registro
          for (const key in cursosData) {
            if (
              cursosData.hasOwnProperty(key) &&
              cursosData[key].nombrecurso === curso
            ) {
              let cursoEncontrado = cursosData[key];
              mostrarDatosCurso(cursoEncontrado);
              break;
            }
          }
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
} else {
  // Si no se encuentra el ID del registro en el almacenamiento local, redirigir a login.html
  window.location.href = "login.html";
}
// <a href="#!">
    // <img class="rounded-t-lg" src="/static/img/${curso.imagen}" alt="${curso.nombrecurso}">
  // </a>
function mostrarDatosCurso(curso) {
  const containerCard = document.getElementById("card-curso");
  const cursoContainer = document.createElement("div");
  cursoContainer.innerHTML = `
  <h1 class="text-3xl pt-[2rem] font-semibold"> Cursos</h1>
  <div class="max-w-sm mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] sm:shrink-0 sm:grow sm:basis-0">
  <img class="rounded-t-lg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTte4M3obD2evis--3dTlQnrWRmDwbuneETQw&usqp=CAU">
  <div class="flex-1 flex-col p-6 flex">
    <h5 class="mb-2 text-xl font-medium leading-tight text-gray-900">${curso.nombrecurso}</h5>
    <p class="mb-4 text-base text-neutral-900">${curso.presentacion}</p>
  </div>
</div>
    `;
  containerCard.appendChild(cursoContainer);
}


function cerrarSesion() {
  // Elimina el valor de "registroId" del almacenamiento local
  localStorage.removeItem("registroId");

  // Puedes redirigir al usuario a una página de inicio de sesión o realizar otras acciones de cierre de sesión si es necesario
  window.location.href = "login.html";
}

const verPerfil = () => {
  // Obtener el ID del registro desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const registroId = urlParams.get("id");

  // Generar la URL de profile.html con el ID del registro
  const profileUrl = "profile.html";

  // Obtener el botón de perfil y agregar el evento click
  const perfilButton = document.getElementById("perfilButton");
  perfilButton.addEventListener("click", function () {
    console.log("profileUrl", profileUrl);
    // Abrir "profile.html" en una ventana flotante
    window.open(profileUrl, "Perfil", "width=600,height=400");
  });
};

verPerfil();


