const db = firebase.firestore();
let datos = [];

readSaldo();

let btnPay = document.getElementById('pay');
let btnBuy = document.getElementById('buy');
let saldo = document.getElementById('saldo');
let pasajes = document.getElementById('pasajes');
let txtRecargar = document.getElementById('txtRecargar');

let botonRecargar = document.getElementById('btnRecargar');



let saldoCurrent = 0;

botonRecargar.addEventListener('click', () => {
    var date = new Date();
    let newSaldo = parseInt(saldo.textContent.slice(1)) + parseInt(txtRecargar.value);
    console.log('Recarga: ' + txtRecargar.value);
    if (txtRecargar.value != 0) {
        db.collection('saldo').doc(date.toUTCString()).set({
            //date: date.toUTCString(),
            date: date.toLocaleString() + '',
            saldo: newSaldo,
            recarga: txtRecargar.value,
            type: 'Recarga'
        }).then((docRef) => {
            console.log('Event sucessfuly!');
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

function readSaldo() {

    let saldoCurrent = 0;
    //const response = await db.collection('saldo').orderBy('date', 'desc').get();


    db.collection('saldo').onSnapshot((doc) => {
        let items = [];
        document.querySelector('#Contenedor').innerHTML = '';
        doc.forEach(element => {
            items.push({ ...element.data() });
        });

        items.map(
            function (element) {
                saldoCurrent = element.saldo;
                document.querySelector('#Contenedor').innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
            <div class="fw-bold">${element.date}</div>
            Tipo: ${element.type}
         </div>
            <span class="badge bg-primary rounded-pill">$${element.recarga}</span>
        </li>
        `;
            });

            console.log(saldoCurrent);
              saldo.innerText = '$'+saldoCurrent;
              let numPasajes = parseInt(saldoCurrent / 4.75);
          
              if(numPasajes!=0){
                  pasajes.innerText = numPasajes;
              }else{
                  pasajes.innerText = 'Realiza una recarga!';
              }

    });

    
   
    
      


}