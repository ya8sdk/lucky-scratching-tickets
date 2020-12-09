
/**
 * abstract class of Prizes
 * every prize extends from this abstract class
 * @function getPrize - Returns Prize Info
 */
abstract class Prize {
    protected value: number;
    protected currency: string = '$';
    protected description: string

    protected constructor() {
    }

    getPrize() {
        return {currency: this.currency, value: this.value, description: this.description}
    }
}

/**
 * moneyPrize
 * this prize responsible to return random amount of money, up to 1000000$
 * @function generateValue
 */
export class MoneyPrize extends Prize {

    constructor() {
        super();
        this.value = this.generateValue()
        this.description = `congratulations! you won a ${this.value}${this.currency}`
    }

    generateValue() {
        return Number((Math.random() * Math.floor(1000000)).toFixed(2))
    }

}


interface IVehicle {
    readonly carName: string;
    readonly description: string;
    readonly maker: string;
}


/**
 * vehiclePrize
 * this prize responsible to return static flying car
 */
export class VehiclePrize extends Prize implements IVehicle {

    carName: string = 'Samson Switchblade';
    description: string = 'congratulations! you have won a flying car, up to 320 km/h in the air and 161 km/h on the ground';
    maker: string = 'Samsonsky';
    value: number = 95000

    constructor() {
        super();

    }

    getPrize() {
        return {
            description: this.description,
            maker: this.maker,
            carName: this.carName,
            value: this.value,
            currency: this.currency,
        }
    }
}

/**
 * noPrize
 * this prize Returns no prize
 */
export class NoPrize extends Prize {
    description: string = "Sorry, you did not win any prize.\n maybe next time you will have more luck! "
    value: number = 0

    constructor() {
        super();

    }

}

/**
 * easily add more Prizes here
 */
export let prizesDict = {
    1: {'chances': 33, 'name': 'MoneyLuckyTicket', 'class': new MoneyPrize()},
    2: {'chances': 33, 'name': 'VehicleLuckyTicket', 'class': new VehiclePrize()},
    3: {'chances': 33, 'name': 'NoPrize', 'class': new NoPrize()}
};
