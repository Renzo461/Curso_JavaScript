let juegosStock = [{ id: 1, nombre: "Age of Empires", precio: 40, descuento: 0.5, imagen: "./Juegos/ageOfEmpiresiv.jpg" },
{ id: 2, nombre: "Beyond Good Evil", precio: 40, descuento: 0.5, imagen: "./Juegos/beyondGoodEvi.jpg" },
{ id: 3, nombre: "Blue Protocol", precio: 40, descuento: 0.5, imagen: "./Juegos/bluProtocol.jpg" },
{ id: 4, nombre: "Dead Island 2", precio: 40, descuento: 0.5, imagen: "./Juegos/deadIsland2.jpg" },
{ id: 5, nombre: "Elden Ring", precio: 40, descuento: 0.5, imagen: "./Juegos/eldenRring.jpg" },
{ id: 6, nombre: "FarCry 6", precio: 40, descuento: 0.5, imagen: "./Juegos/farcry6.jpg" },
{ id: 7, nombre: "Forza Horizon 5", precio: 40, descuento: 0.5, imagen: "./Juegos/forzahorizon5.jpg" },
{ id: 8, nombre: "Hitman 3", precio: 40, descuento: 0.5, imagen: "./Juegos/hitman3.jpg" },
{ id: 9, nombre: "Little Nightmares 2", precio: 40, descuento: 0.5, imagen: "./Juegos/littlenightmares2.jpg" },
{ id: 10, nombre: "Medium", precio: 40, descuento: 0.5, imagen: "./Juegos/medium.jpg" }]
let stock = document.querySelector(".juegos");
let venta = document.querySelector(".venta")
let cadenaStock = ""
let cadenaVenta = ""
juegosStock.forEach(juego => {
  cadenaStock += '<div class="juego"><div class="imagen"><img src="' + juego.imagen + '" alt="JUEGO"><div class="precio"><p>$' + juego.precio + '</p></div>'
  if (juego.descuento == 0) {
    cadenaStock += '</div><div class="texto"><h1>' + juego.nombre + '</h1></div><div class="boton"><button type="button" class="comprar" id="' + juego.id + '">COMPRAR</button></div></div>';
  }
  else {
    cadenaStock += '<div class="descuento"><div class="contenedor"><p>' + (juego.descuento * 100) + '%</p></div></div></div><div class="texto"><h1>' + juego.nombre + '</h1></div><div class="boton"><button type="button" class="comprar" id="' + juego.id + '">COMPRAR</button></div></div>'
  }
})
stock.innerHTML += cadenaStock;
let boton = []
let carrito = []
let prueba = JSON.parse(localStorage.getItem("Carrito"))
if (prueba != null) {
  prueba.forEach(juego => {
    carrito.push(juego)
    cadenaVenta += '<div class="ventaJuego"><div class="ventaNombre"><p>' + juego.nombre + '</p></div><div class="ventaPrecio"><p>$' + juego.precio + '</p></div><div class="ventaBoton"><button class="eliminar">Eliminar</button></div></div>'
  })
}
venta.innerHTML=cadenaVenta
function guardarCarrito(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor))
}

for (let i = 1; i <= juegosStock.length; i++) {
  boton[i] = document.getElementById(i)
  boton[i].addEventListener("click", () => {
    let compra = juegosStock.find(juego => juego.id == i)
    carrito.push(compra)
    guardarCarrito("Carrito", carrito)
    cadenaVenta = ""
    carrito.forEach(juego=>{      
      cadenaVenta +='<div class="ventaJuego"><div class="ventaNombre"><p>'+juego.nombre+'</p></div><div class="ventaPrecio"><p>$'+juego.precio+'</p></div><div class="ventaBoton"><button class="eliminar">Eliminar</button></div></div>'
    }) 
    venta.innerHTML=cadenaVenta
  })
}