import React, { Component, useState } from 'react';
import '../static/Post.css';
import Avatar from '@material-ui/core/Avatar';


function Post({username, caption, imageUrl}) {
    // const [posts,setPosts] = useState([])
    return (
        <div className='post'>
            <div className='post__header'>
                <Avatar
                    className='post__avatar'
                    alt='Mandem'
                    src='/static/images/avatar/1.jpg'
                />
                <h3>{username}</h3>
            </div>

            {/* Header > Avatar + Image */}


            {/* Image */}
            <img className='post__image ' src={imageUrl} />


            {/* Username */}
            <h4 className='post__caption'> <strong>{username}</ strong> :  {caption}</h4>

            {/* Caption */}
        </div>
    )
}

export default Post;