//CLASS
class VENTA {
  constructor(id, idJuego, nombre, precio, precioPromocional, cantidad) {
    this.idVenta = "V" + id
    this.idJuego = idJuego
    this.nombre = nombre
    this.precio = precio
    this.precioPromocional = precioPromocional
    this.cantidad = cantidad
    this.subTotal = this.cantidad * this.precioPromocional    
  }
  actualizarCantidad(signo) {
    if (signo == "+") {
      this.cantidad++
    }
    else {
      this.cantidad--
    }
    this.actualizarSubTotal()
  }
  actualizarSubTotal() {
    if (this.precioPromocional == 0) {
      this.subTotal = this.cantidad * this.precio
    }
    else {
      this.subTotal = this.cantidad * this.precioPromocional
    }
  }
}

//MAIN
const STOCK = document.querySelector("#listaJuegos")
const CARRO = document.querySelector("#detallePintar")
let carrito = []

obtenerLocal()
pintarJuegos()
agregarCarrito()
eliminarCarrito()

//FUNCTIONS
async function pintarJuegos() {
  const resp = await fetch('./BD.json')
  const data = await resp.json()
  let cadena = ""
  data.forEach(juego => {
    if (juego.descuento == 0) {
      cadena += `<div class="juego">
        <div class="juegoContenedor">
          <div class="juego-logo">
            <img src="${juego.imagen}" alt="${juego.nombre}">
            <div class="juego-logo-precio">
              <p>$${juego.precio}</p>
            </div>
          </div>
          <button id="${juego.idJuego}" class="juego-botonVenta">COMPRAR</button>
        </div>
      </div>`;
    }
    else {
      cadena += `<div class="juego">
        <div class="juegoContenedor">
          <div class="juego-logo">
            <img src="${juego.imagen}" alt="${juego.nombre}">
            <div class="juego-logo-descuento">
              <div class="juego-logo-descuento-contenedor">
                <p>-${juego.descuento * 100}%</p>
              </div>
            </div>
            <div class="juego-logo-precio">
              <p>$${juego.precioPromocional}</p>
            </div>
          </div>
          <button id="${juego.idJuego}" class="juego-botonVenta">COMPRAR</button>
        </div>
      </div>`;
    }
  })
  STOCK.innerHTML = cadena
}

