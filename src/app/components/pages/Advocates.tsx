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
  {/*
    NOTE: Certain pieces of state are being managed in their own `useEffect` if they are consistently dependent on other state
    changes (e.g. `numAdvocates`). This might be cleaner than setting them in event handlers, but does it affect legibility
    positively or negatively? Is there a risk of some state updates accidentally being omitted if that logic is in handlers?
  */}
  const [advocates, setAdvocates] = useState<undefined | Advocate[]>(undefined)
  const [filteredAdvocates, setFilteredAdvocates] = useState<undefined | Advocate[]>(undefined)
  const [searchStr, setSearchStr] = useState<string>("")
  const [currPage, setCurrPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [itemsPerPg, setItemsPerPg] = useState<number | string>("All")
  // `dataToDisplay` stores data slice for current page when pagintion is enabled
  const [dataToDisplay, setDataToDisplay] = useState<undefined | Advocate[]>(undefined)
  const [numAdvocates, setNumAdvocates] = useState<number>(0) // TODO: Refactor API to send this information as part of response


  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data)
      });
    });
  }, []);

  useEffect(() => {
    if(filteredAdvocates !== undefined) setNumAdvocates(filteredAdvocates.length)
  }, [filteredAdvocates])

  // Change total page count when user changes # of items per page
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
    setSearchStr("")
    setFilteredAdvocates(advocates)
  };


  const onSearchClick = () => {
    const lowerCaseStr = searchStr.toLowerCase() // Makes search case insensitive

    const filteredAdvocateArr = advocates?.filter(advocate => {
      // NOTE: Could this be extracted into be a recursive helperfn that filters for matching substring?
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
  }


  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") onSearchClick()
  }
  
  // TODO: Consider moving all this logic into its own component that depends on a data prop
  // (maybe something like `Footer`). This is starting to clutter up the file.
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

    // This should cause no issues (with the `All` option) as pagination will only be enabled with numerical values
    const itemssPerPgToNum = Number(itemsPerPg);

    const currIdx = itemssPerPgToNum * currPage;

    const sliceMap: AdvocatesArrayObject = {
      toFirst: filteredAdvocates?.slice(0, itemssPerPgToNum),
      previous: filteredAdvocates?.slice(
        currIdx - itemssPerPgToNum * 2,
        currIdx - itemssPerPgToNum,
      ),
      next: filteredAdvocates?.slice(currIdx, currIdx + itemssPerPgToNum),
      toLast: filteredAdvocates?.slice(numAdvocates - itemssPerPgToNum),
    };

    setDataToDisplay(sliceMap[name]);
  }


  return (
    <div>
      <h1 style={{ fontSize: '50px',  fontWeight: '600', marginBottom: '3rem'}}>Solace Advocates</h1>
      <div style={{ marginBottom: '2rem' }}>
        <SearchInput onSearchClick={onSearchClick} onInputChange={onInputChange} onResetClick={onResetClick} inputLabel="Search advocates" placeholder="Looking for something specific?" value={searchStr} onEnter={onEnter} inputDisabled={advocates === undefined} resetDisabled={searchStr === "" && filteredAdvocates === undefined} searchBtnDisabled={searchStr === ""} />
      </div>
      <div>
        {filteredAdvocates === undefined
          ? <Loading />
          : (filteredAdvocates && filteredAdvocates.length < 1)
            ? <EmptyState />
            : <Table columnNames={COLUMN_NAMES} tableData={dataToDisplay as Advocate[]}
            />
        }
      </div>
      {/* TODO: Extract common styles into shared object */}
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