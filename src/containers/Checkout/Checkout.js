import React, { Component } from 'react';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../Store/actions/index';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  // componentWillMount() {
  //   this.props.onInitPurchase();
  // }
  // state = {
  //     ingredients: null,
  //     price: 0
  // }

  // componentWillMount() {
  //     const query = new URLSearchParams(this.props.location.search)
  //     const ingredients = {}
  //     let price = 0
  //     for (let param of query.entries()) {
  //         //['salad','1']
  //         if (param[0] === 'price') {
  //             price = param[1]
  //         } else {
  //             ingredients[param[0]] = +param[1]
  //         }

  //     }
  //     this.setState({ ingredients: ingredients, totalPrice: price })
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summery = <Redirect to="/" />;

    if (this.props.ing) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summery = (
        <div>
          {purchasedRedirect}
          <CheckoutSummery
            ingredients={this.props.ing}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
            // render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}
          />
        </div>
      );
    }
    return summery;
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    purchased: state.burgerBuilder.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit),
  };
};
export default connect(mapStateToProps)(Checkout);
