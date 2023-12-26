import React, { useEffect, useState } from "react";
import { Button, Form } from "antd";
import logoCC from "@assets/imgs/CCLogo.png";
import ComTextField from "@components/form/MyInputField";
import { validate } from "@validate/index";
import { t } from "i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authApi } from "@services/apis/auth";
import PATH_URL from "@common/config/pathURL";

function SendMailToReset() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState({});

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        email: location.state.email,
        otpCode: parseInt(values.otpCode, 10),
      };
      const res = await authApi.resetPassword(payload);

      if (!res.success) return;
      setLoading(false);
      navigate(PATH_URL.LOGIN);
    } catch (error) {
      setLoading(false);
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (!location.state?.email) {
      navigate(PATH_URL.LOGIN);
    }
    forceUpdate({});
  }, []);

  return (
    <div className="login">
      <div className="logo">
        <img src={logoCC} alt="logo" />
      </div>
      <div className="full-height flex-center px-30 mt-10">
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          layout="vertical"
          onFinish={handleResetPassword}
        >
          <h1 className="fz-23 mb-30 fw-400 color-black-light">
            {t("auth.resetPassword")}
          </h1>

          <ComTextField
            type="text"
            name="otpCode"
            clsInput="input-email"
            className="full-width"
            label={t("auth.codeOtp")}
            placeholder={t("auth.codeOtp")}
            rules={[validate.number(t)]}
          />

          <ComTextField
            type="password"
            name="password"
            clsInput="input-email"
            className="full-width"
            label={t("auth.newPassword")}
            placeholder={t("auth.newPassword")}
            rules={[validate.validatePassword(t)]}
          />

          <ComTextField
            type="password"
            name="confirmPassword"
            clsInput="input-email"
            className="full-width"
            label={t("auth.confirmNewPassword")}
            placeholder={t("auth.confirmNewPassword")}
            dependencies={["password"]}
            rules={[validate.validateCompareValue(t, "password")]}
          />
          <Link to={PATH_URL.FORGOT_PASSWORD}>Gửi lại mã Otp</Link>

          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                className="button-submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
                loading={loading}
              >
                {t("auth.btnLogin")}
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

SendMailToReset.propTypes = {};

export default SendMailToReset;
