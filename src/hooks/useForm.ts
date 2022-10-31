import { useState, BaseSyntheticEvent } from 'react';

export function useForm(inputValues: any) {
  const [values, setValues] = useState<any>(inputValues);

  const handleChange = (event: BaseSyntheticEvent): void => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
