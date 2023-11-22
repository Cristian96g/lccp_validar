 // Obtener el ID del registro desde el almacenamiento local
 var registroId = localStorage.getItem("registroId");

 if (registroId) {
   // Obtener los datos del registro desde la API
   var registroUrl = "https://lccp-6f2e6-default-rtdb.firebaseio.com/registro/" + registroId + ".json";
   fetch(registroUrl)
     .then(function(response) {
       return response.json();
     })
     .then(function(data) {
       // Crear un objeto de perfil sin la contraseña
       var perfil = {
         nombreyapellido: data.nombreyapellido,
         dni: data.dni,
         email: data.email,
         curso: data.curso
       };

       // Mostrar los datos del perfil
       mostrarDatosPerfil(perfil);
     })
     .catch(function(error) {
       console.error(error);
     });
 } else {
   // Si no se encuentra el ID del registro en el almacenamiento local, redirigir a login.html
   window.location.href = "index.html";
 }

 function mostrarDatosPerfil(perfil) {
  //  var perfilContainer = document.getElementById("perfilContainer");

  //  var ul = document.createElement("ul");
  //  for (var key in perfil) {
  //    var li = document.createElement("li");
  //    li.classList.add("font-", "ml-5");
  //    li.textContent = key + ": " + perfil[key];
  //    ul.appendChild(li);

  //    <ul class="text-lg pt-4">
  //    <li >nombreyapellido: <span class="font-semibold">pedro</span></li>
  //    <li>dni: <span class="font-semibold">46879056</span></li>
  //    <li>email: <span class="font-semibold">pedro@gmail.com </span></li>
  //    <li>telefono: <span class="font-semibold">123456789</span></li>
  //  </ul>

  const ul = document.createElement("ul");
  ul.classList.add("text-lg", "pt-4");
  for (const key in perfil) {
    const li = document.createElement("li");
    li.textContent = key + ": ";
    const span = document.createElement("span");
    span.classList.add("font-semibold");
    span.textContent = perfil[key];
    li.appendChild(span);
    ul.appendChild(li);
   }

   perfilContainer.appendChild(ul);

 }
