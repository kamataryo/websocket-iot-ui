import React, { Component } from 'react'
import PropTypes            from 'prop-types'
import update               from 'immutability-helper'
import RaisedButton         from 'material-ui/RaisedButton'
import TextField            from 'material-ui/TextField'
import io                   from 'socket.io-client'

/**
 * LoginView
 * @return {ReactComponent} login view
 */
export default class LoginView extends Component {

  static PropTypes = {
    onConnect: PropTypes.func.isRequired
  }

  /**
   * [constructor description]
   * @param {Props} props Props
   * @return {void}
   */
  constructor(props) {
    super(props)
    this.state = {
      username         : '',
      endpoint         : 'http://localhost:3000',
      password         : '',
      authFailed       : undefined,
      connectionFailed : undefined
    }
  }

  /**
   * create callback to update Certification infomation
   * @param  {string} param username, endpoint, password
   * @return {void}
   */
  updateCertification(param) {
    return (e, value) => this.setState(update(this.state, { [param]: { $set: value } }))
  }

  /**
   * [tryConnect description]
   * @return {void} [description]
   */
  tryConnect = () => {
    const socket = io.connect(this.state.endpoint)
    socket
      .on('connect', () => {
        // try authentication
        socket.emit('auth', {
          username: this.state.username,
          password: this.state.password
        })
        // wait response
        socket.on('permit', permitted => {
          if (permitted) {
            this.props.onConnect(socket, permitted)
          }
          this.setState(update(this.state, {
            authFailed       : { $set: !permitted },
            connectionFailed : { $set: false },
          }))
        })
      })
      .on('connect_error', () => {
        this.setState(update(this.state, { connectionFailed: { $set: true } }))
        socket.disconnect()
      })
  }

  /**
   * [render description]
   * @return {void}
   */
  render() {

    return (
      <section className={ 'login' }>

        <div className={ 'margin-one-half' }>

          <TextField
            errorText={ this.state.connectionFailed === true ? 'エンドポイントとの接続に失敗しました。URLが間違っているかもしれません' : false }
            hintText={ 'Socket.IO Endpoint URL' }
            value={ this.state.endpoint }
            onChange={ this.updateCertification('endpoint') }
            onFocus={ () => this.setState(update(this.state, { connectionFailed: { $set: undefined } })) }
          />

          <TextField
            errorText={ this.state.authFailed === true ? 'ユーザー名が間違っているかもしれません' : false }
            hintText={ 'username' }
            onChange={ this.updateCertification('username') }
            onFocus={ () => this.setState(update(this.state, { authFailed: { $set: undefined } })) }
          />

          <TextField
            errorText={ this.state.authFailed === true ? 'パスワードが間違っているかもしれません' : false }
            hintText={ 'password' }
            type={ 'password' }
            onChange={ this.updateCertification('password') }
            onFocus={ () => this.setState(update(this.state, { authFailed: { $set: undefined } })) }
          />
        </div>

        <RaisedButton
          label={ 'LOGIN' }
          primary
          onTouchTap={ this.tryConnect }
        />

      </section>
    )
  }
}
