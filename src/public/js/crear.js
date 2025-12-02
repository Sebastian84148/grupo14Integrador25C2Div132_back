let altProducts_form = document.getElementById("altProducts-form");
let url = "http://localhost:3000/api/productos";

altProducts_form.addEventListener("submit", event => {
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    
    enviarProducto(data);
});

async function enviarProducto(data) {
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let resultado = await respuesta.json();

        if(respuesta.ok) {
            console.log(resultado.message);
            alert(resultado.message);
        } else {
            console.error("Error: ", resultado.message);
            alert(resultado.message);
        }
    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar su solicitud");
    }
}