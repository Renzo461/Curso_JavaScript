class JUEGO {
  constructor(id, nombre, precio, descuento, imagen) {
    this.idJuego = "J" + id
    this.nombre = nombre
    this.precio = precio
    this.descuento = descuento
    if (descuento == 0) {
      this.precioPromocional = 0
    }
    else {
      this.precioPromocional = this.precio * (1 - descuento)
    }
    this.imagen = imagen
  }
}
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
let juegosStock = []
let boton = []
let carrito = []
juegosStock.push(new JUEGO((juegosStock.length + 1), "Age of Empires IV", 60, 0.2, "./Juegos/ageOfEmpiresiv.jpg"))
juegosStock.push(new JUEGO((juegosStock.length + 1), "Beyond Good and Evil 2", 70, 0, "./Juegos/beyondGoodEvi.jpg"))
juegosStock.push(new JUEGO((juegosStock.length + 1), "Blue Protocol", 50, 0.15, "./Juegos/bluProtocol.jpg"))
juegosStock.push(new JUEGO((juegosStock.length + 1), "Dead Island 2", 20, 0, "./Juegos/deadIsland2.jpg"))
juegosStock.push(new JUEGO((juegosStock.length + 1), "Elden Ring", 60, 0, "./Juegos/eldenRring.jpg"))
juegosStock.push(new JUEGO((juegosStock.length + 1), "FarCry 6", 60, 0.1, "./Juegos/farcry6.jpg"))
juegosStock.push(new JUEGO((juegosStock.length + 1), "Forza Horizon 5", 60, 0.1, "./Juegos/forzahorizon5.jpg"))
juegosStock.push(new JUEGO((juegosStock.length + 1), "Hitman 3", 60, 0, "./Juegos/hitman3.jpg"))
juegosStock.push(new JUEGO((juegosStock.length + 1), "Little Nightmares 2", 30, 0.25, "./Juegos/littlenightmares2.jpg"))
juegosStock.push(new JUEGO((juegosStock.length + 1), "Medium", 50, 0.2, "./Juegos/medium.jpg"))
pintarJuegos(juegosStock);
$(document).ready(() => {
  agregarCarrito()
  eliminarCarrito()
  aumentarCantidad()
  disminuirCantidad()
})

function agregarCarrito() {
  $("#listaJuegos").click((e) => {
    if (e.target.classList.contains("juego-botonVenta")) {
      let compra = juegosStock.find(juego => juego.idJuego == (e.target.id))
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
        text: "¿Estas seguro de eliminar "+carrito[indice].nombre+" del carrito?",
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
            text: carrito[indice].nombre+" Eliminado",
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
function pintarJuegos(juego) {
  let cadena = ""
  juego.forEach(juego => {
    if (juego.descuento == 0) {
      cadena += '<div class="juego"><div class="juego-logo"><img src="' + juego.imagen + '" alt=' + juego.nombre + '><div class="juego-logo-precio"><p>$' + juego.precio + '</p></div></div><button id="' + juego.idJuego + '" class="juego-botonVenta">COMPRAR</button></div>';
    }
    else {
      cadena += '<div class="juego"><div class="juego-logo"><img src="' + juego.imagen + '" alt=' + juego.nombre + '><div class="juego-logo-descuento"><div class="juego-logo-descuento-contenedor"><p>-' + (juego.descuento * 100) + '%</p></div></div><div class="juego-logo-precio"><p>$' + juego.precioPromocional + '</p></div></div><button id="' + juego.idJuego + '" class="juego-botonVenta">COMPRAR</button></div>';
    }
  })
  $("#listaJuegos").html(cadena)
}

function pintarCarrito(juego) {
  let cadena = ""
  let total=0
  juego.forEach(juego => {
    if (juego.precioPromocional != 0) {
      cadena += '<div class="detalle"><div class="detalle-nombre"><p>' + juego.nombre + '</p></div><div class="detalle-precio"><div class="detalle-precio-antes"><p>$' + juego.precio + '</p></div><div class="detalle-precio-ahora"><p>$' + juego.precioPromocional + '</p></div></div><div class="detalle-cantidad"><button id="-' + juego.idVenta + '" class="menos">-</button><p>' + juego.cantidad + '</p><button id="+' + juego.idVenta + '" class="mas">+</button></div><div class="detalle-subTotal"><p>$' + juego.subTotal + '</p></div><div class="detalle-eliminar"><button id="' + juego.idVenta + '" class="eliminar">X</button></div></div>'
    }
    else {
      cadena += '<div class="detalle"><div class="detalle-nombre"><p>' + juego.nombre + '</p></div><div class="detalle-precio"><div class="detalle-precio-ahora"><p>$' + juego.precio + '</p></div></div><div class="detalle-cantidad"><button id="-' + juego.idVenta + '" class="menos">-</button><p>' + juego.cantidad + '</p><button id="+' + juego.idVenta + '" class="mas">+</button></div><div class="detalle-subTotal"><p>$' + juego.subTotal + '</p></div><div class="detalle-eliminar"><button id="' + juego.idVenta + '" class="eliminar">X</button></div></div>'
    }
    total=total+juego.subTotal
  })
  cadena += '<div class="detalle"><div class="detalle-nombre"><p></p></div><div class="detalle-precio"><div class="detalle-precio-antes"><p></p></div><div class="detalle-precio-ahora"><p></p></div></div><div class="detalle-cantidad"><p>TOTAL</p></div><div class="detalle-subTotal">$'+total+'</div><div class="detalle-eliminar"></div></div>'
  $("#detallePintar").html(cadena)
}


