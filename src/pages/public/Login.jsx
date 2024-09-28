import React, { useEffect, useRef, useState } from "react";
import PublicLayout from "../../Layouts/PublicLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the validation schema
const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Required" })
    .refine((name) => name.toLowerCase() !== "justin", {
      message: "Name cannot be 'Justin'",
    }),
  password: z.string().min(1, { message: "Required" }),
  captcha: z.string().min(1, { message: "Required" }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [captcha, setCaptcha] = useState(generateCaptcha());
  const canvasRef = useRef(null);

  function generateCaptcha() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "30px Arial";
    context.fillText(captcha, 90, 35);
  };

  useEffect(() => {
    drawCaptcha();
  }, [captcha]);

  const handleReloadCaptcha = () => {
    setCaptcha(generateCaptcha());
  };

  const onSubmit = (data) => {
    if (data.captcha === captcha) {
      console.log("Login successful", data);
    } else {
      console.log("Incorrect CAPTCHA");
    }
  };
  // Custom asynchronous validation function for name
  const checkUserExists = async (name) => {
    const response = await fetch(`https://your-api-url.com/users/${name}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    return true; // User exists
  };
  return (
    <PublicLayout>
      <div
        className="mb-5"
        style={{
          maxWidth: "400px",
          margin: "auto",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          marginTop: "15px",
        }}
      >
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="username"
              {...register("name", { validate: checkUserExists })}
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-3">
            <canvas
              ref={canvasRef}
              height={50}
              className="w-100"
              style={{
                border: "1px solid #ccc",
                backgroundColor: "darkgray",
                borderRadius: 5,
              }}
            />
            <div className="d-flex align-items-center mt-3">
              <input
                type="text"
                className={`form-control ${errors.captcha ? "is-invalid" : ""}`}
                id="captcha"
                {...register("captcha")}
              />
              <button
                type="button"
                className="p-1 px-2 ms-2"
                style={{ backgroundColor: "transparent" }}
                onClick={handleReloadCaptcha}
              >
                <i className="fas fa-sync text-dark fa-xl"></i>
              </button>
            </div>
            {errors.captcha && (
              <p className="text-danger">{errors.captcha.message}</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="#">Forgot your password?</a>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Login;
