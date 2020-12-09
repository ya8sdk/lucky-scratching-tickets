import ScratchTicket from './models/ScratchTicket';

export interface ISale {
    purchasedID: string;
    date: Date;
    productID: number;
    used: boolean;
    productName: string;
}


class Collections {

    private collection = {
        sales: [],
        products: {
            1: {
                'name': 'scratchTicket', 'class': new ScratchTicket()
            }
        }
    }

    constructor() {
    }


    /**
     * Returns Class of product that by ProductID
     * @param {number} productID
     * @returns {object}
     */
    getClassByProductID(productID) {
        if (this.collection.products.hasOwnProperty(productID)) {
            return this.collection.products[productID].class
        }
        throw Error('productID doesnt exists')
    }

    /**
     * provide sale info by sale id
     * @param {string} purchasedID
     * @returns {ISale}
     */
    getDocSaleByID(purchasedID) {
        let sale = this.collection.sales.find(element => element.purchasedID == purchasedID) || {}
        if (sale.hasOwnProperty('purchasedID')) {
            return sale
        }
        throw Error('purchaseID of product did not found.')
    }

    /**
     * function add sale products to sales Dict
     * @param {ISale} sales
     */
    addSales(sales: ISale[]) {
        this.collection.sales = this.collection.sales.concat(sales);
    }

    /**
     * function edit property of sales
     * @param {ISale} sale
     * @param {string} property
     * @param {} value
     */
    setPropertyByDoc(sale, property, value) {
        this.collection.sales[this.collection.sales.indexOf(sale)][property] = value
    }
}

export default Collections;