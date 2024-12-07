import { React, Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import {connect} from "react-redux";
import * as actions from '../actions';
import LandingPage from "./LandingPage";

const checking = () => <div>CheckingPage</div>;

class App extends Component {

    componentDidMount(){
        this.props.fetchUser();
    }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/surveys" component={checking} />
            <Route exact path="/surveys/new" component={checking} />
            {/* <Route exact path="/" component={checking} /> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default connect(null,actions)(App);
