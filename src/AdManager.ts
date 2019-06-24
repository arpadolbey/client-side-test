export class AdManager {

    static load(): void {

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

    }

}

AdManager.load();