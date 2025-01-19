<template>
    <div v-if="isDisplayGoogleAdsense">
        <!-- <h2>ADVERTISEMENT {{ adsClient + " " + adsDisplayId }}</h2> -->
        <ins class="adsbygoogle text-center"
            style="display:block"
            :data-ad-client=adsClient
            :data-ad-slot=adsDisplayId
            data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
    </div>

</template>

<script>

import {  onMounted, onBeforeMount, ref } from 'vue';

// Providers
import { PsValueStore } from '@templateCore/store/modules/core/PsValueStore';
import { usePsAppInfoStoreState } from '@templateCore/store/modules/appinfo/AppInfoStore';
import AppInfoParameterHolder from '@templateCore/object/holder/AppInfoParameterHolder';
export default {
    name : "PsAdSense",
    props: {
        adStyle: {
            type: String,
            required: false,
            default: "display:block; width: 300px; height: 190px;",
        },
        adStyleSm: {
            type: String,
            required: false,
            default: "display:block; width: 468px; height: 60px;",
        },
        adStyleLg: {
            type: String,
            required: false,
            default: "display:block; width: 728px; height: 90px;",
        },
        adFormat: {
            type: String,
            required: false,
            default: "auto",
        },
        adsDisplayId: {
            type: String,
            required: false,
            default: "",
        },
        adsClient: {
            type: String,
            required: false,
            default: "",
        },
        isDisplayGoogleAdsense: {
            type: Number,
            required: false,
            default: "",
        }

    },
    setup(props) {
        const psValueStore = PsValueStore();
        const loginUserId = psValueStore.getLoginUserId();
        const appInfoStore = usePsAppInfoStoreState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        appInfoParameterHolder.userId = loginUserId;

        const dataReady= ref(false);

        onMounted( async() =>{
            if(props.isDisplayGoogleAdsense){
                console.log("isDisplayGoogleAdsense " + props.isDisplayGoogleAdsense);

                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        });

        return{
            dataReady
        }
    }
}
</script>
