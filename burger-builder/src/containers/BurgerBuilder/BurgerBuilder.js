import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
export class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    price: 4,
  };

  addIngredientHandler = (ingredient) => {
    const updatedCount = this.state.ingredients[ingredient] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[ingredient] = updatedCount;

    const newTotalPrice = this.state.price + INGREDIENT_PRICES[ingredient];
    this.setState({ ingredients: updatedIngredients, price: newTotalPrice });
  };

  removeIngredientHandler = (ingredient) => {
    if (this.state.ingredients[ingredient] >= 1) {
      const updatedCount = this.state.ingredients[ingredient] - 1;
      const updatedIngredients = {
        ...this.state.ingredients,
      };
      updatedIngredients[ingredient] = updatedCount;

      const newTotalPrice = this.state.price - INGREDIENT_PRICES[ingredient];
      this.setState({ ingredients: updatedIngredients, price: newTotalPrice });
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
