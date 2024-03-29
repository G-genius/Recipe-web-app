import "./Header.css"
import regIcon from "../../img/header/reg.svg"
import logIcon from "../../img/header/log.svg"
import "./Modal.css"
import SubHeader from "./SubHeader/SubHeader";
import React, {useContext, useEffect, useReducer, useState} from "react";
import {Context} from "../../index";
import FileBase64 from 'react-filebase64';
import {colors} from "@mui/material";
const Header = () => {

    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [photo, setPhoto] = useState('')
    const [about, setAbout] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const {store} = useContext(Context)


    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    // Когда пользователь нажимает кнопку "зарегистрироваться"
    const OpenReg = () => {
        let modelReg = document.getElementById("regModal")
        modelReg.style.display = "block";

    }

    // Когда пользователь нажимает кнопку "войти"
    const OpenLog = () => {
        let modelLog = document.getElementById("logModal")
        modelLog.style.display = "block";
    }

    // Когда пользователь нажимает кнопку "закрыть"
    const Close = () => {
        let modelReg = document.getElementById("regModal")
        let modelLog = document.getElementById("logModal")
        modelReg.style.display = "none";
        modelLog.style.display = "none";
    }

    // Когда пользователь щелкает в любом месте за пределами модального, закройте его
    window.onclick = function (event) {
        let modelReg = document.getElementById("regModal")
        let modelLog = document.getElementById("logModal")
        if (event.target === modelReg || event.target === modelLog) {
            modelReg.style.display = "none";
            modelLog.style.display = "none";
        }
    }

    const OpenNotReg = () => {
        let modelReg = document.getElementById("regModal")
        let modelLog = document.getElementById("logModal")
        if (modelReg.style.display === "block") {
            modelReg.style.display = "none"
            modelLog.style.display = "block"
        }
        else {
            modelReg.style.display = "block"
            modelLog.style.display = "none"
        }
    }

    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token) {
            store.checkAuth()
        }
    }, [token])


    setTimeout(() => {
        forceUpdate()
        let menuBtn = document.getElementById('btn-menu')
        if (store.isAuth) {
            menuBtn.style.display = "none"
        }
        try {
            if (!store.user.isActivated) {
                const isActivated = document.getElementById("isActivated")
                isActivated.style.display = "block"
            } else {
                const isActivated = document.getElementById("isActivated")
                isActivated.style.display = "none"
            }
        } catch (e) {
            return null
        }

    }, 2)

    const Registration = () => {
        let password1 = document.getElementById("password1").value
        let password2 = document.getElementById("password2").value
        let ifNotPass1 = document.getElementById("ifNotPass1")
        let ifNotPass2 = document.getElementById("ifNotPass2")
        let ifNotSame = document.getElementById("ifNotSame")
        if (password1 === '') {
            ifNotPass1.style.display = "block"
            ifNotPass2.style.display = "none"
            ifNotSame.style.display = "none"
        }
        else if (password2 === '') {
            ifNotPass2.style.display = "block"
            ifNotPass1.style.display = "none"
            ifNotSame.style.display = "none"
        }
        else if (password1 !== password2) {
            ifNotSame.style.display = "block"
            ifNotPass1.style.display = "none"
            ifNotPass2.style.display = "none"
        }
        else {
            store.registration(email, city, password, photo, about, name)
        }
    }

    const Login = () => {
        store.login(email, password)
    }

    if (store.isLoading) {
        const loading = document.getElementById("loading")
        loading.style.display = "none"
    }


    const updatePhoto = async (base64) => {
        setPhoto(base64[0].base64)

    }


    return (
        <div className="header">
            <header>
                <h5>{store.isAuth ? `Здравствуйте, ${store.user.name}` : ``}</h5>
                <span id="isActivated">Пожалуйста подтвердите ваш аккаунт, ссылка с активацией выслана на ваш Email!</span>
                <h5 id="loading"></h5>
                <div className="menu-btn" id="btn-menu">
                    <ul className="menu">
                        <li className="register" onClick={OpenReg}><img src={regIcon} alt={regIcon}/> Регистрация</li>
                        <li className="login" onClick={OpenLog}><img src={logIcon} alt={logIcon}/> Вход</li>
                    </ul>
                </div>
                <div className="modal" id="regModal">
                    <div className="modal-content">
                        <span className="close" onClick={Close}>&times;</span>
                        <div className="field-form">
                            {/*РЕГИСТРАЦИЯ*/}
                            <div>
                                <p className="RegName">Регистрация</p>
                            </div>
                            <div className="field">
                                <span id="error" className="error_text">Вы заполнили не все поля!</span>
                                <span id="error_email" className="error_text">Пользователь с данной почтой {email} уже существует!</span>
                                <span id="error_pass" className="error_text">Неверный формат почты!</span>
                                <p><span className="red">*</span>Ваш email</p>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    type="text"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="field">
                                <p><span className="red">*</span>Введите ваш никнейм</p>
                                <input
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    type="text"
                                    placeholder="Крутой повар"
                                    required
                                />
                            </div>
                            <div className="field">
                                <p><span className="red">*</span>Введите ваш город</p>
                                <input
                                    onChange={e => setCity(e.target.value)}
                                    value={city}
                                    type="text"
                                    placeholder="Город"
                                    required
                                />
                            </div>
                            <div className="field">
                                <p>Фотография</p>
                                <FileBase64
                                    multiple={ true }
                                    onDone={ updatePhoto } />
                            </div>
                            <div className="field">
                                <p>Немного информации о себе</p>
                                <textarea
                                    onChange={e => setAbout(e.target.value)}
                                    value={about}
                                    placeholder="О себе"
                                    required
                                />
                            </div>
                            <span id="ifNotPass1" className="error">Введите пароль!</span>
                            <span id="ifNotPass2" className="error">Введите повтроный пароль!</span>
                            <span id="ifNotSame" className="error">Пароли не совпадают!</span>
                            <div>
                                <span id="error_pass" className="error_text">Пароли не совпадают!</span>
                                <p><span className="red">*</span>Введите пароль</p>
                                <div className="pass-field field">
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        id="password1"
                                        value={password}
                                        type="password"
                                        placeholder="password"
                                        required
                                    />
                                    {/*<img src={showPass} className="open-pass-btn" onClick={OpenPassword}*/}
                                    {/*     alt="showPass"/>*/}
                                </div>
                            </div>
                            <div>
                                <p><span className="red">*</span>Повторите пароль</p>
                                <div className="pass-field field">
                                    <input
                                        onChange={e => setRePassword(e.target.value)}
                                        id="password2"
                                        value={rePassword}
                                        type="password"
                                        placeholder="password"
                                        required
                                    />
                                    {/*<img src={showPass} className="open-pass-btn" onClick={OpenPassword}*/}
                                    {/*     alt="showPass"/>*/}
                                </div>
                            </div>
                            <div>
                                <button className="logoutBtn" type="submit" onClick={Registration}>Регистрация</button>
                            </div>
                            <div>
                                <p className="bottom-btn" onClick={OpenNotReg}>Уже есть аккаунт? Войти</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="logModal">
                    <div className="modal-content">
                        <span className="close" onClick={Close}>&times;</span>
                        <div className="field-form">
                            <div>
                                <p className="RegName">Вход</p>
                            </div>
                            <div className="field">
                                <span id="error2" className="error_text">Пользователь с такой почтой не найден!</span>
                                <span id="error3" className="error_text">Неверный пароль!</span>
                                <p><span className="red">*</span>Ваш email</p>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    type="text"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div>
                                <p><span className="red">*</span>Введите пароль</p>
                                <div className="pass-field field">
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        type="password"
                                        placeholder="password"
                                        required
                                    />
                                </div>

                            </div>
                            <div>
                                <button className="logoutBtn" onClick={Login}>Логин</button>
                            </div>
                            <div>
                                <p className="bottom-btn" onClick={OpenNotReg}>Нет аккаунта? Зарегистрироваться</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <SubHeader/>
        </div>
    )
}
export default Header