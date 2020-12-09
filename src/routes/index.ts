import * as express from 'express'
import Response from "../lib/Response"
import * as errorHandel from "../lib/MyErrorHandler"
import Collections, {ISale} from '../Collections';

let dataCollection = new Collections();
const router = express.Router()

/**
 * POST REQUEST for purchase amount of products and Return products info
 * body need to contains:
 * @param {number} amount
 * @param {number} ProductID
 * @returns {[]}
 */
router.post('/product/purchase', (req, res) => {
    try {
        //check if the client sent amount, and productID parameters
        if (!req.body.hasOwnProperty('amount') || !req.body.hasOwnProperty('productID')) {
            Response.badRequest(req, res, 'one or more parameters are missing', null)
        }
        let product = dataCollection.getClassByProductID(req.body.productID)
        let data: ISale[] = product.buy(req.body.amount)
        dataCollection.addSales(data)
        Response.success(req, res, 'succeeded to buy ', data)
    } catch (error) {
        errorHandel.errorHandle(error, req, res)
    }
})

/**
 * POST REQUEST for using the purchased product Returns the result of using the product
 * body need to contains:
 * @param {string} purchasedID
 */
router.post('/product/use', (req, res) => {
    try {
        if (!req.body.hasOwnProperty('purchasedID')) {
            Response.badRequest(req, res, 'one or more parameters are missing', null)
        }
        let sale: ISale = dataCollection.getDocSaleByID(req.body.purchasedID)
        let product = dataCollection.getClassByProductID(sale.productID)
        let result = product.use(sale.used)
        dataCollection.setPropertyByDoc(sale,'used', true) //change the product to used
        Response.success(req, res, null, result)
    } catch (error) {
        errorHandel.errorHandle(error, req, res)
    }
})
export default router;