import { Bid } from './abstract/Bid';

export class SSPBid extends Bid {
  private size: string;
  private width: number;
  private height: number;
  private cpm: number;
  private ssp: string;
  private creativeId: string;
  private ad: string;
  private deal: boolean;

  constructor(bid: Object) {
    /*
        TODO

        Pass the bid object returned by the SSP
    */
    super();

    this.size = bid['size'];
    this.width = bid['size'][0];
    this.height = bid['size'][1];
    this.cpm = bid['cpm'];
    this.ssp = bid['ssp'];
    this.creativeId = bid['creativeId'];
    this.ad = bid['ad'];
    this.deal = bid['isDeal'];
  }

  getSize(): string {
    return this.size;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getCPM(): number {
    return this.cpm;
  }

  getSSP(): string {
    return this.ssp;
  }

  getCreativeId(): string {
    return this.creativeId;
  }

  getAd(): string {
    return this.ad;
  }

  isDeal(): boolean {
    return this.deal;
  }
}
