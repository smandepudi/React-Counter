import { useState } from "react";
import "../styles/Counter.css";

type Props = {
  initial?: number;
  step?: number;
};

export default function Counter({initial = 0, step = 1} : Props) {
  const [value, setValue] = useState(initial);

  const inc = () => {
    setValue((v) => v + step);
  };

  const dec = () => {
    setValue((v) => v - step);
  };

  const reset = () => {
    setValue(initial);
  };
  return (
    <div>
      <div>{value}</div>
      <button onClick={dec}>- {step}</button>
      <button onClick={reset}>Reset</button>
      <button onClick={inc}>+ {step}</button>
    </div>
  );
}
