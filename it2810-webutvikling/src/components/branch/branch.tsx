import { Card } from "@mui/material";
import "../input/input";
import "./branch.css";
import Commit from "../commit/commit";

interface InputProps {
  data: Branch[];
  fromDateFilter: string;
  toDateFilter: string;
  authorFilter: string;
}

interface Branch {
  merged: boolean;
  name: string;
  commit: Commit;
  created_at: string;
}

//Component for displaying every Branch in the repository like cards
const Branch = (props: InputProps) => {
  const min = Date.parse(props.fromDateFilter);

  const max = Date.parse(props.toDateFilter);

  let filtered2 = props.data;
  if (props.authorFilter.length > 0) {
    filtered2 = filtered2.filter((data) => {
      return data.commit.author_name === props.authorFilter;
    });
  }
  let filtered1 = filtered2;
  if (props.fromDateFilter.length > 0) {
    filtered1 = filtered2.filter((data) => {
      return (
        Date.parse(data.commit.created_at) >= min &&
        Date.parse(data.commit.created_at) <= max
      );
    });
  }
  let show = false;
  if (filtered1.length === 0) {
    show = true;
  }
  return (
    <div>
      <h1>Repository branches</h1>
      {show === true ? <p>No branches to show.</p> : null}
      {filtered1.map((branch, i) => (
        <div key={branch.name}>
          <Card className="card-hover">
            <h5>{branch.name}</h5>
            <h5>{branch.commit.author_name}</h5>
            <h5>{branch.commit.created_at.slice(0, 10)}</h5>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Branch;

function setEffect(arg0: () => void) {
  throw new Error("Function not implemented.");
}
