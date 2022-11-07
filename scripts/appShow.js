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

            <div class="col" style='margin-bottom: 5px; margin-top:5px;'>
            <div class="col-4">
              <div class="card" style="width: 20rem; border-radius: 10px; opacity:0.95; background-color:rgb(216, 214, 214)">
                <div class="card-body">
                  <h4 class="card-title" style=' text-align: center;'>${datos[indice].titulo}</h4>
                  <p class="card-text" style=' size: 20px; text-align: justify;'>${datos[indice].contenido}</p>
                  <p class="card-subtitle mb-2 text-muted">Autor: ${datos[indice].autor}</p>
                </div>
              </div>
            </div>
          </div>
   
            `;

        }
    });
    
}