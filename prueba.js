let total=0;
let opcion = 0;
let juego1=0;
let juego2=0;
let juego3=0;
let juego4=0;
let juego5=0;

let subJuego1=0;
let subJuego2=0;
let subJuego3=0;
let subJuego4=0;
let subJuego5=0;
const JUEGO1= 10;
const JUEGO2= 33.99;
const JUEGO3= 17.99;
const JUEGO4= 41.89;
const JUEGO5= 14.89;
function montoTotal(precio){
    total=Math.round((total+precio)*100)/100;
    alert("TOTAL: "+total+"€");
}
function subTotal(cantidad,precio){
    let subTotal=0;
    subTotal=cantidad*precio;
    return subTotal;
}
do{    
    opcion=parseInt(prompt("-----------LISTA DE JUEGOS-----------\n[1]DARK SOULS 3                         10€\n[2]GOD OF WAR                      33.99€\n[3]NIER AUTOMATA                 17.99€\n[4]ELDEN RING                        41.89€\n[5]HORIZON ZERO DAWN       14.89€\n[6]Ver Carrito\n[7]SALIR\nElija una opción: "));
    switch(opcion){
        case 1:{
            juego1++;
            montoTotal(JUEGO1);                       
            break;
        }        
        case 2:{
            juego2++;
            montoTotal(JUEGO2);            
            break;
        }        
        case 3:{
            juego3++;
            montoTotal(JUEGO3);
            break;
        }
        case 4:{
            juego4++;
            montoTotal(JUEGO4);;
            break;
        }
        case 5:{
            juego5++;
            montoTotal(JUEGO5);
            break;
        }
        case 6:{
            alert("Desc.                                    Cant.       Precio.\nDARK SOULS 3                       "+juego1+"               "+subTotal(juego1,JUEGO1)+"€\nGOD OF WAR                         "+juego2+"               "+subTotal(juego2,JUEGO2)+"€\n[NIER AUTOMATA                  "+juego3+"                "+subTotal(juego3,JUEGO3)+"€\nELDEN RING                           "+juego4+"               "+subTotal(juego4,JUEGO4)+"€\nHORIZON ZERO DAWN         "+juego5+"                "+subTotal(juego5,JUEGO5)+"€\n                                                 TOTAL     "+total+"€");
            break;
        }
        case 7:{            
            alert("GRACIAS");
            break;
        }        
    }    
    if(opcion<1||opcion>7){
        alert("OPCIÓN NO VALIDA")
    }
}while(opcion != 7 )