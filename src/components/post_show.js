import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';

import { Link } from 'react-router';

class PostShow extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount(){
        this.props.fetchPost(this.props.params.id);
    }

    onDeleteClick(id){
        this.props.deletePost(id).then(()=>{
            this.context.router.push('/');
        });

    }

    render(){

        const {post} = this.props;

        const btnStyle = {
            'marginRight': '5px'
        }

        if (!this.props.post){
            return (
                <div>
                    loading...
                </div>
            );
        }
        return (
            <div>
                <Link className="btn btn-primary pull-xs-right" to="/" type="button">Back to Index</Link>
                <Link className="btn btn-success pull-xs-right" style={btnStyle} to={`posts/edit/${post.id}`} type="button">Edit Post</Link>
                <button className="btn btn-danger pull-xs-right" style={btnStyle} onClick={()=>this.onDeleteClick(post.id)}>Delete Post</button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>

        );
    }
}

function mapStateToProps(state){
    return {
        post: state.posts.post
    };
}

export default connect(mapStateToProps,{fetchPost, deletePost})(PostShow);