import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    terms: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/success");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "50px auto" }}
    >
      <h2>Giriş Yap</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          data-cy="email-input"
        />
      </div>

      <div>
        <label htmlFor="password">Şifre:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          data-cy="password-input"
        />
      </div>

      <div>
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

      <button type="submit" data-cy="submit-button">
        Giriş Yap
      </button>
    </form>
  );
}
