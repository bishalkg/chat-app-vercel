import React, { useRef } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalOverlay, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, FormControl, FormLabel, Input, } from '@chakra-ui/react';


import {
  createUserWithEmailAndPassword,
} from 'firebase/auth';



export default function SignUpModal({auth}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const emailRef = useRef('');
  const passRef = useRef('');
  const verifPassRef = useRef('');

  const submitForm = async (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let pass = passRef.current.value;
    let verifPass = verifPassRef.current.value;
    if(pass === verifPass) {

      try {
        await createUserWithEmailAndPassword(auth, email, pass)
      } catch(e) {
        console.log(e, 'error creating user')
        alert('Password should be longer than 6 characters')
      }

    } else {
      alert('Passwords dont match!')
      passRef.current.value = ''
      verifPassRef.current.value = ''
    }
  }


  return (
    <>
      <Button size="lg" colorScheme="teal" style={{width: '40%', left: '30%'}} onClick={onOpen}>Make An Account</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Create your account</ModalHeader>
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
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Verify Password</FormLabel>
              <Input type="password" minLength="12" placeholder="******" ref={verifPassRef}
              />
            </FormControl>

          <ModalFooter>
            <Button
                type="submit"
                onClick={submitForm}
                colorScheme="teal" variant="outline" boxShadow="md" mr={'30%'}  _hover={{
                background: "teal",
                color: "white",
              }}>
              Create Account
            </Button>
          </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
