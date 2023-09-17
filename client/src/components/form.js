import React from "react";
import { Link } from "react-router-dom";

const Form = ({ isFromRegister = false }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData));
  };

  return (
    <>
      <div className="login-root">
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: "100vh", flexGrow: 1 }}
        >
          <div className="loginbackground box-background--white padding-top--64">
            <div className="loginbackground-gridContainer">
              <div
                className="box-root flex-flex "
                style={{ gridArea: "top / start / 8 / end" }}
              ></div>
              <div
                className="box-root flex-flex "
                style={{ gridArea: "4 / 2 / auto / 5" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "6 / start / auto / 2" }}
              >
                <div
                  className="box-root box-background--blue800"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "7 / start / auto / 4" }}
              >
                <div
                  className="box-root box-background--blue animationLeftRight"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "8 / 4 / auto / 6" }}
              >
                <div
                  className="box-root box-background--gray100 animationLeftRight tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "2 / 15 / auto / end" }}
              >
                <div
                  className="box-root box-background--cyan200 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "3 / 14 / auto / end" }}
              >
                <div
                  className="box-root box-background--blue animationRightLeft"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "4 / 17 / auto / 20" }}
              >
                <div
                  className="box-root box-background--gray100 animationRightLeft tans4s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
              <div
                className="box-root flex-flex"
                style={{ gridArea: "5 / 14 / auto / 17;" }}
              >
                <div
                  className="box-root box-divider--light-all-2 animationRightLeft tans3s"
                  style={{ flexGrow: 1 }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="header">{isFromRegister ? "Sign up" : "Sign in"}</h1>
        {isFromRegister && (
          <div className="form-header">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              required
            />
          </div>
        )}
        <div className="form-body">
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          {isFromRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
          )}
        </div>
        <div className="form-footer">
          <button type="submit">{isFromRegister ? "Register" : "Login"}</button>
          {isFromRegister ? (
            <span>
              Already have an account, <Link to="/login">Sign in</Link>
            </span>
          ) : (
            <span>
              Don't have an account, <Link to="/signup">Register</Link>
            </span>
          )}
        </div>
      </form>
    </>
  );
};

export default Form;
