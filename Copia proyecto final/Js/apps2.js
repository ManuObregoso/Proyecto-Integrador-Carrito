
const insumos = async () => {
    try {
      const respuesta = await  fetch("Js/productos.json")
       return await respuesta.json()
    } catch (error) {
        console.error(error)
    }
}

insumos().then(productos => console.log(productos)).catch(error=>console.error(error))


const PlantProd = ({img,name,price,marca,id,productos,cantidad,descripcion}) => {
    
    const Card = document.createElement("article")
    Card.classList.add(`Card`)

    Card.innerHTML += `<img src="${img}" alt=""><h4>${name}</h4><p class="Price">$${price}</p><p class="Brand">${marca}</p>`
    //crear botones para cards
    const buttCom = document.createElement(`button`)
    buttCom.classList.add(`btn`)
    buttCom.textContent = "Comprar"
    document.querySelector(`#products`).appendChild(Card)
    Card.append(buttCom)
    //Descripción
    const buttVer= document.createElement(`button`)
    buttVer.classList.add(`btn-view`)
    buttVer.classList.add(`btn`)
    buttVer.textContent = "Ver"
    document.querySelector(`#products`).appendChild(Card)
    Card.append(buttVer)
    buttVer.addEventListener("click", (e) => detalle(id, productos)) // Ver descripción
    buttCom.addEventListener("click",(e) =>agregar(id)) // boton Comprar
}

          
 
// click en Ver Más, muestre el producto mas la descripcion
function detalle(id,productos){
         console.log(id,productos)
         // LocalStore
        const producto = productos.find(producto => producto.id ==id)
        //LocalStora
        const ProdLocal = JSON.stringify(producto)
        localStorage.setItem("Producto", ProdLocal)
        location.assign("./descripcion.html")
   }

const MostrarProd = productos => productos.forEach((producto,_,productos) => PlantProd({...producto,productos}));


insumos().then(productos => {
    MostrarProd(productos)
    
}).catch(error => console.error(error))
  

let productos =[]
// Agregar al carrito
function agregar(id) {

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
  cart.push({id,cantidad:1})
  localStorage.setItem(`cart`,JSON.stringify(cart))
  
} else {
  
  const buscar = cart.find((item => item.id == id))
  if( buscar){
    const actualizado = cart.map((item) =>{
     if(id == item.id){
      item.cantidad+=1; 
      Mostrar()
     }
     return item;
    })
    localStorage.setItem(`cart`,JSON.stringify(actualizado))
  } else {
    cart.push({id,cantidad:1})
    localStorage.setItem(`cart`,JSON.stringify(cart))
   Mostrar()
  
  }
}
}
  
// Ver Carrito Productos
 let cart = JSON.parse(localStorage.getItem(`cart`))
 let items = cart.map ((item) => ({producto:productos.find((producto) =>producto.id == item.id),cantidad:item.cantidad}))


const CartD = document.querySelector(`.Icono`);
const filas = document.querySelector(`.rows`)
const Cards = document.querySelector(`.Container`);
const VerCarrito = document.querySelector(`.verc`)
const ValorTotal = document.querySelector(`.total`);
const contador = document.querySelector(`.ContProductos`);







// Mostrar en Html

   const Mostrar = () =>{
       let cont = 0;
       let total = 0;
       filas.innerHTML ="",
       cart.forEach((cart) => {
       const contenedor = document.createElement(`div`);
       contenedor.classList.add(`allprod`)
       contenedor.innerHTML = `
         <span class="cantidad">${cart.id}</span>
         <span class="nombre">${cart.cantidad}</span>
         <span class="precio">$${cart.name}</span>
         <img class="delete" src="./Imagenes/Carrito/delete.svg" alt="">
       `
     filas.append(contenedor);
       // total = total + parseFloat(Carrito.cantidad * Carrito.precio);
       // cont = cont + Carrito.cantidad;
    
     })
     ValorTotal.innerHTML = `SubTotal: $${total}`;
     contador.innerHTML = `Cantidad :${cont}`

   }






// Activar mini ventana de icono de carrito
CartD.addEventListener("click", e => {
  console.log("ventana")
    e.preventDefault()
    desplegue.classList.toggle("active")
    
})

// // Click en ver carrito

 const BotonVer = document.querySelector(`.Principal`);
 BotonVer.addEventListener("click", e => {
     e.preventDefault()
     if(e.target.classList.contains(`ver`)){
         if(Carrito.length ===0 ){
             swal.fire({
                 title: "Carrito vacío",
                 text: "Aprovecha 30% OFF Mes de Octubre",
                 buttons: ["Aceptar"],
               })
             return false
         } else{
             location.assign("./Carrito.html")
         }
       
    }  
 })

 //ver carrito

 VerCarrito.addEventListener("click", e =>{
  e.preventDefault()
  console.log(e.target.classList.contains(`verc`))
  location.assign("./carrito.html")
 })