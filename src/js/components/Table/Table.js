import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeCurrency, sortCurrencies } from '../../redux/actions/currencyActions';

import TableRow from './TableRow';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rank: 'desc',
      price: 'asc'
    };
    this.changeSortDirection = this.changeSortDirection.bind(this);
  }

  changeSortDirection(property) {
    let newDirection = (this.state[property] === 'asc') ? 'desc' : 'asc';

    this.props.sortCurrencies(property, newDirection);

    this.setState({
      [property]: newDirection
    });
  }

  render() {
    let rows;

    if (this.props.selected) {
      rows = this.props.selected.map((current) => (
        <TableRow 
          key={current.id}
          id={current.id}
          rank={current.rank}
          symbol={current.symbol}
          name={current.name}
          price={current.price}
          remove={this.props.removeCurrency}
        />
      ))
    }

    return (
      <section className='section'>
        <div className='container'>
          <table className='table is-striped is-hoverable is-fullwidth'>

            <thead>
              <tr>
                <th 
                  className='table__header--clickable' 
                  title='Sort by Rank'
                  onClick={(e) => {this.changeSortDirection('rank', e);}}>CMC Rank</th>
                <th>Symbol</th>
                <th>Name</th>
                <th 
                  className='table__header--clickable'
                  title='Sort by Price' 
                  onClick={(e) => {this.changeSortDirection('price', e);}}>Price (in {this.props.conversion})</th>
                <th>Remove Currency</th>
              </tr>
            </thead>

            <tbody>
              {rows}
            </tbody>

          </table>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  selected: state.currencies.selected,
  conversion: state.conversion
})

export default connect(mapStateToProps, {removeCurrency, sortCurrencies})(Table);