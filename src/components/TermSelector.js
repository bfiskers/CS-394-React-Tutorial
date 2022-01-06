import React from "react";
import TermButton from "./TermButton";
import { terms } from "../utilities/times";

const TermSelector = ({term, setTerm}) => (
    <div className="btn-group">
    { 
      Object.values(terms)
        .map(value => <TermButton key={value} term={value} checked={value === term} setTerm={setTerm}/>)
    }
    </div>
);

export default TermSelector