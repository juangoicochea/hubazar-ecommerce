import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { signIn, loginGoogle } from '../../../redux/';
import GoogleLogin from 'react-google-login';
import { CLIENT_ID_GOOGLE } from '../../../env';
import { mainPage } from '../../../env'
import styles from './Login.module.css'
import ModalLoginFailure from '../../Modal/ModalLoginFailure'
import { ValidateEmail } from '../../../utils'


function checkErrors(post) {
    let errors = {};
    if (!ValidateEmail(post.email)) {
        errors.email = 'Please provide an email'
    }

    if (!post.password) {
        errors.password = 'Please provide a password !!'
    }

    return errors;
}

export default function Login() {

    
    const dependencyRedirect = useSelector(state => state.login.login.token)
    const msjError = useSelector(state => state.login.login.error)
    const [error, setError] = useState('')

    useEffect(() => {
        if (msjError !== '') {
            setError(msjError.split(' ').pop())
        }
    }, [msjError])

    useEffect(() => {
        if (dependencyRedirect !== '')
            window.location.href = mainPage
    }, [dependencyRedirect])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const [post, setPost] = useState({
        email: '',
        password: '',
    })

    //--------------msj alert to modal
    const [alert, setAlert] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target, 'event login')
        if ((!post.email || !post.password) || (Object.values(errors).length > 0)) return setAlert('Please fill in the entire form :/');
        else {
            dispatch(signIn(post))
        }
    }
    function handleInputChange(e) {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
        setErrors(checkErrors({
            ...post,
            [e.target.name]: e.target.value
        }))
    }

    
    const respuestaGoogle = (respuesta) => {
        console.log(respuesta, 'soy respuesta de google');
        let userData = {
            name: respuesta.profileObj.name,
            email: respuesta.profileObj.email,
            tokenId: respuesta.tokenId,
            googleId: respuesta.googleId,
        };
        console.log(userData, 'soy user data de google');
        localStorage.setItem("user", JSON.stringify(userData));
        return dispatch(loginGoogle(userData));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.loginTitle}>Sign in here</h2>
            <div className={styles.login}>
                <Link to='/register'><span className={styles.noAccount}>No account? Sign up!</span></Link>
                <br /><br />
                <div className={styles.left}>
                    <GoogleLogin
                        clientId={CLIENT_ID_GOOGLE}
                        buttonText="Sign in with Google"
                        onSuccess={respuestaGoogle}
                        onFailure={respuestaGoogle}
                        cookiePolicy="single_host_origin"
                />
                </div>
                <div className={styles.center}>
                    <div className={styles.or}>Or</div>
                </div>
                <div className={styles.right}>
                    <form className={styles.formm} onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label >Email</label>
                            <input onChange={(e) => handleInputChange(e)} value={post.email} name='email' />
                            {
                                errors.email && (<p>{errors.email}</p>)
                            }
                        </div>
                        <div>
                            <label>Password</label>
                            <input type='password' onChange={(e) => handleInputChange(e)} value={post.password} name='password' />
                            {
                                errors.password && (<p>{errors.password}</p>)
                            }
                        </div>
                        <Link to='/PasswordRecover'className={styles.noPassword} ><span >Forgot your password?</span></Link>
                        <button className={styles.btn} type='submit'>Continue</button>
                    </form>
                </div>
            </div>
            {
                error === '401' &&
                <ModalLoginFailure msgError={'The password or email is invalid'} />
            }
            {
                error === '403' &&
                <ModalLoginFailure msgError={'You need validate your account first'} />
            }
            {
                alert !== '' &&
                <ModalLoginFailure msgError={alert} />
            }
        </div >

    )
}
