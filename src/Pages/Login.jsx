import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // eye icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });

      if (res.data.role) {
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", email);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("subscription", JSON.stringify(res.data.subscription));
        if (res.data.role === "admin" || res.data.role === "superadmin") {
          navigate("/admin");
        } else {
          navigate("/user-dashboard");
        }

        window.location.reload();
      } else {
        alert("Invalid login response");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="py-20 pt-36 bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="relative py-3 sm:max-w-xl w-full mx-4">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-8 py-6 bg-white shadow-lg sm:rounded-3xl sm:p-16">
          <div className="max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 text-center">Login</h1>

            <form onSubmit={handleLogin} className="divide-y divide-gray-200">
              <div className="py-6 text-base leading-6 space-y-6 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-500"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-500 pr-10"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-2.5 cursor-pointer text-yellow-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </div>

                <div className="text-right">
                  <Link to="/forgot-password" className="text-yellow-600 hover:underline text-sm">
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md px-4 py-3 w-full transition"
                  >
                    LOGIN
                  </button>
                </div>

                <p className="text-center text-gray-600 text-sm mt-4">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="text-yellow-600 font-medium hover:underline">
                    Create New
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
