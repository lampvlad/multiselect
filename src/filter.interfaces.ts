import { FilterValue } from './filterValue.interface';

export interface FilterProps {
    controlTypes: ControlType[];
    value: FilterValue;
    onChange: (newValue: FilterValue) => void;
}

export interface ControlType {
    type: 'multiselect' | 'dateRange' | 'numberRange' | 'dateRangeFrom' | 'dateRangeTo' | 'numberRangeFrom' | 'numberRangeTo';
    options?: string[];
}

