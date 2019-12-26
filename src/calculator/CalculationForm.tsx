import React from "react";

export interface CalculationFormProps {
  fieldAName: string
  fieldBName: string
  resultName: string
  onSubmit: (a: number, b: number) => void
}

export interface CalculationFormState {
  fieldA: string
  fieldB: string
  result: string
}

// export const CalculationForm: React.FC<CalculationFormProps> = ({ fieldAName, fieldBName, resultName, calculation }) => {
//   const [fieldA, setFieldA] = useState("");
//   const [fieldB, setFieldB] = useState("");
//   const [result, setResult] = useState("");
//   console.log('WHat??')

//   useEffect(() => {
//     return () => {
//       setFieldA("")
//       // setFieldB("")
//       setResult("")
//     };
//   });

//   return (
//     <div>
//       <form
//         onSubmit={ event => {
//           if (event) {
//             event.preventDefault();
//           }
//           calculation(Number(fieldA), Number(fieldB)).then(data => setResult(data.result));
//         }
//       }>
//         <label>
//           { fieldAName }:
//           <input type="number" value={fieldA} onChange={ event => setFieldA(event.target.value) } />
//         </label>
//         <label>
//           { fieldBName }:
//           <input type="number" value={fieldB} onChange={ event => setFieldB(event.target.value) } />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//       { resultName }: {result}
//     </div>
//   );
// }


export class CalculationForm extends React.Component<CalculationFormProps, CalculationFormState> {

  constructor(props: CalculationFormProps) {
    super(props);
    this.state = {
      fieldA: "",
      fieldB: "",
      result: ""
    };
  }

  render = () => {
    const { fieldAName, fieldBName, resultName, onSubmit } = this.props;
    const { fieldA, fieldB, result } = this.state;
    // const setResult = (result: string) => this.setState({ result })
    const setFieldA = (fieldA: string) => this.setState({ fieldA })
    const setFieldB = (fieldB: string) => this.setState({ fieldB })

    return (
      <div>
        <form
          onSubmit={ event => {
            if (event) {
              event.preventDefault();
            }
            onSubmit(Number(fieldA), Number(fieldB));
          }
        }>
          <label>
            { fieldAName }:
            <input type="number" value={fieldA} onChange={ event => setFieldA(event.target.value) } />
          </label>
          <label>
            { fieldBName }:
            <input type="number" value={fieldB} onChange={ event => setFieldB(event.target.value) } />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}