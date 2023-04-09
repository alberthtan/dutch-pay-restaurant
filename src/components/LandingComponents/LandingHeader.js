import React, { useContext, useState } from "react";
import { Row, Col, Drawer } from "antd";
import Container from "./Container";
import styled from "styled-components";
import Button from "./Button"
import { SvgIcon } from "./SvgIcon";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";


function LandingHeader() {
    const [visible, setVisibility] = useState(false);

    const showDrawer = () => {
      setVisibility(!visible);
    };
  
    const onClose = () => {
      setVisibility(!visible);
    };

    const MenuItem = () => {
        const scrollTo = (id) => {
          const element = document.getElementById(id);
          element.scrollIntoView({
            behavior: "smooth",
          });
          setVisibility(false);
        };
        return (
        <>
            {visible ? 
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div>
                    <CustomNavLinkSmall onClick={() => scrollTo("about")}>
                        <Span>About</Span>
                    </CustomNavLinkSmall>
                </div>
                <div>
                    <CustomNavLinkSmall onClick={() => scrollTo("mission")}>
                        <Span>Mission</Span>
                    </CustomNavLinkSmall>
                </div>
                <div>
                    <CustomNavLinkSmall onClick={() => scrollTo("product")}>
                        <Span>Product</Span>
                    </CustomNavLinkSmall>
                </div>
                <div>
                    <CustomNavLinkSmall
                    style={{ width: "180px" }}
                    onClick={() => scrollTo("contact")}
                    >
                        <Span>
                            <Button>Contact</Button>
                        </Span>
                    </CustomNavLinkSmall>
                </div>
            
        </div> : 
        <div>
            <CustomNavLinkSmall onClick={() => scrollTo("about")}>
                <Span>About</Span>
            </CustomNavLinkSmall>
            <CustomNavLinkSmall onClick={() => scrollTo("mission")}>
                <Span>Mission</Span>
            </CustomNavLinkSmall>
            <CustomNavLinkSmall onClick={() => scrollTo("product")}>
                <Span>Product</Span>
            </CustomNavLinkSmall>
            <CustomNavLinkSmall
                style={{ width: "180px" }}
                onClick={() => scrollTo("contact")}
            >
                <Span>
                    <Button>Contact</Button>
                </Span>
            </CustomNavLinkSmall>
        </div>
        }
        </>   
        );
      };

    return (
        <HeaderSection>
        <Container>
          <Row justify="space-between">
            <LogoContainer to="/" aria-label="homepage">
              <SvgIcon src="logo.svg" width="131px" height="74px" />
            </LogoContainer>
            <NotHidden>
              <MenuItem />
            </NotHidden>
            <Burger onClick={showDrawer}>
              <Outline />
            </Burger>
          </Row>
          <Drawer closable={false} visible={visible} onClose={onClose}>
            <Col style={{ marginBottom: "1.0rem" }}>
              <Label onClick={onClose}>
                <Col span={12}>
                  <Menu style={{color: '#31522D', fontWeight: 'bold', fontSize: 24}}>Menu</Menu>
                </Col>
                <Col span={12}>
                  <Outline />
                </Col>
              </Label>
            </Col>
            <MenuItem />
          </Drawer>
        </Container>
      </HeaderSection>
    )
}

const NavLink = styled("div")`
  display: inline-block;
  text-align: center;
`;

const CustomNavLinkSmall = styled(NavLink)`
  font-size: 1.2rem;
  color: #31522D;
  transition: color 0.2s ease-in;
  margin: 0.5rem 2rem;

  @media only screen and (max-width: 768px) {
    margin: 1.25rem 2rem;
  }
`;

const Span = styled("span")`
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:active,
  &:focus {
    color: rgb(255, 130, 92);
    text-underline-position: under;
    text-decoration: rgb(255, 130, 92) wavy underline;
  }
`;

const HeaderSection = styled("header")`
  padding: 1rem 0.5rem;

  .ant-row-space-between {
    align-items: center;
    text-align: center;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
`;

const NotHidden = styled("div")`
  @media only screen and (max-width: 910px) {
    display: none;
  }
`;

const Burger = styled("div")`
  @media only screen and (max-width: 910px) {
    display: block;
  }

  display: none;

  svg {
    fill: #2e186a;
  }
`;

const Outline = styled(MenuOutlined)`
  font-size: 22px;
`;

const Menu = styled("h5")`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const Label = styled("span")`
  font-weight: 500;
  color: #404041;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export default LandingHeader;