import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';
import Input from '../components/input/input';


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


it('renders correctly', () => {
  const tree = renderer
    .create(<Input/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
  
});