const climaForm = document.getElementById('clima-form');
const ciudadInput = document.getElementById('ciudad-input');
const climaDatos = document.getElementById('clima-datos');

climaForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const ciudad = ciudadInput.value.trim(); // Eliminamos espacios en blanco

    if (!ciudad) {
        climaDatos.innerHTML = `<p>Por favor, ingresa una ciudad.</p>`;
        return;
    }

    fetch(`/clima?ciudad=${encodeURIComponent(ciudad)}`) // Codificamos la URL
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                climaDatos.innerHTML = `<p>${data.error}</p>`;
            } else {
                climaDatos.innerHTML = `
                    <h2>Clima en ${data.ciudad}</h2>
                    <p>Temperatura: ${data.temperatura}°C</p>
                    <p>Descripción: ${data.descripcion}</p>
                    <img src="${data.icono}" alt="Icono del clima">
                `;
            }
        })
        .catch(error => {
            climaDatos.innerHTML = `<p>Error al obtener los datos del clima. Por favor, intenta de nuevo.</p>`;
        });

    // Limpiamos el input después de la búsqueda
    ciudadInput.value = '';
});