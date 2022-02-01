let juegosStock = [
    {id: 1,nombre: "DARK SOULS 3",plataforma: "Steam",precio: 10},    
    {id: 2,nombre: "GOD OF WAR",plataforma: "Steam",precio: 34},
    {id: 3,nombre: "NIER AUTOMATA",plataforma: "Steam",precio: 18},
    {id: 4,nombre: "ELDEN RING",plataforma: "Steam",precio: 42},
    {id: 5,nombre: "HORIZON ZERO DAWN",plataforma: "Steam",precio: 15},
]
let carrito=[]
let opcion= 0;

function venta(id){
    let juego=juegosStock.find((juego)=>juego.id==id)
    carrito.push(juego)
    montoVenta()
}
function montoVenta(){
    let monto= 0;
    carrito.forEach(juego=>{
        monto+=juego.precio
    })
    console.log(carrito)
    console.log("Cantidad de Productos "+carrito.length)
    console.log("Precio Total: "+monto)
}
do{
    opcion=prompt("["+(juegosStock[0].id)+"]"+"     "+juegosStock[0].nombre+"\n["+(juegosStock[1].id)+"]"+"     "+juegosStock[1].nombre+"\n["+(juegosStock[2].id)+"]"+"     "+juegosStock[2].nombre+"\n["+(juegosStock[3].id)+"]"+"     "+juegosStock[3].nombre+"\n["+(juegosStock[4].id)+"]"+"     "+juegosStock[4].nombre+"\n["+(juegosStock.length+1)+"]"+"     Salir")
    if (opcion>=1&&opcion<=5){
        venta(opcion)        
    }
    else if(opcion==6){
        alert("Gracias")
    }
    else{
        alert("Opcion Incorrecta")
    }
}while(opcion!=6)