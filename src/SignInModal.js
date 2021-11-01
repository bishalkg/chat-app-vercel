import React, { useRef } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalOverlay, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, Input, } from '@chakra-ui/react';


import {
  signInWithEmailAndPassword,
} from 'firebase/auth';



export default function SignInModal({auth}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [emailInput, setEmailInput] = useState('');
  // const [passInput, setPassInput] = useState('');
  const emailRef = useRef('');
  const passRef = useRef('');

  const submitForm = async (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let pass = passRef.current.value;

      try {
        await signInWithEmailAndPassword(auth, email, pass)
      } catch(e) {
        console.log(e, 'couldnt sign in user')
        alert('Incorrect fields')
      }

  }


  return (
    <>
      <Button colorScheme="teal" size="lg" style={{width: '40%', left: '30%'}} onClick={onOpen}>Login</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Login To Your Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="youremail@example.com" ref={emailRef}
              // onChange={(e) => setEmailInput(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" minLength="12" placeholder="******" ref={passRef}
              // onChange={(e) => setPassInput(e.target.value)}
              />
            </FormControl>
          <ModalFooter>
            <Button
                type="submit"
                onClick={submitForm}
                colorScheme="teal" variant="outline" boxShadow="md" mr={'40%'}  _hover={{
                background: "teal",
                color: "white",
              }}>
              Sign In
            </Button>
          </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
