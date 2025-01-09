import React from 'react';

interface CellProps {
  value: number;
  readOnly: boolean;
  hasError: boolean;
  onChange: (value: number) => void;
  borderRight: string;
  borderBottom: string;
  col: number;
}

const Cell: React.FC<CellProps> = ({
  value,
  readOnly,
  hasError,
  onChange,
  borderRight,
  borderBottom,
  col,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= 9) {
      onChange(newValue);
    } else if (e.target.value === '') {
      onChange(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    switch (e.key) {
      case 'ArrowUp':
        (
          target.parentElement?.previousElementSibling?.querySelector(
            `input:nth-child(${target.dataset.col})`
          ) as HTMLInputElement
        )?.focus();
        break;
      case 'ArrowDown':
        (
          target.parentElement?.nextElementSibling?.querySelector(
            `input:nth-child(${target.dataset.col})`
          ) as HTMLInputElement
        )?.focus();
        break;
      case 'ArrowLeft':
        (target.previousElementSibling as HTMLInputElement)?.focus();
        break;
      case 'ArrowRight':
        (target.nextElementSibling as HTMLInputElement)?.focus();
        break;
    }
  };

  return (
    <input
      type='text'
      className={`size-10 border text-center ${borderRight} ${borderBottom} ${readOnly ? 'bg-gray-300' : 'bg-white'} ${hasError ? 'bg-red-300' : ''} focus:outline-none focus:ring-0`}
      value={value !== 0 ? value : ''}
      readOnly={readOnly}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength={1}
      inputMode='numeric'
      data-col={col}
    />
  );
};

export { Cell };
