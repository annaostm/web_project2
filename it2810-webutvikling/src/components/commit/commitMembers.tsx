import "../input/input";
import Commit from "./commit";
import "./commitMembers.css";


interface CommitMembers {
  author_name: string;
}

interface InputProps {
  data: Commit[];
  onClick: (e:any) => void;
}

const CommitMembers = (props: InputProps) => {
    const uniques = props.data.map(item => item.author_name)
   .filter((value, index, self) => self.indexOf(value) === index)
  return (
    <div id="user-buttons">
      {uniques.map((member, i) => (
        <div key={member} >
          <button onClick={props.onClick} value={member} className="user-filter">
            <p>{member}</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommitMembers;
