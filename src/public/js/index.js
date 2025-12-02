let contenedorProductos = document.getElementById("contenedor-productos");
let url = "http://localhost:3000/api/productos";

async function obtenerProductos() {
    try {
        let respuesta = await fetch(url);
        let datos = await respuesta.json();
        let productos = datos.payload;

        mostrarProductos(productos);
    } catch (error) {
        console.error("Error:", error);
    }
}

function mostrarProductos(array) {
    let htmlProducto = "";

    array.forEach(prod => {
        htmlProducto +=`
            <div class="card-producto">
                <img src="${prod.img_url}" alt="${prod.nombre}">
                <h5>${prod.nombre}</h5>
                <p>${prod.id}</p>
                <p>${prod.categoria}</p>
                <p>$ ${prod.precio}</p>
            </div>
        `;
    });

    contenedorProductos.innerHTML = htmlProducto;
}

function init() {
    obtenerProductos();
}

init();