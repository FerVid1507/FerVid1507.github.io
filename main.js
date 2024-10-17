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
/*let btn_send = document.getElementById('send')
let process_sel = document.getElementById('process')
let dato_in = document.getElementById('dato_in')
let name_in = document.getElementById('name')*/
let numItem = 0;


/*document.getElementById('Contenedor').addEventListener('click', e=>{
    var row = (document.getElementById('Contenedor')).parent().parent()
    var rowId = row.getAttribute('id')
    console.log(rowId)
    //var tr = document.getElementsByTagName("tr");
    //console.log(tr[3])
    //console.log(document.getElementById('Contenedor').parentElement)
})*/

readSaldo();


/*btn_send.addEventListener('click', () => {
    console.log(process_sel.value)
    if(dato_in.value!='' && name_in.value!=''){
        db.collection('item').doc().set({
            id_item: dato_in.value,
            name: name_in.value,
            process: process_sel.value,
            gen_file: 'False',
            date:dateNow
        }).then((docRef) => {
            console.log('Event sucessfuly!');
        }).catch((error) => {
            console.log('Error: ' + error);
        });
        dato_in.value = ''
        name_in.value = ''
    }else{
        alert('Campos vacíos');
    }
});*/





function getDifferent(getDueDate){
    //let last = new Date('10/20/2024')
    let last = new Date(getDueDate)

    let convert_last = (last.getMonth()+1)+'/'+last.getDate()+'/'+last.getFullYear()
    let diff = new Date(convert_last).getTime()  - new Date(dateNow).getTime()
    //console.log("Diferencia: " + diff + " = " + new Date(convert_last) + " - " + new Date(dateNow))
    return diff
}

function readSaldo() {
    //alert(diff/(1000*60*60*24))
    let tabla = document.getElementById('Contenedor')
    db.collection('items_val').onSnapshot((doc) => {

        //document.querySelector('#Contenedor').innerHTML = '';
        tabla.innerHTML = '';
        doc.forEach(element => {
            //console.log(element.id)

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

        /*items.map(
            function (element) {
               console.log(element.id)
                let pm = getDifferent(element.Vencimiento)/(1000*60*60*24)
                //document.querySelector('#Contenedor').appendChild += `
                let type = pm>7?"table-success":pm<=0?"table-danger":pm<=7 || pm>=1?"table-warning":"table-success"
                document.querySelector('#Contenedor').innerHTML += `
                
                    <tr class=${type}>
                        <th scope="row">${element.Identificador}</th>
                        <td>${element.Descripcion}</td>
                        <td> ${element.Frecuencia}</td>
                        <td> ${element.Vencimiento}</td>
                        <td> ${pm}</td>
                        
                    </tr>

                `;

            });
            numItem = items.length;
            //console.log('Num items: ' + numItem);
        });*/


