"use strict"
//Datos
//JSON





//VARIABLES Y CONSTANTES
// Obtener un índice aleatorio basado en las probabilidades
let indiceAleatorio ;
// Seleccionar el personaje correspondiente al índice aleatorio
let personajeSeleccionado;
//array para guardor los personajes del json.
let total_p;
//Aquí se guarda el resultado de getRandomIndex().
let almacenarProbabilidad;

//variables para sonido:
let etiquetaAudio= document.createElement("audio");
etiquetaAudio.setAttribute("preload", "auto");
let sonidoBoss = document.querySelector(".fondoBoss");


//SONIDO DE FONDO:

const audioFondo= document.createElement("audio");
audioFondo.setAttribute("preload", "auto");
audioFondo.setAttribute("src", "audio/efectocueva.mp3");


//FUNCION DE SONIDO DE FONDO: 

// cuerpo.addEventListener("click",()=>{
//     audioFondo.play();
//   })

const divPersonajes = document.getElementById("personajes");


//Constantes de html
const fondo = document.getElementById('fondo');
const botonx1 = document.getElementById('uno');
const botonx10 = document.getElementById('diez');
const oculto = document.getElementById('oculto');
const imagenesPrueba = document.querySelectorAll('.oculto img');
const ventanaGacha = document.getElementById('gachapon');
const contenedor = document.querySelector('.contenedor');
const boss = document.getElementById('tremendoBoss')

//Array para rellenar con id's
const personajes=[];
//Array para rellenar con probabilidades desde json
const pruebaProbabilidades = [];
//Array para guardar pjs obtenidos en el gacha
let personajesObtenidos = [];
let cadenaPjs ="";

//Llamar a los datos del JSON
llamarDatos();

//esto debería ir al principio de la página:



//FUNCIONES

//Función que genera una posición del array de cada personaje, en función a la probabilidad de cada posición.

function getRandomIndex(indice) {
        // Sumar todas las probabilidades. Reduce hace que todos los elementos del array se sumen en uno solo.
  
  const probabilidadTotal = indice.reduce((acumulador, probabilidad) => acumulador + probabilidad, 0);
        // Generar un número aleatorio entre 0 y la suma total de probabilidades
  const numeroRandom = Math.random() * probabilidadTotal;

  almacenarProbabilidad = 0;
  // Iterar sobre las probabilidades hasta encontrar el índice correspondiente
  for (let i = 0; i < indice.length; i++) {
    almacenarProbabilidad += indice[i];
    if (numeroRandom < almacenarProbabilidad) {
      return i;
    }
  }
 
}

//Funcion para tirar de un gacha

function randomizarGacha(){
        //Coge un indice del array aleatorio
  indiceAleatorio = getRandomIndex(pruebaProbabilidades);
        //Cogemos un objeto del array utilizando el indice aleatorio
    personajeSeleccionado = personajes[indiceAleatorio];
        //Generar las imagenes con las rutas
    oculto.innerHTML+=`<img src="img/${personajeSeleccionado}.png" draggable="false"></img>`;
    guardarPersonajes(personajeSeleccionado);

}

//Funcion para llamar los datos

function llamarDatos(){
  total_p = datos.total_personajes;
  //almacenar en un array los personajes con el id
  for(let i=0;i<total_p;i++){
    let almacenar;
    almacenar = datos.personajes[i]["id"];
    personajes.push(almacenar);
  }
  //almacenar en un array la probabilidad sacandola del json
  for(let i = 0;i<total_p;i++){
      let almacenar;
      almacenar = datos.personajes[i]["probabilidad"];
      pruebaProbabilidades.push(almacenar);
  }   
}

//Funcion para deshabilitar los botones

function deshabilitarBotones(){
  botonx10.disabled="disabled";//deshabilitar el boton x10
  botonx1.disabled="disabled";//deshabilitar el boton x1
}

//Funcion para habilitar los botones

function habilitarBotones(){
  botonx10.disabled = "";//habilitar el boton x10
  botonx1.disabled = "";//habilitar el boton x1
}

