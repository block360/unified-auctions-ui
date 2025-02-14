<template>
    <BasePanel :current-state="currentStateAndTitle.name">
        <template #title>{{ currentStateAndTitle.title }}</template>
        <TextBlock v-if="isExplanationsShown">
            After the auction is collected, GSUc will end up in the highest bidder's VAT account. One more transaction
            is required to move GSUc from VAT to the wallet.
        </TextBlock>
        <div class="my-4">
            <WalletAuthorizationCheckPanel
                :disabled="!isWalletConnected"
                :wallet-address="walletAddress"
                :is-wallet-authorized="isWalletAuthorized"
                :is-explanations-shown="isExplanationsShown"
                :is-loading="isAuthorizing"
                @authorizeWallet="$emit('authorizeWallet')"
            />
        </div>
        <div class="flex justify-end mt-2 gap-5">
            <BaseButton :disabled="isWithdrawing" :is-loading="isRefreshing" @click="$emit('refreshWallet')">
                Refresh GSUc balance in VAT
            </BaseButton>
            <BaseButton
                type="primary"
                :disabled="!isWalletConnected || !isWalletAuthorized || !hasDaiToWithdraw || isRefreshing"
                :is-loading="isWithdrawing"
                @click="$emit('withdrawAllDaiFromVat')"
            >
                <span v-if="hasDaiToWithdraw">
                    Withdraw <FormatCurrency :value="daiVatBalance" currency="GSUc" /> from VAT
                </span>
                <span v-else> Nothing to withdraw yet </span>
            </BaseButton>
        </div>
    </BasePanel>
</template>

<script lang="ts">
import Vue from 'vue';
import BigNumber from 'bignumber.js';
import BaseButton from '~/components/common/inputs/BaseButton.vue';
import TextBlock from '~/components/common/other/TextBlock.vue';
import FormatCurrency from '~/components/common/formatters/FormatCurrency.vue';
import BasePanel from '~/components/common/other/BasePanel.vue';
import WalletAuthorizationCheckPanel from '~/components/panels/WalletAuthorizationCheckPanel.vue';
import { SurplusAuctionStates } from '~/../core/src/types';

export default Vue.extend({
    name: 'WithdrawDAIPanel',
    components: {
        BaseButton,
        BasePanel,
        TextBlock,
        FormatCurrency,
        WalletAuthorizationCheckPanel,
    },
    props: {
        walletAddress: {
            type: String,
            default: undefined,
        },
        daiVatBalance: {
            type: Object as Vue.PropType<BigNumber>,
            default: undefined,
        },
        isAuthorizing: {
            type: Boolean,
            default: false,
        },
        isWalletAuthorized: {
            type: Boolean,
            default: false,
        },
        isWithdrawing: {
            type: Boolean,
            default: false,
        },
        isRefreshing: {
            type: Boolean,
            default: false,
        },
        isExplanationsShown: {
            type: Boolean,
            default: true,
        },
        auctionState: {
            type: String as Vue.PropType<SurplusAuctionStates>,
            default: 'just-started',
        },
    },
    computed: {
        currentStateAndTitle(): PanelProps {
            if (!this.hasDaiToWithdraw) {
                return {
                    name: 'inactive',
                    title: `No GSUc to withdraw yet`,
                };
            }
            if (this.hasDaiToWithdraw && this.auctionState !== 'collected') {
                return {
                    name: 'correct',
                    title: `There is GSUc to collect from VAT`,
                };
            }
            return {
                name: 'notice',
                title: `Withdraw GSUc from VAT`,
            };
        },
        isWalletConnected(): boolean {
            return !!this.walletAddress;
        },
        hasDaiToWithdraw(): boolean {
            return this.daiVatBalance?.isGreaterThan(0) ?? false;
        },
    },
});
</script>
