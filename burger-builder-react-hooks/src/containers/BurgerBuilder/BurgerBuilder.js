import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

function BurgerBuilder(props) {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const isPurchaseable = (ingredients) => {
    const ingredientCount = Object.keys(ingredients)
      .map((ingredient) => ingredients[ingredient])
      .reduce((sum, val) => sum + val, 0);
    return ingredientCount > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.history.push('/auth');
      props.onChangeRedirectPath('/checkout');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...props.ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (props.ingredients) {
    burger = (
      <React.Fragment>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          ingredientAdded={props.onAddIngredient}
          ingredientRemoved={props.onRemoveIngredient}
          disabled={disabledInfo}
          price={props.totalPrice}
          purchaseable={isPurchaseable(props.ingredients)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
        />
      </React.Fragment>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        cancelPurchase={purchaseCancelHandler}
        continuePurchase={purchaseContinueHandler}
        price={props.totalPrice}
      />
    );
  }

  return (
    <React.Fragment>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredient) =>
      dispatch(actions.addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) =>
      dispatch(actions.removeIngredient(ingredient)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onChangeRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
