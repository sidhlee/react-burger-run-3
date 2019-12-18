import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render two <NavigationItem /> if not logged in", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> if logged in", () => {
    wrapper.setProps({ isLoggedIn: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it(`should contain <NavigationItem link="/auth">Login</NavigationItem> if not logged in`, () => {
    wrapper.setProps({ isLoggedIn: false });
    expect(
      wrapper.contains(
        <NavigationItem link="/auth">Login</NavigationItem>
      )
    ).toEqual(true);
  });
});
