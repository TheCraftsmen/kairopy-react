 /* eslint-disable */
import React, { Component } from 'react';
import FeedList from './FeedList';
import { loginIn, getData, getFeedItem, setToken, cleanPost } from './actions';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.getFeed = this.getFeed.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal(){
    $('#myModal').modal('show');
  }

  getFeed(){
    this.props.cleanPost();
    window.FB.api("/me/accounts", (response) => {
    if (response && !response.error) {
      for (var i = response.data.length - 1; i >= 0; i--) {
        var page_id = response.data[i].id;
        var page_feed_url = '/' +  response.data[i].id + '/feed';
        var page_access_token = response.data[i].access_token;
        this.props.setToken(page_access_token);
        window.FB.api(page_feed_url, {access_token: response.data[i].access_token, 
          fields: "likes,message,from"}, (response_feed) => {
            if (response_feed && !response_feed.error) {
              for (var j = response_feed.data.length - 1; j >= 0; j--) {
                var show_message = true;
                var feed_likes = response_feed.data[j].likes;
                if(feed_likes){
                  for (var v = feed_likes.data.length - 1; v >= 0; v--) {
                    if(feed_likes.data[v].id && page_id){
                      show_message = false;
                      break;
                    }
                  }
                }
                if(response_feed.data[j].message != undefined && show_message && response_feed.data[j].message.toLowerCase().includes("kairopy")){
                  this.props.getFeedItem(Object.assign({}, response_feed.data[j]));
                }
              }
            }
          }
          );

        }
      }
    });

  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId      : '<APP-ID>',
        xfbml      : true,
        version    : 'v2.9'
      });
      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          this.props.loginIn()
        }
      });
      window.FB.AppEvents.logPageView();
    }

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }

  loginUser(){
    window.FB.login( (response) => {
      if (response.status === 'connected') {
          this.props.loginIn()
      }
    }, {scope: 'publish_actions,user_posts,manage_pages,publish_pages '} );
  }

  render() {
    return (
      <div className="App">
      <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li>
              <a> { this.props.user.login_status ? "Conectado" : "No conectado" }</a>
            </li>
            <li>
              <a onClick={ this.getFeed }>Obtener posts</a>
            </li>
            <li>
              <a href="#about">Acerca de</a>
            </li>
            <li>
              <a onClick={ this.showModal } href="#">Que es Kairopy?</a>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right correccion">
            <li>
              <a href="#">kairopy.com</a>
            </li>
          </ul>
      </nav>
      { this.props.user.login_status ? 
        <FeedList />: 
        <button onClick={ this.loginUser } className="btn btn-default">Empezar</button>  }
      
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Kairopy.com - Sistema de turnos</h4>
            </div>
            <div className="modal-body">
              Sistema de turnos para locales en tiempo real. Es muy común que por falta de tiempo, o largas esperas en la tienda tu clientes dejen de comprar en tu comercio, es por esto que en kairopy te ofrecemos el mejor sistema de turnos online.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default connect( state => state, { loginIn, getData, getFeedItem, setToken, cleanPost })(App);

