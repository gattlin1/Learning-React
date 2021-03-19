import { configure, shallow } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });
describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    // wrapper = shallow(<NavigationItems isAuth />);
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render the logout and orders <NavigationItem /> if authenticated', () => {
    wrapper.setProps({ isAuth: true });
    expect(
      wrapper.contains(
        <NavigationItem link='/logout'>Logout</NavigationItem>
      ) &&
        wrapper.contains(<NavigationItem link='/orders'>Orders</NavigationItem>)
    ).toEqual(true);
  });

  it('should render the sign in <NavigationItem /> if not authenticated', () => {
    expect(
      wrapper.contains(<NavigationItem link='/auth'>Sign In</NavigationItem>)
    ).toEqual(true);
  });
});
