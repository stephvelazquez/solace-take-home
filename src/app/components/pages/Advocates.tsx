import { useEffect, useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { SearchInput } from "../shared/SearchInput";
import { Table } from "../shared/Table";
import { Loading } from "../shared/Loading";
import { EmptyState } from "../shared/EmptyState";
import { Advocate } from "@/app/types/advocate-types";

const COLUMN_NAMES = ['First Name', 'Last Name', 'City', 'Degree', 'Specialties', 'Years of Experience', 'Phone Number']

export const Advocates = () => {
  const [advocates, setAdvocates] = useState<undefined | Advocate[]>(undefined);
  const [filteredAdvocates, setFilteredAdvocates] = useState<undefined | Advocate[]>(undefined);
  const [showFilteredResults, setShowFilteredResults] = useState<boolean>(false)
  const [searchStr, setSearchStr] = useState<string>("")

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setSearchStr(value)
  };

  const onResetClick = () => {
    setShowFilteredResults(false)
    setSearchStr("")
    setFilteredAdvocates(undefined)
  };

  const onSearchClick = () => {
    const lowerCaseStr = searchStr.toLowerCase()

    const filteredAdvocateArr = advocates?.filter(advocate => {
      const filteredSpecialty = advocate.specialties.map(spec => spec.toLowerCase()).filter(item => item.includes(lowerCaseStr))

      return filteredSpecialty.length > 0 ||
        advocate.firstName.toLowerCase().includes(lowerCaseStr) ||
        advocate.lastName.toLowerCase().includes(lowerCaseStr) ||
        advocate.city.toLowerCase().includes(lowerCaseStr) ||
        advocate.degree.toLowerCase().includes(lowerCaseStr) ||
        advocate.yearsOfExperience.toString().includes(lowerCaseStr) ||
        advocate.phoneNumber.toString().includes(lowerCaseStr)
    });

    setFilteredAdvocates(filteredAdvocateArr)
    setShowFilteredResults(true)
  }

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") onSearchClick()
  }

  return (
    <div>
      <h1 style={{ fontSize: '50px',  fontWeight: '600', marginBottom: '30px'}}>Solace Advocates</h1>
      <div style={{ marginBottom: '20px' }}>
        <SearchInput onSearchClick={onSearchClick} onInputChange={onChange} onResetClick={onResetClick} inputLabel="Search for" value={searchStr} onEnter={onEnter} inputDisabled={advocates === undefined} resetDisabled={searchStr === "" && !showFilteredResults} searchBtnDisabled={searchStr === ""} />
      </div>
      {advocates === undefined ? <Loading /> : (showFilteredResults && filteredAdvocates && filteredAdvocates.length < 1) ? <EmptyState /> : <Table columnNames={COLUMN_NAMES} tableData={showFilteredResults ? filteredAdvocates as Advocate[] : advocates as Advocate[]} />}
    </div>
  )
}