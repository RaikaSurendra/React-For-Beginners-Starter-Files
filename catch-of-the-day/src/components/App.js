import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.object
  }
  componentDidMount() {
    console.log("MOUNTED");
    const { params } = this.props.match;
    //reinstate the state as per the localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }
  componentDidUpdate() {
    const store = this.props.match.params;
    localStorage.setItem(store.storeId, JSON.stringify(this.state.order));
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addFish = (fish) => {
    //console.log("Adding a Fish 🐟 ");
    //1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    //2. add our new to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    //3. Set the new fishes object to state
    this.setState({
      fishes,
    });
  };
  updateFish = (key, updatedFish) => {
    //take a copy of the current this.state
    const fishes = { ...this.state.fishes };
    //update that this.state.
    fishes[key] = updatedFish;
    //set the this.state.
    this.setState({ fishes });
  };
  deleteFish = (key) => {
    //take a copy of the this.state.
    const fishes = { ...this.state.fishes };
    //update the this.state.
    fishes[key] = null;
    //set state
    this.setState({ fishes });
  };
  loadSampleFishes = () => {
    //alert("Loading Sample  😅");
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    //take a copy of the order
    const order = { ...this.state.order };
    //either add to the order or update the number in our order
    order[key] = order[key] + 1 || 1;
    //call set state to update our state object
    this.setState({ order });
  };
  removeFromOrder = (key) => {
    //take a copy of the order
    const order = { ...this.state.order };
    //remove from order
    delete order[key];
    //call set state to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        {/*<Order fishes={this.state.fishes} order={this.state.order}/>*/}
        <Order {...this.state} removeFromOrder= {this.removeFromOrder} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
