import React, { useContext, useEffect } from 'react'
import { register, login, getMe, logout } from "../services/auth.api";
import { AuthContext } from '../auth.context';


const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    const handleRegister = async ({ username, email, password, gender }) => {
        setLoading(true);

        const response = await register({ username, email, password, gender });

        // setUser(response.user);  register page just navigate to teh login page

        setLoading(false)
    }

    const handleLogin = async ({ username, email, password }) => {
        setLoading(true);

        const response = await login({ username, email, password });

        setUser(response.user)

        setLoading(false)
    }

    const handleGetMe = async () => {
        try {

            setLoading(true);

            const response = await getMe();

            setUser(response.user); 

            setLoading(false)
        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false);   // hamesha chalega
        }
    }

    const handleLogout = async () => {
        setLoading(true);

        await logout()

        setLoading(false)
    }


    useEffect(() => {
        handleGetMe();
    }, [])

    return ({ handleRegister, handleLogin, handleGetMe, handleLogout, loading, user })
}

export default useAuth
