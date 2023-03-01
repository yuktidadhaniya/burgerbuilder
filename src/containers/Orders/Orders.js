import { Component } from 'react';
import { connect, Connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  //   state = {
  //     orders: [],
  //     loading: true,
  //   };
  componentDidMount() {
    this.props.onFetchOrders();
    // axios.get('/orders.json')
    //     .then(res => {
    //         const fetchedOrders = []
    //         for (let key in res.data) {
    //             fetchedOrders.push({
    //                 ...res.data[key],
    //                 id: key
    //             })
    //         }
    //         // console.log(res.data)
    //         this.setState({ loading: false, orders: fetchedOrders })
    //     })
    //     .catch(err => {
    //         this.setState({ loading: false })
    //     })
  }
  render() {
    let orders = <Spinner />;
    console.log('orders', orders);
    if (!this.props.loading) {
      orders = this.props.order.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return (
      <div>
        {orders}
        {/* {this.props.orders.map((order) => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))} */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    order: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
