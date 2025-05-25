# Changelog

## [1.3.0] - 2025-05-25
- Sync with the Space Traders API changes of 2025-05-25
  - **Breaking:** `register` no longer accepts `email`
  - `getErrorCodes` is added
  - `getWaypoints` now also accepts a single trait in `query.traits` rather than only an array

## [1.2.0] - 2025-05-12
- Added an `onError` callback to listen for errors
- Improved request sending to make full use of the available rate limit
  - 2.45 requests per second out of the 2.5 theoretical maximum with only 1% of requests being rate-limited
  - Added automatic retry for rate-limited requests

## [1.1.0] - 2025-05-11
- Added `getMyAgentEvents()` and `getMyAccount()` methods.
- The request body for both `refuelShip` and `patchShipNav` are now required.

## [1.0.0] - 2025-05-11
- Happy with the state of the SDK, mostly feature complete.
- Now tracking changes
