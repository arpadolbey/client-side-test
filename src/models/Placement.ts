import { SSPBid } from './SSPBid';

export class Placement {
  public bidGroup: SSPBid[];

  constructor(bidGroup: SSPBid[]) {
    this.bidGroup = bidGroup;
  }
}
