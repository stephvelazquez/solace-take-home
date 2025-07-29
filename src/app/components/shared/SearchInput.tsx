import { ChangeEvent, KeyboardEvent } from "react"

interface SearchInputProps {
  inputLabel: string
  onResetClick: () => void
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSearchClick: () => void
  onEnter: (e: KeyboardEvent<HTMLInputElement>) => void
  value: string
  inputDisabled: boolean
  resetDisabled: boolean
  searchBtnDisabled: boolean
}

export const SearchInput = ({inputLabel, onResetClick, onInputChange, onSearchClick, onEnter, value, inputDisabled, resetDisabled, searchBtnDisabled}: SearchInputProps) => (
  <div>
    <label htmlFor="search">{inputLabel}</label>
    <input name="search" onChange={onInputChange} onKeyDown={onEnter} value={value} disabled={inputDisabled} style={{border: 'solid', margin: '10px', borderRadius: '5px'}} />
    <button onClick={onResetClick} disabled={resetDisabled} style={{border: 'solid', paddingLeft: '5px', paddingRight: '5px', marginRight: '5px', borderRadius: '5px'}}>Reset</button>
    <button onClick={onSearchClick} disabled={searchBtnDisabled} style={{border: 'solid', paddingLeft: '5px', paddingRight: '5px', borderRadius: '5px'}}>Search</button>
  </div>
)