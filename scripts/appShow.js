// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.database();



window.addEventListener('resize',()=>{
    let tamVentana = document.documentElement.clientWidth;
    console.log("Tam: " + tamVentana);
    //var imgFondo = document.getElementById("ImagenFondo").style.backgroundSize = '200px';
    if(tamVentana>585){
        document.getElementById("ImagenFondo").style.backgroundSize = '40%';
    }else{
        document.getElementById("ImagenFondo").style.backgroundSize = '90%';
    }
})



cargar();

function cargar() {
    let data = db.ref('neologismos');

    data.on('value', function (snapshot) {
        let datos = snapshot.val();
        document.querySelector('#Contenedor').innerHTML = '';
        for (var indice in datos) {

            document.querySelector('#Contenedor').innerHTML += `


            <div class="col-sm-6" style="padding-bottom:10px;">
          <div class="card" style="border-radius: 10px; opacity:0.95; background-color:rgb(216, 214, 214)">
            <div class="card-body">
              <h5 class="card-title" style="text-align: center; font-family:'Fredoka One'; font-size: 24px; "> ${datos[indice].titulo}</h5>

              <img src="images/quote.png" style="width: 30px; margin-bottom:-35px; filter: invert(30%);"/>

              <p class="card-text" style="color:#616161; font-family:'Fredoka', sans-serif; text-align: justify; font-size: 20px; margin-left: 30px; margin-right: 30px; ">${datos[indice].contenido}</p>

              <img src="images/double_quotes.png" style="width: 30px; float:right; margin-top: -45px; filter: invert(30%); "/>

              <!--p class="card-subtitle mb-2 text-muted" style="margin-top:10px; font-family:'Pacifico';">Autor: ${datos[indice].autor}</p-->
            </div>
          </div>
        </div>
   
            `;

        }
    });

}