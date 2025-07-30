import { useEffect, useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { SearchInput } from "../shared/SearchInput";
import { Table } from "../shared/Table";
import { Loading } from "../shared/Loading";
import { EmptyState } from "../shared/EmptyState";
import { Advocate } from "@/app/types/advocate-types";
import { ItemPerPgSelect } from "../shared/ItemPerPgSelect";
import { Pagination } from "../shared/Pagination";

const COLUMN_NAMES = ['First Name', 'Last Name', 'City', 'Degree', 'Specialties', 'Years of Experience', 'Phone Number']

const OPTIONS = ["All", 5, 10, 20]

export const Advocates = () => {
  const [advocates, setAdvocates] = useState<undefined | Advocate[]>(undefined);
  const [filteredAdvocates, setFilteredAdvocates] = useState<undefined | Advocate[]>(undefined);
  const [showFilteredResults, setShowFilteredResults] = useState<boolean>(false)
  const [searchStr, setSearchStr] = useState<string>("")
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPg, setItemsPerPg] = useState("All");
  const [numAdvocates, setNumAdvocates] = useState<number>(0)

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setNumAdvocates(jsonResponse.data.length)
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
      const filteredSpecialty = advocate.specialties.filter(item => item.toLowerCase().includes(lowerCaseStr))

      return filteredSpecialty.length > 0 ||
        advocate.firstName.toLowerCase().includes(lowerCaseStr) ||
        advocate.lastName.toLowerCase().includes(lowerCaseStr) ||
        advocate.city.toLowerCase().includes(lowerCaseStr) ||
        advocate.degree.toLowerCase().includes(lowerCaseStr) ||
        advocate.yearsOfExperience.toString().includes(lowerCaseStr) ||
        advocate.phoneNumber.toString().includes(lowerCaseStr)
    });

    setFilteredAdvocates(filteredAdvocateArr)
    if (filteredAdvocateArr?.length === 0) setNumAdvocates(0)
    else setNumAdvocates(filteredAdvocateArr?.length as number)
    setShowFilteredResults(true)
  }

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") onSearchClick()
  }
  
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if(value === "All") {
      setFilteredAdvocates(advocates);
    } else {
      setFilteredAdvocates(advocates?.slice(0, 0 + Number(value)));
    }
    setItemsPerPg(value);
    setCurrPage(1);
  };

  const onPaginationClick = () => {
    // Do something
  }

  return (
    <div>
      <h1 style={{ fontSize: '50px',  fontWeight: '600', marginBottom: '30px'}}>Solace Advocates</h1>
      <div style={{ marginBottom: '20px' }}>
        <SearchInput onSearchClick={onSearchClick} onInputChange={onChange} onResetClick={onResetClick} inputLabel="Search for" value={searchStr} onEnter={onEnter} inputDisabled={advocates === undefined} resetDisabled={searchStr === "" && !showFilteredResults} searchBtnDisabled={searchStr === ""} />
      </div>
      <div>
        {advocates === undefined
          ? <Loading />
          : (showFilteredResults && filteredAdvocates && filteredAdvocates.length < 1)
            ? <EmptyState />
            : <Table columnNames={COLUMN_NAMES} tableData={showFilteredResults
              ? filteredAdvocates as Advocate[]
              : advocates as Advocate[]}
            />
        }
      </div>
      <div>
        <ItemPerPgSelect onChange={onSelectChange} options={OPTIONS} disabled={advocates === undefined} />
        <Pagination
          totalPages={totalPages}
          onClick={onPaginationClick}
          currPage={currPage}
        />
      </div>
    </div>
  )
}