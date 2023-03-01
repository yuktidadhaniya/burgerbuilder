import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
// import thunk from 'redux-thunk';

// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// };

class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = { ...}
  // }

  state = {
    // ingredients: {
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0
    // },
    // ingredients: null,
    // totalPrice: 4,
    // purchasable: false,
    purchasing: false,
    // loading: false,
    error: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredient();
    // axios.get('https://react-my-burger-a1af7-default-rtdb.firebaseio.com/ingredients.json')
    //     .then(response => {
    //         this.setState({ ingredients: response.data })
    //     })
    //     .catch(error => {
    //         this.setState({ error: true })

    //     })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  // addIngredientHandler = (type) => {
  //     const oldCount = this.state.ingredients[type];
  //     const updatedCount = oldCount + 1;
  //     const updatedIngredients = {
  //         ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceAddition = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice + priceAddition;
  //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //     this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //     const oldCount = this.state.ingredients[type];
  //     if (oldCount <= 0) {
  //         return;
  //     }
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredients = {
  //         ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceDeduction = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceDeduction;
  //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //     this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
    // alert('you continue!')
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    // }

    // queryParams.push('price=' + this.state.totalPrice)
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //     pathname: '/checkout',
    //     search: '?' + queryString
    // });
  };

  render() {
    const disableInfo = {
      ...this.props.ing,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ing) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ing}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    //{salad:true ,meat:false,...}
    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (igName) => dispatch(actions.addIngredient(igName)),
    onIngredientRemoved: (igName) => dispatch(actions.removeIngredient(igName)),
    onInitIngredient: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
