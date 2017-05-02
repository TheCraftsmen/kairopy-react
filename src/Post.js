import { connect } from 'react-redux';
import React, { Component } from 'react';

class Post extends Component{
	
	constructor(props){
		super(props);
		this.sendLike = this.sendLike.bind(this);
	}

	sendLike(){
		var url_likes = '/' + this.props.id + '/likes';
		window.FB.api(url_likes,
		    "POST", {access_token: this.props.access_token },
		    (response) => {
		      if (response && !response.error) {
		        alert("Turno cerrado")
		      }
		    }
		);
	}

	render(){
		return(
			<li>
			<div>
				<p onClick={ this.sendLike } >{ this.props.from.name}: { this.props.message}</p>
			</div>  
			</li>
			)
	}	
}


export default connect( state => state, {})(Post);