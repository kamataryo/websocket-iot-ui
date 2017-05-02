import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import { connect }          from 'react-redux'

import Toggle       from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import Divider      from 'material-ui/Divider'
import style        from '../style'

/**
 * mapStateToProps
 * @param  {State} state State
 * @return {Props}       mapping state
 */
const mapStateToProps = state => ({
  buttonState  : state.buttonState,
  buttonUpdate : state.callbacks.emitUpstream
})

/**
 * connect to redux
 * @type {Decorator}
 */
@connect(mapStateToProps)
/**
 * ControllerView
 * @type {ReactComponent}
 */
export default class ControllerView extends Component {

  static PropTypes = {
    buttonState  : PropTypes.object.isRequired,
    buttonUpdate : PropTypes.func.isRequired,
  }

  /**
   * Render
   * @return {ReactDomElement} React DOM Element
   */
  render() {

    const { buttonState, buttonUpdate } = this.props

    return (
      <section>

        <Toggle
          label={ 'スイッチ0' }
          style={ style.verticalMargin.x1 }
          toggled={ buttonState.toggle0 || false }
          onToggle={ (e, value) => buttonUpdate({ toggle0: value }) }
        />

        <Divider />

        <Toggle
          label={ 'スイッチ1' }
          style={ style.verticalMargin.x1 }
          toggled={ buttonState.toggle1 || false }
          onToggle={ (e, value) => buttonUpdate({ toggle1: value }) }
        />

        <Divider />

        <Toggle
          label={ 'スイッチ2' }
          style={ style.verticalMargin.x1 }
          toggled={ buttonState.toggle2 || false }
          onToggle={ (e, value) => buttonUpdate({ toggle2: value }) }
        />

        <div>
          <RaisedButton
            label={ 'OFF' }
            style={ { marginRight: 12 } }
            primary
            onTouchTap={ () => buttonUpdate({
              toggle0: false,
              toggle1: false,
              toggle2: false,
            }) }
          />

          <RaisedButton
            label={ 'ON' }
            primary
            onTouchTap={ () => buttonUpdate({
              toggle0: true,
              toggle1: true,
              toggle2: true,
            }) }
          />
        </div>

      </section>
    )
  }

}