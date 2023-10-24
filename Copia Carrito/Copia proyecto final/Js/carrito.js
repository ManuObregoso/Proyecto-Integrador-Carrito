
const insumos = async () => {
    try {
      const respuesta = await  fetch("Js/productos.json")
       return await respuesta.json()
    } catch (error) {
        console.error(error)
    }
}

const CantProd = document.querySelector(`.CantProd`)
const TotalCompra = document.querySelector(`.TotalCart`)



const showCart = (productos) => {

  let cart = JSON.parse(localStorage.getItem(`cart`))
  let items = cart.map ((item) => ({producto:productos.find((producto) =>producto.id == item.id),cantidad:item.cantidad}))
 
   const cantidadProductos = document.getElementById("cantidad");
   const contenedorCartProd = document.querySelector("#Lista");
  // Ver Html Carrito 
     contenedorCartProd.innerHTML = "";
     cart.forEach((item) => {
     
      const infocarrito = document.createElement("article");
      infocarrito.classList.add("descri-prod");
      infocarrito.innerHTML = `
      <img src="${item.img}" alt="Insumos">
      <h3>${item.name}</h3>
      <span>$${item.price}</span>  
      `;


      const formQuantity = document.createElement("form")
      const btnAdd = document.createElement("button")
      const btnMinus = document.createElement("button")
      const btnRemove = document.createElement("button")
      const quantity = document.createElement("span")
      formQuantity.onsubmit = e => e.preventDefault()
 
      quantity.innerHTML = item.cantidad
      btnAdd.setAttribute("type","button")
      btnMinus.setAttribute("type","button")
      btnRemove.setAttribute("type","button")
      btnAdd.className="btn-add fa-solid fa-plus"
      btnMinus.className="btn-min fa-solid fa-minus"
      btnRemove.className="fa-solid fa-trash"
      btnAdd.onclick = (e) => setQuantity(item,e.target.className)
      btnMinus.onclick = (e) => setQuantity(item,e.target.className)
      btnRemove.onclick = (e) => removeItem(item)
      formQuantity.append(btnMinus,quantity,btnAdd,btnRemove)
      infocarrito.append(formQuantity)
      contenedorCartProd.append(infocarrito);
        
      })
    
}
insumos().then(productos => showCart(productos)).catch(error=>console.error(error))



function actualizar(items){
  let cart = JSON.parse(localStorage.getItem(`cart`))
  let cantidad = 0;
  let total = 0;
 if( cart.length > 0){
  cart.forEach(items => {
    cantidad += items.cantidad
    total += items.cantidad * items.price 
  })
  CantProd.innerText = cantidad
  TotalCompra.innerText = total
  console.log(cantidad)
  console.log(total)
 }
}
actualizar()

//agregar o quitar productos

const setQuantity = (item,accion) =>{
  // Determinar la acción
  const isAdd = accion.includes("add")
  let cart = JSON.parse(localStorage.getItem(`cart`))
  if(isAdd){
    cart = cart.map(it => {
      if(it.id == item.id) {
        it.cantidad+=1
      } 
      return it
    })
    localStorage.setItem(`cart`,JSON.stringify(cart))
  }else{
    cart = cart.map(it => {
      if(it.id == item.id && it.cantidad > 1) {
        it.cantidad-=1
      } 
      return it
    })
    localStorage.setItem(`cart`,JSON.stringify(cart))
  }
  location.reload()
} 

const removeItem = (item) => {
  let cart = JSON.parse(localStorage.getItem(`cart`))
  cart = cart.filter(it => it.id != item.id)
  localStorage.setItem(`cart`,JSON.stringify(cart))
  location.reload()
}


// volver a Home

//volver a inicio
const Principal = document.querySelector(`.Principal`)
Principal.addEventListener("click", e =>{
    e.preventDefault()
    if(e.target.classList.contains(`fa-house`))
    location.assign("./index.html")
})

const Comprar = document.querySelector(`.InfoCart`);

Comprar.addEventListener("click", e => {
  e.preventDefault()
  let cart= localStorage.getItem(`cart`)
  if(e.target.classList.contains(`btn-comprar`))
  Swal.fire({
    
    title: 'Gracias Por Su Compra!',
    text: 'En breve nos contactaremos',
    imageUrl: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ5dGVzfGVufDB8fDB8fHww',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
  })
})

