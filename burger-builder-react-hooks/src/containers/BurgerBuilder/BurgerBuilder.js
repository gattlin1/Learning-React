import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const ingredients = useSelector((state) => state.burgerBuilder.ingredients);
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);
  const error = useSelector((state) => state.burgerBuilder.error);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const dispatch = useDispatch();
  const onAddIngredient = (ingredient) =>
    dispatch(actions.addIngredient(ingredient));
  const onRemoveIngredient = (ingredient) =>
    dispatch(actions.removeIngredient(ingredient));
  const onInitIngredients = () => dispatch(actions.initIngredients());
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onChangeRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, []);

  const isPurchaseable = (ingredients) => {
    const ingredientCount = Object.keys(ingredients)
      .map((ingredient) => ingredients[ingredient])
      .reduce((sum, val) => sum + val, 0);
    return ingredientCount > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      props.history.push('/auth');
      onChangeRedirectPath('/checkout');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (ingredients) {
    burger = (
      <React.Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={onAddIngredient}
          ingredientRemoved={onRemoveIngredient}
          disabled={disabledInfo}
          price={totalPrice}
          purchaseable={isPurchaseable(ingredients)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </React.Fragment>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        cancelPurchase={purchaseCancelHandler}
        continuePurchase={purchaseContinueHandler}
        price={totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
