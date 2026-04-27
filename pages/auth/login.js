import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import {login, isEmailInUse} from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';
const Login = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()

  async function handleLogin(){
    try{
      await login(email, password, setUser)
      router.push('/dashboard')
    }catch(err){
        console.log('Error Logging In', err)
    }
  }


  return (
  <>
    <Navbar />
    <Section>
      <AnimationContainer>
        <DotLottieReact
        src="https://lottie.host/dcbcb85b-d6f4-4f8b-a958-31a155f457ee/QVWKpuofd1.lottie"
        loop
        autoplay
        style={{ width: "100%", height: "100%"}}
        />        
      </AnimationContainer>     

      <FormWrapper>
        <Header>Login</Header>

        <InputTitle>Email</InputTitle>
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />

        <InputTitle>Password</InputTitle>
        <Input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <UserAgreementText>
          By signing in, you automatically agree to our 
          <UserAgreementSpan 
            href="/legal/terms-of-use" 
            target="_blank"
          > Terms of Use </UserAgreementSpan> 
            and 
          <UserAgreementSpan 
            href="/legal/privacy-policy" 
            target="_blank"
          > Privacy Policy.</UserAgreementSpan>
        </UserAgreementText>

        <MainButton onClick={handleLogin}>Login</MainButton>
      </FormWrapper>
    </Section>
  </>
)
}

const Section = styled.section`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  padding: 40px;
`;

const FormWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: 12px;
  background: #f5f7fa;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
`;

const AnimationContainer = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
`

const Header = styled.h1`
  font-size: 26px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
`;

const InputTitle = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 10px 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
  }
`;

const MainButton = styled.button`
  margin-top: 8px;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 100px;
  border: 1px solid #d1d5db;
  background: #93c5fd;
  color: black;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.5);

  &:hover {
    background: #dbeafe;
  }
`;

const UserAgreementText = styled.p`
  font-size: 12px;
  line-height: 1.3;
  color: #444;
`;

const UserAgreementSpan = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export default Login