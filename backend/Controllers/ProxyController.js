const ProxyService = require('../Services/ProxyServices');
const proxyService = new ProxyService();

class ProxyController{
    async static request(req,res) {
        const cookie = req.cookies;
        const {url,body,method} = req.body;
        await proxyService.request(url,body,method,cookie);
    }
}

module.exports = ProxyController;
