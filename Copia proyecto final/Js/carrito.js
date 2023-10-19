const insumos = async () => {
    try {
      const respuesta = await  fetch("Js/productos.json")
       return await respuesta.json()
    } catch (error) {
        console.error(error)
    }
}

insumos().then(productos => console.log(productos)).catch(error=>console.error(error))

console.log("Pagina 3")


    

// Profe
 let cart = JSON.parse(localStorage.getItem(`cart`))
 //let items = cart.map ((item) => ({producto:productos.find((producto) =>producto.id == item.id),cantidad:item.cantidad}))
    






// let CarritoDescarga = localStorage.getItem("Insumos")
// const CarritoDescargaObje = JSON.parse(CarritoDescarga)
// console.log(CarritoDescargaObje)


// const contenedorCarritoProductos = document.querySelector("#Lista");
// // Ver Html Carrito 
// contenedorCarritoProductos.innerHTML = "";
// CarritoDescargaObje.forEach(CarritoDescargaObje => {
    
//     const div = document.createElement("div");
//     div.classList.add("carrito-producto");
//     div.innerHTML = `
//         <div class="carrito-producto-titulo">
//             <small>Cantidad</small>
//             <h3>${CarritoDescargaObje.cantidad}</h3>
//         </div>
//         <div class="carrito-producto-cantidad">
//             <small>Descripción</small>
//             <p>${CarritoDescargaObje.name}</p>
//         </div>
//         <div class="carrito-producto-precio">
//             <small>Precio</small>
//             <p>$${CarritoDescargaObje.precio}</p>
//         </div>
        
        
//     `;

//     contenedorCarritoProductos.append(div);
// })






// const CardAr = document.createElement(`article`)
// CardAr.classList.add("CardAr")

// CardAr.innerHTML +=`<h4>${CarritoDescargaObje.name}</h4><p class="Brand">${CarritoDescargaObje.cantidad}</p><p class="Description">${CarritoDescargaObje.precio}</p>`
// document.querySelector(`.carrito`).appendChild(CardAr)
// // botones Volver
// const butBack = document.createElement(`button`)
// butBack.classList.add("Back")
// butBack.textContent = "Back"
// CardAr.append(butBack)
// // botones Add
// const butAdd = document.createElement(`button`)
// butAdd.classList.add("Add")
// butAdd.textContent = "Add"
// CardAr.append(butAdd)

// // Click boton volver a la pagina Home
// CardAr.addEventListener("click", e =>{
//     if(e.target.classList.contains(`Back`)){
//         location.assign("./index.html")
//     }
// })