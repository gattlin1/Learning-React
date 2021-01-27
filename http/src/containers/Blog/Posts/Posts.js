import React, { Component } from 'react';
import './Posts.css';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import { Link } from 'react-router-dom';

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
    this.props.history.push({ pathname: '/' + id });
  };

  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          // <Link key={post.id} to={'/' + post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelected(post.id)}
          />
          // </Link>
        );
      });
    }
    return <section className='Posts'>{posts}</section>;
  }
}

export default Posts;
