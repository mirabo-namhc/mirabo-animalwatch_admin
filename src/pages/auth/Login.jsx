import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, message, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { authStore, loginSuccess } from "@store/slices/authSlice";
import PATH_URL from "@common/config/pathURL";
import { validate } from "@validate/index";
import { authApi } from "@services/apis/auth";
import { MyComponents } from "@components/form";
import logoCC from "@assets/imgs/CCLogo.png";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function Login() {
  const { t } = useTranslation();
  const { token } = useSelector(authStore);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFinish = (value) => {
    authApi
      .login(value)
      .then((res) => {
        dispatch(loginSuccess(res));
        message.success(t("auth.message.loginSuccess"));
      })
      .catch((err) => {
        if (err.response.data.error === "you_are_logged")
          message.error(t("auth.message.logined"));
        message.error(t("auth.message.loginFailure"));
      });
  };

  const handleRedirectToForgotPassword = () => {
    navigate(PATH_URL.FORGOT_PASSWORD);
  };

  useEffect(() => {
    if (token) {
      navigate(PATH_URL.DASHBOARD);
    }
  }, [token]);

  return (
    <div className="login">
      <div className="logo">
        <img src={logoCC} alt="logo" />
      </div>
      <div className="flex-center px-30 mt-10">
        <Form
          name="normal_login"
          className="login-form"
          layout="vertical"
          onFinish={handleFinish}
        >
          <h1 className="fz-23 mb-30 fw-400 color-black-light">
            {t("auth.title")}
          </h1>

          <MyComponents.TextField
            name="email"
            clsInput="input-email"
            className="full-width"
            label={t("auth.email")}
            placeholder={t("auth.email")}
            rules={[validate.email(t)]}
          />

          <MyComponents.TextField
            type={visible ? "text" : "password"}
            name="password"
            clsInput="input-email"
            className="full-width"
            label={t("auth.password")}
            placeholder={t("auth.password")}
            // right now not use because password invalid
            rules={[validate.validatePassword(t)]}
            suffix={
              visible ? (
                <EyeTwoTone onClick={() => setVisible(false)} />
              ) : (
                <EyeInvisibleOutlined onClick={() => setVisible(true)} />
              )
            }
          />

          <Row align="middle" justify="center">
            <span>{t("auth.forgotPassword")}:</span>
            <Button type="link" onClick={handleRedirectToForgotPassword}>
              {t("auth.btnForgetPassword")}
            </Button>
          </Row>

          <Button type="primary" htmlType="submit" className="button-submit">
            {t("auth.btnLogin")}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
