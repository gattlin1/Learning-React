import React, { Component } from 'react';
import axios from '../../axios-orders';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 4,
    puchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  addIngredientHandler = (ingredient) => {
    const updatedCount = this.state.ingredients[ingredient] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[ingredient] = updatedCount;

    const newTotalPrice = this.state.price + INGREDIENT_PRICES[ingredient];
    this.setState({ ingredients: updatedIngredients, price: newTotalPrice });
    this.updatePurchaseState(updatedIngredients);
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
      this.updatePurchaseState(updatedIngredients);
    }
  };

  updatePurchaseState(ingredients) {
    const ingredientCount = Object.keys(ingredients)
      .map((ingredient) => ingredients[ingredient])
      .reduce((sum, val) => sum + val, 0);
    this.setState({ puchaseable: ingredientCount > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (const i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          '=' +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    this.props.history.push({
      pathname: '/checkout',
      search: queryParams.join('&'),
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.price}
            purchaseable={this.state.puchaseable}
            ordered={this.purchaseHandler}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          price={this.state.price}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
