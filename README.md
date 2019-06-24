## Venatus Client Test

Estimated time to complete - 1.5 - 3 hours - depending on existing domain knowledge.

We have created a simple ad-server that will bid on ad-requests. A test page has also been created with placements. These placements have the structure: -

```
<div class="placement-container" data-sizes="970x250,970x90,728x90" data-ssps="sspa,sspb,sspf"></div>
```

* ```data-sizes``` - all the possible ad sizes this unit can take. all should be bid on.
* ```data-ssps``` - all the SSPs that should be requested for bids on this placement.

You should **not** add any packages to ```package.json``` to complete this task. This code is simplified from what would be used in production.
Once you are finished, please add your notes towards the bottom of this ```README.md``` file.
This should include thoughts, concerns, limitations, risks, issues of what has been submitted, specifically around moving this code to production.

### SSP - Making Bid Requests

To get bids on the placement, you will need to make multiple requests to SSPs. A placement should have a *bid group* associated with it. This model has not been provided to you.
When making bids, if an SSP takes longer than **1000ms** to respond you should ignore the response and continue with the bids that do come back in time.

You should make your own XHR wrapper class to handle requests to SSPs. This class should be placed in ```components``` directory.

Once bids have been returned for the placement(s), you should use ```BidReponse.ts``` to work out which bid to use. As noted in the class, if there are *deals* present, this should win regardless of non-deal values.
One of the tests should make sure this logic is correct.

Example cURL request: -

```
curl -X POST \
  http://localhost:8081 \
  -H 'Content-Type: application/json' \
  -H 'SSP: ssp-a' \
  -H 'cache-control: no-cache' \
  -d '{
	"adUnitCode": "abc123",
	"sizes": [[300,250],[300,600]]
}'
```

Example response: -

```
{
    "adUnitCode": "abc123",
    "creativeId": "3099-f565-dd7f-52d8-801d",
    "ssp": "ssp-a",
    "size": [
        300,
        250
    ],
    "cpm": 2.2,
    "ad": "<div id=\"3099-f565-dd7f-52d8-801d\" style=\"width: 300px; height:250px; background:#EEEEEE\">\n                <script>document.querySelector(\"#3099-f565-dd7f-52d8-801d\").innerHTML(\"3099-f565-dd7f-52d8-801d @ 300x250 @ 2.20\")</script>\n            </div>",
    "isDeal": false
}
```

### Refreshing Placements

To make the most of our inventory we refresh ads **every 60 seconds**. Your code should make a new request to all the associated SSPs every 60 seconds for the next ad to show.

### Tracking

We need to keep a ledger of all our winning bids - we'll bill our clients for running these ads and do a comparision with their ad-serving stats at a later date.

Create a very simple tracking server in ```server.js``` that will log these tracking requests. This should be no more than ~20-30 lines of code.

### Debugging

Think about using the React library that has been made available to create a simple, visual debug overlay or if you are pressed for time to create a Logging class in the project and use ```console.table``` with ```console.log``` to output some helpful debug information.

### Testing

Internally we use Karma, Mocha, Chai and Sinon. We have added these packages for you. Only a few meaningful tests are required. You should aim to spend no more than 30 minutes to configure Karam and add a few tests.
Please add your tests in a ```tests``` directory.

## Your Notes

...