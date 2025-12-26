
import React from 'react';

export const INITIAL_CONFIG = {
  bnbRpcUrl: '',
  privateKey: '',
  targetWallet: '',
  securityToken: '',
  minAmount: 0.1,
  maxSlippage: 1.0,
};

export const TUTORIAL_CONTENT = `
# Memecoin Copy Trading on BNB Chain

This tutorial covers building a high-performance copy trading bot using QuickNode Webhooks, Viem, and the four.meme platform.

### Core Logic
1. **Monitor**: Watch the 'TokenPurchase' event on four.meme contracts.
2. **Filter**: Use QuickNode's server-side JS filters to minimize noise.
3. **Execute**: Proportional buying using Viem's 'buyTokenAMAP' function.

### Missing Components for Production
- **RPC URLs**: Specific to your QuickNode project.
- **Private Keys**: Your wallet's execution authority.
- **Target Wallets**: The "whales" you wish to shadow.
`;
