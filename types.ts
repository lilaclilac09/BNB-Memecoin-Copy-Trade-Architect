
export interface BotConfig {
  bnbRpcUrl: string;
  privateKey: string;
  targetWallet: string;
  securityToken: string;
  minAmount: number;
  maxSlippage: number;
}

export interface TradeEvent {
  id: string;
  timestamp: number;
  txHash: string;
  tokenAddress: string;
  amountIn: string;
  amountOut: string;
  type: 'BUY' | 'SELL';
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  CONFIG = 'config'
}
