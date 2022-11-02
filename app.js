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
let confirmarEliminar = document.getElementById('confirmarE');

var cerrar = document.querySelectorAll('.alert')
cerrar.forEach(function (alerta) {
    new bootstrap.Alert(alerta);
});

let estadoRegistro;
let valID = '';

guardar.addEventListener('click', putDatos);
opcLimpiar.addEventListener('click', limpiarCampos);
opcEliminar.addEventListener('click', deleteDatos);
confirmarEliminar.addEventListener('click', ()=>{
    eliminar(valID);
    delay();
    modalNotification();   
})


cargar();


function putDatos() {
    let mensaje = '';
    if (titulo.value != '' && contenido.value != '') {
        if (estadoRegistro) {
            actualizar(titulo.value, contenido.value, autor.value, valID);
            mensaje = 'Registro actualizado';
        } else {
            agregar(titulo.value, contenido.value, autor.value);
            mensaje = 'Registro guardado';
        }
        document.querySelector('#contenedor').innerHTML = getNotificationGood(mensaje);
        limpiarCampos();
        delay();
    }else{
        document.querySelector('#contenedor').innerHTML = getNotificationError('Llene todos los campos antes de continuar');
        delay();
   }
}

async function delay() {
    await sleep(7000);
    document.querySelector('#contenedor').innerHTML = '';
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


function deleteDatos() {
    if(estadoRegistro){
        new bootstrap.Modal(document.getElementById('staticBackdrop'), {keyboard: false}).show()
    }else{
        document.querySelector('#contenedor').innerHTML = getNotificationError('No hay datos seleccionados');
        delay();
    }
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
    db.ref('neologismos').child(id).remove().then(()=>{
        limpiarCampos();
        document.querySelector('#contenedor').innerHTML = getNotificationGood('Registro eliminado con exito!');
    }).catch((error)=>{
    });
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
    });
    
}

function datosTabla(id) {
    let data = db.ref('neologismos');
    data.child(id).on('value', function (snapshot) {
        let datos = snapshot.val();
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