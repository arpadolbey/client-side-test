import { Bid } from "../models/abstract/Bid";

export class Render {

    static render(id: string, bid: Bid): Promise<string> {
        return new Promise((resolve, reject) => {
            /*
                TODO

                Render the ad-code, if it success, resolve, otherwise reject...

                Think about browsers, especially older browsers and different ways of loading javascript in.

                Bonus points for adding multiple ad rendering methods.
             */
            resolve(id);
        });
    }

}