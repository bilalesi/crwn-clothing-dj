import { takeEvery, takeLatest, call, put, all } from "redux-saga/effects";
import {firestore, convertCollectionSnapshotTopMap} from '../../firebase/firebase.utils';
import { 
    fetchCollectionsSuccess,
    fetchCollectionsFailure
 } from "./shop.actions";

import ShopActionTypes from './shop.types';


export function* fetchCollectionsAsync(){
    try {

        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionMap = yield call(convertCollectionSnapshotTopMap,snapshot);    
        yield put(fetchCollectionsSuccess(collectionMap));

    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,
         fetchCollectionsAsync);
}


export default function* shopSaga(){
    yield all([
        call(fetchCollectionsStart)
    ])
}