import React from "react";
import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<BurgerBuilder/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder initIngredients={() => {}} />);
  });

  it("should render <BuildControls /> when receving ingredients", () => {
    wrapper.setProps({
      ingredients: { salad: 1 }
    });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
