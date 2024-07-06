"use client";

import "@styles/Register.scss";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "", 
  });
  const [resetToken, setResetToken] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerForm = new FormData();

      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }

      const response = await fetch("/api/forget_password/", {
        method: "POST",
        body: registerForm,
      });
      const data = await response.json();
      // console.log(response);
      if (response.ok) {
        setResetToken(data.resetToken);
        console.log("yes");
        console.log(resetToken)
        router.push(`/login`);
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };
  return (
    <div className="register">
      <img
        src="/assets/register.jpg"
        alt="register"
        className="register_decor"
      />
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
         
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        
          <button type="submit" >
            Send Reset Password Link
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default Register;
