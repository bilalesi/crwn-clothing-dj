import ShopActionsTypes from './shop.types';
import { firestore, convertCollectionSnapshotTopMap } from "../../firebase/firebase.utils";   


export const updateCollections = (collectionMap) =>({
    type: ShopActionsTypes.UPDATE_COLLECTIONS,
    payload: collectionMap
});

export const fetchCollectionStart = () =>({
    type: ShopActionsTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess= collectionMap =>({
    type: ShopActionsTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
})

export const fetchCollectionsFailure = (errorMessage) =>({
    type: ShopActionsTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionStartAsync = () =>{
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionStart);
        collectionRef.get().then(snapshot => {
            const collectionMap =  convertCollectionSnapshotTopMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionMap));                                              
        }).catch(error =>
            dispatch(fetchCollectionsFailure(error.message))
        )
    }
}