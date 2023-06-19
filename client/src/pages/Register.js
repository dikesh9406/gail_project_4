import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  userType: "",
  secretKey: "",
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
 
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    if (values.userType === "Admin" && values.secretKey !== "gail@123") {
      alert("invalid Admin");
      e.preventDefault();
    } else {
      e.preventDefault();
      const { name, email, password, isMember, userType, secretKey } = values;
      if (!email || !password || (!isMember && !name)) {
        displayAlert();
        return;
      }
      const currentUser = { name, email, password, userType };
      if (isMember) {
        setupUser({
          currentUser,
          endPoint: "login",
          alertText: "Login Successful! Redirecting...",
        });
      } else {
        setupUser({
          currentUser,
          endPoint: "register",
          alertText: "User Created! Redirecting...",
        });
      }
     
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        {/* <Logo /> */}
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        <div>
          <input
            type="radio"
            name="userType"
            value="User"
            checked={values.userType === "User"}
            onChange={handleChange}
          />
          User
          <input
            type="radio"
            name="userType"
            value="Admin"
            checked={values.userType === "Admin"}
            onChange={handleChange}
          />
          Admin
        </div>
        {values.userType === "Admin" && (
          <FormRow
            type="password"
            name="secretKey"
            value={values.secretKey}
            handleChange={handleChange}
          />
        )}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
