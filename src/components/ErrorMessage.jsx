import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { ActionTypes } from "../redux/actionTypes";
import 'material-symbols'

const {CHANGE_STATUS} = ActionTypes;

let timerId = null;

export default function ErrorMessage({error}) {
        
    const dispatch = useDispatch();

    console.log(error);


    function cancelErrorHandler() {
        dispatch({ type: CHANGE_STATUS, payload: {status: 'init'} })
    }

    return (
        <div className="error-backdrop">
            <div className="error-card">
                <p>Error!</p>
                <p>{error}</p> 
                <button className="cancel-error-btn fill-button-red material-symbols-outlined"
                    onClick={cancelErrorHandler}
                >
                    close
                    </button>              
            </div>
        </div>
    )
}