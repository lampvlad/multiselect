import React, { useState } from 'react';
import Filter from './Filter';
import { FilterConfig } from './filterContainer.interface';
import { ControlType } from './filter.interfaces';
import { FilterValue } from './filterValue.interface';

const FilterContainer: React.FC = () => {
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValue[]>([]);
  const [nextFilterId, setNextFilterId] = useState(0);

  const addFilter = (controlType: ControlType) => {
    setFilters([...filters, { id: nextFilterId, controlType }]);
    setFilterValues([...filterValues, {}]);
    setNextFilterId(nextFilterId + 1);
  };

  const handleFilterValueChange = (index: number, newValue: FilterValue) => {
    const newFilterValues = [...filterValues];
    newFilterValues[index] = newValue;
    setFilterValues(newFilterValues);
  };

  return (
    <div>
      <div>
        <select id='filterTypeSelect'>
          <option value='multiselect'>Multiselect</option>
          <option value='dateRange'>Date Range</option>
          <option value='numberRange'>Number Range</option>
        </select>
        <button
          onClick={() => {
            const selectedFilterType = (
              document.getElementById('filterTypeSelect') as HTMLSelectElement
            ).value;
            const controlType: ControlType = {
              type: selectedFilterType as
                | 'multiselect'
                | 'dateRange'
                | 'numberRange',
              options:
                selectedFilterType === 'multiselect'
                  ? ['Option1', 'Option2', 'Option3']
                  : undefined
            };
            addFilter(controlType);
          }}
        >
          Add Filter
        </button>
      </div>
      {filters.map((filter, index) => (
        <Filter
          key={filter.id}
          controlTypes={[filter.controlType]}
          value={filterValues[index]}
          onChange={newValue => handleFilterValueChange(index, newValue)}
        />
      ))}
    </div>
  );
};

export default FilterContainer;
