import { SSPBid } from '../models/SSPBid';
import { BidRequestSizeType } from '../components/BidRequest';
import { config } from '../config/config';

export class XHRWrapper {
  static postToAdServer(data: {
    ssp: string;
    sizes: BidRequestSizeType;
  }): Promise<SSPBid> {
    const xhrStart = Date.now();
    return fetch(config.BACKEND_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        SSP: data.ssp,
        'cache-control': 'no-cache'
      },
      body: JSON.stringify(data)
    }).then(async response => {
      const timing = Date.now() - xhrStart;
      if (timing < config.RESPONSE_TIMEOUT) {
        const SSPBidJson = new SSPBid(await response.json());
        return SSPBidJson;
      }
    });
  }
  static async postTracking(advert: SSPBid): Promise<void> {
    await fetch(`${config.BACKEND_URL}/tracking/${advert.getCreativeId()}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: advert ? JSON.stringify(advert) : undefined
    });
  }
}
