"use client"
import "@styles/Register.scss";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useRouter , useParams } from "next/navigation";
import { signIn } from "next-auth/react";
// import { useRouter } from 'next/router';

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigationRouter = useRouter();
  const router = useRouter();
  const params = useParams();

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword);
  }, [formData.password, formData.confirmPassword]);
//   useEffect(() => {
//     if (router.isReady) {
//       const token= router.query.token;
//       setToken(token);
//     }
//   }, [router.isReady, router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       
        const { token } = params;
        // const token = params;
        console.log(token);
      const registerForm = new FormData();

      for (const key in formData) {
        registerForm.append(key, formData[key]);
      }
      registerForm.append("slug", token);

      const response = await fetch("/api/reset_password/", {
        method: "POST",
        body: registerForm,
      });

      if (response.ok) {
        navigationRouter.push("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (err) {
      console.error("Registration failed", err.message);
    }
  };
  return (
    <div className="register">
      {/* <img
        src="/assets/register.jpg"
        alt="register"
        className="register_decor"
      /> */}
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          {/* <input
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          /> */}
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}
          {/* <input
            id="image"
            type="file"
            name="profileImage"
            onChange={handleChange}
            accept="image/*"
            style={{ display: "none" }}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile" />
            <p>Upload Profile Photo</p>
          </label>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="Profile"
              style={{ maxWidth: "80px", maxHeight: "100px" }}
            />
          )} */}
          <button type="submit" disabled={!passwordMatch}>
            Update
          </button>
        </form>
        {/* <button
          type="button"
          onClick={loginWithGoogle}
          className="google"
        >
          <p>Log In with Google</p>
          <FcGoogle />
        </button> */}
        {/* <a href="/login">Already have an account? Log In Here</a> */}
      </div>
    </div>
  );
};

export default Register;
