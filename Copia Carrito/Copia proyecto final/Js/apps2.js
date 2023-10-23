
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
    buttCom.textContent = "Agregar"
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
    buttCom.addEventListener("click",(e) =>agregar(id,name,price,img)) // boton Comprar
   
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
    showQuantity()
}).catch(error => console.error(error))
  

let productos =[]
// Agregar al carrito
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


// Ver Carrito Productos
 let cart = JSON.parse(localStorage.getItem(`cart`))
 let items = cart.map ((item) => ({producto:productos.find((producto) =>producto.id == item.id),cantidad:item.cantidad}))


const CartD = document.querySelector(`.Icon`);
const filas = document.querySelector(`.rows`)
const Cards = document.querySelector(`.Container`);
const VerCarrito = document.querySelector(`.verc`)
const ValorTotal = document.querySelector(`.total`);
const contador = document.querySelector(`.ContProductos`);
const CarritoIr = document.querySelector(`.nav`)


//Ir a Carrito
CarritoIr.addEventListener("click", e =>{
  e.preventDefault()
  if(e.target.classList.contains(`fa-shopping-cart`)){
    console.log(e.target.classList.contains(`ver`))
    console.log("ir carrito")
    cart = localStorage.getItem(`cart`)
    cart = JSON.parse(cart)
    if(cart.length === 0){
      Swal.fire(
        'Carrito Vacío',
        '40% OFF Aprovecha las Ofertas del Mes de Octubre',
        'Ok'
      )
    } else {
      location.assign("./Carrito.html")
    }
  }

})


const showQuantity = () => {
  const badge = document.querySelector(`.badge`)
  let cart = JSON.parse(localStorage.getItem(`cart`)) || []
  badge.innerHTML = cart.length
  
  }



  const filtrarProductos = (categoria) => {
    return productos.filter((producto) => {
      return producto.categoria === "Almacenamiento";
    });
  };
  

  
