import { unmountComponentAtNode } from 'react-dom';
import renderer, { act } from 'react-test-renderer';
import Custombutton from '../components/button/button'


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



const onClick = jest.fn();

const b = renderer.create(<Custombutton 
    data-TestId="custom-element" 
    onClick={onClick} 
    display={''}>test</Custombutton>);

it('renders correctly', () => {
    const tree= (b).toJSON();
    expect(tree).toMatchSnapshot();
    
    
  });



