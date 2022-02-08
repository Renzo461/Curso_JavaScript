class juego{
    constructor(id,nombre,plataforma,precio){
        this.id=id
        this.nombre=nombre
        this.plataforma=plataforma
        this.precio=precio
    }
}
let juegosStock=[]

function agregarJuego(){
    let id=juegosStock.length+1
    let nombre=prompt("Ingrese nombre del juego:")
    let plataforma=prompt("Ingrese plataforma del juego: ")
    let precio=parseInt(prompt("Ingrese precio del juego:"))
    const JUEGO= new juego(id,nombre,plataforma,precio)
    
    juegosStock.push(JUEGO)
}
let op=0
do{    
    op=parseInt(prompt("[1] Agregar Juego\n[2] Salir"))
    switch(op){
        case 1:{
            agregarJuego()
            let indice=juegosStock.length-1
            document.getElementById("juego").innerHTML += '<tr><td>'+juegosStock[indice].id+'</td><td>'+juegosStock[indice].nombre+'</td><td>'+juegosStock[indice].plataforma+'</td><td>'+juegosStock[indice].precio+'</td></tr>'
            break
        }
        case 2:{
            alert("SALIENDO")
            break
        }
    }
    
}while(op!=2)