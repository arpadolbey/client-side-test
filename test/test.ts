import { BidResponse } from '../src/components/BidResponse';
import { SSPBid } from '../src/models/SSPBid';

const Placement: SSPBid[] = [
  new SSPBid({
    creativeId: '3fb0-f996-c049-c700-7328',
    ssp: 'ssp-a',
    width: 250,
    height: 250,
    size: [250, 300],
    cpm: 0.97,
    ad:
      '<div id="3fb0-f996-c049-c700-7328" style="width: 1px; height:1px; background:#EEEEEE">\n                <script>document.querySelector("#3fb0-f996-c049-c700-7328").innerHTML("3fb0-f996-c049-c700-7328 @ 1x1 @ 0.97")</script>\n            </div>',
    isDeal: false
  }),
  new SSPBid({
    creativeId: 'a95e-8c5d-d5bb-abb1-0a77',
    ssp: 'ssp-a',
    size: [1, 1],
    cpm: 2.54,
    ad:
      '<div id="a95e-8c5d-d5bb-abb1-0a77" style="width: 1px; height:1px; background:#EEEEEE">\n                <script>document.querySelector("#a95e-8c5d-d5bb-abb1-0a77").innerHTML("a95e-8c5d-d5bb-abb1-0a77 @ 1x1 @ 2.54")</script>\n            </div>',
    isDeal: false
  }),
  new SSPBid({
    creativeId: 'd60d-f597-636e-c0a1-ebb4',
    ssp: 'ssp-a',
    size: [1, 1],
    cpm: 0.27,
    ad:
      '<div id="" style="width: 1px; height:1px; background:#EEEEEE">\n                <script>document.querySelector("#d60d-f597-636e-c0a1-ebb4").innerHTML("d60d-f597-636e-c0a1-ebb4 @ 1x1 @ 0.27")</script>\n            </div>',
    isDeal: true
  })
];

describe('Getting back the winning bid', () => {
  it('should be equal to the first bid', () => {
    const actual = BidResponse.getWinningBid(Placement).getCreativeId();
    const expected = 'd60d-f597-636e-c0a1-ebb4';
    expected.should.equal(actual);
  });
});

describe('Getting back the winning bid', () => {
  it('Should not be equal to', () => {
    const actual = BidResponse.getWinningBid(Placement).getCreativeId();
    const expected = 'd60d-f597-636e-c0a1-ebb24' === actual;
    expected.should.equal(false);
  });
});

describe('Instantiating SSBids', () => {
  it('Both instance should be equal', () => {
    const actual = new SSPBid({
      creativeId: '3fb0-f996-c049-c700-7328',
      ssp: 'ssp-a',
      width: 250,
      height: 250,
      size: [250, 300],
      cpm: 0.97,
      ad:
        '<div id="3fb0-f996-c049-c700-7328" style="width: 1px; height:1px; background:#EEEEEE">\n                <script>document.querySelector("#3fb0-f996-c049-c700-7328").innerHTML("3fb0-f996-c049-c700-7328 @ 1x1 @ 0.97")</script>\n            </div>',
      isDeal: false
    });
    const expected = Placement[0];
    JSON.stringify(actual).should.equal(JSON.stringify(expected));
  });
});
