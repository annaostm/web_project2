import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';
import Commit from '../components/commit/commit'

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
const b = renderer.create(<Commit data={[{ created_at: "200300", id: "1234", title: "title", author_name: "author", message: "message" }]} fromDateFilter={"28122022"} toDateFilter={"22122023"} authorFilter={"Herman Flesvig"}></Commit>);


it('renders correctly', () => {
    const tree= b.toJSON();
    expect(tree).toMatchSnapshot();
    
  });