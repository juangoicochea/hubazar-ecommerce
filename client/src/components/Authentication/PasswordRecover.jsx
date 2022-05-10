import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function checkErrors(post){
    let errors = {};
   
    if(!post.email){
        errors.email = 'Please provide an email'
    }
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (!emailRegex.test(post.email)) {
        errors.email = 'Please provide an email'
    }
    return errors;
}

export default function PasswordRecover() {
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [post, setPost] = useState({
        email:'',
    })

    function handleSubmit(e){
        e.preventDefault();
        if(Object.values(errors).length>0) return alert('Please check your email, or provide one');
        else if(!post.email) return alert('Please provide an email');
          // else{
        //     dispatch(postRecipe(post))
        //     alert('Please check your email to validate your account')
        //     navigate('/')
        // }
    }

    function handleInputChange(e){
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
        setErrors(checkErrors({
            ...post,
            [e.target.name]: e.target.value
        }))
    }

    return (
        
        <div>
                <h2>Password Assistance</h2>
                <p>Enter the email address associated with your Hubazar account.</p>
                    <form onSubmit = {(e) => handleSubmit(e)}>
                        <div>
                            <label >Email</label>
                            <input  onChange={(e) => handleInputChange(e)} value= {post.email} name = 'email'/>
                            {
                                errors.email && (<p>{errors.email}</p>)
                            }
                        </div>
                        <button type ='submit'>Continue</button>
                    </form>     
        </div>
    )
}



