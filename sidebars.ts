import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Account, security, verification',
      items: [
        'account-security/create-account',
        'account-security/two-factor-authentication',
        'account-security/kyc-verification',
      ],
    },
    {
      type: 'category',
      label: 'Trade on CoinByte',
      items: [
        'trading/instant-buy',
        'trading/spot-trading',
      ],
    },
    {
      type: 'category',
      label: 'Deposits and Withdrawals',
      items: [
        'deposits-withdrawals/deposit-aud',
        'deposits-withdrawals/crypto-withdrawal',
      ],
    },
    {
      type: 'category',
      label: 'Use of CoinByte',
      items: [
        'user-guide/price-alerts',
        'user-guide/referral-program',
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
