import React from "react";

const TermButton = ({term, checked, setTerm}) => (
    <>
      <input type="radio" id={term} className="btn-check" autoComplete="off" checked={checked} onChange={() => setTerm(term)}/>
      <label className="btn btn-success m-1 p-2" htmlFor={term}>
      { term }
      </label>
    </>
  );

  export default TermButton;