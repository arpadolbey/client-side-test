import {SSPBid} from "../models/SSPBid";

export class BidResponse {

    static getWinningBid(bids: SSPBid[]): SSPBid {

        /*
            TODO

            Given a set of winning bids, should return the highest value bid.

            If this is a "deal" then we should prioritise this over other bids, regardless of other non-deal bid values, selecting the best "deal".
         */

        return bids[0];

    }

}