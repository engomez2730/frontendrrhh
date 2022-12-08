import { Select } from 'antd';
import React from 'react';
const { Option } = Select;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const App = () => (
  <Select 
  mode="multiple" 
  style={{width: '100%',}} 
  placeholder="Seleciona los departamentos" 
  defaultValue={['Todos']} 
  onChange={handleChange} 
  optionLabelProp="label"
>
    <Option value="Todos" label="Todos">
      <div className="demo-option-label-item">
        Todos
      </div>
    </Option>
    <Option value="Administracion" label="Administracion">
      <div className="demo-option-label-item">
        Administracion
      </div>
    </Option>
    <Option value="Taller" label="Taller">
      <div className="demo-option-label-item">
        Taller
      </div>
    </Option>
    <Option value="Barrick" label="Barrick">
      <div className="demo-option-label-item">
        Barrick
      </div>
    </Option>
    <Option value="Falcondo" label="Falcondo">
      <div className="demo-option-label-item">
        Falcondo
      </div>
    </Option>
    <Option value="Planta de Agregados" label="Planta de Agregados">
      <div className="demo-option-label-item">
        Planta de Agregados
      </div>
    </Option>
    <Option value="Inmobiliaria" label="Inmobiliaria">
      <div className="demo-option-label-item">
        Inmobiliaria
      </div>
    </Option>
    <Option value="Rio" label="Rio">
      <div className="demo-option-label-item">
        Rio
      </div>
    </Option>
    <Option value="Topografia" label="Topografia">
      <div className="demo-option-label-item">
        Topografia
      </div>
    </Option>
    <Option value="Campamento" label="Campamento">
      <div className="demo-option-label-item">
        Campamento
      </div>
    </Option>
    
  </Select>
);
export default App;