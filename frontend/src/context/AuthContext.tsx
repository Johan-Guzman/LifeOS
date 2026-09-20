
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiFetch } from "../lib/api";

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  token: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("lifeos_token");

    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);

    apiFetch<User>("/api/users/me", {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((currentUser) => {
        setUser(currentUser);
      })
      .catch(() => {
        localStorage.removeItem("lifeos_token");
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function login(email: string, password: string) {
    const data = await apiFetch<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    localStorage.setItem("lifeos_token", data.token);
    setToken(data.token);

    const currentUser = await apiFetch<User>("/api/users/me", {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    setUser(currentUser);
  }

  async function register(
    name: string,
    email: string,
    password: string
  ) {
    await apiFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    await login(email, password);
  }

  function logout() {
    localStorage.removeItem("lifeos_token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

