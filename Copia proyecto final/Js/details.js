const insumos = async () => {
    try {
      const respuesta = await  fetch("Js/productos.json")
       return await respuesta.json()
    } catch (error) {
        console.error(error)
    }
}

insumos().then(productos => console.log(productos)).catch(error=>console.error(error))

console.log("Pagina 2")
const BtnVolver = document.querySelector(`.InicioV`)
const ProduDescarga = localStorage.getItem("Producto")
const ProdoObje = JSON.parse(ProduDescarga)
console.log(ProdoObje)

// const CardUnica = document.querySelector(`.descripcion`)

const CardA = document.createElement(`article`)
CardA.classList.add("CardA")

CardA.innerHTML +=`<img src="${ProdoObje.img}" alt=""><h4>${ProdoObje.name}</h4><p class="Brand">${ProdoObje.marca}</p><p class="Price">$${ProdoObje.price}</p><p class="Description">${ProdoObje.descripcion}</p>`
document.querySelector(`.descripcion`).appendChild(CardA)
// botones Volver
const butBack = document.createElement(`button`)
butBack.classList.add("Back")
butBack.textContent = "Volver"
CardA.append(butBack)
// botones Add
const butAdd = document.createElement(`button`)
butAdd.classList.add("Add")
butAdd.textContent = "Comprar"
CardA.append(butAdd)

// Click boton volver a la pagina Home
CardA.addEventListener("click", e =>{
    if(e.target.classList.contains(`Back`)){
        location.assign("./index.html")
    }
})
    
//volver a inicio

BtnVolver.addEventListener("click", e =>{
    e.preventDefault()
    if(e.target.classList.contains(`InicioV`))
    location.assign("./index.html")
})