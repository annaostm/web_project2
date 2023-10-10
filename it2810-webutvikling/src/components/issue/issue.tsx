import "../input/input";
import { Card } from "@mui/material";
import "./issue.css";

interface InputProps {
  data: Issue[];
  fromDateFilter:string
  toDateFilter:string
  authorFilter:string
}

interface Issue {
  merged: boolean;
  //name: string;
  branchDate: string;
  id: string;
  title: string;
  state: string;
  created_at: string;
}

//Component for displaying every Issue in the repository like cards
const Issue = (props: InputProps) => {
  const min = Date.parse(props.fromDateFilter);

  const max = Date.parse(props.toDateFilter);

  let filtered2 = props.data;
  if (props.authorFilter.length > 0) { 
      filtered2= filtered2.filter(data => {
              return data.state === props.authorFilter;
   });
  }
  let filtered1 = filtered2;
  if (props.fromDateFilter.length > 0) {
      filtered1 = filtered2.filter(data => {
          return (Date.parse(data.created_at)) >= min && (Date.parse(data.created_at)) <= max;
      });
  }
  let show = false;
  if (filtered1.length===0){
    show = true;
  }
  return (
      <div>
        <h1>Issues</h1>
        {show === true ?
        <p>No issues to show.</p>:null}
          {filtered1.map((issue, i) => (
              <div key={issue.id}>
              <Card className="card-hover" style={{ backgroundColor: "white" }}>
            <h5>{issue.title}</h5>
            <p className="data">ID: {issue.id}</p>
            <p className="data">state: {issue.state}</p>
            <p className="data">
              Date of creation: {issue.created_at.slice(0, 10)}
            </p>
          </Card>
              </div>
          ))}
      </div>
  );
};

export default Issue;
