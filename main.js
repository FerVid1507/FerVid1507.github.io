const db = firebase.firestore();
let datos = [];

readSaldo();

let btnPay = document.getElementById('pay');
let btnBuy = document.getElementById('buy');
let saldo = document.getElementById('saldo');
let pasajes = document.getElementById('pasajes');
let txtRecargar = document.getElementById('txtRecargar');

let botonRecargar = document.getElementById('btnRecargar');



let saldoCurrent = '';

botonRecargar.addEventListener('click', ()=>{
    var date = new Date();
    let newSaldo = parseInt(saldo.textContent.slice(1)) + parseInt(txtRecargar.value);
    console.log('Recarga: ' + txtRecargar.value);
    if(txtRecargar.value!=0){
        db.collection('saldo').add({
            date: date.toUTCString(),
            saldo: newSaldo,
            recarga: txtRecargar.value,
            type: 'Recarga'
        }).then((docRef) => {
            console.log('Document: ' + docRef.id);
            readSaldo();
        }).catch((error) => {
            console.log('Error: ' + error);
        });
    }
    
});


btnPay.addEventListener('click', () => {

    var date = new Date();
    //alert(date.toUTCString());
    alert(pasajes.textContent);
});

async function readSaldo() {
    datos = [];
    try {
        const res = await getItems();
        datos = [...res];
    } catch (error) { }
}

async function getItems() {
    let items = [];
    let html = '';

    const response = await db.collection('saldo').orderBy('date', 'desc').get();
    let flag = false;
    response.forEach(element => {
        items.push(element.data());
        console.log(element.data().type + ' ' + element.data().date + ' $' + element.data().saldo);
        
        if(!flag)saldoCurrent = element.data().saldo;
        flag = true;
        html += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${element.data().date}</div>
            Tipo: ${element.data().type}
         </div>
            <span class="badge bg-primary rounded-pill">$${element.data().recarga}</span>
        </li>
        `;
    });
    document.querySelector('#Contenedor').innerHTML = html;
    //let newSaldo = parseInt(saldo.textContent.slice(1)) + parseInt(saldoCurrent);
    console.log(!Number.isNaN(saldoCurrent));
    if(!Number.isNaN(saldoCurrent)){
    
    saldo.innerText = '$'+saldoCurrent;
    let numPasajes = parseInt(saldoCurrent / 4.75);

    if(numPasajes!=0){
        pasajes.innerText = numPasajes;
    }else{
        pasajes.innerText = 'Realiza una recarga!';
    }
    
    }else{
        saldo.innerText = '$0';
        numPasajes.innerText = '0';
    }


    
}