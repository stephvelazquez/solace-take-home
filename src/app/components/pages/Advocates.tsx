import { useEffect, useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { SearchInput } from "../shared/SearchInput";
import { Table } from "../shared/Table";
import { Loading } from "../shared/Loading";
import { EmptyState } from "../shared/EmptyState";
import { Advocate } from "@/app/types/advocate-types";
import { ItemPerPgSelect } from "../shared/ItemPerPgSelect";
import { Pagination } from "../shared/Pagination";

type NumberValuesObject = { [key: string]: number }

type AdvocatesArrayObject = {[key: string]: Advocate[] | undefined}

const COLUMN_NAMES = ['First Name', 'Last Name', 'City', 'Degree', 'Specialties', 'Years of Experience', 'Phone Number']

const OPTIONS = ["All", 5, 10, 20] // Remove `All` option with large data sets

export const Advocates = () => {
  const [advocates, setAdvocates] = useState<undefined | Advocate[]>(undefined);
  const [filteredAdvocates, setFilteredAdvocates] = useState<undefined | Advocate[]>(undefined);
  const [showFilteredResults, setShowFilteredResults] = useState<boolean>(false)
  const [searchStr, setSearchStr] = useState<string>("")
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPg, setItemsPerPg] = useState<number | string>("All");
  const [currPageData, setCurrPageData] = useState<undefined | Advocate[]>(undefined)
  const [numAdvocates, setNumAdvocates] = useState<number>(0) // TODO: Refactor API to send this information as part of response


  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setNumAdvocates(jsonResponse.data.length)
      });
    });
  }, []);


  useEffect(() => {
    if (numAdvocates) {
      if (itemsPerPg === "All") {
        setTotalPages(1);
      } else {
        const newRange = Math.ceil(numAdvocates / Number(itemsPerPg));
        setTotalPages(newRange);
      }
    }
  }, [numAdvocates, itemsPerPg]);


  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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


  const onPaginationClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget

    const clickMap: NumberValuesObject = {
      toFirst: 1,
      previous: currPage - 1,
      next: currPage + 1,
      toLast: totalPages,
    };

    setCurrPage(clickMap[name]);

    const itemssPerPgToNum = Number(itemsPerPg);

    const currIdx = Number(itemsPerPg) * currPage;

    const sliceMap: AdvocatesArrayObject = {
      toFirst: advocates?.slice(0, itemssPerPgToNum), // TODO: refactor `filteredAdvoates` or add new state for pagination data
      previous: advocates?.slice(
        currIdx - itemssPerPgToNum * 2,
        currIdx - itemssPerPgToNum,
      ),
      next: advocates?.slice(currIdx, currIdx + itemssPerPgToNum),
      toLast: advocates?.slice(totalPages - itemssPerPgToNum),
    };

    setCurrPageData(sliceMap[name]);
  }


  return (
    <div>
      <h1 style={{ fontSize: '50px',  fontWeight: '600', marginBottom: '3rem'}}>Solace Advocates</h1>
      <div style={{ marginBottom: '2rem' }}>
        <SearchInput onSearchClick={onSearchClick} onInputChange={onInputChange} onResetClick={onResetClick} inputLabel="Search for" value={searchStr} onEnter={onEnter} inputDisabled={advocates === undefined} resetDisabled={searchStr === "" && !showFilteredResults} searchBtnDisabled={searchStr === ""} />
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
      {/* Extract common styles into shared object */}
      <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: '3rem'}}>
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