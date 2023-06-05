import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [correctEmail, setCorrectEmail] = useState(false);
  const rightmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const { email, password } = formData;

  useEffect(() => {
    if (rightmail.test(email)) {
      setCorrectEmail(true);
    } else if (email) {
      setCorrectEmail(false);
    }
  }, [email]);
  const userData = {
    email,
    password,
  };
  console.log(userData);
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (correctEmail) {
      dispatch(loginUser(userData))
        .then((res) => {
          // navigate("/");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          login
        </h1>
        <p>login to your account</p>
      </section>
      <section className="form">
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              required
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="enter your email"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              required
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="enter password"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
