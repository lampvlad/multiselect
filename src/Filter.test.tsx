import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ControlType } from './filter.interfaces';
import Filter from './Filter';
import '@testing-library/jest-dom/extend-expect';

describe('Filter', () => {
  const controlTypes: ControlType[] = [
    {
      type: 'multiselect',
      options: ['option1', 'option2', 'option3']
    },
    {
      type: 'dateRange'
    },
    {
      type: 'numberRange'
    }
  ];

  const mockOnChange = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders multiselect', () => {
    render(
      <Filter controlTypes={controlTypes} value={{}} onChange={mockOnChange} />
    );
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  test('renders dateRange', () => {
    render(
      <Filter controlTypes={controlTypes} value={{}} onChange={mockOnChange} />
    );
    const dateInputs = screen.getAllByTitle('dateRange');
    expect(dateInputs.length).toBe(2);
  });

  test('renders numberRange', () => {
    render(
      <Filter controlTypes={controlTypes} value={{}} onChange={mockOnChange} />
    );
    const numberInputs = screen.getAllByTestId('numberRange');
    expect(numberInputs.length).toBe(2);
  });

  test('handles multiselect change', () => {
    render(
      <Filter controlTypes={controlTypes} value={{}} onChange={mockOnChange} />
    );
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'option1' }
    });
    expect(mockOnChange).toHaveBeenCalledWith({ multiselect: ['option1'] });
  });

  test('handles dateRange change', () => {
    render(<Filter controlTypes={controlTypes} value={{}} onChange={mockOnChange} />);
    const dateRangeFrom = screen.getByTestId('dateRangeFrom');
    const dateRangeTo = screen.getByTestId('dateRangeTo');
    fireEvent.change(dateRangeFrom, { target: { value: '2023-04-01' } });
    fireEvent.change(dateRangeTo, { target: { value: '2023-04-30' } });
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenNthCalledWith(1, { dateRangeFrom: '2023-04-01' });
    expect(mockOnChange).toHaveBeenNthCalledWith(2, { dateRangeTo: '2023-04-30' });
  });

  test('handles numberRange change', () => {
    render(
      <Filter controlTypes={controlTypes} value={{}} onChange={mockOnChange} />
    );
    const numberInputs = screen.getAllByTestId('numberRange');
    fireEvent.change(numberInputs[0], { target: { value: '100' } });
    fireEvent.change(numberInputs[1], { target: { value: '200' } });
    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenNthCalledWith(1, { numberRangeFrom: '100' });
    expect(mockOnChange).toHaveBeenNthCalledWith(2, {
      numberRangeTo: '200'
    });
  });

  test('handles multiselect removal', () => {
    render(
      <Filter
        controlTypes={controlTypes}
        value={{ multiselect: ['option1'] }}
        onChange={mockOnChange}
      />
    );
    fireEvent.click(screen.getByTestId('selectedValue'));
    expect(mockOnChange).toHaveBeenCalledWith({ multiselect: [] });
  });

  test('renders selected option in multiselect', () => {
    render(
      <Filter
        controlTypes={controlTypes}
        value={{ multiselect: ['option1'] }}
        onChange={mockOnChange}
      />
    );
    expect(screen.getByDisplayValue('option1')).toBeInTheDocument();
  });

  test('removes selected option in multiselect', () => {
    render(
      <Filter
        controlTypes={controlTypes}
        value={{ multiselect: ['option1'] }}
        onChange={mockOnChange}
      />
    );
    fireEvent.click(screen.getByTestId('selectedValue'));
    expect(mockOnChange).toHaveBeenCalledWith({ multiselect: [] });
  });
});
