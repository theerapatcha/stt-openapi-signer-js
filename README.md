# Settrade OpenAPI parameters signer
## Overview
--------
Website: [Settrade OpenAPI](https://developer.settrade.com/open-api)

Related API: [Login by APP](https://developer.settrade.com/open-api/document/api-reference/oam/broker-app-auth-controller/loginByApp>)


## Installation
------------
### Using prebuilt version
1. Download a library in `./dist` folder based on your environment
    - stt-open-api-signer.js (Node)
    - stt-open-api-signer.min.js (Node, minified)
    - stt-open-api-signer.es.js (Browser, *not yet tested!*)

### Build manually
1. Clone this repository
2. Run `npm run build`

## Usage
-----

Node Example: 
```node
const signer = require("./dist/stt-openapi-signer.min")

signer.sign("key1","AIKi/X7lvfu0haz0SttdbCj+nXmWBt/jfrbPAHRjwNHq","")
{
  signature: '3045022100beaff47a22eeedc1dd85c9aac12124ed33cd9ba7f9145ef35d12ed456b19972f02203807154d13cbb03063f4ac3d4820cd152f4f00ad211452bb3f3ec1f9d6328d21',
  timestamp: 1603783386198
}
```
