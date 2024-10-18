const firebaseConfig = {
    /*apiKey: "AIzaSyBpRo-4DpdVlaERoi7qLhZwZr7WKFWN9RQ",
     authDomain: "bdfirestore-1bafd.firebaseapp.com",
     projectId: "bdfirestore-1bafd",
     storageBucket: "bdfirestore-1bafd.appspot.com",
     messagingSenderId: "1064901149667",
     appId: "1:1064901149667:web:166571daea70f78c3ad6d6"*/

     apiKey: "AIzaSyCI1BUlNEkkjZkQ_Msu9WA2fsKoSxobgqY",
     authDomain: "toolfiretk.firebaseapp.com",
     projectId: "toolfiretk",
     storageBucket: "toolfiretk.appspot.com",
     messagingSenderId: "187359299361",
     appId: "1:187359299361:web:8386c609b6ada3243aa060",
     measurementId: "G-JFCF48GJ43"
    
 };

 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
let datos = [];
const fecha = new Date();
let dateNow = (fecha.getMonth()+1)+'/'+fecha.getDate()+'/'+fecha.getFullYear();

let item = document.getElementById('id')
let name_item = document.getElementById('name')
let dato_in = document.getElementById('date')


let btn_send = document.getElementById('send')
let btn_load = document.getElementById('load')
let btn_clear = document.getElementById('clear')

let numItem = 0;
btn_send.disabled = true
btn_clear.disabled = true
readSaldo();

btn_load.addEventListener('click', e=>{
    let indice = 0
    let id_selected
    btn_send.disabled = false
    btn_clear.disabled = true
    while(indice < datos.length){
        if(item.value === datos[indice][1]){
            console.log(datos[indice][0],datos[indice][1])
            id_selected = datos[indice][0]
            name_item.value = datos[indice][2]
            dato_in.value = datos[indice][4]
            btn_load.disabled = true
            btn_clear.disabled = false
        }
        indice++
    }

    btn_send.onclick = function(){
        console.log(id_selected)

        db.collection('items_val').doc(id_selected).update({
            Vencimiento: dato_in.value,
        }).then((docRef) => {
            console.log('Event sucessfuly!');
            dato_in.value = ''
            btn_send.disabled = true
            btn_load.disabled = false
            btn_clear.disabled = true
        }).catch((error) => {
            console.log('Error: ' + error);
        });
    }
    
})

btn_clear.addEventListener('click', e=>{
    dato_in.value = ''
    btn_send.disabled = true
    btn_load.disabled = false
    btn_clear.disabled = true
})


function getDifferent(getDueDate){
    //let last = new Date('10/20/2024')
    let last = new Date(getDueDate)

    let convert_last = (last.getMonth()+1)+'/'+last.getDate()+'/'+last.getFullYear()
    let diff = new Date(convert_last).getTime()  - new Date(dateNow).getTime()
    return diff
}

function readSaldo() {
    //alert(diff/(1000*60*60*24))
    let tabla = document.getElementById('Contenedor')
    let indice = 0
    item.innerHTML = ''
    db.collection('items_val').onSnapshot((doc) => {
        item.innerHTML = ''
        //document.querySelector('#Contenedor').innerHTML = '';
        tabla.innerHTML = '';

        doc.forEach(element => {
            datos[0, indice] = [element.id,element.data().Identificador,element.data().Descripcion,element.data().Frecuencia,element.data().Vencimiento]
            indice ++

            item.innerHTML += `
             <option value="${element.data().Identificador}">${element.data().Identificador}</option>   
            `;

            let pm = getDifferent(element.data().Vencimiento)/(1000*60*60*24)
            let type = pm>7?"table-success":pm<=0?"table-danger":pm<=7 || pm>=1?"table-warning":"table-success"
            datos.concat(element.id)
            //document.querySelector('#Contenedor').innerHTML += `
           
            tabla.innerHTML += `
                    <tr class=${type} id=${element.id}>
                        <th scope="row">${element.data().Identificador}</th>
                        <td>${element.data().Descripcion}</td>
                        <td> ${element.data().Frecuencia}</td>
                        <td> ${element.data().Vencimiento}</td>
                        <td> ${pm}</td>
                    </tr>
                `;

        }); 
        console.log("Fin de carga")
    });
}

function editar(id){
    console.log('Document ID: ' + id)
}
