const firebaseConfig = {
    apiKey: "AIzaSyBHGVdgXhsQqaWalenSlNiRSuVFGSzYEwc",
    authDomain: "nuevosnelogismosdehoy.firebaseapp.com",
    databaseURL: "https://nuevosnelogismosdehoy-default-rtdb.firebaseio.com",
    projectId: "nuevosnelogismosdehoy",
    storageBucket: "nuevosnelogismosdehoy.appspot.com",
    messagingSenderId: "1052482621964",
    appId: "1:1052482621964:web:d3eb3b8c04824f63ffd429"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.database();

let titulo = document.getElementById('titulo');
let contenido = document.getElementById('contenido');
let autor = document.getElementById('autor');
let guardar = document.getElementById('guardar');
let obDato = document.getElementById('tabla');
let opcLimpiar = document.getElementById('limpiar');
let opcEliminar = document.getElementById('eliminar');

var cerrar = document.querySelectorAll('.alert')
cerrar.forEach(function (alerta) {
    new bootstrap.Alert(alerta);
});

let estadoRegistro;
let valID = '';
let mensaje = '';

guardar.addEventListener('click', putDatos);
opcLimpiar.addEventListener('click', limpiarCampos);
opcEliminar.addEventListener('click', deleteDatos);


cargar();


function putDatos() {
    if (titulo.value != '' && contenido.value != '') {
        if (estadoRegistro) {
            actualizar(titulo.value, contenido.value, autor.value, valID);
            console.log('Registro actualizado' + valID);
            mensaje = 'Registro actualizado';
        } else {
            agregar(titulo.value, contenido.value, autor.value);
            console.log('Registro agregado' + estadoRegistro);
            mensaje = 'Registro guardado';
        }
        document.querySelector('#contenedor').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>

        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </symbol>

        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>

      </svg>

      </div>

      <div class="alert alert-success alert-dismissible fade show" role="alert">     
        <div>
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>
            ${mensaje}
        </div> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
        limpiarCampos();
        //cargar();
        sleep(10000);
    }
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function delay() {
    console.log('Sleeping…');
    await sleep(10000);
    console.log('Awake…');
    document.querySelector('#contenedor').innerHTML = '';
}

delay();

function deleteDatos() {
    eliminar(valID);
    document.querySelector('#contenedor').innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </symbol>
        <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </symbol>
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
      </svg>
      </div>

      <div class="alert alert-danger alert-dismissible fade show" role="alert"> 
        <div>
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
          Registro eliminado
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" id="cerrarE"></button>
      </div>
    `;

    limpiarCampos();
    //cargar();
    sleep(10000);
}

function agregar(titulo, contenido, autor) {
    db.ref('neologismos').push({
        titulo: titulo,
        autor: autor,
        contenido: contenido,
        puntuacion: 0,
        autor: autor
    });
}

function actualizar(titulo, contenido, autor, id) {
    db.ref('neologismos').child(id).update({
        titulo: titulo,
        autor: autor,
        contenido: contenido,
        puntuacion: 0,
        autor: autor
    });
}

function eliminar(id) {
    db.ref('neologismos').child(id).remove();
}

function cargar() {
    let data = db.ref('neologismos');
    
    data.on('value', function (snapshot) {
        let datos = snapshot.val();
        let numItem = 1;
        document.querySelector('#tabla').innerHTML = '';
        for (var indice in datos) {

            document.querySelector('#tabla').innerHTML += `
            <th scope="row">${numItem}</th>
            <td>${datos[indice].titulo}</td>
            <td>${datos[indice].contenido}</td>
            <td>${datos[indice].autor}</td>
            <td>
            <button type="button" class="btn btn-primary mb-3 btnEditar" data-id=${indice}>Editar</button>
            </td>
          </tr>
            `;
            numItem++;

            const btnE = obDato.querySelectorAll('.btnEditar');


            btnE.forEach(btn => {
                btn.addEventListener('click', ({ target: { dataset } }) => {
                    datosTabla(dataset.id);
                });
            });
        }
        //document.querySelector('#tabla').innerHTML = relleno;
    });
    
}

function datosTabla(id) {
    let data = db.ref('neologismos');
    data.child(id).on('value', function (snapshot) {
        let datos = snapshot.val();

        console.log(datos.titulo);
        valID = id;
        titulo.value = datos.titulo;
        contenido.value = datos.contenido;
        autor.value = datos.autor;
    });
    estadoRegistro = true;
    guardar.innerText = 'Actualizar';
}

function limpiarCampos() {
    titulo.value = '';
    contenido.value = '';
    autor.value = '';
    estadoRegistro = false;
    guardar.innerText = 'Guardar';

}