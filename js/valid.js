document.getElementById("registroForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar que se envíe el formulario automáticamente

    var dniInput = document.getElementById("dni").value;
    var url = "https://lccp-6f2e6-default-rtdb.firebaseio.com/registro.json";

    // Realizar la petición GET a la API para verificar el DNI
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // Verificar si el DNI existe en algún registro
        var dniExiste = false;
        for (var key in data) {
          if (data.hasOwnProperty(key) && data[key].dni === dniInput) {
            dniExiste = true;
            break;
          }
        }

        if (dniExiste) {
          alert("El número de DNI ya existe en un registro.");
          // Redirigir al usuario a login.html
          window.location.href = "login.html";
        } else {

          document.getElementById("registroForm").innerHTML = `
          <div class="mb-6">
        <label for="nombreyapellido">Nombre y Apellido:</label>
        <input type="text" placeholder="Nombre y apellido" id="nombreyapellido" class="input__style " required />
      </div>
            <div class="mb-6">
        <label for="mail">Email:</label>
        <input type="email" placeholder="Nombre y apellido" id="mail" class="input__style " required />
      </div>
      <div class="mb-6">
        <label for="curso">Email:</label>
        <select id="curso" class="input__style" required>
          <option value="SEO">SEO</option>
              <option value="Marketing">Marketing</option>
              <option value="Diseño Ux Ui">Diseño Ux Ui</option>
            </select>
      </div>
      <div class="mb-6">
        <label for="contrasenia">Contraseña:</label>
        <input type="password" placeholder="Contraseña" id="contrasenia" class="input__style " required />
      </div>
      <div>
        <input type="submit" value="Registrar"
          class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-[96px] btn-color focus:ring-4 focus:ring-primary-300 w-full " />
      </div>
          `;

          // Agregar el evento de envío del formulario de registro
          document.getElementById("registroForm").addEventListener("submit", function (event) {
            event.preventDefault(); // Evitar que se envíe el formulario automáticamente

            var datos = {
              dni: dniInput,
              nombreyapellido: document.getElementById("nombreyapellido").value,
              mail: document.getElementById("mail").value,
              curso: document.getElementById("curso").value,
              contrasenia: document.getElementById("contrasenia").value
            };

            // Realizar la petición POST a la API para guardar los datos de registro
            fetch(url, {
              method: "POST",
              body: JSON.stringify(datos)
            })
              .then(function (response) {
                alert("Registro exitoso!");
                // Restablecer el formulario
                document.getElementById("registroForm").reset();

                // Redirigir al usuario a login.html
                window.location.href = "login.html";
              })
              .catch(function (error) {
                alert("Ha ocurrido un error. Por favor, intenta nuevamente.");
                console.error(error);
              });
          });
        }
      })
      .catch(function (error) {
        alert("Ha ocurrido un error. Por favor, intenta nuevamente.");
        console.error(error);
      });
  });