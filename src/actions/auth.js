import Swal from "sweetalert2";
import { fetchNoToken, fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types";


export const startLogin = (email, password)=>{
    return async (dispach) => {

        dispach( initChecking() );
        
        const resp = await fetchNoToken( 'auth', {email, password}, 'POST' );

        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispach( login( {uid:body.uid, name:body.name} ) )

        } else {
            Swal.fire("Error", "User or password incorrect", 'error' );
        }
    }
}


export const startLogout = () => {
    return async (dispach) => {
        localStorage.clear();

        dispach( logout() );
    }

}

const logout = () => ({
    type: types.authLogout
});

export const startRegister = (email, name, password)=>{

    return async (dispach) => {

        dispach( initChecking() );
        
        const resp = await fetchNoToken( 'auth/register', {email, password, name}, 'POST' );

        const body = await resp.json();

        console.log(body);

        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispach( login( {uid:body.uid, name:body.name} ) )

        } else {
            Swal.fire("Error", body.msg, 'error' );
        }
    }
}


export const startChecking = () => {
    return async (dispach) => {
        dispach( initChecking() );
        const resp = await fetchWithToken( 'auth/renew');

        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispach( login( { uid: body.uid, name: body.name } ) )

        } else {
            dispach( finishChecking() )
        }
    }
}

const finishChecking = () => ({
    type: types.authCheckingFinish
});

const initChecking = () => ({
    type: types.authStartChecking
})

const login=(user)=>( {
    type: types.authLogin,
    payload: user
} );

