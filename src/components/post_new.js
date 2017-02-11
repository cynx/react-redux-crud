import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost, fetchPost } from '../actions/index';
import { Link } from 'react-router';

const FIELDS = {
  title:{
      type:'input',
      label: 'Title for Post'
  },
  categories: {
      type: 'input',
      label: 'Enter some Categories for this post'
  },
  content: {
      type: 'textarea',
      label: 'Post Contents'

  }
};


class PostNew extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    renderField(post, fieldConfig, field){
        const fieldHelper = this.props.fields[field];
        return (
            <div key={fieldConfig.label} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger':''}`}>
                <label>{fieldConfig.label}</label>
                <fieldConfig.type value={post?post[field]:''} {...fieldHelper} type="text" className="form-control" />
                <div className="text-help">
                    {fieldHelper.touched?fieldHelper.error : ''}
                </div>
            </div>
        );
    }

    componentWillMount(){
        if (this.props.route.path && this.props.route.path.indexOf('posts/edit/')>-1 && this.props.params.id)
            this.props.fetchPost(this.props.params.id);
    }

    onSubmit(props){
        if (this.props.route.path && this.props.route.path.indexOf('posts/edit/')>-1 && this.props.params.id)
            props.id = this.props.params.id;
        this.props.createPost(props)
            .then(()=>{
                //blog post has been created, navigate the user to the index
                //navigate by this.context.router.push
                this.context.router.push('/');
            });
    }

    render(){
        //if (this.props.route.path && this.props.route.path.indexOf('posts/edit/')>-1 && this.props.params.id)
          //  console.log('fetch');

        const { handleSubmit, post } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create a new post</h3>
                {_.map(FIELDS,function(post,obj,key){return this.renderField(post,obj,key);}.bind(this,post))}

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values){
    const errors={};

    _.each(FIELDS, (type, field) => {
        if (!values[field]){
            errors[field] = `Enter a ${field}`;
        }
    });

    return errors;
}

function mapStateToProps(state){
    return {
        post: state.posts.post
    };
}

//connect: first argument - mapStateToProps, second is mapDispatchToProps
//reduxForm:1st - config, 2nd - mapStateToProps, 3rd mapDispatchToProps
export default reduxForm({
 form:'PostNew',
 fields: _.keys(FIELDS),
    validate
},mapStateToProps,{createPost, fetchPost})(PostNew);