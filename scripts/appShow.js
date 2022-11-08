// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.database();

cargar();

function cargar() {
    let data = db.ref('neologismos');
    
    data.on('value', function (snapshot) {
        let datos = snapshot.val();
        document.querySelector('#Contenedor').innerHTML = '';
        for (var indice in datos) {

            document.querySelector('#Contenedor').innerHTML += `




            <div class="col" style="opacity:0.95;">
           <div class="p-3 border bg-light" style="border-radius: 10px; opacity:0.95; background-color:rgb(216, 214, 214)">
        
            <div class="card" style="opacity:0.95" width: 20rem; border-radius: 10px; opacity:0.95; background-color:rgb(216, 214, 214);>
              <div class="card-header" style="text-align: center;">
              ${datos[indice].titulo}
              </div>
              <div class="card-body">
                <h5 class="card-title"></h5>
                <h6 class="card-text">${datos[indice].contenido}</h6>
                <p class="card-subtitle mb-2 text-muted" style="margin-top:10px;">Autor: ${datos[indice].autor}</p>
              </div>
            </div>  
          </div>
          </div>


            <div class="col" style='height: 10px; opacity:0'>
            <div class="col-4">
              <div class="card" style="width: 20rem; border-radius: 10px; opacity:0.95; background-color:rgb(216, 214, 214)">
                <div class="card-body">
                </div>
              </div>
            </div>
          </div>
   
            `;

        }
    });
    
}