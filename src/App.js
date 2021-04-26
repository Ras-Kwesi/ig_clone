import React, { Component, useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input } from '@material-ui/core';


function getModalStyle() {
    const top = 50;
    const left = 50;
    // const top = 50 + rand();
    // const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function App() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false)
    const [email , setEmail] = useState('');
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [openSignIn, setOpenSignIn] = useState(false);


    const signUp = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            return authUser.user.updateProfile({
                displayName : username
            })
        })
        .catch((error) => alert(error.message));

        setOpen(false);
    }

    const signIn = (event) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .catch((error)=> alert(error.message))

        setOpenSignIn(false);
    }

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                //Loggs in
                console.log(authUser);
                setUser(authUser);

                // if (authUser.displayName) {
                //     // dont update username
                // } else {
                //     return authUser.updateProfile({
                //         displayName: username
                //     })
                // }
            } else {
                // logged out
                setUser(null);
            }
        })

        return () => {
            unsubscribe();
        }
    }, [user, username])

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        })

    }, []);

    return (
        <div className="App">
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                {/* {body} */}
                <div style={modalStyle} className={classes.paper}>
                    <form className='app__signup'>
                        <center>
                            <img 
                            className="app__headerimage" 
                            alt="abc" 
                            src="https://www.androidguys.com/wp-content/uploads/2015/04/insta.png"
                            />

                            
                        </center>
                        <Input
                            type='text'
                            placeholder='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            type='email'
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signUp}>Sign Up</Button>

                    </form>
                </div>
            </Modal>

            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
            >
                {/* {body} */}
                <div style={modalStyle} className={classes.paper}>
                    <form className='app__signup'>
                        <center>
                            <img 
                            className="app__headerimage" 
                            alt="abc" 
                            src="https://www.androidguys.com/wp-content/uploads/2015/04/insta.png"
                            />

                            
                        </center>
                        <Input
                            type='email'
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signIn}>Sign In</Button>

                    </form>
                </div>
            </Modal>
            <div className="app_header">
                <img
                    className='app_headerImage'
                    src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                    alt='instagram'

                />

            </div >
            {user ? (
                <Button onClick={() => auth.signOut()}> Log Out</Button>)
                : 
                (<div className='app__loginContainer'>
                    <Button onClick={() => setOpenSignIn(true)} > Signin</Button>
                    <Button onClick={() => setOpen(true)} > Sign up</Button>
                </div>)
            }
            {/* <Button onClick={() => setOpen(true)} > Sign up</Button> */}

            {posts.map(({ post, id }) => (
                <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))}


        </div>
    );
}

export default App;
