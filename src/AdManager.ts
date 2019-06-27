import {
  BidRequest,
  BidRequestSizeType,
  BidRequestSspsType
} from './components/BidRequest';
import { Render } from './components/Render';
import { config } from './config/config';
import { XHRWrapper } from './components/XhrWrapper';
import { SSPBid } from './models/SSPBid';

export class AdManager {
  static adverts: SSPBid[] = [];
  /*

    TODO

    On load, the ad-manager should look for ad-units on the page and ask the ad-server for bids...

    There is a bid server running on localhost:8081, set the SSP header, ssp: rubicon, for example and it will mock up a bid that looks like: -

    {
        "adUnitCode": "abc123",
        "creativeId": "f28b-584b-868e-45a8-7e27",
        "ssp": "sspa",
        "size": [
            300,
            600
        ],
        "cpm": 1.79,
        "ad": "<div id=\"f28b-584b-868e-45a8-7e27\" style=\"width: 300px; height:600px; color:#EEEEEE\">\n                <script>document.querySelector(\"#f28b-584b-868e-45a8-7e27\").innerHTML(\"f28b-584b-868e-45a8-7e27 @ 300x600 @ 1.79\")</script>\n            </div>"
    }

    Pass the server with sizes to bid on using: -

    {
        "adUnitCode": "abc123",
        "sizes": [[300,250],[300,600]]
    }

        */
  static async load(): Promise<void> {
    const adPlacementContainers: HTMLCollection = document.getElementsByClassName(
      'placement-container'
    );
    for (let i = adPlacementContainers.length - 1; 0 <= i; i--) {
      const sizes = adPlacementContainers[i]['dataset']['sizes'];
      const ssps = adPlacementContainers[i]['dataset']['ssps'];
      const advert = await BidRequest.request(
        this.parseAdSize(sizes),
        this.parseAdSSp(ssps)
      );
      try {
        const renderedId: string = await Render.render(
          advert ? advert.getCreativeId() : undefined,
          advert,
          adPlacementContainers[i]
        );
        if (renderedId) {
          this.adverts[i] = advert;
          this.trackAdvert(i);
        }
      } catch (err) {
        console.warn(
          `Ads were not placed in #${i} container, because no response came under ${
            config.RESPONSE_TIMEOUT
          }ms`
        );
        this.trackAdvert(i); // logging the one that stayed in place
      }
    }
  }

  static startAdManager() {
    AdManager.load();

    return setInterval(() => {
      AdManager.load();
    }, config.AD_REFRESH_TIMEOUT);
  }

  static trackAdvert(index: number) {
    if (this.adverts[index]) {
      XHRWrapper.postTracking(this.adverts[index]);
    }
    if (this.adverts[index]) {
      console.table({
        creativeId: this.adverts[index].getCreativeId(),
        width: this.adverts[index].getWidth(),
        height: this.adverts[index].getHeight(),
        cpm: this.adverts[index].getCPM(),
        deal: this.adverts[index].isDeal()
      });
    }
  }

  static parseAdSize(sizes: string): BidRequestSizeType {
    return sizes
      .split(',')
      .map(size => size.split('x').map(str => Number.parseInt(str)));
  }

  static parseAdSSp(ssps: string): BidRequestSspsType {
    return ssps.split(',');
  }
}

AdManager.startAdManager();
