//CLASS
class VENTA {
  constructor(id, idJuego, nombre, precio, precioPromocional, cantidad) {
    this.idVenta = "V" + id
    this.idJuego = idJuego
    this.nombre = nombre
    this.precio = precio
    this.precioPromocional = precioPromocional
    this.cantidad = cantidad
    if (this.precioPromocional == 0) {
      this.subTotal = this.cantidad * this.precio
    }
    else {
      this.subTotal = this.cantidad * this.precioPromocional
    }
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
let carrito = []
$(document).ready(() => {
  pintarJuegos()
  agregarCarrito()
  eliminarCarrito()
  aumentarCantidad()
  disminuirCantidad()
})

//FUNCTIONS
async function agregarCarrito() {
  const resp = await fetch('./BD.json')
  const data = await resp.json()
  $("#listaJuegos").click((e) => {
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
      pintarCarrito(carrito)
    }
  })
}
function eliminarCarrito() {
  $("#detallePintar").click((e) => {
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
          pintarCarrito(carrito)
        }
      })
    }
  })
}
function disminuirCantidad() {
  $("#detallePintar").click((e) => {
    if (e.target.classList.contains("menos")) {
      let indice = carrito.indexOf(carrito.find(venta => ("-" + venta.idVenta) == (e.target.id)))
      if (carrito[indice].cantidad != 1) {
        carrito[indice].actualizarCantidad("-")
        pintarCarrito(carrito)
      }
    }
  })
}
function aumentarCantidad() {
  $("#detallePintar").click((e) => {
    if (e.target.classList.contains("mas")) {
      let indice = carrito.indexOf(carrito.find(venta => ("+" + venta.idVenta) == (e.target.id)))
      carrito[indice].actualizarCantidad("+")
      pintarCarrito(carrito)
    }
  })
}
async function pintarJuegos() {
  const resp = await fetch('./BD.json')
  const data = await resp.json()
  let cadena = ""
  data.forEach(juego => {
    if (juego.descuento == 0) {
      cadena += '<div class="juego"><div class="juegoContenedor"><div class="juego-logo"><img src="' + juego.imagen + '" alt=' + juego.nombre + '><div class="juego-logo-precio"><p>$' + juego.precio + '</p></div></div><button id="' + juego.idJuego + '" class="juego-botonVenta">COMPRAR</button></div></div>';
    }
    else {
      cadena += '<div class="juego"><div class="juegoContenedor"><div class="juego-logo"><img src="' + juego.imagen + '" alt=' + juego.nombre + '><div class="juego-logo-descuento"><div class="juego-logo-descuento-contenedor"><p>-' + (juego.descuento * 100) + '%</p></div></div><div class="juego-logo-precio"><p>$' + juego.precioPromocional + '</p></div></div><button id="' + juego.idJuego + '" class="juego-botonVenta">COMPRAR</button></div></div>';
    }
  })
  $("#listaJuegos").html(cadena)
}

function pintarCarrito(juego) {
  let cadena = ""
  let total = 0
  juego.forEach(juego => {
    if (juego.precioPromocional != 0) {
      cadena += '<div class="detalle"><div class="detalle-nombre"><p>' + juego.nombre + '</p></div><div class="detalle-precio"><div class="detalle-precio-antes"><p>$' + juego.precio + '</p></div><div class="detalle-precio-ahora"><p>$' + juego.precioPromocional + '</p></div></div><div class="detalle-cantidad"><button id="-' + juego.idVenta + '" class="menos">-</button><p>' + juego.cantidad + '</p><button id="+' + juego.idVenta + '" class="mas">+</button></div><div class="detalle-subTotal"><p>$' + juego.subTotal + '</p></div><div class="detalle-eliminar"><button id="' + juego.idVenta + '" class="eliminar">X</button></div></div>'
    }
    else {
      cadena += '<div class="detalle"><div class="detalle-nombre"><p>' + juego.nombre + '</p></div><div class="detalle-precio"><div class="detalle-precio-ahora"><p>$' + juego.precio + '</p></div></div><div class="detalle-cantidad"><button id="-' + juego.idVenta + '" class="menos">-</button><p>' + juego.cantidad + '</p><button id="+' + juego.idVenta + '" class="mas">+</button></div><div class="detalle-subTotal"><p>$' + juego.subTotal + '</p></div><div class="detalle-eliminar"><button id="' + juego.idVenta + '" class="eliminar">X</button></div></div>'
    }
    total = total + juego.subTotal
  })
  cadena += '<div class="detalle"><div class="detalle-nombre"><p></p></div><div class="detalle-precio"><div class="detalle-precio-antes"><p></p></div><div class="detalle-precio-ahora"><p></p></div></div><div class="detalle-cantidad"><p>TOTAL</p></div><div class="detalle-subTotal">$' + total + '</div><div class="detalle-eliminar"></div></div>'
  $("#detallePintar").html(cadena)
}