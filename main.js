const db = firebase.firestore();
let datos = [];

let btn_send = document.getElementById('send')
let process_sel = document.getElementById('process')
let dato_in = document.getElementById('dato_in')
let name_in = document.getElementById('name')
let numItem = 0;

readSaldo();


btn_send.addEventListener('click', () => {
    console.log(process_sel.value)
    if(dato_in.value!='' && name_in.value!=''){
        db.collection('item').doc().set({
            id: dato_in.value,
            name: name_in.value,
            process: process_sel.value
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
});


function readSaldo() {

    db.collection('item').onSnapshot((doc) => {

        let items = [];

        document.querySelector('#Contenedor').innerHTML = '';
        
        doc.forEach(element => {
            items.push({ ...element.data() });
            console.log('VAL: ' + element.data().id);
            console.log('VAL: ' + element.data().process);
            parseInt(element.data().item);

        }); 
        
        items.map(
            function (element) {
                console.log(element.date)

                document.querySelector('#Contenedor').innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start"  
        style="background-color: rgb(2 128 115); border-radius: 20px; margin-left: 10px;  margin-right: 10px; margin-bottom: 10px;">
            <div class="ms-2 me-auto">
            <div class="fw-bold" style="color: white;">Nam item: ${element.name}</div>
            <div class="fw-bold" style="color: white;">ID item: ${element.id}</div>
            <p style="color: white; margin-bottom: -2px;">Process: ${element.process}</p>
         </div>

        </li>
        `;

            });
            numItem = items.length;
            console.log('Num items: ' + numItem);
        });

}
