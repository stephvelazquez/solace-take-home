import { ChangeEvent } from "react";

interface SelectProps {
  options: Array<string | number>
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const ItemPerPgSelect = ({ options, onChange }: SelectProps) => (
  <div>
    <p>{"Display per page"}</p>
    <select name="advocatesPerPg" onChange={onChange}>
      {options.map((item, idx) => (
        <option value={item} key={`${item}-${idx}`}>
          {item}
        </option>
      ))}
    </select>
  </div>
);