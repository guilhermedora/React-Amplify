import {
    Button,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import anime from 'animejs';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'
import { Amplify } from 'aws-amplify'
import { signIn } from 'aws-amplify/auth'
import amplifyconfig from '../../amplifyconfiguration.json';

Amplify.configure(amplifyconfig)

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const pathRef = useRef(null);
    const current = useRef(null);

    useEffect(() => {
        handleArtSignin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

        document.querySelector('#email').addEventListener('focus', () => {
            handleFocus(0, '240 1386');
        });

        document.querySelector('#password').addEventListener('focus', () => {
            handleFocus(-336, '240 1386');
        });

    }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function handleSubmit(e) {
        //Função de resquisição do login do usuário
        if (!login || !password) return
        try {
            await signIn({ username: login, password });
            navigate('/home')
        } catch (error) {
            console.log('error confirming sign up', error);
        }

    }

    async function handleSignUpConfirmation({ username, confirmationCode }) {

    }

    document.onkeydown = function (e) {
        if (e.key === 'Enter') {
            handleSubmit(e)
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
                <div className="right">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;