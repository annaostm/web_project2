import "./input/input";

interface Members {
  value(value: any): void;
  name: string;
  access_level: number;
  username: string;
}

interface InputProps {
  data: Members[];
}

//Comonent for displaying all the members names
const Members = (props: InputProps) => {
  const filtered = props.data.filter((data) => {
    return data.access_level < 50 && data.access_level > 30;
  });
  const withoutBots = filtered.filter((data) => {
    return (
      data.name !== "web" && data.name !== "Token2" && data.name !== "newacsess"
    );
  });
  return (
    <div>
      {withoutBots.map((member, i) => (
        <div key={member.name}>
          <div>
            <p>{member.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Members;
