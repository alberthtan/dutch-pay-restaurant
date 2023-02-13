import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const RegisterPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  let navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <RegisterForm></RegisterForm>
      </div>
    </Layout>
  );
};

export default RegisterPage;
