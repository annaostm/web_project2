import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';
import Issue from '../components/issue/issue'

let container: Element | DocumentFragment | null = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if(container == null){
    throw "container is null"
  }
  unmountComponentAtNode(container);
  container = null;
});
const b = renderer.create(<Issue data={[{ merged: true, branchDate: "200300", id: "1234", title: "issue", state: "done", created_at: "200300" }]} fromDateFilter={"28122017"} toDateFilter={"22122018"} authorFilter={"Hedda Friis"}></Issue>);

it('renders correctly', () => {
    const tree= b.toJSON();
    expect(tree).toMatchSnapshot();
  });