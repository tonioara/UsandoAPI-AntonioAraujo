
const API_URL = 'https://potterhead-api.vercel.app/api/characters';


async function ObtenerDatosApi() {
  try {
    
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json()

    const primeros30 = datos.slice(0, 30)
    
    return primeros30
  } catch (error) {
    console.error("Error en ObtenerDatosApi:", error)
    return [];
  }
}

async function getArrayPersonajes() { 
  let personajes = await ObtenerDatosApi()
  return personajes
}

/// Array para distintas casas y personajes
const gryffindorPersonajes = []
const slytherinPersonajes = []
const hufflepuffPersonajes = []
const ravenclawPersonajes = []
const profesores = []
const otherPersonajes = []

async function IniciandoPersonajesYCasas() {

const todosLosPersonajes= await getArrayPersonajes()
console.log(todosLosPersonajes)

todosLosPersonajes.forEach(character => {
  if (character.hogwartsStaff) {
    profesores.push(character);
}else {
    const houseName = character.house ? character.house.toLowerCase() : ''

    switch (houseName) {
        case 'gryffindor':
          gryffindorPersonajes.push(character)
            break;
        case 'slytherin':
          slytherinPersonajes.push(character)
            break;
        case 'hufflepuff':
            hufflepuffPersonajes.push(character)
            break;
        case 'ravenclaw':
            ravenclawPersonajes.push(character)
            break;
        default:
            
            if (character.name) {
                otherPersonajes.push(character);
            }
            break;
    }
}
});
}

async function cardGryffindor(){
  

  const personajesGryffindor=document.getElementById('card-Gryffindor')
  personajesGryffindor.innerHTML=''

  
  
  gryffindorPersonajes.forEach((el)=>{
     personajesGryffindor.innerHTML +=
    `<div class="character-card ">
        <img class="imgGry" src="${el.image}" alt="${el.name}">
        <h3>${el.name}</h3>
        <p class="card-detail">Casa: ${el.house}</p>
        <p class="card-detail">Nacimiento: ${el.dateOfBirth}</p>
        <button class="add-to-favorites-btn">Agregar a Favoritos</button>
    </div>`
   })

  
 
}
async function cardSlytherin(){
  

  const personajesSlytherin=document.getElementById('card-slytherin')
  personajesSlytherin.innerHTML=''

  slytherinPersonajes.forEach((el)=>{
    personajesSlytherin.innerHTML +=
    `<div class="character-card card-slytherin">
    <img class="imgGry" src="${el.image}" alt="${el.name}"">
    <h3>${el.name}</h3>
    <p class="card-detail">Casa: ${el.house} </p>
    <p class="card-detail">Nacimiento:  ${el.dateOfBirth}</p>
    <button class="add-to-favorites-btn">Agregar a Favoritos</button>
</div>`
   })
  
 
}
async function cardHufflepuff(){
  

  const personajesHufflepuff=document.getElementById('card-hufflepuff')
  personajesHufflepuff.innerHTML=''

  hufflepuffPersonajes.forEach((el)=>{
    personajesHufflepuff.innerHTML +=
    `<div class="character-card card-hufflepuff">
    <img class="imgGry" src="${el.image}" alt="${el.name}"">
    <h3>${el.name}</h3>
    <p class="card-detail">Casa: ${el.house} </p>
    <p class="card-detail">Nacimiento:  ${el.dateOfBirth}</p>
    <button class="add-to-favorites-btn">Agregar a Favoritos</button>
</div>`
   })
  
 
}
async function cardRavenclaw(){
  

  const personajesRavenclaw=document.getElementById('card-ravenclaw')
  personajesRavenclaw.innerHTML=''

  ravenclawPersonajes.forEach((el)=>{
    personajesRavenclaw.innerHTML +=
    `<div class="character-card card-ravenclaw">
    <img class="imgGry" src="${el.image}" alt="${el.name}"">
    <h3>${el.name}</h3>
    <p class="card-detail">Casa: ${el.house} </p>
    <p class="card-detail">Nacimiento:  ${el.dateOfBirth}</p>
    <button class="add-to-favorites-btn">Agregar a Favoritos</button>
</div>`
   })
  
 
}
async function cardProfesores(){
 

  const personajesProfesores=document.getElementById('card-professors')
  personajesProfesores.innerHTML=''

  profesores.forEach((el)=>{
    personajesProfesores.innerHTML +=
    `<div class="character-card card-professors">
    <img class="imgGry" src="${el.image}" alt="${el.name}"">
    <h3>${el.name}</h3>
    <p class="card-detail">Casa: ${el.house} </p>
    <p class="card-detail">Nacimiento:  ${el.dateOfBirth}</p>
    <button class="add-to-favorites-btn">Agregar a Favoritos</button>
</div>`
   })
  
 
}
// Función para ejecutar todo
async function run() {
  
  
  
   await IniciandoPersonajesYCasas()
   await cardGryffindor()
   await cardSlytherin()
   await cardHufflepuff()
   await cardRavenclaw()
   await cardProfesores()
   dandoEventos ()
}

run();


const viewFavoritesBtn = document.getElementById('view-favorites')
const favoritesAside = document.getElementById('favorites-aside')
viewFavoritesBtn.addEventListener('click', (e) => {
    e.preventDefault()
    favoritesAside.classList.toggle('open')
});
function dandoEventos (){
  const addFavoriteBtns = document.querySelectorAll('.add-to-favorites-btn')
  const favoriteList = document.querySelector('.favorite-list')
  addFavoriteBtns.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation()
          const card = e.target.closest('.character-card')
          const name = card.querySelector('h3').textContent
          const existingFavorite = favoriteList.querySelector(`li[data-name="${name}"]`);
          if (!existingFavorite) {
              const listItem = document.createElement('li')
              listItem.setAttribute('data-name', name)
              listItem.innerHTML = `
                  <span>${name}</span>
                  <button class="remove-btn">x</button>
              `;
              favoriteList.appendChild(listItem)
              listItem.querySelector('.remove-btn').addEventListener('click', () => {
                  listItem.remove();
              });
          } else {
              alert(`${name} ya está en tu lista de favoritos.`)
          }
          favoritesAside.classList.add('open')
      });
  });
  document.addEventListener('click', (e) => {
      if (!favoritesAside.contains(e.target) && !viewFavoritesBtn.contains(e.target) && favoritesAside.classList.contains('open')) {
          favoritesAside.classList.remove('open')
      }
  });
}




























