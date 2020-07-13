(() => {
  const blurMemo = (state) => {
    document.body.style.filter = state ? 'blur(5px)' : 'none';
  };

  const requestPayment = () => {
    let networks = [
      'amex',
      'diners',
      'discover',
      'jcb',
      'mastercard',
      'unionpay',
      'visa',
      'mir',
    ];
    let types = ['debit', 'credit', 'prepaid'];
    let supportedInstruments = [
      {
        supportedMethods: 'basic-card',
        data: { supportedNetworks: networks, supportedTypes: types },
      },
    ];

    let details = {
      total: { label: 'Total', amount: { currency: 'BRL', value: '55.00' } },
      displayItems: [
        {
          label: 'Original donation amount',
          amount: { currency: 'BRL', value: '65.00' },
        },
        {
          label: 'Friends and family discount',
          amount: { currency: 'BRL', value: '-10.00' },
        },
        {
          label: 'Free shipping worldwide',
          amount: { currency: 'BRL', value: '0.00' },
        },
      ],
      shippingOptions: [
        {
          id: 'freeWorldwideShipping',
          label: 'Free shipping worldwide',
          amount: { currency: 'USD', value: '0.00' },
          selected: true,
        },
      ],
    };

    let options = { requestShipping: true };

    let request = new PaymentRequest(supportedInstruments, details, options);

    request
      .show()
      .then((paymentResponse) => {
        console.log(paymentResponse);
        setTimeout(() => {
          paymentResponse.complete('success').then(() => {
            console.log('Payment Success');
          });
        }, 1000);
      })
      .catch((err) => {
        console.log('RPA Error: ', err);
      })
      .finally(() => {
        blurMemo(false);
      });
  };

  const handleButtonClick = () => {
    blurMemo(true);
    requestPayment();
  };

  const products = document.querySelectorAll(`.product-list .product button`);
  products.forEach((b) => b.addEventListener(`click`, handleButtonClick));
})();
