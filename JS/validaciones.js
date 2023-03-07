export function validar(input){
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentsElement.classList.remove("input-container--invalid");
        input.parentsElement.querySelector(".input-message-error").innerHTML =" "
    }else{
        input.parentsElement.classList.add("input-container--invalid");
        input.parentsElement.querySelector(".input-message-error").innerHTML = MostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patterMismatch",
    "customError",
];

const mensajeDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio"
    },
    email: {
        valueMissing: "El campo de email no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password:{
        valueMissing: "El campo de contraseña no puede estar vacio",
        patternMismatch: 
        "Almenos 6 caracteres, maximo 12 debe tener 1 minuscula 1 mayuscula 1 numero y no puede tener caracteres especiales",
    },
    nacimiento:{
        valueMissing: "La fecha no puede estar vacio",
        customError:"Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo numeros no puede estar vacio",
        patternMismatch: "El formato requerido es XX XXXX XXXX",
    },
    direccion:{
        valueMissing: "El campo no puede estar vacio",
        patternMismatch: "la direccion debe contener entre 10 y 40 caracteres",
    },
    ciudad:{
        valueMissing: "El campo no puede estar vacio",
        patternMismatch: "la ciudad debe contener entre 3 y 30 caracteres",
    },
    estado:{
        valueMissing: "El campo no puede estar vacio",
        patternMismatch: "la estado debe contener entre 3 y 30 caracteres",
    }
};

const validadores = {
    nacimiento: (input) => validarNacimiento(input), 
}

function MostrarMensajeDeError(tipoDeInput, input){
    let mensaje =""
    tipoDeErrores.ForEach( error => {
        if(input.validity[error]){
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    });
    return mensaje 
}

function validarNacimiento(input){
    const fechaCliente = new date(input.value);
    let mensaje = " ";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = date();
    const diferenciaFechas = new date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCFullMonth(), 
        fecha.getUTCDate()
        );
    return diferenciaFechas <= fechaActual;
}