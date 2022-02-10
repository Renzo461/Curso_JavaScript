function agregarJuego() {
    const id = juegosStock.length + 1
    const nombre = document.getElementById("nombre").value
    const plataforma = document.getElementById("plataforma").value
    const precio = document.getElementById("precio").value
    const JUEGO = new juego(id, nombre, plataforma, precio)
    console.log(nombre)
    juegosStock.push(JUEGO)

}
const inNombre=document.getElementById("inputNombre"),
inImagen=document.getElementById("inputImagen"),
inPrecio=document.getElementById("inputPrecio"),
outNombre=document.getElementById("outputNombre"),
outImagen=document.getElementById("outputImagen"),
outPrecio=document.getElementById("outputPrecio")

inNombre.addEventListener("keyup",()=>{
    outNombre.innerText=inNombre.value
})
inImagen.addEventListener("keyup",()=>{
    outImagen.src=inImagen.value
})
inPrecio.addEventListener("keyup",()=>{
    outPrecio.innerText="€ "+inPrecio.value
})
inPrecio.addEventListener("change",()=>{
    outPrecio.innerText="€ "+inPrecio.value
})