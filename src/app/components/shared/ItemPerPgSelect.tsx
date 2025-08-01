import { ChangeEvent } from "react";

interface SelectProps {
  options: Array<string | number>
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
}

export const ItemPerPgSelect = ({ options, onChange, disabled = false }: SelectProps) => (
  <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
    <p style={{display: 'inline-block', marginRight: '10px', fontSize: '14px'}}>Display per page</p>
    <select style={{display: 'inline-block', border: 'solid', borderRadius: '5px', width: '5rem'}} name="advocatesPerPg" onChange={onChange} disabled={disabled} >
      {options.map((item, idx) => (
        <option value={item} key={`${item}-${idx}`}>
          {item}
        </option>
      ))}
    </select>
  </div>
);