//Funcion que guarda los personajes en el array vacío
function guardarPersonajes(personaje){
  let cambiar=true;
  for(let i=0;i<personajesObtenidos.length;i++){
    if(personaje===personajesObtenidos[i]){
      cambiar=false;
      break;
    }
  }
  if(cambiar===true){
      personajesObtenidos.push(personaje); 
        cadenaPjs="";
      for(let p of personajesObtenidos){
        cadenaPjs+=p+",";
      }
      //cadenaPjs="";
      localStorage.setItem('cadenaTemp',cadenaPjs);
  }

  
}



let pruebita = localStorage.getItem('cadenaTemp'); 

console.log("Esto está cogido del local storage:" + localStorage.getItem('cadenaTemp'))

if(pruebita != null){
  personajesObtenidos=pruebita.split(/,\s*/).map(Number);
}

for(let i =0; i<personajesObtenidos.length;i++){
  if(personajesObtenidos[i]===0){
    personajesObtenidos.splice(i,1);
  }
}
console.log("ARRAY PJS? " + personajesObtenidos)


const botonuno = document.getElementById('botonuno');
const botondos = document.getElementById('botondos');
const botontres = document.getElementById('botontres');
const botoncuatro = document.getElementById('botoncuatro')
//funcion para cambiar de pestañas
function deshabilitarVisibility(){

  ventanaGacha.style.display="none";
  ventanaGacha.style.visibility="hidden";

}
function habilitarVisibility(){

  contenedor.style.display="flex";
}

// const todoslosBotones = document.querySelectorAll(".iconos");


botonuno.addEventListener('click',()=>{
  contenedor.style.display="flex";
  contenedor.style.visibility="visible";
  ventanaGacha.style.display="none";
  ventanaGacha.style.visibility="hidden"
  boss.style.display="none";
  boss.style.visibility="hidden"
  divPersonajes.style.display="none";
  divPersonajes.style.visibility="hidden";
})

botondos.addEventListener('click',()=>{
  ventanaGacha.style.display="flex";
  ventanaGacha.style.visibility="visible"
  contenedor.style.display="none";
  contenedor.style.visibility="hidden"
  boss.style.display="none";
  boss.style.visibility="hidden"
  divPersonajes.style.display="none";
  divPersonajes.style.visibility="hidden";
  })

botontres.addEventListener('click',()=>{
  divPersonajes.style.display="flex";
  divPersonajes.style.visibility="visible";
  ventanaGacha.style.display="none";
  ventanaGacha.style.visibility="hidden"
  contenedor.style.display="none";
  contenedor.style.visibility="hidden"
  boss.style.display="none";
  boss.style.visibility="hidden"
  })

botoncuatro.addEventListener('click',()=>{
  boss.style.display="flex";
  boss.style.visibility="visible"
  ventanaGacha.style.display="none";
  ventanaGacha.style.visibility="hidden"
  contenedor.style.display="none";
  contenedor.style.visibility="hidden"
  divPersonajes.style.display="none";
  divPersonajes.style.visibility="hidden";
  })



//EVENTOS

//Evento para tirar x1 al gacha

botonx1.addEventListener('click',
  ()=>{
    if(localStorage.getItem('minerales')>=29){
      randomizarGacha();
      deshabilitarBotones();
      minerales=minerales - 30;
      actualizarMinerales();
      actualizarDaño();
      
    }
    else{
      alert("No tienes los minerales necesarios.")
    }
  });

//Evento para tirar x10 al gacha

botonx10.addEventListener('click',
  ()=>{
    if(localStorage.getItem('minerales')>=299){
        oculto.style.visibility = "visible";//añadirle la propiedad visibility para que se vea.
        for(let i =0;i<10;i++){
          randomizarGacha();
        }
        deshabilitarBotones();
        minerales = minerales -300;
        actualizarMinerales();
        actualizarDaño();  
  }
  else{
    alert("No tienes los minerales necesarios.")
  }
});

//Evento para volver a habilitar los botones haciendo click en la pantalla

fondo.addEventListener("click",()=>{
  oculto.innerHTML = "";//borrar imagenes de los personajes.
  habilitarBotones();
});



/*
*
*     FINAL JAVASCRIPT DEL GACHA
*
*/

