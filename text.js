//JavaScript

//require op-sdk
const OPSdk = require('op-sdk');

//创建新的Opsdk实例
let newMerchant = new Opsdk(pirate_token) //"pirate_token"可从控制面板获取

//示例route：获取可用支付方式
router.get('/methods', async (req, res) => {

    const getAvailableMethods = await newMerchant.findPaymentMethods(pirate_token);
    const availableMethods = getAvailableMethods.payload.methods;

    //Logging返回数据
    console.log(availableMethods);
    res.render('index', { title: "Available Methods", data: availableMethods })
})

//示例route：获取可用价格列表
router.get('/price', async (req, res) => {

    const getAcceptablePriceList = await newMerchant.findAvailiblePriceList();
    const priceList = getAcceptablePriceList.payload.prices;

    //Logging返回数据
    console.log(priceList);
    res.render('index', { title: "Available Prices", data: priceList })
})

//示例route：发起付款
router.get('/checkout', async (req, res) => {

    const amount = (parseFloat(amount) * 100).toFixed(0); //￥1需被转换为100, ￥100需被转换为10000
    const notify_url = http://yourcompany/notify/wechat //示例
    const return_url = http://yourcompany/pay/success //示例

    const options = {
        'amount': amount,
        'payment_method': 'wechatpay', //付款方式必须被拼写为：'wechatpay', 'alipay' or 'qqpay'
        'notify_url': notify_url,
        'return_url': return_url,
        'browser_ip_address': 'provideCustomerIP', //选填
        'browser_mac_address': 'provideCustomerMacAddress', //选填
    };

    const newTransaction = await newMerchant.initPayment(options);

    //跳转至二维码付款页面。一旦用户付款成功，系统将会自动跳转到回调页面
    //Redirect to our QR code page. Once payment has been recevied, the system will automatically redirect to the provided "return_url"
    res.redirect(newTransaction.qrcodeURL)
});

//示例route：查询交易状态
router.get('/status', async (req, res) => {

    const gotStatus = await newMerchant.checkPaymentStatus(payment_token);
    res.render('index', { title: "Got Payment Status", data: [gotStatus.status, gotStatus.payload.payment_status.message });
});

module.exports = router;