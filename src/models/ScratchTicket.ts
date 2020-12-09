import Product from "./Product";
import {prizesDict} from './Prize'



class ScratchTicket extends Product {

    constructor() {
        super()
        this.productID = 1;
        this.productName = 'ScratchTicketCard'
    }

    /**
     * check if scratch ticket already used and if not use it
     * Returns the prize of the scratch ticker
     * @param {boolean} isUsed
     * @return {} prize
     */
    public use(isUsed: boolean) {
        if (isUsed) {
            throw Error('card already scratched, try another card.')
        }
        let prize = ScratchTicket._generatePrize()
        console.log(prize)
        return prize.getPrize()
    }


    /**
     * choose random ticket by prize chance
     * Returns random Class from prizesDict
     * @return {} prize
     */
    private static _generatePrize() {
        let array = [];

        for (let item in prizesDict) {
            if (prizesDict[item].hasOwnProperty('chances')) {
                for (let i = 0; i < prizesDict[item]['chances']; i++) {
                    array.push(item);
                }
            }
        }
        return prizesDict[array[Math.floor(Math.random() * array.length)]].class;
    }
}

export default ScratchTicket;