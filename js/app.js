// Arreglos

const ingresos = [];

const egresos = [];

// Cargas Generales

let cargarApp = () =>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let cargarCabecero = () =>{
    const ingresos = totalIngresos();
    const egresos = totalEgresos();

    let presupuesto = ingresos - egresos;
    let porcentajeEgreso = egresos / ingresos;

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('ingresos').innerHTML = formatoMoneda(ingresos);
    document.getElementById('egresos').innerHTML = formatoMoneda(egresos);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
}

// Formatos

const formatoMoneda = (valor) =>{
    return valor.toLocaleString('en-US', {style: 'currency', currency:'USD', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor) =>{
    if(!isNaN(valor)){
        return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits:2});
    } else {
        return '0%'
    }
}

// Ingreso

let totalIngresos = () => {
  let total = 0;
  for (let ingreso of ingresos) {
    total += ingreso.valor;
  }

  return total;
};

const cargarIngresos = () =>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) =>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                              onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML;
}

let eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();
};

// Egreso

let totalEgresos = () => {
  let total = 0;
  for (let egreso of egresos) {
    total += egreso.valor;
  }

  return total;
};

const cargarEgresos = () =>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) =>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor / totalEgresos())}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline"
                                  onclick="eliminarEgreso(${egreso.id})"></ion-icon>
                    </button>
                </div>
        </div>
    </div>
    `;
    return egresoHTML;
}

const eliminarEgreso = (id) =>{
    let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

// Formulario

let agregarDato = () =>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        } else if(tipo.value === 'egreso'){
            egresos.push( new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}
