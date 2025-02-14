<template>
    <div class="flex flex-col space-y-8 py-8">
        <WhatIsMakerProtocol v-if="isExplanationsShown" class="TextBlock"></WhatIsMakerProtocol>
        <TextBlock v-if="isExplanationsShown" title="What are debt auctions?" class="TextBlock">
            A
            <Explain text="debt auction"
                >In GSU Protocol terms, debt auctions are called flop auctions and are operated via the flop.sol
                contract.</Explain
            >
            is the process of stabilizing GSUc price, where
            <Explain text="GSUp tokens"
                >GSU protocol governance tokens that can be used to vote within GSU protocol and whose price
                algorithmically depends on the stability and prosperity of the GSU protocol ecosystem</Explain
            >
            are auctioned off for GSUc. The GSUc obtained by the protocol is used to recapitalise the system that has
            accrued debt.
        </TextBlock>
        <TextBlock v-if="isExplanationsShown" title="Why would I participate?" class="TextBlock">
            Your participation can yield a profit by leveraging price differences between the auction price from the
            GSU Protocol and the price on other marketplaces. In a reverse auction system, bidders compete by
            specifying how little GSUp they are willing to receive for a fixed amount of GSUc they have to pay. Once
            the auction has ended, the GSUp auctioned off can be collected by the bidder with the lowest accepted
            compensation. As long as the auction price for GSUp is below the exchange rate on other marketplaces there
            is a chance to make a profit.
        </TextBlock>
        <div
            class="w-full self-center"
            :class="{ 'max-w-4xl': isExplanationsShown, 'md:px-10': !isExplanationsShown }"
        >
            <DebtAuctionsTable
                class="block overflow-x-auto"
                :auctions="auctions"
                :selected-auction-id.sync="selectedAuctionId"
                :show-more-rows="!isExplanationsShown"
                :is-loading="areAuctionsFetching"
                :last-updated="lastUpdated"
                :error="auctionsError"
            />
        </div>
        <WhatIsCatch v-if="isExplanationsShown" class="TextBlock"></WhatIsCatch>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { DebtAuctionTransaction } from 'auctions-core/src/types';
import DebtAuctionsTable from '~/components/auction/debt/DebtAuctionsTable.vue';
import WhatIsMakerProtocol from '~/components/common/other/WhatIsMakerProtocol.vue';
import WhatIsCatch from '~/components/common/other/WhatIsCatch.vue';
import TextBlock from '~/components/common/other/TextBlock.vue';
import Explain from '~/components/common/other/Explain.vue';

export default Vue.extend({
    name: 'DebtText',
    components: {
        WhatIsMakerProtocol,
        WhatIsCatch,
        TextBlock,
        Explain,
        DebtAuctionsTable,
    },
    props: {
        auctions: {
            type: Array as PropType<DebtAuctionTransaction[]>,
            default: () => [],
        },
        areAuctionsFetching: {
            type: Boolean,
            default: false,
        },
        auctionsError: {
            type: String,
            default: null,
        },
        selectedAuctionId: {
            type: Number,
            default: null,
        },
        isExplanationsShown: {
            type: Boolean,
            default: true,
        },
        lastUpdated: {
            type: Date,
            default: null,
        },
    },
});
</script>

<style scoped>
.TextBlock {
    @apply max-w-screen-sm self-center;
}
</style>
