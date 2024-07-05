"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/Login");
      }
    }, [isAuthenticated, loading, router]);

    if (loading) {
      return <p>Loading...</p>;
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
