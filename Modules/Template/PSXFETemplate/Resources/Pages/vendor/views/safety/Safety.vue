<template>
    <Head :title="$t('safety__safety_tips')"/>
    <ps-content-container>
        <template #content>
            <div class='sm:mt-32 lg:mt-36 mt-28 mb-16'>
                <ps-label class="text-center font-semibold text-2xl sm:text-3xl"> {{ $t("safety__safety_tips") }} </ps-label>
                <p class="mt-4" v-if="aboutUsStore.aboutus.data != null">
                    <ps-label class="ck-content" v-html="aboutUsStore.aboutus.data.safetyTips"> </ps-label>
                </p>
            </div>
        </template>
    </ps-content-container>
</template>

<script lang="ts">
import { Head } from '@inertiajs/vue3';
import PsContentContainer from '@template1/vendor/components/layouts/container/PsContentContainer.vue';
import PsLabelTitle from '@template1/vendor/components/core/label/PsLabelTitle.vue';
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';

import { useAboutUsStoreState } from "@templateCore/store/modules/aboutus/AboutUsStore";
import PsFrontendLayout from '@template1/vendor/components/layouts/container/PsFrontendLayout.vue';
import PsConst from '@templateCore/object/constant/ps_constants';
import { PsValueStore } from '@templateCore/store/modules/core/PsValueStore';

export default {
    name : "SafetyView",
    components : {
        PsContentContainer,
        PsLabelTitle,
        PsLabel,
        Head
    },
    layout: PsFrontendLayout,
    setup(props) {
        const aboutUsStore = useAboutUsStoreState();
        let psValueStore = PsValueStore();
        const loginUserId = psValueStore.getLoginUserId();
        aboutUsStore.loadAboutUs(loginUserId);

        return {
            aboutUsStore,
        };
    }
}
</script>
