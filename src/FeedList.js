import React from 'react';
import Post from './Post';
import { connect } from 'react-redux';

const FeedList = (data) => {
  return (
  		<div>
	       <ul >
	         {
	         	data.posts.map( d => ( <Post  key={ d.id } {...d} access_token={ data.user.user_page_token } /> )  )
	         }
	       </ul>
  		</div>
  );
};

export default connect( state => state, {})(FeedList);


