import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

export class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    price: 0,
  };
  render() {
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
