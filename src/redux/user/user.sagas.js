import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionsTypes from './user.types';
import {SignInSuccess,
        SignInFailure, 
        signOutSuccess,
        signOutFailure, 
        signUpSuccess,
        signUpFailure
    } from './user.actions';
import {auth, 
    googleProvider, 
    createUserProfileDocument,
    getCurrentUser} from '../../firebase/firebase.utils';
import UserActionTypes from './user.types';

export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(SignInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        }));
    } catch (error) {
        yield put(SignInFailure(error));
    }
}


export function* signInWithGoogle(){
    try {
        const {user} = yield auth.signInWithPopup(googleProvider); 
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield put(SignInFailure(error));
    }
}

export function* signInWithEmail({payload}){
    const {email, password} = payload
    try {
        console.log('payload : ', email , password)
        const {user} = yield call(auth.signInWithEmailAndPassword,email, password);
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        yield console.log('error ; ' , error)
        yield put(SignInFailure(error.message));
    }
}



export function* onGoogleSignStart(){
    yield takeLatest(UserActionsTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignStart(){
    yield takeLatest(UserActionsTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}
export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser();
        console.log('userAuth promise : ', userAuth)
        if(!userAuth)
            return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        yield put (SignInFailure(error))
    }
}
export function* onCheckUserSession(){
    yield takeLatest(UserActionsTypes.CHECK_USER_SESSION,isUserAuthenticated);
}

export function* signOut(){
    try {
        yield auth.signOut();
        yield put(signOutSuccess())
    } catch (error) {
        put(signOutFailure(error))
    }
}

export function* onSignOut() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut )
}

export function* signUp({payload: {email, password, displayName}}){
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData : { displayName}}))

    } catch (error) {
        yield put(signUpFailure(error));
    }

}
export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}
export function* signInAfterSignUp({payload : {user, additionalData}}){
    yield console.log('user : ', user, 'additionalData: ', additionalData)
    yield getSnapshotFromUserAuth(user, additionalData)
}
export function* onSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}
export function* userSagas(){
    yield all([
        call(onGoogleSignStart),
        call(onEmailSignStart),
        call(onCheckUserSession),
        call(onSignOut),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}

