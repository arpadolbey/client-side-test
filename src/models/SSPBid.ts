import {Bid} from "./abstract/Bid";

export class SSPBid extends Bid {

    private size: string;
    private width: number;
    private height: number;
    private cpm: number;
    private ssp: string;
    private creativeId: string;
    private ad: string;
    private deal: boolean;

    constructor(bid: Object){

        /*
            TODO

            Pass the bid object returned by the SSP
         */

        super();
    }

    getSize(): string {
        return this.size;
    };

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