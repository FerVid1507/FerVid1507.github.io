const db = firebase.firestore();
let datos = [];

readSaldo();

let btnPay = document.getElementById('pay');
let btnBuy = document.getElementById('buy');
let saldo = document.getElementById('saldo');
let pasajes = document.getElementById('pasajes');
let txtRecargar = document.getElementById('txtRecargar');

let botonRecargar = document.getElementById('btnRecargar');
let botonSi = document.getElementById('Si');

let Notificacion = document.getElementById('Notificacion');

let saldoCurrent = 0;

let numItem = 0;

btnPay.addEventListener('click', () => {
    if (parseFloat(saldo.textContent.slice(1)) >= 4.75) {
        /*data-bs-toggle="modal" data-bs-target="#modalPay" */
        new bootstrap.Modal(document.getElementById('modalPay')).show();
    }
    else {
        document.querySelector('#Notificacion').innerHTML = getNotificationError('Saldo insuficiente');
        window.setTimeout(() => document.querySelector('#Notificacion').innerHTML = '', 5000);
    }
});

botonSi.addEventListener('click', () => {
    var date = new Date();

    let newSaldo = parseFloat(saldo.textContent.slice(1)) - parseFloat(4.75);
        let num = numItem + 1;
     db.collection('saldo').doc(date.toUTCString()).set({
        item: num.toString(),
        date: date.toLocaleString() + '',
        saldo: newSaldo,
        recarga: 4.75,
        type: 'Cobro'
    }).then((docRef) => {
        console.log('Event sucessfuly!');
    }).catch((error) => {
        console.log('Error: ' + error);
    });
});

botonRecargar.addEventListener('click', () => {
    var date = new Date();
    let newSaldo = parseFloat(saldo.textContent.slice(1)) + parseFloat(txtRecargar.value);
    if (txtRecargar.value != 0) {
        let num = numItem + 1;
        db.collection('saldo').doc(date.toUTCString()).set({
            item: num.toString(),
            date: date.toLocaleString() + '',
            saldo: newSaldo,
            recarga: parseFloat(txtRecargar.value),
            type: 'Recarga'
        }).then((docRef) => {
            console.log('Event sucessfuly!');
        }).catch((error) => {
            console.log('Error: ' + error);
        });
    }
});



function readSaldo() {

    let saldoCurrent = 0;
    //const response = await db.collection('saldo').orderBy('date', 'desc').get();


    db.collection('saldo').orderBy('item', 'asc').onSnapshot((doc) => {

        

        let items = [];
        saldo.innerText = '$0'
        pasajes.innerText = 'Realiza una recarga!';

        document.querySelector('#Contenedor').innerHTML = '';
        doc.forEach(element => {
            items.push({ ...element.data() });
            console.log('ACTUALIZACION');
            console.log('VAL: ' + element.data().item);
             numItem = parseInt(element.data().item);
        });

        items.map(
            function (element) {
                
                saldoCurrent = element.saldo;
                
                let colorBadge;
                let showTypeSaldo = parseFloat(element.recarga);
                if(element.type==='Recarga'){
                    colorBadge = 'success';
                }else{
                    colorBadge = 'danger';
                }

                document.querySelector('#Contenedor').innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${element.date}</div>
            Tipo: ${element.type}
         </div>
            <span class="badge bg-${colorBadge} rounded-pill" style="margin-top:10px; width:70px; height:30px; font-size:18px;">$${showTypeSaldo}</span>
        </li>
        `;


                if (saldoCurrent > 0) {
                    saldo.innerText = '$' + parseFloat(saldoCurrent);
                    let numPasajes = parseInt(saldoCurrent / 4.75);
                    if (numPasajes < 0) {
                        pasajes.innerText = 'Realiza una recarga!';
                    } else {
                        pasajes.innerText = numPasajes;
                    }
                    // 
                } else {
                    saldo.innerText = '$0'
                    pasajes.innerText = 'Realiza una recarga!';
                }

            });

    });

}