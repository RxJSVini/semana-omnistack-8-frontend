import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.svg";
import { api } from "../services/api";
import "./login.css";


function Login() {



    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await api.post("/devs", { username });
            const { _id } = response.data;

            toast.success("Login efetuado com sucesso!");
            setTimeout(() => {
                return navigate(`/dev/${_id}`);
            }, 1000);

        } catch (error) {
            toast.error(error.message)
            throw new Error(error.message);

        }


    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="Logo Tindev" />
                <input placeholder="Digite aqui seu usuário do Github"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <button type="submit">Entrar</button>
            </form>

        </div>
    )
}

export { Login };