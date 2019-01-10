import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, addCurrency } from '../../redux/actions/currencyActions';
import { changeConversion } from '../../redux/actions/conversionActions';
const rp = require('request-promise');

class Navbar extends Component {
  constructor(props) {
    super(props);
    rp('https://disquietude-coinmarketcap-microservice.glitch.me/api/map/10', {
      method: 'GET',
      json: true
    })
    .then(
      function fulfilled(response) {
        let ids = [];
        response.data.forEach(element => {
          ids.push(element.id);
        });
        return ids;
      },
      function rejected(err) {
        console.error(err);
      }
    )
    .then(
      function fulfilled(ids) {
        let selectedIds = [], reserveIds = [];
        for (let i = 0; i < ids.length; i++) {
          if (i < 5) {
            selectedIds.push(ids[i]);
          }
          else {
            reserveIds.push(ids[i]);
          }
        }
        props.fetchCurrencies(selectedIds, reserveIds, 'USD');
      }
    )
  }

  render() {
    let reserveDropdown;
    if (this.props.reserve) {
      reserveDropdown = this.props.reserve.map((current) => (
        <a className='navbar-item' key={current.id} onClick={(e) => this.props.addCurrency(current.id, e)}>
          {current.name} ({current.symbol})
        </a>
      ));
    }

    return (
      <nav className='navbar is-link'>

        <div className='navbar-brand'>
          <div className='navbar-item'>
            <h1 className='title is-5'>React Blockchain</h1>
          </div>
        </div>

        <div className='navbar-menu'>
          <div className='navbar-end'>

            <div className='navbar-item has-dropdown is-hoverable'>
              <a className='navbar-link'>
                Add Currency
              </a>

              <div className='navbar-dropdown'>
                {reserveDropdown}
              </div>          
            </div>

            <div className='navbar-item has-dropdown is-hoverable'>
              <a className='navbar-link'>
                Convert Prices
              </a>

              <div className='navbar-dropdown'>
                <a 
                  className='navbar-item' 
                  onClick={(e) => this.props.changeConversion(
                    this.props.selected,
                    this.props.reserve,
                    'USD',
                    e
                  )}
                >
                  USD
                </a>
                <a 
                  className='navbar-item' 
                  onClick={(e) => this.props.changeConversion(
                    this.props.selected,
                    this.props.reserve,
                    'BTC',
                    e
                  )}
                >
                  BTC
                </a>
                <a 
                  className='navbar-item' 
                  onClick={(e) => this.props.changeConversion(
                    this.props.selected,
                    this.props.reserve,
                    'ETH',
                    e
                  )}
                >
                  ETH
                </a>
              </div>
            </div>
          </div>
        </div>

      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  selected: state.currencies.selected,
  reserve: state.currencies.reserve
})

export default connect(mapStateToProps, {fetchCurrencies, addCurrency, changeConversion})(Navbar);