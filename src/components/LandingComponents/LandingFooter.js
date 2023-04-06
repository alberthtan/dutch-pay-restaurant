import React, { useContext } from "react";
import { Row, Col } from "antd";
import Container from "./Container";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { Context } from "../../globalContext/globalContext";

function LandingFooter() {
    const globalContext = useContext(Context);
    const navigate = useNavigate();

    return (

      <FooterSection>
          <Container>

          <Row justify="space-between">

            <Col lg={12} md={12} sm={14} xs={14}>
              <Title>Contact</Title>
              <Para>
                Do you have any question? Feel free to reach out.
              </Para>
              
                <Chat><StyledLink href="mailto:dutchpay@dutchpay.co">Let's Chat</StyledLink></Chat>
              
            </Col>
            <Col lg={8} md={10} sm={10} xs={10}>
              <Title>Policy</Title>
                <Large onClick={() => navigate('/terms-of-use')}>
                  Terms of Use
                </Large>
                <Large onClick={() => navigate('/privacy-policy')}>
                  Privacy Policy
                </Large>
            </Col>
          </Row>


          <Row justify="space-between">
            <Col lg={12} md={12} sm={14} xs={14}>
              <Empty />
              <Title>Address</Title>
              <Para>251 Little Falls Drive, Wilmington</Para>
              <Para>New Castle County</Para>
              <Para>Delaware, 19808</Para>
            </Col>
            <Col lg={8} md={10} sm={10} xs={10}>
            <Empty />
              <Title>Company</Title>
              <Large left="true" to="/">
                About
              </Large>
            </Col>
          </Row>

          </Container>
      </FooterSection>) 
}

export default LandingFooter;

export const Large = styled("Link")`
  font-size: 16px;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: capitalize;
  line-height: 24px;
  display: block;
  margin-bottom: 0.625rem;
  transition: all 0.3s ease-in-out;
  max-width: max-content;

  &:hover {
    color: rgb(255, 130, 92);
    text-underline-position: under;
    text-decoration: rgb(255, 130, 92) wavy underline;
  }
`;

export const Para = styled("div")`
  font-size: 14px;
  width: 70%;
`;

export const Chat = styled("p")`
  color: #18216d;
  max-width: fit-content;
  border-bottom: 1px solid #18216d;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-bottom: 1px solid rgb(255, 130, 92);
    color: rgb(255, 130, 92);
  }
`;

export const Title = styled("h4")`
  font-size: 22px;
  font-weight: bold;
  text-transform: capitalize;
  color: #18216d;

  @media screen and (max-width: 414px) {
    padding: 1.5rem 0;
  }
`;

export const Empty = styled("div")`
  position: relative;
  height: 53px;
`;

export const Label = styled("label")`
  font-size: 22px;
  text-transform: capitalize;
  color: #18216d;
  display: block;
  margin-bottom: 2rem;
  font-family: "Motiva Sans Bold", serif;

  @media screen and (max-width: 414px) {
    padding: 1.5rem 0;
    margin-bottom: 1rem;
  }
`;

export const FooterSection = styled("footer")`
  background: rgb(241, 242, 243);
  padding: 2.5rem 0;
`;

export const StyledLink = styled("a")`
  color: #333;
  text-decoration: none;
`;
