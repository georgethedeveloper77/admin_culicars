<template>
    <Head>
        <!-- @todo Need to move to server side rendering -->
        <link rel="icon" type="image/svg+xml" :href="$page.props.thumb1xUrl + '/'+ appInfoStore.appInfo.data?.frontendConfigSetting?.frontendIcon?.imgPath" />
        <link
            rel="preload"
            as="image"
            :href="$page.props.thumb1xUrl + '/'+ appInfoStore.appInfo.data?.frontendConfigSetting?.frontendBanner?.imgPath"
            />
        <link
            rel="preload"
            as="image"
            :href="$page.props.uploadUrl + '/'+ appInfoStore.appInfo.data?.frontendConfigSetting?.frontendBanner?.imgPath"
            />
        <!-- Preconnect to Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    </Head>

    <div :dir="languageStore.getLanguageDir()" class='h-full bg-feAchromatic-50'>
        <div  class="flex flex-col w-full h-full min-h-screen ">

            <!-- Body -->
            <main class="flex-grow bg-feAchromatic-50 dark:bg-feAchromatic-900">
                <slot />
            </main>
            <div class="fixed top-0">
                <ps-nav-tab-bar  :topOfPage="scrollStore.atTopOfPage" />
                <ps-nav-bar :topOfPage="scrollStore.atTopOfPage" :uploadSetting="$page.props.backendSetting.upload_setting"/>
            </div>

            <!-- Footer -->
            <footer>
                <footer-view />
            </footer>

        </div>
    </div>
    <ps-notification-box />
</template>

<script setup>

// libs
import { onMounted , onUnmounted, ref } from 'vue';
import { Head } from '@inertiajs/vue3';

// Components
import FooterView from '@template1/vendor/views/general/FooterView.vue';
import PsNavTabBar from '../navbar/PsNavTabBar.vue';
import PsNavBar from '../navbar/PsNavBar.vue';
import PsNotificationBox from '@template1/vendor/components/core/notificationbox/PsNotificationBox.vue';
import AppInfoParameterHolder from '@templateCore/object/holder/AppInfoParameterHolder';
import { usePsAppInfoStoreState } from '@templateCore/store/modules/appinfo/AppInfoStore'
import { PsValueStore } from '@templateCore/store/modules/core/PsValueStore';
import PsConst from '@templateCore/object/constant/ps_constants';
import { useNotiStoreState } from "@templateCore/store/modules/noti/NotificationStore";
import { router, usePage } from '@inertiajs/vue3'
import "https://unpkg.com/delayed-scroll-restoration-polyfill@0.1.1/index.js";
import { useThemeStore } from '../../../../../../../../../resources/js/store/Utilities/ThemeStore';
import { useLanguageStore } from '../../../../../../../../../resources/js/store/Localization/LanguageStore';
import { useScrollStore } from '../../../../../../../../../resources/js/store/Utilities/ScrollRestorationStore';
import { useNotificationStore } from '../../../../../../../../../resources/js/store/Notification/NotificationStore';
import { setupAxiosInterceptors, cancelAllRequests } from './axiosMiddleware';

// Get props from Inertia
const { props } = usePage();

// Init Stores
const scrollStore = useScrollStore();
const appInfoStore = usePsAppInfoStoreState();
const themeStore = useThemeStore();
const languageStore = useLanguageStore();
const notiStore = useNotiStoreState();
let psValueStore = PsValueStore();
const notificationStore = useNotificationStore();

// Main Actions
// Setup Axios interceptors
setupAxiosInterceptors();

scrollStore.initStoreRestoration();
notificationStore.initFirebase(props.firebaseConfig);
notificationStore.requestPermission();



// Holders
const appInfoParameterHolder = new AppInfoParameterHolder();

// Set Login User
const loginUserId = ref(props.authUser ? props.authUser.id : PsConst.NO_LOGIN_USER);
psValueStore.replaceLoginUserId(loginUserId.value);


router.on('finish', (event) => {
    notificationStore.isUserPresence(route().current());
})


onMounted( async () =>{

    themeStore.initDarkMode();
    languageStore.initActiveLangauge();

    scrollStore.addHandleScrollListener();

    var loading = document.getElementById("home_loading__container");
    loading.style.display = "none";

    // init service work
    notificationStore.initMessageServieWorker(props.appUrl,
                                props.webPushKey,
                                psValueStore,
                                route('firebase.topicSubscribeForNoti'),
                                appInfoStore,
                                notiStore,
                                loginUserId
    );



    // Load App Info
    appInfoParameterHolder.userId = loginUserId.value;
    // console.log(props.getAppInfo);
    // appInfoStore.loadAppInfo(appInfoParameterHolder);
    appInfoStore.loadAppInfoProps(props.getAppInfo);


})

router.on('start', (event) => {
    console.log("Cancel");
    cancelAllRequests();
})

window.addEventListener('beforeunload', () => {
    cancelAllRequests();
});

onUnmounted(() => {
    scrollStore.removeHandleScrollListener();
})
</script>
