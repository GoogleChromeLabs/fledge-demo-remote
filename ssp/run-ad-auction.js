/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// ssp
const auctionConfig = {
  seller: 'https://ssp-fledge-demo.glitch.me', // should https & same as decisionLogicUrl's origin

  // x-allow-fledge: true
  decisionLogicUrl: 'https://ssp-fledge-demo.glitch.me/ssp/decision-logic.js',

  interestGroupBuyers: [
    // * is not supported yet
    'https://dsp-fledge-demo.glitch.me',
  ],
  // public for everyone
  auctionSignals: { auction_signals: 'auction_signals' },

  // only for single party
  sellerSignals: { seller_signals: 'seller_signals' },

  // only for single party
  perBuyerSignals: {
    // listed on interestGroupByers
    'https://dsp-fledge-demo.glitch.me': {
      per_buyer_signals: 'per_buyer_signals',
    },
  },
};

document.addEventListener('DOMContentLoaded', async (e) => {
  const adAuctionResult = await navigator.runAdAuction(auctionConfig);
  console.log({ adAuctionResult });
  const query = new URL(location.href).search;
  const frametype = query === '?fencedframe' ? 'fencedframe' : 'iframe';
  console.log(`display ads in <${frametype}>`);
  const $iframe = document.createElement(frametype);
  $iframe.src = adAuctionResult;
  document.body.appendChild($iframe);
});
