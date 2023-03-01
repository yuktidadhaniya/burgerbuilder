import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-order';
import Button from '../../../components/UI/Button/Button';
import './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../Store/actions/index';
class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    // loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    // console.log(this.props.ingredients)

    const order = {
      ingredients: this.props.ing,
      price: this.props.price,
      customer: {
        name: 'Max Schwarzmuller',
        address: {
          street: 'Teststreet 1',
          zipCode: '41351',
          country: 'Germany',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    this.props.onOrderBurger(order);
    // axios.post('/orders.json', order)
    //     .then(response => {
    //         this.setState({ loading: false })
    //         this.props.history.push('/')
    //     })
    //     .catch(error => {
    //         this.setState({ loading: false })
    //     });
  };

  render() {
    let from = (
      <form>
        <input
          className="Input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className="Input"
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className="Input"
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className="Input"
          type="text"
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      from = <Spinner />;
    }
    return (
      <div className="ContactData">
        <h4>Enter your Contact Data</h4>
        {from}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.burgerBuilder.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
