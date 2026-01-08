import { Navigate } from "react-router-dom";
import { useGetAuthUserQuery } from "..";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { data, isLoading } = useGetAuthUserQuery();

  // ⏳ Wait until auth check completes
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  // ✅ Already logged in → redirect to dashboard
  if (data?.success) {
    return <Navigate to="/" replace />;
  }

  // ❌ Not logged in → allow page
  return children;
};

export default PublicRoute;
