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
When making bids, if an SSP takes longer than 1000ms to respond you should ignore the response and continue with the bids that do come back in time.

You should make your own XHR wrapper class to handle requests to SSPs. This class should be placed in ```components``` directory.

Once bids have been returned for the placement(s), you should use ```BidReponse.ts``` to work out which bid to use. As noted in the class, if there are *deals* present, this should win regardless of non-deal values.
One of the tests should make sure this logic is correct.

### Refreshing Placements

To make the most of our inventory we refresh ads every 60 seconds. Your code should make a new request to all the associated SSPs every 60 seconds for the next ad to show.

### Debugging

Think about using the React library that has been made available to create a simple, visual debug overlay or if you are pressed for time to create a Logging class in the project and use ```console.table``` with ```console.log``` to output some helpful debug information.

### Testing

Internally we use Karma, Mocha, Chai and Sinon. We have added these packages for you. Only a few meaningful tests are required. You should aim to spend no more than 30 minutes to configure Karam and add a few tests.
Please add your tests in a ```tests``` directory.

## Your Notes

...