import rrhhApi from "../apis/rrhhApi";

var state = new Array("Afganistán","Albania","Alemania","Andorra","Angola","Antigua y Barbuda","Arabia Saudita","Argelia","Argentina","Armenia","Australia","Austria","Azerbaiyán","Bahamas","Bangladés","Barbados","Baréin","Bélgica","Belice","Benín","Bielorrusia","Birmania","Bolivia","Bosnia y Herzegovina","Botsuana","Brasil","Brunéi","Bulgaria","Burkina Faso","Burundi","Bután","Cabo Verde","Camboya","Camerún","Canadá","Catar","Chad","Chile","China","Chipre","Ciudad del Vaticano","Colombia","Comoras","Corea del Norte","Corea del Sur","Costa de Marfil","Costa Rica","Croacia","Cuba","Dinamarca","Dominica","Ecuador","Egipto","El Salvador","Emiratos Árabes Unidos","Eritrea","Eslovaquia","Eslovenia","España","Estados Unidos","Estonia","Etiopía","Filipinas","Finlandia","Fiyi","Francia","Gabón","Gambia","Georgia","Ghana","Granada","Grecia","Guatemala","Guyana","Guinea","Guinea ecuatorial","Guinea-Bisáu","Haití","Honduras","Hungría","India","Indonesia","Irak","Irán","Irlanda","Islandia","Islas Marshall","Islas Salomón","Israel","Italia","Jamaica","Japón","Jordania","Kazajistán","Kenia","Kirguistán","Kiribati","Kuwait","Laos","Lesoto","Letonia","Líbano","Liberia","Libia","Liechtenstein","Lituania","Luxemburgo","Madagascar","Malasia","Malaui","Maldivas","Malí","Malta","Marruecos","Mauricio","Mauritania","México","Micronesia","Moldavia","Mónaco","Mongolia","Montenegro","Mozambique","Namibia","Nauru","Nepal","Nicaragua","Níger","Nigeria","Noruega","Nueva Zelanda","Omán","Países Bajos","Pakistán","Palaos","Palestina","Panamá","Papúa Nueva Guinea","Paraguay","Perú","Polonia","Portugal","Reino Unido","República Centroafricana","República Checa","República de Macedonia","República del Congo","República Democrática del Congo","República Dominicana","República Sudafricana","Ruanda","Rumanía","Rusia","Samoa","San Cristóbal y Nieves","San Marino","San Vicente y las Granadinas","Santa Lucía","Santo Tomé y Príncipe","Senegal","Serbia","Seychelles","Sierra Leona","Singapur","Siria","Somalia","Sri Lanka","Suazilandia","Sudán","Sudán del Sur","Suecia","Suiza","Surinam","Tailandia","Tanzania","Tayikistán","Timor Oriental","Togo","Tonga","Trinidad y Tobago","Túnez","Turkmenistán","Turquía","Tuvalu","Ucrania","Uganda","Uruguay","Uzbekistán","Vanuatu","Venezuela","Vietnam","Yemen","Yibuti","Zambia","Zimbabue");
;

const crearSelectArray = (array) =>{
    console.log(array)
    return array?.map((e)=>{
        return{
            label:e,
            value:e
        }
    })
}

const departamentos = ['Administracion','Taller','Barrick','Falcondo',
'Planta de Agregados','Inmobiliaria','Rio','Topografia','Campamento']

const provincas = ['Azua','Barahuco','Barahona','Dajabon','Distrito Nacional',
'Duarte','Elias Piña','El Seibo','Espaillat','Hato Mayor','Hermanas Mirabal',
'Independencia','La Altagracias','La Romana','La Vega','Maria Trinidad Sanchez',
'Monseñor Nouel','Monte Cristi','Monte Plata','Pedernales','Peravia','Puerto Plata',
'Samana','Sanchez Ramirez','San Cristobal','San Jose de Ocoa','San Juan','San Pedro de Macoris',
'Santiago','Santiago Rodriguez','Santo Domingo','Valverde']

const puestos = ['Gerente General','Encargado Recursos Humanos','Asistente Recursos Humanos','Encargado Contabilidad',
'Asistente Contabilidad','Encargada Commercial','Conserje','Seguridad','Ingeniero Civil','Ingeniero Industrial',
'Supervisor','Capataz','HCE','Encargado Seguridad Barrick','Chofer','Operador','Mecanico Categoria1','Mecanico Categoria 2',
'Mecanico Categoria 3','Mecanico Categoria 4','Soldador','Gomero','Listero','Vigia','Topografo','Arquitecto',
'Jardinero','Encargado de Compras','Encargado de Equipos','Encargado de Almacen','Labador','Vigilante','Encargado Despacho',
'Encargado Planta Agregado','Operador Planta','Encargado Taller','Otro']

/* const puestosFunc = async () =>{
    const res = await rrhhApi.get('puestos')
    return res.data.data?.puestos?.map((e) => e.nombre)
}
 */

const estadoCandidato = ['Contratado','En Espera','No Calificado','Por Entrevistar','Otro']

const horarios = ['Matutino','Vespertino','Nocturno','Jornada Completa']

export const paisesFinal = crearSelectArray(state)
export const provinciasFinal = crearSelectArray(provincas)
export const departamentosFinal = crearSelectArray(departamentos)
export const puestosFinal = crearSelectArray(puestos)
export const estadoCandidatoFinal = crearSelectArray(estadoCandidato)
export const horariosFinal = crearSelectArray(horarios)


