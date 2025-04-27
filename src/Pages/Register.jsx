import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

axios.defaults.withCredentials = true;

const Register = ({ isAdminCreatingUser = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const role = isAdminCreatingUser ? "admin" : "user";

  useEffect(() => {
    setTimeout(() => setShowForm(true), 100);
  }, []);

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return alert(
        "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character (@$!%*?&)."
      );
    }

    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
        role,
      });

      alert("User registered successfully");

      setName("");
      setEmail("");
      setPassword("");

      if (!isAdminCreatingUser) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen pt-10 bg-gray-100 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-4">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>

        <div
          className={`relative bg-white shadow-lg sm:rounded-3xl p-8 sm:p-10 transition-opacity duration-700 ease-out ${
            showForm ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >


          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            {isAdminCreatingUser ? "Add Admin" : "Registration"}
          </h1>

          <form onSubmit={handleRegister} className="space-y-5 mt-3">
            <div className="relative">
              <input
                type="text"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-500"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Full Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-500"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-500 pr-10"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                Password
              </label>
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2.5 cursor-pointer text-yellow-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>


            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md px-4 py-2 w-full transition duration-300 transform hover:-translate-y-0.5 hover:shadow-md"
            >
              {isAdminCreatingUser ? "Create Admin" : "Register"}
            </button>

            {!isAdminCreatingUser && (
              <p className="text-center text-gray-600 text-sm mt-3">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-yellow-600 font-medium hover:underline"
                >
                  Login Here
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
