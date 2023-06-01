import type { Contract } from 'ethers';
import { ethers } from 'ethers';
import memoizee from 'memoizee';
import COLLATERALS, { getAllCollateralTypes } from './constants/COLLATERALS';
import getProvider from './provider';
import CHAINLOG from './abis/CHAINLOG.json';

// const CHAINLOG_ADDRESS = process.env.CHAINLOG_ADDRESS || '0xdA0Ab1e0017DEbCd72Be8599041a2aa3bA7e740F';
const CHAINLOG_ADDRESS = process.env.CHAINLOG_ADDRESS || '0x79B74AD140DD7E20Fc4B181eA5536FBe96772c3F';
const UNISWAP_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const CHAINLOG_CACHE = 24 * 60 * 60 * 1000;

const getChainLogContract = async function (network: string): Promise<Contract> {
    console.log('is working??');

    const provider = await getProvider(network);
    let CHAINLOG_ADDRESS = '';
    console.log(provider, 'provider', network, 'network');
    if (network === 'mainnet') {
        console.log('sending mainnet address');

        CHAINLOG_ADDRESS = process.env.CHAINLOG_ADDRESS_MAINNET || '0xdA0Ab1e0017DEbCd72Be8599041a2aa3bA7e740F';

        return await new ethers.Contract(CHAINLOG_ADDRESS, CHAINLOG, provider);
    } else if (network === 'goerli') {
        console.log('sending mainnet goerli');

        CHAINLOG_ADDRESS = process.env.CHAINLOG_ADDRESS_GOERLI || '0xBCe4D2D8595f65ce6c8b09582b83d49Ee0f287Da';
    }
    return await new ethers.Contract(CHAINLOG_ADDRESS, CHAINLOG, provider);
};

export const fetchContractsNamesByNetwork = async function (network: string): Promise<string[]> {
    const contract = await getChainLogContract(network);
    const encodedContractNames: string[] = await contract.list();
    return encodedContractNames.map(ethers.utils.parseBytes32String);
};

export const _fetchContractAddressByNetwork = async function (network: string, contractName: string): Promise<string> {
    if (contractName === 'UNISWAP') {
        return UNISWAP_ADDRESS;
    }
    console.log(network, '_fetchContractAddressByNetwork');

    const chainLogContract = await getChainLogContract(network);
    console.log(chainLogContract, 'chainLogContract _fcabn');

    try {
        const encodedContractName = ethers.utils.formatBytes32String(contractName);
        console.log(encodedContractName, 'encodedContractName');

        return await chainLogContract.getAddress(encodedContractName);
    } catch (error) {
        throw new Error(`No contract address found for "${contractName}"`);
    }
};

export const fetchContractAddressByNetwork = memoizee(_fetchContractAddressByNetwork, {
    maxAge: CHAINLOG_CACHE,
    promise: true,
    length: 2,
});

export const isCollateralSymbolSupported = async function (
    network: string,
    collateralSymbol: string
): Promise<boolean> {
    const collateralAddress = await fetchContractAddressByNetwork(network, collateralSymbol);
    return !!collateralAddress;
};

export const isCollateralTypeSupported = async function (network: string, collateralType: string): Promise<boolean> {
    const suffix = collateralType.toUpperCase().replace('-', '_');
    const clipContractName = `MCD_CLIP_${suffix}`;
    try {
        const collateralAddress = await fetchContractAddressByNetwork(network, clipContractName);
        return !!collateralAddress;
    } catch {
        return false;
    }
};

export const getSupportedCollateralTypes = async function (network: string): Promise<string[]> {
    const allCollateralTypes = getAllCollateralTypes();
    const supportedCollateralsPromises = allCollateralTypes.map(async collateralType => {
        if (await isCollateralTypeSupported(network, collateralType)) {
            return collateralType;
        }
    });
    const supportedCollaterals = await Promise.all(supportedCollateralsPromises);
    return supportedCollaterals.filter((collateralType): collateralType is string => !!collateralType);
};

export const checkAllSupportedCollaterals = async function (network: string): Promise<void> {
    const errors = [];
    const successes = [];
    for (const collateral of getAllCollateralTypes()) {
        const isSupported = await isCollateralSymbolSupported(network, COLLATERALS[collateral].symbol);

        if (isSupported) {
            successes.push(collateral);
            console.info(`${collateral} is supported on the network: ${network}`);
        } else {
            errors.push(collateral);
            console.error(`${collateral} is NOT supported on the network: ${network}`);
        }
    }
    console.info('checkAllSupportedCollaterals finished, not supported collaterals:', errors, successes);
};
