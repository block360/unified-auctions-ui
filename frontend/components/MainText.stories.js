import { storiesOf } from '@storybook/vue';
import faker from 'faker';
import { random } from 'lodash';
import MainText from './MainText';
import { generateFakeAuctions } from '~/helpers/generateFakeAuction';

const fakeAuctions = generateFakeAuctions(random(0, 15));
const randomSelectedAuction = faker.random.arrayElement(fakeAuctions);

const common = {
    components: { MainText },
    data: () => ({
        auctions: fakeAuctions,
        selectedAuctionId: randomSelectedAuction.id,
    }),
};

storiesOf('MainText', module)
    .add('Plain', () => ({
        ...common,
        template: '<MainText :auctions="auctions" :selectedAuctionId="selectedAuctionId" />',
    }))
    .add('No props', () => ({
        ...common,
        template: '<MainText />',
    }));