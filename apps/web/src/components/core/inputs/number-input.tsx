import { Input } from '@/components/ui/input';
import React, { useState, ChangeEvent, FocusEvent, forwardRef } from 'react';

interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  onChange?: (value: number | null) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ onChange, placeholder = 'Enter a number', min, max, inputMode = 'numeric', ...rest }, ref) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Allow empty input or numbers (including decimal point and minus sign)
      if (newValue === '' || /^-?\d*\.?\d*$/.test(newValue)) {
        setValue(newValue);
        setError(null);

        // Convert to number and call onChange prop if provided
        const numberValue = newValue === '' ? null : parseFloat(newValue);
        onChange?.(numberValue);
      }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      const numberValue = e.target.value === '' ? null : parseFloat(e.target.value);

      if (numberValue !== null) {
        if (min !== undefined && numberValue < min) {
          setError(`Value must be at least ${min}`);
        } else if (max !== undefined && numberValue > max) {
          setError(`Value must be at most ${max}`);
        } else {
          setError(null);
        }
      } else {
        setError(null);
      }
    };

    return (
      <div>
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          style={{ appearance: 'textfield' }}
          inputMode={inputMode}
          {...rest}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);
export default NumberInput;
