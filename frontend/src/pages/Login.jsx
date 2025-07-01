import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import * as ROUTES from "../constants/routes";
import { AuthContext } from "../context/authContext";
export default function Login() {
  const { refreshAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // http://localhost:3000/api/users/login
      //   https://test21.lucho.uk/api/users/login
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Login successful");
        refreshAuth();
        navigate(ROUTES.PRODUCTS);
      } else {
        toast.error(data.message || "Username or password are incorrect");
      }
    } catch (error) {
      toast.error("Something went wrong");
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
        <h1 className="text-2xl font-bold text-center">Login</h1>
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
          Login
        </Button>
        <p className="text-center">
          Don't have an account?{" "}
          <Link to={ROUTES.REGISTER} className="text-blue-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
