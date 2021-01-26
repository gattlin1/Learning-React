import React, { Component } from 'react';
import './Posts.css';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';

export class Posts extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios
      .get('/posts')
      .then((response) => {
        const updatedPosts = response.data.slice(0, 4).map((post) => {
          return { ...post, author: 'Max' };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  postSelected = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelected(post.id)}
          />
        );
      });
    }
    return <section className='Posts'>{posts}</section>;
  }
}

export default Posts;
