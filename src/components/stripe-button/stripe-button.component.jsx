import React from 'react';
import StripeButton from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price  * 100;
    const publishableKey = 'pk_test_ZB7y0ALW5FnZvpbXSJs9mYrI00ZQGsyN5q'

    const onToken = token =>{
        console.log('token : ', token);
    }
    return(
        <StripeButton label='Pay Now'
            name='CRWN Clothing Ltd'
            billingAddress
            shippingAddress
            image='../../assets/crown.svg'
            description={`Your total is  : $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}


export default StripeCheckoutButton;