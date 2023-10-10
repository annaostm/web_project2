import '../input/input';
import { Card } from "@mui/material";
import "./commit.css";

interface Commit {
    created_at: string;
    id: string;
    title: string;
    author_name:string;
    message:string
}

interface InputProps {
    data: Commit[]
    fromDateFilter:string
   toDateFilter:string
   authorFilter:string
}

//Component for displaying every Commit in the repository like cards
const Commit = (props: InputProps) => {
    const min = Date.parse(props.fromDateFilter);

    const max = Date.parse(props.toDateFilter);

    let filtered2 = props.data;
    if (props.authorFilter.length > 0) { 
        filtered2= filtered2.filter(data => {
                return data.author_name=== props.authorFilter;         
     });
    }
    console.log(filtered2);
    let filtered1 = filtered2;
    if (props.fromDateFilter.length > 0) {
        filtered1 = filtered2.filter(data => {
            return (Date.parse(data.created_at)) >= min && (Date.parse(data.created_at)) <= max;
        });
    }
    console.log(filtered1);
 
    let show = false;
    if (filtered1.length===0){
      show = true;
    }
    return (
        <div>
          <h1>Commits</h1>
          {show === true ?
          <p>No commits to show.</p>:null}
           {filtered1.map((commit, i) => (
                <div key={commit.id}>
                <Card className="card-hover">
                    <h5>{commit.title}</h5>
                    <p className="data">Date: {commit.created_at.slice(0,10)}</p>
                    <p className="data">ID: {commit.id}</p>
                    <p className="data">Name: {commit.author_name}</p>
                </Card> 
                </div>
            ))}
        </div>
    );
};

export default Commit;
