import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionTypes from '../../store/actions';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
  state = {
    counter: 0,
  };

  render() {
    return (
      <div>
        <CounterOutput value={this.props.ctr} />
        <CounterControl
          label='Increment'
          clicked={this.props.onIncrementCounter}
        />
        <CounterControl
          label='Decrement'
          clicked={this.props.onDecrementCounter}
        />
        <CounterControl label='Add 5' clicked={this.props.onAddCounter} />
        <CounterControl label='Subtract 5' clicked={this.props.onSubCounter} />
        <hr />
        <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
          Store Result
        </button>
        <ul>
          {this.props.results.map((result) => (
            <li
              key={result.id}
              onClick={() => this.props.onDeleteResult(result.id)}
            >
              {result.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { ctr: state.counter.counter, results: state.result.results };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrementCounter: () => dispatch({ type: ActionTypes.INCREMENT }),
    onDecrementCounter: () => dispatch({ type: ActionTypes.DECREMENT }),
    onAddCounter: () => dispatch({ type: ActionTypes.ADD, value: 5 }),
    onSubCounter: () => dispatch({ type: ActionTypes.SUB, value: 5 }),
    onStoreResult: (value) => {
      dispatch({ type: ActionTypes.STORE_RESULT, value: value });
    },
    onDeleteResult: (id) => {
      dispatch({ type: ActionTypes.DELETE_RESULT, id: id });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
