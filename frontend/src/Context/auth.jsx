import { createContext, useState, useContext, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect (()=> {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            try {
                const decoded = jwtDecode(storedToken);
                setUser(decoded);
                setToken(storedToken);
            } catch (error) {
                console.error("Token inválido:", error);
                localStorage.removeItem("token");
                localStorage.removeItem("rol");
            }
        }
        setLoading(false);
    }, []);

    const loginUser = (tokenData, userData) => {
        try {
            const decoded = jwtDecode(tokenData);
            setToken(tokenData);
            setUser(userData);
            localStorage.setItem("token", tokenData);
            localStorage.setItem("rol", decoded.id_rol);
        } catch (error) {
            console.error("Token inválido al hacer login:", error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("rol");
    };

    const isLoggedIn = !!user && !!token;


if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isLoggedIn,
            loginUser,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
return useContext(AuthContext);
}