/*
*
*     INICIO JAVASCRIPT DEL CLICKER
*
*/

    //VARIABLES Y CONSTANTES

    let img = document.getElementById("imgClicker");
    let num = document.getElementById("cant");
    let minerales= parseInt(localStorage.getItem('minerales')) || 0;
    
    let clicks=0;


    //FUNCIONES´

    //Función para obtener minerales haciendo click en la imagen


    function minar(){
      minerales=minerales+1;
      clicks++;
      actualizarMinerales();
      
  }

  
    function actualizarMinerales(){
          num.innerText=minerales;
          localStorage.setItem('minerales',minerales); 

    }      


  
  img.addEventListener("click",()=>{
      minar();
      
      //sonido de minar
      // etiquetaAudio.setAttribute("src", "audio/miniminar.mp3");
  
      // etiquetaAudio.play();
      
  })

  // Guardar Datos


  const mineralesGuardados = localStorage.getItem('minerales');
  if (mineralesGuardados !== null) {
      const minerales = parseInt(mineralesGuardados);
      console.log('Minerales cargados:', minerales);
      
  } else {
      console.log('No se encontraron minerales guardados');
  }

  if (minerales > 0) {
      num.innerText = minerales;
  }




/*
*
*     FINAL JAVASCRIPT DEL CLICKER
*
*/


/*Audio en el BOSS:*/



  // sonidoBoss.addEventListener("click", () => {

  //   etiquetaAudio.setAttribute
  //   ("src", "audio/quejarse.mp3");
  //   etiquetaAudio.play();
  // });

let vida = datos["boss"]["vida"];
let vidamax = datos["boss"]["vida"];

  /**Barra de vida de boss */
const barraboss = document.getElementById("vidaBoss");

let bonf=0;

function actualizarDaño(){
bonf=0;
  for(let i of personajesObtenidos){
    for(let p of datos["personajes"]){
      if(p["id"] === i){
        bonf=bonf+p["poder"];
      }
    }
  }

  
}

let potente = document.getElementById("potente")
let multiplicador = 1.10;



//Para guardar la vida/nivel
let comprobador = localStorage.getItem("nivelG");
// if (nivel =! null){
//   console.log(nivel)
//   for(let i=0;i<(nivel-1);i++){
//       vidamax=(localStorage.getItem("vidamax"))*multiplicador;
//       barraboss.setAttribute("max",vidamax)
//       barraboss.setAttribute("value",vidamax);
//   }
// }
  if(comprobador===null){
    potente.innerText=`${barraboss.getAttribute("value")}/${barraboss.getAttribute("max")}`;
    barraboss.setAttribute("value",vida)
    barraboss.setAttribute("max",vidamax)

  }
  else{
    potente.innerText=`${localStorage.getItem("vidaG")}/${localStorage.getItem("vidaMG")}`;
    barraboss.setAttribute("value",localStorage.getItem("vidaG"))
    barraboss.setAttribute("max",localStorage.getItem("vidaMG"))
  }

sonidoBoss.addEventListener("click",(event)=>{
  actualizarDaño();
  

  var numerodps = document.getElementById("numero");
  
  // Generar un número aleatorio entre 1 y 10
  let x = event.clientX;
  let y = event.clientY;

 

  
  // Mostrar el número generado
  numerodps.style.left =30 + x + "px";
  numerodps.style.top = -30 + y + "px";
  numerodps.innerText =bonf+1;
  numerodps.style.display = "block";
  
  // Ocultar el número después de 2 segundos (2000 milisegundos)
  setTimeout(function() {
    numero.style.display = "none";
  }, 400);

  


  vida=localStorage.getItem("vidaG")
  vidamax=localStorage.getItem("vidaMG")

  vida=vida-1-bonf;

    if(vida<0){
      vidamax = Math.floor(vidamax*multiplicador); 
      vida = vidamax
      comprobador =  1;
      localStorage.setItem("nivelG",comprobador)


    }
    localStorage.setItem("vidaG",vida)
    localStorage.setItem("vidaMG",vidamax)

    potente.innerText=`${localStorage.getItem("vidaG")}/${localStorage.getItem("vidaMG")}`;
    barraboss.setAttribute("value",localStorage.getItem("vidaG"))
    barraboss.setAttribute("max",localStorage.getItem("vidaMG"))

    console.log(barraboss.getAttribute("value"))
    console.log(barraboss.getAttribute("max"))
  }

)


/**
 * DIV PERSONAJES
 */





