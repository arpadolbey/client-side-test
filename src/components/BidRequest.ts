import { SSPBid } from '../models/SSPBid';

import { XHRWrapper } from './XhrWrapper';
import { BidResponse } from './BidResponse';

export type BidRequestSizeType = Array<number[]>;
export type BidRequestSspsType = string[];

export class BidRequest {
  /*
        TODO

        For each SSP on the placement (data-ssps), make a request to bid on the sizes (data-sizes).
   */
  static async request(
    sizes: BidRequestSizeType,
    ssps: BidRequestSspsType
  ): Promise<SSPBid> {
    return new Promise(resolve => {
      let placement: Array<SSPBid> = [];

      ssps.forEach(async ssp => {
        const SSBidJson = await XHRWrapper.postToAdServer({
          ssp,
          sizes: sizes
        });
        placement.push(SSBidJson);
        if (placement.length === ssps.length) {
          placement = placement.filter(pm => {
            if (pm) {
              return pm;
            }
          });
          resolve(BidResponse.getWinningBid(placement));
        }
      });
    });
  }
}
