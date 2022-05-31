import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./main.css";
import logo from "../assets/logo.svg";
import like from "../assets/like.svg";
import deslike from "../assets/deslike.svg";
import { api } from "../services/api";
import { Link } from "react-router-dom";
import socketio from "socket.io-client";
import itsamatch from "../assets/itsamatch.png";


function Main() {
    const params = useParams();
    const [users, setUsers] = useState([{}]);
    const [matchDev, setMacthDev] = useState(null);

    useEffect(() => {
        const io = socketio(`http://localhost:3333/api`, {
            transports: ['websocket'],
            rejectUnauthorized: false,

        });

        io.on("match", dev => {
            setMacthDev(dev)
        })
    }, [params.id])

    useEffect(() => {
        (async function loadUsers() {
            const response = await api.get("/devs", {
                headers: {
                    user: params.id,
                }
            })
            setUsers(response.data);
        })();
    }, [params.id]);

    async function handleLike(id) {
        try {
            const response = await api.post(`/devs/${id}/likes`, null, {
                headers: {
                    user: params.id,
                }
            })
            console.log(response.data)
            setUsers(users.filter(user => user._id != id))
        } catch (error) {
            console.log(error.message)
        }

    }



    async function handleDeslike(id) {
        try {
            const response = await api.post(`/devs/${id}/deslikes`, null, {
                headers: {
                    user: params.id,
                }
            });
            console.log(response.data)
            setUsers(users.filter(user => user._id != id))

        } catch (error) {

            console.log(error)
        }

    }

    return (
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="Logo Tindev" />

            </Link>

            {users.length > 0 ? (
                <ul>
                    {users.map(user => (


                        <li key={user._id}>
                            <img src={user.avatar} alt="avatar url" />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={like} alt="Like Button" />
                                </button>
                                <button type="button" onClick={() => handleDeslike(user._id)}>
                                    <img src={deslike} alt="DeslLike Button" />
                                </button>
                            </div>
                        </li>

                    ))}

                </ul>


            ) : (
                <div className="empty"> Acabou :(</div>
            )}
            {matchDev && (
                <div className="match-container">
                    <img src={itsamatch} alt="It''s a match" />
                    <img className="avatar" src={matchDev.avatar} alt="" />
                    <strong>{matchDev.name}</strong>
                    <p>{matchDev.bio}</p>
                    <button type="button" onClick={() => setMatchDev(null)}>FECHAR</button>
                </div>
            )}

        </div>
    )
}

export { Main };