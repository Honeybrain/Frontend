import React, { useState } from 'react';
import '../styles.css';

const modules = [
  { name: 'Dummy PC', id: 1, key: 'pc', max: 25 },
  { name: 'Database', id: 2, key: 'db', max: 5 },
  { name: 'Example', id: 3, key: 'ex', max: 50 },
];

function ModuleSelector() {
  const [moduleCounts, setModuleCounts] = useState({});

  const handleModuleCountChange = (event) => {
    const moduleId = parseInt(event.target.name);
    let count = parseInt(event.target.value);

    if (count > event.target.max) {
      count = event.target.max;
    }

    setModuleCounts((prevState) => ({
      ...prevState,
      [moduleId]: count,
    }));
  };

  const handleGenerateConfig = () => {
    const config = modules.reduce((acc, module) => {
      const moduleKey = module.key;
      const count = moduleCounts[module.id] || 0;
      return {
        ...acc,
        [moduleKey]: count,
      };
    }, {});

    const jsonBlob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'HoneyBrain_config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="form-container">
      <h2>Module Selector</h2>
      {modules.map((module) => (
        <div className="input-group" key={module.key}>
          {module.name}
          <input
            type="number"
            name={module.id}
            max={module.max}
            min={0}
            value={moduleCounts[module.id] || 0}
            onChange={handleModuleCountChange}
            onBlur={handleModuleCountChange}
          />
        </div>
      ))}
      <button onClick={handleGenerateConfig}>Download Config</button>
    </div>
  );
}

export default ModuleSelector;
