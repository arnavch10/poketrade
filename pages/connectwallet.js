import React from 'react'
import styled from 'styled-components'
import Navbar from '@/components/Dashboard/Navbar'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Wallet } from 'lucide-react'
import { useRouter } from 'next/router'

const ConnectWallet = () => {

    const router = useRouter();

  const handleConnect = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask')
        return
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      console.log('Connected:', accounts[0])
      router.push('/marketplace')
    } catch (err) {
      console.log('Wallet connection error:', err)
    }
  }

  return (
    <>
      <Navbar />
      <Section>
        <AnimationContainer>
          <DotLottieReact
            src="https://lottie.host/b6bb31b9-9d2c-4fa3-ac6b-ac95ead4bd66/SUz0hURlFw.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </AnimationContainer>

        <Panel>
          <Header>Connect Wallet</Header>

          <Subtext>
            Connect your wallet to access the marketplace.
          </Subtext>

          <ConnectButton onClick={handleConnect}>
            <Wallet size={18} />
            Connect Wallet
          </ConnectButton>
        </Panel>
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


const Panel = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;

  background: #ffffff;

  /* 🔥 sharp + bold */
  border: 2px solid black;
  border-radius: 0;

  box-shadow: 6px 6px 0px black;
`;



const Header = styled.h1`
  font-size: 26px;
  font-weight: 700;
  text-align: center;
`;

const Subtext = styled.p`
  font-size: 14px;
  text-align: center;
  color: #444;
`;



const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  margin-top: 12px;
  padding: 12px;

  font-size: 15px;
  font-weight: 600;

  background: #facc15; /* yellow */
  color: black;

  border: 2px solid black;
  border-radius: 0;

  cursor: pointer;

  /* 🔥 sharp offset shadow */
  box-shadow: 4px 4px 0px black;

  transition: all 0.1s ease;

  &:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px black;
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: 0px 0px 0px black;
  }
`;


const AnimationContainer = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ConnectWallet