function pintarCarrito(juego) {
  let cadena = ""
  if (juego.length != 0) {
    let total = 0
    juego.forEach(juego => {
      if (juego.precioPromocional != juego.precio) {
        cadena += `<div class="detalle">
          <div class="detalle-nombre">
            <p>${juego.nombre}</p>
          </div>
          <div class="detalle-precio">
            <div class="detalle-precio-antes">
              <p>$${juego.precio}</p>
            </div>
            <div class="detalle-precio-ahora">
              <p>$${juego.precioPromocional}</p>
            </div>
          </div>
          <div class="detalle-cantidad">
            <button id="-${juego.idVenta}" class="menos">-</button>
            <p>${juego.cantidad}</p>
            <button id="+${juego.idVenta}" class="mas">+</button>
          </div>
          <div class="detalle-subTotal">
            <p>$${juego.subTotal}</p>
          </div>
          <div class="detalle-eliminar">
            <button id="${juego.idVenta}" class="eliminar">X</button>
          </div>
        </div>`
      }
      else {
        cadena += `<div class="detalle">
          <div class="detalle-nombre">
            <p>${juego.nombre}</p>
          </div>
          <div class="detalle-precio">
            <div class="detalle-precio-ahora">
              <p>$${juego.precio}</p>
            </div>
          </div>
          <div class="detalle-cantidad">
            <button id="-${juego.idVenta}" class="menos">-</button>
            <p>${juego.cantidad}</p>
            <button id="+${juego.idVenta}" class="mas">+</button>
          </div>
          <div class="detalle-subTotal">
            <p>$${juego.subTotal}</p>
          </div>
          <div class="detalle-eliminar">
            <button id="${juego.idVenta}" class="eliminar">X</button>
          </div>
        </div>`
      }
      total = total + juego.subTotal
    })
    cadena += `<div class="detalle">
      <div class="detalle-nombre">
        <p></p>
      </div>
      <div class="detalle-precio">
        <div class="detalle-precio-antes">
          <p></p>
        </div>
        <div class="detalle-precio-ahora">
          <p></p>
        </div>
      </div>
      <div class="detalle-cantidad">
        <p>TOTAL</p>
      </div>
      <div class="detalle-subTotal">$${total}</div>
      <div class="detalle-eliminar"></div>
    </div>
    <button id="terminar" class="terminar">FINALIZAR COMPRA</button>`
  }
  CARRO.innerHTML = cadena
}
function obtenerLocal() {
  let local = JSON.parse(localStorage.getItem("CARRO"))
  if (local != null) {
    local.forEach(juego=>{
      carrito.push(new VENTA(juego.idVenta,juego.idJuego,juego.nombre,juego.precio,juego.precioPromocional,juego.cantidad))
    })   
    pintarCarrito(carrito)
  }  
}
async function agregarCarrito() {
  const resp = await fetch('./BD.json')
  const data = await resp.json()
  STOCK.addEventListener("click", (e) => {
    if (e.target.classList.contains("juego-botonVenta")) {
      let compra = data.find(juego => juego.idJuego == (e.target.id))
      let verificar = carrito.indexOf(carrito.find(juego => juego.idJuego == (e.target.id)))
      if (verificar == -1) {
        carrito.push(new VENTA((carrito.length + 1), compra.idJuego, compra.nombre, compra.precio, compra.precioPromocional, 1))
      }
      else {
        carrito[verificar].actualizarCantidad("+")
      }
      swal.fire({
        toast: true,
        position: "top-end",
        background: "black",
        color: "white",
        showConfirmButton: false,
        timer: 2000,
        icon: "success",
        title: "Producto Añadido"
      });
      localStorage.setItem("CARRO", JSON.stringify(carrito))
      pintarCarrito(carrito)
    }
  })
}
function eliminarCarrito() {
  CARRO.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
      let indice = carrito.indexOf(carrito.find(venta => venta.idVenta == (e.target.id)))
      Swal.fire({
        background: "black",
        color: "white",
        title: "",
        text: "¿Estas seguro de eliminar " + carrito[indice].nombre + " del carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'NO',
        confirmButtonText: 'SI'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            background: "black",
            color: "white",
            text: carrito[indice].nombre + " Eliminado",
            showConfirmButton: false,
            timer: 2000
          })
          carrito.splice(indice, 1)          
          if(carrito.length==0){
            localStorage.clear()
          }
          else{
            localStorage.setItem("CARRO", JSON.stringify(carrito))
          }
          pintarCarrito(carrito)
        }
      })
    }
    disminuirCantidad(e)
    aumentarCantidad(e)
    terminar(e)
  })
}
function disminuirCantidad(event) {
  if (event.target.classList.contains("menos")) {
    let indice = carrito.indexOf(carrito.find(venta => ("-" + venta.idVenta) == (event.target.id)))
    if (carrito[indice].cantidad != 1) {
      carrito[indice].actualizarCantidad("-")
      localStorage.setItem("CARRO", JSON.stringify(carrito))
      pintarCarrito(carrito)
    }
  }
}
function aumentarCantidad(event) {
  if (event.target.classList.contains("mas")) {
    let indice = carrito.indexOf(carrito.find(venta => ("+" + venta.idVenta) == (event.target.id)))
    carrito[indice].actualizarCantidad("+")
    localStorage.setItem("CARRO", JSON.stringify(carrito))
    pintarCarrito(carrito)
  }
}
function terminar(event) {
  if (event.target.classList.contains("terminar")) {
    swal.fire({
      toast: true,
      position: "top-end",
      background: "black",
      color: "white",
      showConfirmButton: false,
      timer: 2000,
      icon: "success",
      title: "Compra Finalizada"
    });
    carrito = []
    localStorage.clear()
    CARRO.innerHTML = ""
  }
}
