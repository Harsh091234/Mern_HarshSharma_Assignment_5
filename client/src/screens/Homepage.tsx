
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetAuthUserQuery } from "../services/api";


export const Homepage = () => {
   const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
  
  } = useGetAuthUserQuery();
  const user = data?.user;
  
  console.log("user", user)
  // 🔐 Redirect if not authenticated


  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if(isError) return navigate("/login");

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Dashboard
        </h1>

        {/* User Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <p  >{user.username}</p>
          <p  >{user.email}</p>
          <p  >{user.phone || "—"}</p>
          <p  >{user._id}</p>
        </div>

        {/* Actions */}
       
      </div>
    </div>
  );
}


