import { useEffect, useState, MouseEvent } from "react";

interface PaginationProps {
  totalPages: number
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  currPage: number
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
      <button value="toFirst" disabled={pgOneBtnDisabled} onClick={onClick}>
        {"<<"}
      </button>
      <button value="previous" onClick={onClick} disabled={prevBtnDisabled}>
        {"<"}
      </button>
      <p className="footer-text">{`Page ${currPage} of ${totalPages}`}</p>
      <button value="next" onClick={onClick} disabled={nextBtnDisabled}>
        {">"}
      </button>
      <button value="toLast" disabled={lastPgBtnDisabled} onClick={onClick}>
        {">>"}
      </button>
    </div>
  );
}