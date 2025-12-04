let getProductosForm = document.getElementById("getProducts-form");
let listadoProductos = document.getElementById("listado-productos");
let contenedorFormulario = document.getElementById("contenedor-formulario");
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
            <input type="button" id="updateProduct_button" value="Actualizar producto">
        </li>
    `;

    listadoProductos.innerHTML = htmlProducto;

    let updateProduct_button = document.getElementById("updateProduct_button");

    updateProduct_button.addEventListener("click", event => {
        crearFormularioPut(event, producto);
    });
}

function crearFormularioPut(event, producto) {
    event.stopPropagation();

    //Mostrar como valor por defecto el valor correspondiente de categoria y activo.
    const selectedCelular = producto.categoria === "CELULAR" ? "selected" : "";
    const selectedNotebook = producto.categoria === "NOTEBOOK" ? "selected" : "";
    const checkedActivo = producto.activo == 1 ? "checked" : "";
    const checkedInactivo = producto.activo == 0 ? "checked" : "";

    let formularioPutHtml = `
        <form id="updateProducts-form" class="products-form">
            <label for="nombreProd">Nombre</label>
            <input type="text" name="nombre" id="nombreProd" value="${producto.nombre}" required>

            <label for="precioProd">Precio</label>
            <input type="number" name="precio" id="precioProd" value="${producto.precio}" required>

            <label for="categoriaProd">Categoria</label>
            <select name="categoria" id="categoriaProd" required>
                <option value="CELULAR" ${selectedCelular}>Celular</option>
                <option value="NOTEBOOK" ${selectedNotebook}>Notebook</option>
            </select>

            <label>Imagen del Producto</label>

            <label id="dropArea" class="drop-zone">
                <p class="drop-text">Arrastra la imagen aquí o <span>explora</span></p>
                <input type="file" id="fileInput" name="imagen" accept="image/*">
            </label>

            <div id="previewContainer" style="margin-top:10px;">
                <p id="fileName">Archivo seleccionado</p>
                <img id="imgPreview" src="/img/${producto.img_url}" style="max-width: 150px; border-radius: 5px;">
            </div>

            <label for="activoSi">Activo (Dar de Alta)</label>
            <input type="radio" name="activo" id="activoSi" value="1" ${checkedActivo} required>

            <label for="activoNo">Inactivo (Dar de Baja)</label>
            <input type="radio" name="activo" id="activoNo" value="0" ${checkedInactivo} required>

            <input type="submit" value="Actualizar Producto">
        </form>
    `;

    contenedorFormulario.innerHTML = formularioPutHtml;

    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const imgPreview = document.getElementById('imgPreview');
    const fileName = document.getElementById('fileName');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            const file = fileInput.files[0];
            imgPreview.src = URL.createObjectURL(file);
            fileName.textContent = `Nueva imagen seleccionada: ${file.name}`;
        }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, e => {
            e.preventDefault();
            dropArea.style.backgroundColor = '#eef'; // Color al arrastrar
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, e => {
            e.preventDefault();
            dropArea.style.backgroundColor = '#fff'; // Restaurar color
        });
    });

    dropArea.addEventListener('drop', e => {
        const files = e.dataTransfer.files;
        if (files.length) {
            fileInput.files = files;
            imgPreview.src = URL.createObjectURL(files[0]);
            fileName.textContent = `Nueva imagen seleccionada: ${files[0].name}`;
        }
    });


    let updateProducts_form = document.getElementById("updateProducts-form");
    updateProducts_form.addEventListener("submit", async event => {
        actualizarProducto(event, producto.id);
    });
}

async function actualizarProducto(event, id) {
    event.preventDefault();

    let formData = new FormData(event.target);
    
    try {
        let respuesta = await fetch(url + id, {
            method: "PUT",
            body: formData
        });

        let resultado = await respuesta.json();

        if(respuesta.ok) {
            console.log(resultado.message);
            alert(resultado.message);

            listadoProductos.innerHTML = "";
            contenedorFormulario.innerHTML = "";
            
        } else {
            console.error("Error: ", resultado.message);
            alert(resultado.message);
        }

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar su solicitud");
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