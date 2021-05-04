import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input } from '@material-ui/core';
import {storage, db} from '../firebase';
import firebase from 'firebase';
import '../static/styles/ImageUpload.css'


function ImageUpload(props) {
    const[caption, setCaption] = useState('');
    // const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image); 
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Progres function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                setProgress(progress);
            },
            (error) => {
                // error function

                console.log(error);
                alert(error.message)
            },
            () => {
                // Complete function ...
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // Post image in db
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: props.username
                    })
                })

                setProgress(0);
                setCaption('');
                setImage(null);
            }
        )
    }


    return (
        <div className='imageUpload'>
            {/* <h1> Upload</h1> */}
            <progress className='imageUpload__progress' value={progress} max='100'/>
            <input type='text' placeholder = 'Caption this'onChange={event => setCaption(event.target.value)} />
            <input type = 'file' onChange ={handleChange}/>
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload;