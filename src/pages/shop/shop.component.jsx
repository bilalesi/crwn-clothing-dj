import React, {Component, useEffect} from 'react';
import {Route} from 'react-router-dom';
import {createStructuredSelector} from 'reselect'
import {selectIsCollectionLoaded} from '../../redux/shop/shop.selector';

import {connect} from 'react-redux';
import {fetchCollectionStart} from '../../redux/shop/shop.actions'

import CollectionOverviewContainer from '../../components/collection-overview/collection-overview.container';
import CollectionPageContainer from '../collection/collection.container';


const ShopPage = ({fetchCollectionStart, match}) =>{
    
    useEffect(() =>{
        fetchCollectionStart();
    }, [fetchCollectionStart])

    return(
        <div className='shop-page'>
            <Route 
                exact 
                path={`${match.path}`} 
                component={CollectionOverviewContainer}
            />
            <Route 
                path={`${match.path}/:collectionId`} 
                component={CollectionPageContainer}
            />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    isCollectionLoaded : selectIsCollectionLoaded
})

const dispatchStateToProps = (dispatch) =>({
    fetchCollectionStart : () => dispatch(fetchCollectionStart())
})


export default connect(mapStateToProps, dispatchStateToProps)(ShopPage);