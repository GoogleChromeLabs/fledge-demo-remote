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

const ads = new URL(location.href).searchParams.get('ads');
console.log(ads);

// dsp
const interestGroup = {
  name: ads,
  owner: 'https://dsp-fledge-demo.glitch.me',

  // x-allow-fledge: true
  biddingLogicUrl: 'https://dsp-fledge-demo.glitch.me/dsp/bidding-logic.js',

  // x-allow-fledge: true
  trustedBiddingSignalsUrl:
    'https://dsp-fledge-demo.glitch.me/dsp/bidding_signal.json',
  trustedBiddingSignalsKeys: ['key1', 'key2'],

  dailyUpdateUrl: 'https://dsp-fledge-demo.glitch.me/dsp/daily_update_url', // not implemented yets
  userBiddingSignals: { user_bidding_signals: 'user_bidding_signals' },
  ads: [
    {
      renderUrl: `https://${ads}-fledge-demo.glitch.me/advertiser/${ads}-ad.html`,
      metadata: {
        type: ads,
      },
    },
  ],
};
console.log(interestGroup);

document.addEventListener('DOMContentLoaded', async (e) => {
  console.log(e);
  const kSecsPerDay = 3600 * 24 * 30;
  console.log(await navigator.joinAdInterestGroup(interestGroup, kSecsPerDay));
});
