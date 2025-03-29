const express = require('express');
const request = require('request');
const app = express();

const apiKey = '6416ae9a92b3eb8b9f6fb7194c846a59'; // Tu clave de API

app.use(express.static('public'));

app.get('/clima', (req, res) => {
    if (!req.query.ciudad) {
        return res.send({
            error: 'Debes proporcionar una ciudad.'
        });
    }

    const ciudad = req.query.ciudad;
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${ciudad}`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            return res.send({
                error: 'No se pudo conectar al servicio del clima.'
            });
        }

        if (response.body.error) {
            // Personalizamos el mensaje para cuando la ciudad no se encuentra
            return res.send({
                error: 'No se encontró la ciudad especificada.'
            });
        }

        res.send({
            ciudad: ciudad,
            temperatura: response.body.current.temperature,
            descripcion: response.body.current.weather_descriptions[0],
            icono: response.body.current.weather_icons[0]
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});