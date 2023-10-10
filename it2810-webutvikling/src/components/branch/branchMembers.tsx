import React, { Children, useEffect, useState } from "react";
import "../input/input";
import Commit from "./branch";
import "../commit/commitMembers.css";
import Branch from "./branch";


interface BranchMembers {
  author_name: string;
}

interface InputProps {
  data: Branch[];
  onClick: (e:any) => void;
}

const BranchMembers = (props: InputProps) => {
    const uniques = props.data.map(item => item.commit.author_name)
   .filter((value, index, self) => self.indexOf(value) === index)
  return (
    <div className="user-buttons">
      {uniques.map((member, i) => (
        <div className="members" key={member} >
          <button onClick={props.onClick} value={member} className="user-filter">
            <p>{member}</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default BranchMembers;
