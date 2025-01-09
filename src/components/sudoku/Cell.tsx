import React from 'react';

interface CellProps {
  value: number;
  readOnly: boolean;
  hasError: boolean;
  onChange: (value: number) => void;
  borderRight: string;
  borderBottom: string;
}

const Cell: React.FC<CellProps> = ({
  value,
  readOnly,
  hasError,
  onChange,
  borderRight,
  borderBottom,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 9) {
      onChange(newValue);
    } else if (e.target.value === '') {
      onChange(0);
    }
  };

  return (
    <input
      type='text'
      className={`h-10 w-10 border text-center ${borderRight} ${borderBottom} ${readOnly ? 'bg-gray-300' : 'bg-white'} ${hasError ? 'bg-red-300' : ''}`}
      value={value !== 0 ? value : ''}
      readOnly={readOnly}
      onChange={handleChange}
    />
  );
};

export { Cell };
