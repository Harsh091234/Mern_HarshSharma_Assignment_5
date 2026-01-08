import { useForm } from "react-hook-form";
import { useRegisterUserMutation } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupSchema, type SignupInput } from "../utils/validator.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useRegisterUserMutation();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      deviceId: undefined,
    },
  });
  const onSubmit = async (data: SignupInput) => {
    try {
      const res = await signup(data).unwrap();
      console.log("User registered:", res.user);
      navigate("/");
    } catch (err: any) {
      setServerError(err?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              {...register("username")}
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm focus:border-blue-500 transition"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              {...register("phone")}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {isLoading ? "Registering..." : "Create Account"}
          </button>

          {serverError && (
            <p className="text-red-500 text-center mt-2">{serverError}</p>
          )}

          <p className="text-sm text-gray-600 text-center ">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
