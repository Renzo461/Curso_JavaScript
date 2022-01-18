let opcion = 0;
let primer_numero= 0;
let segundo_numero= 0;
let resultado=0;
//Repetimos hasta que se ingresa "ESC"
do{    
    alert("[1] SUMA\n[2] RESTA\n[3] DIVISIÓN\n[4] MULTIPLICACIÓN\n[5] SALIR\nELIJA UNA OPCIÓN: ");
    opcion=parseInt(prompt(""));
    switch(opcion){
        case 1:{
            primer_numero=parseInt(prompt("Ingrese primer número:"));
            segundo_numero=parseInt(prompt("Ingrese segundo número:"));
            resultado=primer_numero+segundo_numero;
            alert("La suma  de "+primer_numero+" y "+segundo_numero+" es: "+resultado);
            break
        }        
        case 2:{
            primer_numero=parseInt(prompt("Ingrese primer número:"));
            segundo_numero=parseInt(prompt("Ingrese segundo número:"));
            resultado=primer_numero-segundo_numero;
            alert("La resta de "+primer_numero+" y "+segundo_numero+"  es "+resultado);            
            break;
        }        
        case 3:{
            primer_numero=parseInt(prompt("Ingrese primer número:"));
            segundo_numero=parseInt(prompt("Ingrese segundo número:"));
            resultado=primer_numero/segundo_numero;
            alert("La división de "+primer_numero+" y "+segundo_numero+"  es "+resultado);
            break;
        }
        case 4:{
            primer_numero=parseInt(prompt("Ingrese primer número:"));
            segundo_numero=parseInt(prompt("Ingrese segundo número:"));
            resultado=primer_numero*segundo_numero;
            alert("La multiplicación de "+primer_numero+" y "+segundo_numero+"  es "+resultado);
            break;
        }
        case 5:{
            alert("GRACIAS");
            break;
        }        
    }    
    if(opcion<1||opcion>5){
        alert("OPCIÓN NO VALIDA")
    }
}while(opcion != "5" )