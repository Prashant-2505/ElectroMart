'use client'
import React, { useState } from 'react';
import { Tabs, Tab, Card, CardBody, Input, Button, Spinner } from '@nextui-org/react';
import { signin } from '@/services/auth/signIn';
import { login } from '@/services/auth/logIn';
import { useAuth } from '@/context/authContext';
import { useCart } from '@/context/cartContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const Page = () => {



    const initialSignInFormData = {
        email: '',
        password: '',
        name: '',
    };

    const initialLogInFormData = {
        email: '',
        password: '',
    };

    const [auth, setAuth] = useAuth()
    const [loading, setLoading] = useState(false)

    const route = useRouter()

    const [loginFormData, setLoginFormData] = useState(initialLogInFormData);
    const [signinFormData, setSigninFormData] = useState(initialSignInFormData);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const { data } = await login(loginFormData);
            if (data.success) {
                setLoading(false);
                alert(data.message);
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token,
                });
                localStorage.setItem('auth', JSON.stringify({ user: data.user, token: data.token }));
                route.push('/');
            } else {
                alert(data.message);
                setLoading(false)
            }
        } catch (error) {
            console.error(error);

        }
    };

    const handleSignIn = async () => {
        try {
            setLoading(true)
            const res = await signin(signinFormData)
            if (res.success) {
                alert(res.data.message)
                setLoading(false)
            }
            else {
                alert(res.data.message)
                setLoading(false)
            }
        } catch (error) {
            console.error(error);

        }
    };

    const handleForgetPassword = async (e) => {
        e.preventDefault()
        try {
            if(!loginFormData.email) 
            {
                alert("please enter you email address")
                return
            }
            const {data} = await axios.post('/api/auth/forgotPassword', {email:loginFormData.email}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(data.success)
            {
                alert(data.message)
            }
            else
            {
                alert(data.message)

            }
    
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }


    return (
        <div className="flex w-full flex-col justify-center items-center mt-[7rem] ">
            <Tabs aria-label="Options" className="">


               // log in
                <Tab key="Log in" title="Log in">
                    <Card className="md:w-[40vw] w-[50vw] sm:w-[80vw] sm:flex sm:justify-center sm:items-center sm:h-full">
                        <CardBody>
                            <form action="" className="flex flex-col justify-between items-center">
                                <Input
                                    value={loginFormData.email}
                                    onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
                                    className="mb-[2rem]"
                                    type="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                />

                                <Input
                                    value={loginFormData.password}
                                    onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                                    className="mb-[2rem]"
                                    type="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                />
                                <Button onClick={handleLogin}>

                                    {loading ? <Spinner color='warning' /> : 'Login'}
                                </Button>
                                {/* <button onClick={handleForgetPassword} className=' text-red-400 hover:text-red-500 duration-200 ease-out mt-4 cursor-pointer border-b-2 border-transparent hover:border-b-2 hover:border-red-400'>
                Forget password ?
            </button> */}

                            </form>
                        </CardBody>
                    </Card>
                </Tab>

        // sign in
                <Tab key="Sign in" title="Sign in">
                    <Card className="md:w-[40vw] w-[50vw] sm:w-[80vw] sm:h-full sm:flex sm:justify-center sm:items-center">
                        <CardBody>
                            <form action="" className="flex flex-col justify-between items-center">
                                <Input
                                    value={signinFormData.name}
                                    onChange={(e) => setSigninFormData({ ...signinFormData, name: e.target.value })}
                                    className="mb-[2rem]"
                                    type="text"
                                    label="Name"
                                    placeholder="Enter your name"
                                />
                                <Input
                                    value={signinFormData.email}
                                    onChange={(e) => setSigninFormData({ ...signinFormData, email: e.target.value })}
                                    className="mb-[2rem]"
                                    type="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                />
                                <Input
                                    value={signinFormData.password}
                                    onChange={(e) => setSigninFormData({ ...signinFormData, password: e.target.value })}
                                    className="mb-[2rem]"
                                    type="password"
                                    label="Password"
                                    placeholder="Enter your password"
                                />
                                <Button onClick={handleSignIn}>
                                    {loading ? <Spinner color='warning' /> : 'Sign in'}

                                </Button>
                            </form>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
           
        </div>
    );
};

export default Page;
