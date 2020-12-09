import * as short from "short-uuid";
import {ISale} from '../Collections'


abstract class Product {

    protected productName: string;
    protected productID: number;

    protected constructor() {
    }

    /**
     * function create unique id and more info of the sale
     * Returns sale properties
     * @returns {ISale}
     */
    private newSaleProperties() {
        let id: string = short.generate();
        return {purchasedID: id, date: new Date(), used: false, productID: this.productID, productName: this.productName}
    }

    /**
     * get amount of products to buy
     * Returns all the products that sold now
     * @param {number} amount
     * @returns {object}
     */
    buy(amount: number = 1) {
        // check if amount is bigger than 0
        if (amount > 0) {
            let salesList = []
            for (let _i = 0; _i < amount; _i++) {
                let sale: ISale = this.newSaleProperties()
                salesList.push(sale)
            }
            return salesList
        }
        throw Error('amount cannot be smaller then 1')
    }

    /**
     * check if product already used and if not use it
     * @param {boolean} isUsed
     */
    use(isUsed: boolean) {}
}

export default Product;