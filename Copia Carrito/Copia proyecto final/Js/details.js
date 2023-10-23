const show =() => {
    let datos = localStorage.getItem(`Producto`)

    if(!datos){
        return document.querySelector(`#det`).innerHTML = "<h1>No hay Producto<h1/>"

} 

datos = JSON.parse(datos)
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
    




const PlantProd = ({img,name,price,marca,id}) => {
    
    const Card = document.createElement("article")
    Card.classList.add(`Card`)

    Card.innerHTML += `<img src="${img}" alt=""><h4>${name}</h4><p class="Price">$${price}</p><p class="Brand">${marca}</p>`
    //crear botones para cards
    const buttCom = document.createElement(`button`)
    buttCom.classList.add(`btn`)
    buttCom.textContent = "Agregar"
    document.querySelector(`#det`).appendChild(Card)
    Card.append(buttCom)
    
    buttCom.addEventListener("click",(e) =>agregar(id,name,price,img)) // boton Comprar
   
  }


  show()