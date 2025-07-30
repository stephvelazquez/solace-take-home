import { ChangeEvent } from "react";

interface SelectProps {
  options: Array<string | number>
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
}

export const ItemPerPgSelect = ({ options, onChange, disabled = false }: SelectProps) => (
  <div>
    <p>{"Display per page"}</p>
    <select name="advocatesPerPg" onChange={onChange} disabled={disabled} >
      {options.map((item, idx) => (
        <option value={item} key={`${item}-${idx}`}>
          {item}
        </option>
      ))}
    </select>
  </div>
);