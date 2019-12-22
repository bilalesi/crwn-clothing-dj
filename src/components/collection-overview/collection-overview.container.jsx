import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCollectionFetching} from '../../redux/shop/shop.selector';

import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionOverview from '../collection-overview/collection-overview.component';
import {compose} from 'redux'


const mapStateToProps = createStructuredSelector({
    isLoading : selectCollectionFetching
});


const CollectionOverviewContainer = compose(
    connect(mapStateToProps), 
    WithSpinner
)(CollectionOverview)


export default CollectionOverviewContainer;