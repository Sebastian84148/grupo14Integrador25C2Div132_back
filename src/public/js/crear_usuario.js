let createUser_form = document.getElementById("createUser-form");
let url = "http://localhost:3000/api/users";

createUser_form.addEventListener("submit", async event => {
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());

    try {
        let respuesta = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        let resultado = await respuesta.json();

        if (respuesta.ok) {
            console.log(resultado.message);
            alert(resultado.message);

        } else {
            console.error("Error: ", resultado.message);
            alert(resultado.message);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Error al procesar su solicitud");
    }
});