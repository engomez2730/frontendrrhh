import React from 'react';
import {Link} from 'react-router-dom'
import {  NotificationOutlined, 
    UserOutlined,HomeOutlined,
    PlusCircleOutlined,
    EyeOutlined,
    BookOutlined,
    BellOutlined,
    BarChartOutlined,
    LineChartOutlined,
    SnippetsOutlined,
    MinusCircleOutlined,
    CloseOutlined,
    DollarCircleOutlined,
    UserSwitchOutlined,
    SearchOutlined,
    MinusOutlined    
} from '@ant-design/icons';

export const elementos = [
    {
        nombre:'Empleados',
        icon:UserOutlined,
        childrens:[
            {
                key:'buscarEmpleado',
                label:<Link to='/buscarempleados'>Buscar Empleado</Link>,
                icon: React.createElement(SearchOutlined)
            },
            {
                key:'crearEmpleado',
                label:<Link to='/crearempleado'>Crear Empleado</Link>,
                icon: React.createElement(PlusCircleOutlined)
            },
            {
                key:'verEmpleado',
                label:<Link to='/verempleados'>Manejar Empleados</Link>,
                icon: React.createElement(EyeOutlined)

            },
            {
                key:'vacacionesEmpleados',
                label:<Link to='/vacaciones'>Manejar Vacaciones</Link>,
                icon: React.createElement(SnippetsOutlined)

            },
            {
                key:'compensacionesEmpleados',
                label:<Link to='/compensaciones'>Compensaciones y Beneficios</Link>,
                icon: React.createElement(SnippetsOutlined)

            },
            {
                key:'Licencias',
                label:<Link to='/licencias'>Licencias de Incapacidad</Link>,
                icon: React.createElement(SnippetsOutlined)

            },
            {
                key:'dimitidosEmpleados',
                label:<Link to='/dimitidos'>Empleados Dimitidos</Link>,
                icon: React.createElement(MinusOutlined)

            },
            {
                key:'perimisosEmpleados',
                label:<Link to='/permisos'>Manejar Perimisos</Link>,
                icon: React.createElement(MinusCircleOutlined)

            },
            {
                key:'statsempleado',
                label:<Link to='/statsempleados'>Estadisticas de Empleados</Link>,
                icon: React.createElement(LineChartOutlined)

            }
    
        ]
    },
    {
        nombre:'Candidatos',
        icon:BookOutlined,
        childrens:[
            {
                key:'crearCandidato',
                label:<Link to='/candidatos'>Crear candidato</Link>,
                icon: React.createElement(PlusCircleOutlined)

            }
        ]
    },
    {
        nombre:'Departamentos',
        icon:HomeOutlined,
        childrens:[
            {
                key:'verDepartamento',
                label:<Link to='/verdepartamentos'>Manejar Departamentos</Link>,
                icon: React.createElement(PlusCircleOutlined)

                
            },
            {
                key:'editarDepartamento',
                label:<Link to='/verempleados'>Estadisticas de Departamento</Link>,
                icon: React.createElement(LineChartOutlined)

            }
        ]
    },
    {
        nombre:'Puestos',
        icon:HomeOutlined,
        childrens:[
            {
                key:'Manejar Puestos',
                label:<Link to='/puestos'>Manejar Puestos</Link>,
                icon: React.createElement(PlusCircleOutlined)

                
            }
        ]
    },
    {
        nombre:'Avisos',
        icon:BellOutlined,
        childrens:[
            {
                key:'crearAvisos',
                label:<Link to='/avisos'>Manejar Avisos</Link>,
                icon: React.createElement(PlusCircleOutlined)

            }
        ]
    },
    {
        nombre:'Nomina',
        icon:DollarCircleOutlined,
        childrens:[
            {
                key:'GenerarNomina',
                label:<Link to='/manejarnomina'>Manejar Nomina</Link>,
                icon: React.createElement(EyeOutlined)

            },
            {
                key:'Stats Nomina',
                label:<Link to='/statsnomina'>Stats Nomina</Link>,
                icon: React.createElement(PlusCircleOutlined)
            }
        ]
    },
    {
        nombre:'Despidos',
        icon:CloseOutlined,
        childrens:[
            {
                key:'verDespidos',
                label:<Link to='/despidos'>Manejar Despidos</Link>,
                icon: React.createElement(PlusCircleOutlined)
            },
            {
                key:'Crear Despido',
                label:<Link to='/despidosver'>Generar Despido</Link>,
                icon: React.createElement(EyeOutlined)
            }
        ]
    },
    {
        nombre:'Vacantes',
        icon:NotificationOutlined,
        childrens:[
            {
                key:'crearVacante',
                label:<Link to='/vacantes'>Manejar Vacantes</Link>,
                icon: React.createElement(PlusCircleOutlined)

            },
            {
                key:'verVacantes',
                label:<Link to='/vervacantes'>Ver Vacantes</Link>,
                icon: React.createElement(EyeOutlined)

            },
        ]
    },
    {
        nombre:'Epp',
        icon:UserSwitchOutlined ,
        childrens:[
            {
                key:'ManejarEpp',
                label:<Link to='/epp'>Manejar EPP</Link>
            },
        ]
    },
    {
        nombre:'Estadisticas',
        icon:BarChartOutlined,
        childrens:[
            {
                key:'EmpleadosStats',
                label:<Link to='/empleadosstats'> Empleados</Link>
            },
            {
                key:'DepartamentoStats',
                label:<Link to='/departamentosstats'>Departamentos</Link>
            },
            {
                key:'editarAnuncio',
                label:<Link to='/vacacionesstats'>Vacaciones</Link>
            },
            {
                key:'elimianrAnuncio',
                label:<Link to='/despidosstats'>Despidos</Link>
            },
            {
                key:'EppSt',
                label:<Link to='/eppsstats'>Epps</Link>
            },
        ]
    }
]
 

export const items2 = elementos.map((element, index) => {
    return {
      key: element.nombre,
      icon: React.createElement(element.icon),
      label: `${element.nombre}`,
      children:element.childrens
    };
  });