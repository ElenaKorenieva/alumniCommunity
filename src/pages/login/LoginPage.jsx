import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { login } from "../../redux/auth/authOperations";
import validation from "./Validation";
import sprite from "../..//shared/images/sprite.svg";
import eyeHide from "../../shared/images/eye-hide.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorAPI, setErrorAPI] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onPasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  const handleOnEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorAPI("");
  };

  const handleOnPasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorAPI("");
  };

  const resetform = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const currentUser = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };

    if (Object.values(validation(currentUser)).length !== 0) {
      setErrorAPI("");
      setErrors(validation(currentUser));
    } else {
      const response = await dispatch(login(currentUser));
      if (response.error) {
        setErrors({});
        setErrorAPI(response.payload);
      } else {
        navigate("/home");
      }
      resetform("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>ALUMNI COMMUNITY</h1>
        <h2>The journey continues!</h2>
        <h2>Be part of the alumni community and stay connected.</h2>
        <div className="container mb-2">
          <div className="row align-items-center">
            <div className="col">
              <div className="row">
                <img
                  src="/images/logo-b.png"
                  alt="Matrix Master logo"
                  className="image-logo"
                />
              </div>
            </div>
            <div className="col mt-3">
              <div className="row">
                <div className="col">
                  <form onSubmit={(e) => handleLogin(e)}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        <span className="asterisk">*</span>Email Address:
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Type email address"
                        value={email}
                        onChange={handleOnEmailChange}
                      />
                      {errors.email && email === "" && (
                        <p className="error">{errors.email}</p>
                      )}
                    </div>
                    <div className="mb-3 password-login-wrapper">
                      <label htmlFor="password" className="form-label">
                        <span className="asterisk">*</span>Password:
                      </label>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Type password"
                        value={password}
                        onChange={handleOnPasswordChange}
                      />
                      <span
                        className="password-login-view"
                        onClick={onPasswordVisible}
                      >
                        {showPassword ? (
                          <img
                            className="password-login-icon"
                            src={eyeHide}
                            alt="eye-icon"
                          />
                        ) : (
                          <svg className="svg-login-icon">
                            <use stroke="white" href={`${sprite}#icon-eye`} />
                          </svg>
                        )}
                      </span>
                      {errors.password && password === "" && (
                        <p className="error">{errors.password}</p>
                      )}
                    </div>
                    {errorAPI && Object.values(errors).length === 0 && (
                      <p className="error">{errorAPI}</p>
                    )}
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </form>
                  <div className="row mt-3">
                    <div className="col">
                      Don't have an account? <a href="/signup">Sign Up</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
