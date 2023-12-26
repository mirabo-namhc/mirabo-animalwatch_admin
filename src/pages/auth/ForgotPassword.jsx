import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "antd";
import { t } from "i18next";
import { Link } from "react-router-dom";

import { validate } from "@validate/index";
import logoCC from "@assets/imgs/CCLogo.png";
import ComTextField from "@components/form/MyInputField";
import PATH_URL from "@common/config/pathURL";
import { authApi } from "@services/apis/auth";

function SendMailSuccess({ email }) {
  return (
    <Form className="login-form flex-center flex-column">
      <div className="mb-10 fz-20">{t("auth.message.sendSuccessCode")}</div>
      <Link to={PATH_URL.RESET_PASSWORD} state={{ email }}>
        {t("auth.btnRedirectToReset")}
      </Link>
    </Form>
  );
}

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [emailSended, setEmailSended] = useState("");

  const handleSendMail = async ({ email }) => {
    try {
      setLoading(true);
      const res = await authApi.forgotPassword({ email });

      if (!res.success) return;
      setEmailSended(email);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  return (
    <div className="login">
      <div className="logo">
        <img src={logoCC} alt="logo" />
      </div>
      <div className="full-height flex-center px-30 mt-10">
        {emailSended ? (
          <SendMailSuccess email={emailSended} />
        ) : (
          <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            onFinish={handleSendMail}
          >
            <h1 className="fz-23 mb-30 fw-400 color-black-light">
              {t("auth.forgetPassword")}
            </h1>

            <ComTextField
              name="email"
              clsInput="input-email"
              className="full-width"
              label={t("auth.emailAlready")}
              placeholder={t("auth.email")}
              rules={[validate.email(t)]}
            />

            <Button
              type="primary"
              htmlType="submit"
              className="button-submit"
              loading={loading}
            >
              {t("auth.btnSend")}
            </Button>
            <Link to={PATH_URL.LOGIN}>{t("auth.btnBackToLogin")}</Link>
          </Form>
        )}
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {};
SendMailSuccess.propTypes = {
  email: PropTypes.string,
};

export default ForgotPassword;
