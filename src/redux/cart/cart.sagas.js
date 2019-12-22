import {call, put , all, takeLatest} from 'redux-saga/effects';


import UserActionType from '../user/user.types';
import {clearCart} from './cart.actions';
import { onSignOut } from '../user/user.sagas';
 

export function* clearCartOnSignOut(){
    try {
        yield put(clearCart());
    } catch (error) {
        yield console.log('error saga clearCart', error)
    }
}

export function* onSignOutSuccess(){
    yield takeLatest(UserActionType.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}
export default function* cartSaga(){
    yield all([
        call(onSignOutSuccess)
    ])
}