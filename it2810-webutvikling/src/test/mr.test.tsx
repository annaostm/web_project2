import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';
import MR from '../components/mr/mr'

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

const b = renderer.create(<MR data={[{ merged: true, name: "noe", id: "1234", title: "issue", created_at: "221100", state: "state" }]} fromDateFilter={"271220220"} toDateFilter={"271220221"} stateFilter={""}></MR>);

it('renders correctly', () => {
    const tree= b.toJSON();
    expect(tree).toMatchSnapshot();
  });