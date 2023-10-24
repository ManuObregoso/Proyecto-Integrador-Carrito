const show =() => {
    let datos = localStorage.getItem(`Producto`)

    if(!datos){
        return document.querySelector(`#det`).innerHTML = "<h1>No hay Producto<h1/>"

} 

datos = JSON.parse(datos)
console.log(datos)
PlantProd(datos)


}


function agregar(id,name,price,img) {

    let cart = localStorage.getItem(`cart`);
     console.log(id)
    // si existe carrito
    if(!cart){
      localStorage.setItem(`cart`,JSON.stringify([]))
      cart = localStorage.getItem(`cart`)
    }
    cart = JSON.parse(cart)
    //si existe un producto?
    
    // si el prod. esta?
    if(cart.length <1){
      cart.push({id,cantidad:1,name,price,img})
      localStorage.setItem(`cart`,JSON.stringify(cart))
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Excelente Elección!',
        showConfirmButton: false,
        timer: 3000
      })
    } else {
      
      const buscar = cart.find((item => item.id == id))
      if( buscar){
        const actualizado = cart.map((item) =>{
         if(id == item.id){
          item.cantidad+=1; 
         }
         return item;
     
        })
        
        localStorage.setItem(`cart`,JSON.stringify(actualizado))
       
      } else {
        cart.push({id,cantidad:1,name,price,img})
        localStorage.setItem(`cart`,JSON.stringify(cart))
        
      }
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Excelente Elección!',
        showConfirmButton: false,
        timer: 3000
      })
    }
    
    // location.reload()
    }
    

const PlantProd = ({img,name,price,marca,id,descripcion}) => {
    
    const Card = document.createElement("article")
    Card.classList.add(`Card`)

    const CardB = document.createElement("article")
    CardB.classList.add(`CardB`)

    Card.innerHTML += `<img src="${img}" alt="">`
    CardB.innerHTML +=`<h4>${name}</h4><p class="Price">$${price}</p><p class="Brand">${marca}</p><p class="Descr">${descripcion}</p>`
    //crear botones para cards
    const buttCom = document.createElement(`button`)
    buttCom.classList.add(`btn`)
    buttCom.textContent = "Agregar"
    document.querySelector(`#det`).appendChild(Card)
    document.querySelector(`#det`).appendChild(CardB)
    CardB.append(buttCom)
    
    buttCom.addEventListener("click",(e) =>agregar(id,name,price,img)) // boton Comprar
   
  }


  show()

 
//volver a inicio
const Principal = document.querySelector(`.Principal`)
Principal.addEventListener("click", e =>{
    e.preventDefault()
    if(e.target.classList.contains(`fa-house`))
    location.assign("./index.html")
})


const CarritoIr = document.querySelector(`.nav`)

//Ir a Carrito
CarritoIr.addEventListener("click", e =>{
  e.preventDefault()
  if(e.target.classList.contains(`fa-shopping-cart`)){
    console.log(e.target.classList.contains(`ver`))
    console.log("ir carrito")
    location.assign("./Carrito.html")
  }
})



// mostrar Cantidad en carrito

const showQuantity = () => {
  const badge = document.querySelector(`.badge`)
  let cart = JSON.parse(localStorage.getItem(`cart`)) || []
  badge.innerHTML = cart.length
  
  }
showQuantity()

