import debtAuctionSimulation from './configs/createDebtAuctionSimulation';
import surplusAuctionBlockchain from './configs/surplusAuctionSimulation';
import wstethAuctionSimulation from './configs/wstethAuctionSimulation';
import surplusAuctionSimulation from './configs/createSurplusAcutionSimulation';
import { Simulation } from './types';

export const SIMULATIONS: Simulation[] = [
    debtAuctionSimulation,
    surplusAuctionBlockchain,
    surplusAuctionSimulation,
    wstethAuctionSimulation,
];
