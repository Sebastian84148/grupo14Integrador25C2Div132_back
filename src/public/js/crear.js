let altProducts_form = document.getElementById("altProducts-form");
let url = "http://localhost:3000/api/productos";

const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const imgPreview = document.getElementById('imgPreview');
const fileName = document.getElementById('fileName');

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
        e.preventDefault();
        dropArea.classList.add('dragover');
    });
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => {
        e.preventDefault();
        dropArea.classList.remove('dragover');
    });
});

dropArea.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (files.length) {
        fileInput.files = files; // Asignamos el archivo al input invisible
        mostrarPrevisualizacion(files[0]);
    }
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
        mostrarPrevisualizacion(fileInput.files[0]);
    }
});

function mostrarPrevisualizacion(file) {
    previewContainer.style.display = 'block';
    fileName.textContent = `Archivo: ${file.name}`;
    imgPreview.src = URL.createObjectURL(file);
}

altProducts_form.addEventListener("submit", event => {
    event.preventDefault();

    let formData = new FormData(event.target);
    
    enviarProducto(formData);
});

async function enviarProducto(formData) {
    try {
        let respuesta = await fetch(url, {
            method: "POST",
            body: formData
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