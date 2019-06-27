import { SSPBid } from '../models/SSPBid';
import { Placement } from '../models/placement';

export class BidResponse {
  static getWinningBid(bids: SSPBid[]): SSPBid {
    /*
        TODO

        Given a set of winning bids, should return the highest value bid.

        If this is a "deal" then we should prioritise this over other bids, regardless of other non-deal bid values, selecting the best "deal".
    */
    const placement = new Placement(bids);
    for (let i = placement.bidGroup.length - 1; 0 <= i; i--) {
      const bid = placement.bidGroup[i];
      if (bid.isDeal()) {
        return bid;
      }
    }

    placement.bidGroup.sort(
      (first, second) => second.getCPM() - first.getCPM()
    );
    return placement.bidGroup[0];
  }
}
