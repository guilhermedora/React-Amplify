import {
    Button,
    IconButton,
    Link
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import anime from 'animejs';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'
import { Amplify } from 'aws-amplify'
import {
    signIn,
    signUp,
    confirmSignUp,
    // resetPassword, 
    confirmResetPassword
} from 'aws-amplify/auth'
import amplifyconfig from '../../amplifyconfiguration.json';

Amplify.configure(amplifyconfig)

const Login = () => {
    const navigate = useNavigate();
    const [toggleUserAuth, setToggleUserAuth] = useState(true);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmMail, setConfirmMail] = useState(false);
    const [forgetCode, setForgetCode] = useState(false);
    const [code, setCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const pathRef = useRef(null);
    const current = useRef(null);

    useEffect(() => {
        handleArtSignin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleUserAuth])

    const handleArtSignin = () => {
        function handleFocus(offset, arrayValue) {
            if (current.current) current.current.pause();
            current.current = anime({
                targets: pathRef.current,
                strokeDashoffset: {
                    value: offset,
                    duration: 700,
                    easing: 'easeOutQuart',
                },
                strokeDasharray: {
                    value: arrayValue,
                    duration: 700,
                    easing: 'easeOutQuart',
                },
            });
        };

        handleFocus(0, '240 1386');//devolve o art-lina para o input email

        document?.querySelector('#email')?.addEventListener('focus', () => {
            handleFocus(0, '240 1386');
        });

        document?.querySelector('#password')?.addEventListener('focus', () => {
            handleFocus(-336, '240 1386');
        });

        if (toggleUserAuth) return

        document?.querySelector('#confirm-password')?.addEventListener('focus', () => {
            handleFocus(-672, '240 1386');
        });
    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleCPasswordVisibility = () => {
        setShowCPassword(!showCPassword);
    };

    async function handleSubmit(e) {
        //Função de resquisição do login do usuário
        if (!login || !password) return
        try {
            await signIn({ username: login, password });
            navigate('/home')
        } catch (error) {
            console.log('error confirming sign in', error);
        }
    }

    async function handleSubmitNewUser(e) {
        //Função de resquisição do login do usuário
        if (!login || !password || !confirmPassword) return
        try {
            const { isSignUpComplete, userId, nextStep } = await signUp({
                username: login,
                password,
            });
            // console.log(isSignUpComplete, userId, nextStep);
            setConfirmMail(true)
        } catch (error) {
            console.log('error confirming sign up', error);
        }
    }

    async function handleVerifyCode(e) {
        //Função de resquisição do login do usuário
        if (!code) return
        if (confirmMail && !forgetCode) {
            try {
                const { isSignUpComplete, nextStep } = await confirmSignUp({
                    username: login,
                    confirmationCode: code
                });
                // console.log(isSignUpComplete, nextStep);
                if (isSignUpComplete) {
                    setConfirmMail(false)
                    setToggleUserAuth(true)
                } else {
                    console.log('error confirming email');
                }
            } catch (error) {
                console.log('error confirming email', error);
            }
        } else if (forgetCode && !confirmMail) {
            try {
                await confirmResetPassword({
                    username: login,
                    confirmationCode: code,
                    newPassword: password
                });
                setForgetCode(false)
                setToggleUserAuth(true)
            } catch (error) {
                console.log('Error confirming new password', error);
            }
        }
    }

    async function handleResetPassword() {
        alert("Feature não desabilitada")
        // try {
        //     const { nextStep } = await resetPassword({ username: login });
        //     if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
        //         setForgetCode(true)
        //         setToggleUserAuth(false)
        //         alert(
        //             `O código de confirmação foi enviado para ${nextStep.codeDeliveryDetails}`
        //         );
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    document.onkeydown = function (e) {
        if (e.key === 'Enter') {
            handleSubmit()
            handleSubmitNewUser()
            handleVerifyCode()
        }
    }

    return (
        <div className="page">
            <div className="container">
                <div className="left">
                    <div className="login">
                        Welcome to AWS Amplify Flow
                    </div>
                    <div className="eula">
                        studing and developed by Gui
                    </div>
                </div>
                {toggleUserAuth
                    ? <div className="right">
                        <svg
                            className='svg-signin'
                            viewBox="0 0 320 300">
                            <defs>
                                <linearGradient
                                    id="linearGradient"
                                    x1="13"
                                    y1="193.49992"
                                    x2="307"
                                    y2="193.49992"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop style={{ stopColor: '#474A59' }} offset="0" id="stop876" />
                                    <stop style={{ stopColor: '#ee422bd9' }} offset="1" id="stop878" />
                                </linearGradient>
                            </defs>
                            <path
                                className='path-signin'
                                ref={pathRef}
                                d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,20 h 168.57143"
                            />
                        </svg>
                        <div className="form">
                            <label className='label-signin' htmlFor="email">
                                Email
                            </label>
                            <input
                                className='input-signin'
                                type="email"
                                id="email"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                            <label className='label-signin' htmlFor="password">
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    className='input-signin'
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <IconButton
                                    className='teste'
                                    style={{ position: 'absolute !important' }}
                                    onClick={handleTogglePasswordVisibility}
                                >
                                    {
                                        showPassword
                                            ? <Visibility fontSize='large' />
                                            : <VisibilityOff fontSize='large' />
                                    }
                                </IconButton>
                            </div>
                            <Button
                                className='input-signin'
                                type="submit"
                                id="submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                                <Link
                                    onClick={() => setToggleUserAuth(false)}
                                >
                                    Não possuo cadastro
                                </Link>
                                <Link
                                    onClick={
                                        // !login && !password
                                        // ? () => alert("Digite um e-mail válido para completar a ação")
                                        // : 
                                        () => handleResetPassword()
                                    }
                                >
                                    Esqueci a senha
                                </Link>
                            </div>
                        </div>
                    </div>
                    : (!forgetCode && !confirmMail)
                        ? <div className="right2">
                            <svg
                                className='svg-signin'
                                viewBox="0 0 320 300">
                                <defs>
                                    <linearGradient
                                        id="linearGradient"
                                        x1="13"
                                        y1="193.49992"
                                        x2="307"
                                        y2="193.49992"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop style={{ stopColor: '#474A59' }} offset="0" id="stop876" />
                                        <stop style={{ stopColor: '#ee422bd9' }} offset="1" id="stop878" />
                                    </linearGradient>
                                </defs>
                                <path
                                    className='path-signin'
                                    ref={pathRef}
                                    d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,20 h 168.57143"
                                />
                            </svg>
                            <div className="form">
                                <label className='label-signin' htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className='input-signin'
                                    type="email"
                                    id="email"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                                <label className='label-signin' htmlFor="password">
                                    Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className='input-signin'
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <IconButton
                                        className='teste'
                                        style={{ position: 'absolute !important' }}
                                        onClick={handleTogglePasswordVisibility}
                                    >
                                        {
                                            showPassword
                                                ? <Visibility fontSize='large' />
                                                : <VisibilityOff fontSize='large' />
                                        }
                                    </IconButton>
                                </div>
                                <label className='label-signin' htmlFor="password">
                                    Confirm Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className='input-signin'
                                        type={showCPassword ? 'text' : 'password'}
                                        id="confirm-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <IconButton
                                        className='teste'
                                        style={{ position: 'absolute !important' }}
                                        onClick={handleToggleCPasswordVisibility}
                                    >
                                        {
                                            showCPassword
                                                ? <Visibility fontSize='large' />
                                                : <VisibilityOff fontSize='large' />
                                        }
                                    </IconButton>
                                </div>
                                <Button
                                    className='input-signin'
                                    type="submit"
                                    id="submit"
                                    onClick={handleSubmitNewUser}
                                >
                                    Save
                                </Button>
                                <Link
                                    onClick={() => setToggleUserAuth(true)}
                                >
                                    Já possuo uma conta
                                </Link>
                            </div>
                        </div>
                        : <div className="right">
                            <div className="form-code">
                                <label className='label-code'>
                                    {`Digite o código enviado para o email "${login}"${forgetCode ? " e a nova senha" : ""}`}
                                </label>
                                <input
                                    className='input-code'
                                    type="number"
                                    placeholder='Código'
                                    id="code"
                                    value={code}
                                    style={{
                                        marginBottom: '10px'
                                    }}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className='input-code'
                                        placeholder='Nova Senha'
                                        type={!showPassword ? 'text' : 'password'}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <IconButton
                                        className='teste'
                                        style={{ position: 'absolute !important' }}
                                        onClick={handleTogglePasswordVisibility}
                                    >
                                        {
                                            !showPassword
                                                ? <Visibility fontSize='large' />
                                                : <VisibilityOff fontSize='large' />
                                        }
                                    </IconButton>
                                </div>
                                <Button
                                    className='input-signin'
                                    type="submit"
                                    id="submit"
                                    onClick={handleVerifyCode}
                                >
                                    Verify
                                </Button>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default Login;