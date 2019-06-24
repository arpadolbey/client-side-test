export abstract class Bid {

    abstract getSize(): string;

    abstract getWidth(): number;

    abstract getHeight(): number;

    abstract getCPM(): number;

    abstract getSSP(): string;

    abstract getCreativeId(): string;

    abstract getAd(): string;

    abstract isDeal(): boolean;

}

