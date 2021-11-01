import React, { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { Button } from '@chakra-ui/react';
import SignUpModal from './SignUpModal';
import SignInModal from './SignInModal';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDxOwXMunCWig375YHwsz3Fv4SbSF6pCY4",
  authDomain: "chat-app-146dd.firebaseapp.com",
  projectId: "chat-app-146dd",
  storageBucket: "chat-app-146dd.appspot.com",
  messagingSenderId: "1064453780809",
  appId: "1:1064453780809:web:3171afdd1fdc971ba61698",
  measurementId: "G-KYCD066BWH"
})

const auth = firebase.auth();
const firestore =  firebase.firestore();



function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1 className="login-header"> OG Chat 💬</h1>
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> :
        (
          <>
            <SignInWithGoogle />
            <SignInModal auth={auth}/>
            <SignUpModal auth={auth}/>
          </>
        )

        }
      </section>

    </div>
  );
}




function SignInWithGoogle() {
  const signInWithGoogle = () => {
    //instantiate a google auth provider
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <Button size="lg" colorScheme="teal" style={{width: '40%', left: '30%'}} onClick={signInWithGoogle}>Sign in With Google</Button>
    </>
  )
}





function SignOut() {
  return auth.currentUser && (
    <Button
      onClick={() => auth.signOut()}
      size="lg"
      colorScheme="teal"
      style={{width: '40%'}}
      >
      Sign Out
    </Button>
  )
}





function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt');

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    dummy.current.scrollIntoView({behavior: 'smooth'})
  },[])


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    const newMessage = {
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    }
    console.log(newMessage);
    await messagesRef.add(newMessage)
    setFormValue('');
    dummy.current.scrollIntoView({behavior: 'smooth'})
  }


  return (
    <>
      <main>

        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>

      </main>

      <form onSubmit={sendMessage}>

      <input className="text-input-field" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="......" />

      <button type="submit" disabled={!formValue}>🦍</button>

      </form>

    </>
  )
}





function ChatMessage({message}) {
  const { text, uid, photoURL } = message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://icons.iconarchive.com/icons/iconsmind/outline/256/Administrator-icon.png'} style={{background: 'white'}} alt="user" />
      <p>{text}</p>
    </div>
    </>
  )
}

export default App;
