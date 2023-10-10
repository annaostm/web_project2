import { Card } from "@mui/material";
import "../input/input";
import "./mr.css";

interface InputProps {
  data: MR[];
  fromDateFilter: string;
  toDateFilter: string;
  stateFilter: string;
}

interface MR {
  merged: boolean;
  name: string;
  id: string;
  title: string;
  created_at: string;
  state: string;
}

//Component for displaying every Merge request in the repository like cards
const MR = (props: InputProps) => {
  const min = Date.parse(props.fromDateFilter);

  const max = Date.parse(props.toDateFilter);

  let filtered2 = props.data;
  if (props.stateFilter.length > 0) {
    filtered2 = filtered2.filter((data) => {
      return data.state === props.stateFilter;
    });
  }
  let filtered1 = filtered2;
  if (props.fromDateFilter.length > 0) {
    filtered1 = filtered2.filter((data) => {
      return (
        Date.parse(data.created_at) >= min && Date.parse(data.created_at) <= max
      );
    });
  }
  let show = false;
  if (filtered1.length === 0) {
    show = true;
  }
  return (
    <div>
      <h1>Merge requests</h1>
      {show === true ? <p>No merge requests to show.</p> : null}
      {filtered1.map((mr, i) => (
        <div key={mr.id}>
          <Card className="card-hover">
            <h5 className="data">{mr.title}</h5>
            <p className="data">ID: {mr.id}</p>
            <p className="data">State: {mr.state}</p>
            <p className="data">Created: {mr.created_at.slice(0, 10)}</p>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default MR;
