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
    SolutionOutlined,
    DollarCircleOutlined,
    RiseOutlined    
} from '@ant-design/icons';

export const elementos = [
    {
        nombre:'Empleados',
        icon:UserOutlined,
        childrens:[
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
                key:'perimisosEmpleados',
                label:<Link to='/permisos'>Manejar Perimisos</Link>,
                icon: React.createElement(MinusCircleOutlined)

            },
            {
                key:'editarEmpleado',
                label:<Link to='/editarempleados'>Estadisticas de Empleados</Link>,
                icon: React.createElement(LineChartOutlined)

            }
    
        ]
    },
    {
        nombre:'Departamentos',
        icon:HomeOutlined,
        childrens:[
            {
                key:'crearDepartamento',
                label:<Link to='/creardepartamento'>Crear Departamento</Link>,
                icon: React.createElement(PlusCircleOutlined)

            },
            {
                key:'verDepartamento',
                label:<Link to='/verdepartamentos'>Ver Departamentos</Link>,
                icon: React.createElement(EyeOutlined)

                
            },
            {
                key:'editarDepartamento',
                label:<Link to='/verempleados'>Estadisticas de Departamento</Link>,
                icon: React.createElement(LineChartOutlined)

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

            },  
            {
                key:'editarAvisos',
                label:<Link to='/verempleados'>Eliminar Aviso</Link>,
                icon: React.createElement(LineChartOutlined)

            },
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

            },
            {
                key:'verCandidato',
                label:<Link to='/verempleados'>Ver Candidato</Link>,
                icon: React.createElement(EyeOutlined)

            },
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
                label:<Link to='/creardespidos'>Generar Despido</Link>,
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
        nombre:'Estadisticas',
        icon:BarChartOutlined,
        childrens:[
            {
                key:'crearAnuncio',
                label:<Link to='/verempleados'>Ir</Link>
            },
            {
                key:'verAnuncio',
                label:<Link to='/verempleados'>Ir</Link>
            },
            {
                key:'editarAnuncio',
                label:<Link to='/verempleados'>Ir</Link>
            },
            {
                key:'elimianrAnuncio',
                label:<Link to='/verempleados'>Ir</Link>
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