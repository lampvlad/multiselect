import React from 'react';
import { FilterProps, ControlType } from './filter.interfaces';
import styles from './Filter.module.css';

const Filter: React.FC<FilterProps> = ({ controlTypes, value, onChange }) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    controlType: ControlType
  ) => {
    let newValue: any;
    if (controlType.type === 'multiselect') {
      const newSelectedValue = e.target.value;
      const currentSelectedValues = value[controlType.type] || [];
      newValue = {
        ...value,
        [controlType.type]: [...currentSelectedValues, newSelectedValue],
      };
    } else {
      newValue = {
        ...value,
        [controlType.type]: e.target.value,
      };
    }
    onChange(newValue);
  };

  const removeSelectedValue = (controlType: ControlType, index: number) => {
    const newValue = {
      ...value,
      [controlType.type]: value[controlType.type].filter(
        (_: any, i: number) => i !== index
      )
    };
    onChange(newValue);
  };

  return (
    <div>
      {controlTypes.map((controlType, index) => {
        switch (controlType.type) {
          case 'multiselect':
            return (
              <div key={controlType.type}>
                <select
                  value={
                    value[controlType.type]?.[
                      value[controlType.type].length - 1
                    ] ?? ''
                  }
                  onChange={e => {
                    handleInputChange(e, controlType);
                  }}
                >
                  <option value=''>Select an option</option>
                  {controlType.options?.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div>
                  {value[controlType.type]?.map(
                    (selectedValue: string, index: number) => (
                      <span
                        key={index}
                        data-testid="selectedValue"
                        onClick={() => removeSelectedValue(controlType, index)}
                        className={styles.selectedOption}
                        style={{ cursor: 'pointer', marginRight: '5px' }}
                      >
                        {selectedValue}
                      </span>
                    )
                  )}
                </div>
              </div>
            );
          case 'dateRange':
            return (
              <div key={index}>
                <input
                  type='date'
                  value={value.dateRangeFrom || ''}
                  onChange={e =>
                    handleInputChange(e, {
                      ...controlType,
                      type: 'dateRangeFrom'
                    })
                  }
                  data-testid="dateRangeFrom"
                  title='dateRange'
                />
                <input
                  type='date'
                  value={value.dateRangeTo || ''}
                  onChange={e =>
                    handleInputChange(e, {
                      ...controlType,
                      type: 'dateRangeTo'
                    })
                  }
                  data-testid="dateRangeTo"
                  title='dateRange'
                />
              </div>
            );
          case 'numberRange':
            return (
              <div key={index}>
                <input
                  type='number'
                  value={value.numberRangeFrom || ''}
                  onChange={e =>
                    handleInputChange(e, {
                      ...controlType,
                      type: 'numberRangeFrom'
                    })
                  }
                  placeholder="Min Amount"
                  data-testid="numberRange"
                />
                <input
                  type='number'
                  value={value.numberRangeTo || ''}
                  onChange={e =>
                    handleInputChange(e, {
                      ...controlType,
                      type: 'numberRangeTo'
                    })
                  }
                  placeholder="Max Amount"
                  data-testid="numberRange"
                />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default Filter;
