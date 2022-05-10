import { React } from 'react';
import { useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import { fetchToken } from '../../../redux/';

export default function Verify() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();
    function handleOnClick(e) {
        e.preventDefault();
        dispatch(fetchToken(id));
        navigate('/login');
    }
    return (
        <div>
            <div>
                <h1>Verify your account</h1>
                <h4>Thank you for join us</h4>
                <p>Do not forget to Log in once you get redirected</p>
                <button type="submit" onClick={handleOnClick}>Continue</button>
            </div>
        </div>

    )
}

