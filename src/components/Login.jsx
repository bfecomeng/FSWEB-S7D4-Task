import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// En az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam, 1 özel karakter
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const errorMessages = {
  email: "Lütfen geçerli bir email adresi giriniz.",
  password:
    "Şifre en az 8 karakter olmalı; büyük harf, küçük harf, rakam ve özel karakter içermelidir.",
};

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = passwordRegex.test(formData.password);
    const isTermsAccepted = formData.terms;

    setErrors({
      email: formData.email.length > 0 && !isEmailValid,
      password: formData.password.length > 0 && !isPasswordValid,
    });

    setIsValid(isEmailValid && isPasswordValid && isTermsAccepted);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    navigate("/success");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "50px auto" }}
    >
      <h2>Giriş Yap</h2>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          data-cy="email-input"
        />
        {errors.email && (
          <p style={{ color: "red" }} data-cy="error-message">
            {errorMessages.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="password">Şifre:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          data-cy="password-input"
        />
        {errors.password && (
          <p style={{ color: "red" }} data-cy="error-message">
            {errorMessages.password}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={formData.terms}
          onChange={handleChange}
          data-cy="terms-checkbox"
        />
        <label htmlFor="terms">Şartları kabul ediyorum</label>
      </div>

      <button type="submit" disabled={!isValid} data-cy="submit-button">
        Giriş Yap
      </button>
    </form>
  );
}
