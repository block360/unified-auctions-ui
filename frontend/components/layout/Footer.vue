<template>
    <footer class="Footer">
        <ul
            class="
                flex flex-col
                md:flex-row
                items-center
                space-y-2 space-x-0
                md:space-y-0 md:space-x-10
                justify-center
            "
        >
            <li>
                <a
                    class="FooterLink"
                    href="https://drive.google.com/file/d/12AIf4cBp7bmkgdyh6D25y4QnD9-3bJ8Y/view?usp=sharing"
                    target="_blank"
                >
                    Terms & Conditions
                </a>
            </li>
            <li>
                <NuxtLink class="FooterLink" to="/privacy">Privacy</NuxtLink>
            </li>
            <li v-if="!isUnified">
                <a class="FooterLink" :href="githubURL" target="_blank">Source Code</a>
            </li>
            <li v-if="contactEmail">
                <a class="FooterLink" :href="`mailto:${contactEmail}?subject=Issue on AuctionsUI`" target="_blank"
                    >Report a Problem</a
                >
            </li>
            <li>
                <a class="FooterLink" href=""> Roadmap </a>
            </li>
            <li>
                <NuxtLink class="FooterLink" :to="`/dashboard?network=${pageNetwork}`">Dashboard</NuxtLink>
            </li>
            <li>
                <NuxtLink class="FooterLink" to="/features">Features</NuxtLink>
            </li>
            <li class="flex items-center space-x-4">
                <span class="FooterLink">Keep in touch:</span>
                <a :href="githubURL" target="_blank"><icon type="github" class="text-xl" /></a>
                <a href="https://twitter.com/GSUcoin" target="_blank"><icon type="twitter" class="text-xl" /></a>
                <!--
                    //@GSUpro remove chat link
                     <a href="https://forum.makerdao.com/c/core-units/sidestream-core-unit/58" target="_blank">
                    <DiscourseIcon class="w-5 h-5 mt-1" />
                </a> -->
            </li>
        </ul>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import { Icon } from 'ant-design-vue';
// import DiscourseIcon from '~/assets/icons/discourse.svg';

export default Vue.extend({
    name: 'Footer',
    components: {
        Icon,
        // DiscourseIcon
    },
    props: {
        type: {
            type: String,
            default: 'default',
            validator: type => ['default', 'unified'].includes(type),
        },
    },
    computed: {
        contactEmail(): string | undefined {
            return process.env.CONTACT_EMAIL;
        },
        githubURL(): string | undefined {
            return process.env.GITHUB_URL;
        },
        isUnified(): Boolean {
            return this.type === 'unified';
        },
        pageNetwork(): string {
            return this.$store?.getters['network/getPageNetwork'];
        },
        termsAndConditionsURL(): string {
            return this.$config?.TERMS_AND_CONDITIONS_URL || '';
        },
    },
});
</script>

<style scoped>
.Footer {
    @apply opacity-75 bg-gray-100 w-full py-4 mt-8 dark:bg-gray-800;
}

.Footer .FooterLink {
    @apply dark:text-gray-100;
}

.Footer a {
    @apply dark:text-gray-100 dark:hover:text-primary;
}
</style>
