let getProductosForm = document.getElementById("getProducts-form");
let listadoProductos = document.getElementById("listado-productos");
let url = "http://localhost:3000/api/productos/";

getProductosForm.addEventListener("submit", event => {
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());
    let idProducto = data.id;

    obtenerProductoPorId(idProducto);
});

async function obtenerProductoPorId(id) {
    try {
        let respuesta = await fetch(url + id);
        let resultado = await respuesta.json();

        if(respuesta.ok) {
            let producto = resultado.payload;

            mostrarProducto(producto);
        } else {
            console.error("Error :", resultado.message);

            mostrarError(resultado.message);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function mostrarProducto(producto) {
    let htmlProducto = `
        <li class="li-listados">
            <img src="/img/${producto.img_url}" alt="${producto.nombre}">
            <p>Id: ${producto.id} | Nombre: ${producto.nombre} | <strong>Precio: $${producto.precio}</strong><p>
        </li>
        <li class="li-botonera">
            <input type="button" id="deleteProduct_button" value="Eliminar producto">
        </li>
    `;

    listadoProductos.innerHTML = htmlProducto;

    let deleteProduct_button = document.getElementById("deleteProduct_button");
    
    deleteProduct_button.addEventListener("click", event => {
        event.stopPropagation();

        let confirmacion = confirm("Estas seguro de eliminar este producto?");

        if(!confirmacion) {
            alert("Eliminacion cancelada");
        } else {
            eliminarProducto(producto.id);
        }
    });

    async function eliminarProducto(id) {
        try {
            let respuesta = await fetch(url + id, {
                method: "DELETE"
            });

            let resultado = await respuesta.json();

            if(respuesta.ok) {
                console.log(resultado.message);
                alert(resultado.message);

                listadoProductos.innerHTML = "";
            } else {
                console.error("Error: ", resultado.message);
                alert(resultado.message);
            }
        } catch (error) {
            console.error("Error en la solicitud DELETE: ", error);
            alert("Se produjo un error al eliminar el producto");
        }
    }
}

function mostrarError(message) {
    listadoProductos.innerHTML = `
        <li class="mensaje-error">
            <p>
                <strong>Error:</strong>
                <span>${message}</span>
            </p>
        </li>
    `;
}