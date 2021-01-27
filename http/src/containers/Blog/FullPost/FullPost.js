import React, { Component } from 'react';
import './FullPost.css';
import axios from '../../../axios';

class FullPost extends Component {
  state = { post: null };

  componentDidMount() {
    if (this.props.match.params.id) {
      if (
        !this.state.post ||
        (this.state.post && this.state.post.id !== this.props.id)
      )
        axios.get(`/posts/${this.props.match.params.id}`).then((response) => {
          this.setState({ post: response.data });
        });
    }
  }

  deletePostHandler = () => {
    axios.delete(`/posts/${this.state.post.id}`).then((response) => {
      console.log(response);
    });
  };
  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
    if (this.props.id) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.post) {
      post = (
        <div className='FullPost'>
          <h1>{this.state.post.title}</h1>
          <p>{this.state.post.body}</p>
          <div className='Edit'>
            <button className='Delete' onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
