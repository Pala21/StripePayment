const { Router } = require('express');
const router = Router();
const stripe = require('stripe')('sk_test_4TLncftOJ3grIDGBsecp7WiC00aTVZxzq9'); //secret key to stripe

router.get('/', (req, res) => {
    res.render('index');
});


//transacción de compra
router.post('/checkout', async (req, res)=>{
    console.log(req.body);

    //comprador con email token de transacción
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });

    //compra
    const charge = await stripe.charges.create({
        amount: '3000', //hardcoded
        currency:'EUR',
        customer: customer.id,
        description: 'SUSHI COMBO' //hardcoded description of pack
    });
    console.log(charge.id);

    //Final response, mostrar vista de transacción OK.
    res.render('transaccionOK');
});

module.exports = router;
