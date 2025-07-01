import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import * as ROUTES from "../constants/routes";
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Registration successful");
        navigate(ROUTES.LOGIN);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <div className="h-[calc(100dvh-54px)] lg:h-[calc(100dvh-70px)] grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 shadow-2xl max-w-sm w-[90%]"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Name"
          className="bg-white"
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          label="Email"
          className="bg-white"
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          label="Password"
          className="bg-white"
        />
        <Button type="submit" className="bg-blue-500 text-white">
          Register
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <Link to={ROUTES.LOGIN} className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
