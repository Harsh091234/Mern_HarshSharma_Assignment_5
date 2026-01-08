


import { Navigate } from "react-router-dom";
import { useGetAuthUserQuery } from "../services/api";


const Homepage = () => {
  

  const {
    data,
    isLoading,
 
  
  } = useGetAuthUserQuery();
  const user = data?.user;
  
  console.log("user", user)
 


  if (isLoading ) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

    if (!user) {
      return <Navigate to={"/login"} replace />;
    }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Dashboard
        </h1>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <p  >{user.username}</p>
          <p  >{user.email}</p>
          <p  >{user.phone || "—"}</p>
          <p  >{user._id}</p>
        </div>

       
       
      </div>
    </div>
  );
}

export default Homepage;

