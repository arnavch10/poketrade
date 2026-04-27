/*
Simple footer component for the landing page from the template
*/

import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <LeftContainer>
          © {new Date().getFullYear()} PokeTrade
        </LeftContainer>

        <CenterContainer>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <Separator>|</Separator>
          <FooterLink href="#">Terms of Service</FooterLink>
        </CenterContainer>

        <RightContainer>
          <SocialIcon href="#" aria-label="Facebook">FB</SocialIcon>
          <SocialIcon href="#" aria-label="Twitter">TW</SocialIcon>
          <SocialIcon href="#" aria-label="Instagram">IG</SocialIcon>
        </RightContainer>
      </FooterContainer>
    </FooterSection>
  );
};


const FooterSection = styled.footer`
  width: 100%;
  background-color: #e5e7eb;
  border-top: 1px solid #d1d5db;
  padding: 1.5rem 0;
  color: #374151;
`;

const FooterContainer = styled.div`
  max-width: 1100px;
  margin: auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
`;

const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const Separator = styled.span`
  opacity: 0.4;
  color: #374151;
`;

const RightContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const FooterLink = styled.a`
  color: #6b7280;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s ease;

  &:hover {
    color: #93c5fd;
  }
`;

const SocialIcon = styled.a`
  color: #6b7280;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: #93c5fd;
  }
`;

export default Footer;