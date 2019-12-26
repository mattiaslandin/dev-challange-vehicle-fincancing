import React, { useState } from "react";
import { CalculationType } from './Calculator'

interface IProps {
  type: CalculationType
  calculation: (a: number, b: number) => Promise<any>
}

export const CalculationForm: React.FC<IProps> = ({ type, calculation }) => {
  const [fieldA, setFieldA] = useState("");
  const [fieldB, setFieldB] = useState("");
  const [result, setResult] = useState("");

  return (
    <div>
      <form
        onSubmit={ event => {
          if (event) {
            event.preventDefault();
          }
          calculation(Number(fieldA), Number(fieldB)).then(res => setResult(res));
        }
      }>
        <label>
          Name:
          <input type="number" value={fieldA} onChange={ event => setFieldA(event.target.value) } />
        </label>
        <label>
          Value:
          <input type="number" value={fieldB} onChange={ event => setFieldB(event.target.value) } />
        </label>
        <input type="submit" value="Submit" />
      </form>
      Result: {result}
    </div>
  );
}
