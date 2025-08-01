import { useEffect, useState, MouseEvent } from "react";

interface PaginationProps {
  totalPages: number
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  currPage: number
}

const btnStyle = {
  margin: '5px',
  border: 'solid',
  borderRadius: '5px',
  padding: '0px 5px 0px 5px',
  width: '2rem',
  background: '#d3d3d3'
}

export const Pagination = ({ totalPages, onClick, currPage }: PaginationProps) => {
  const [pgOneBtnDisabled, setPgOneBtnDisabled] = useState(false);
  const [lastPgBtnDisabled, setLastPgBtnDisabled] = useState(false);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  useEffect(() => {
    if (currPage === 1) {
      setPgOneBtnDisabled(true);
      setPrevBtnDisabled(true);
    }
    if (currPage === totalPages) {
      setLastPgBtnDisabled(true);
      setNextBtnDisabled(true);
    }
    if (currPage > 1) {
      setPgOneBtnDisabled(false);
      setPrevBtnDisabled(false);
    }
    if (currPage < totalPages) {
      setLastPgBtnDisabled(false);
      setNextBtnDisabled(false);
    }
  }, [currPage, totalPages]);

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginTop: '12px'}} >
      <button style={btnStyle} name="toFirst" disabled={pgOneBtnDisabled} onClick={onClick}>
        {"<<"}
      </button>
      <button style={btnStyle} name="previous" onClick={onClick} disabled={prevBtnDisabled}>
        {"<"}
      </button>
      <p style={{fontSize: '14px', margin: '0px 5px 0px 5px'}}>{`Page ${currPage} of ${totalPages}`}</p>
      <button style={btnStyle} name="next" onClick={onClick} disabled={nextBtnDisabled}>
        {">"}
      </button>
      <button style={btnStyle} name="toLast" disabled={lastPgBtnDisabled} onClick={onClick}>
        {">>"}
      </button>
    </div>
  );
}