<template>
    <nav class="fixed z-40 flex flex-col w-full h-16 shadow bg-feAchromatic-50 dark:bg-feAchromatic-900"
        :class="topOfPage ? 'mt-10' : 'mt-0'">
        <div class="flex items-center justify-between mx-4 mt-3 lg:w-large xl:w-feLarge md:mx-6 lg:mx-auto ">
            <div class="hidden gap-6 md:flex">
                <div class="h-10 cursor-pointer">
                    <img v-lazy="{ src: $page.props.thumb3xUrl + '/' + appInfoStore.appInfo.data?.frontendConfigSetting?.frontendLogo?.imgPath, loading: $page.props.sysImageUrl + '/loading_gif.gif', error: $page.props.sysImageUrl + '/default_photo.png' }"
                        @click="gotToHome" alt="Navbar logo" width="40px" height="40px"
                        class="object-cover w-12 h-10 rounded:xl" />
                </div>
                <ps-route-link :to="{ name: 'dashboard' }"
                    textSize="text-sm hover:text-fePrimary-500 hover:dark:text-fePrimary-500 font-medium cursor-pointer"
                    :textColor="currentPage === 'dashboard' ? 'text-fePrimary-500' : 'text-feSecondary-800 dark:text-feAchromatic-50'"
                    class="px-4 py-2">
                    {{ $t("ps_nav_bar__home") }}
                </ps-route-link>
                <ps-route-link :to="{ name: 'fe_category.index' }"
                    textSize="text-sm hover:text-fePrimary-500 hover:dark:text-fePrimary-500 font-medium cursor-pointer"
                    :textColor="currentPage === 'fe_category.index' ? 'text-fePrimary-500' : 'text-feSecondary-800 dark:text-feAchromatic-50'"
                    class="px-4 py-2">
                    {{ $t("category_list__title") }}
                </ps-route-link>
                <ps-route-link :to="{name: 'fe_blog' }"
                    textSize="text-sm hover:text-fePrimary-500 hover:dark:text-fePrimary-500 font-medium cursor-pointer"
                    :textColor="currentPage === 'fe_blog' ? 'text-fePrimary-500' : 'text-feSecondary-800 dark:text-feAchromatic-50'"
                    class="px-4 py-2">
                    {{ $t("ps_nav_bar__blogs_title") }}
                </ps-route-link>
                <ps-route-link :to="{name: 'fe_contact_us' }"
                textSize="text-sm hover:text-fePrimary-500 hover:dark:text-fePrimary-500 font-medium cursor-pointer"
                :textColor="currentPage === 'fe_contact_us' ? 'text-fePrimary-500' : 'text-feSecondary-800 dark:text-feAchromatic-50'"
                class="px-4 py-2">
                    {{ $t("ps_nav_bar__contact_us_title") }}
                </ps-route-link>
            </div>
            <div class="block cursor-pointer md:hidden" @click="toggleMobileMenu">
                <ps-icon class="cursor-pointer" textColor="text-feSecondary-800 dark:text-feAchromatic-50" name="menu" h="24"
                    w="24" />
            </div>
            <div class="flex items-center gap-6">
                <ps-icon class="cursor-pointer" textColor="text-feSecondary-800 dark:text-feAchromatic-50 hover:text-fePrimary-500"
                    name="search" h="24" w="24" viewBox="0 0 23 23" @click="searchClicked()" />
                <div v-if="$page.props.authUser != null" class="flex items-center justify-between gap-6">
                    <ps-route-link :to="{ name: 'fe_chat_list' }">
                        <div class="relative">
                            <ps-icon class="cursor-pointer"
                                textColor="text-feSecondary-800 dark:text-feAchromatic-50 hover:text-fePrimary-500" name="message"
                                h="24" w="24" viewBox="0 0 23 23" />
                            <div class="me-6 p-0.5 w-[19px] h-[19px] text-xs flex justify-center items-center font-semibold rounded-full bg-fePrimary-500 text-feAchromatic-50 absolute -top-2 -right-8 rtl:right-4"
                                v-if="parseInt(userunreadmsgStore.unreadCount.data?.buyerUnreadCount) + parseInt(userunreadmsgStore.unreadCount.data?.sellerUnreadCount)">
                                {{ parseInt(userunreadmsgStore.unreadCount.data?.buyerUnreadCount) +
                                    parseInt(userunreadmsgStore.unreadCount.data?.sellerUnreadCount) ?
                                    parseInt(userunreadmsgStore.unreadCount.data?.buyerUnreadCount) +
                                    parseInt(userunreadmsgStore.unreadCount.data?.sellerUnreadCount) : '' }}</div>
                        </div>
                    </ps-route-link>
                    <ps-route-link :to="{ name: 'fe_notification_list' }">
                        <div class="relative">
                            <ps-icon class="cursor-pointer"
                                textColor="text-feSecondary-800 dark:text-feAchromatic-50 hover:text-fePrimary-500"
                                name="bell-outline" h="24" w="24" viewBox="0 -2 18 23" />
                            <div class="me-6 p-0.5 w-[19px] h-[19px] text-xs flex justify-center items-center font-semibold rounded-full bg-fePrimary-500 text-feAchromatic-50 absolute -top-2 -right-8 rtl:right-4"
                                v-if="userunreadmsgStore.unreadCount.data?.notiUnreadCount && userunreadmsgStore.unreadCount.data?.notiUnreadCount != 0">{{
                                    userunreadmsgStore.unreadCount.data?.notiUnreadCount }}</div>
                        </div>
                    </ps-route-link>

                    <ps-route-link v-if="appInfoStore?.isVendorCheckoutSettingOn() && appInfoStore?.isVendorSettingOn()" :to = "{ name: 'fe_shopping_cart', query: { user_id: loginUserId } }">
                        <div class="relative">
                            <ps-icon class="cursor-pointer"
                                textColor="text-feSecondary-800 dark:text-feAchromatic-50 hover:text-fePrimary-500"
                                name="shoppingCart"  h="24" w="24" viewBox="0 0 23 23" />
                            <div class="me-6 p-0.5 w-[19px] h-[19px] text-xs flex justify-center items-center font-semibold rounded-full bg-fePrimary-500 text-feAchromatic-50 absolute -top-2 -right-8 rtl:right-4"
                                v-if="AddToCartStore.totalQuantity > 0">
                                {{ AddToCartStore.totalQuantity }}
                            </div>
                        </div>
                    </ps-route-link>
                    <!-- for profile dropdown -->
                    <ps-dropdown horizontalAlign="center" class='w-full ms-3 sm:ms-4 lg:ms-6 xxl:ms-8' h="h-auto"
                        boxPositioning="mt-[16px] translate-x-16 lg:translate-x-20 xl:translate-x-24">
                        <template #select>
                            <div class="flex items-center">
                                <div class="w-8 h-8 rounded-full">
                                    <img v-if="$page.props.authUser?.user_cover_photo"
                                        class="object-cover w-8 h-8 rounded-full cursor-pointer"
                                        v-lazy="{ src: $page.props.uploadUrl + '/' + $page.props.authUser?.user_cover_photo, loading: $page.props.sysImageUrl + '/loading_gif.gif', error: $page.props.sysImageUrl + '/default_profile.png' }"
                                        :alt="$t('core__be_profile')">
                                    <img v-else class="object-cover w-8 h-8 rounded-full cursor-pointer"
                                        :src="$page.props.sysImageUrl + '/default_profile.png'" :alt="$t('core__be_profile')">
                                </div>
                                <ps-icon name="downArrow"></ps-icon>
                            </div>
                        </template>
                        <template #list>
                            <div class="rounded-md shadow-xs w-[280px]">
                                <div class="z-30 ">
                                    <ps-route-link :to="{ name: 'fe_profile' }" textSize="text-sm"
                                        class="flex justify-center p-2 m-2 mt-4 border rounded cursor-pointer hover:bg-fePrimary-50 dark:hover:bg-fePrimary-900">
                                        <ps-label textColor="text-feAchromatic-500">{{ $t('core__view_profile') }}</ps-label>
                                    </ps-route-link>

                                    <hr class="mx-2 mt-2 mb-2">

                                    <ps-route-link :to="{ name: 'fe_favourite_items' }" textSize="text-sm"
                                        class="flex items-center w-full p-4 cursor-pointer hover:bg-fePrimary-50 dark:hover:bg-fePrimary-900">
                                        <ps-icon name="heartOutline" class="ms-2" />
                                        <ps-label class="ms-2">{{ $t('core__fe_favourites') }}</ps-label>
                                    </ps-route-link>

                                    <ps-route-link :to="{ name: 'fe_offer_list' }" textSize="text-sm"
                                        class="flex items-center w-full p-4 cursor-pointer hover_bg-fePrimary-50 dark_hover_bg-fePrimary-900">
                                        <ps-icon name="offer-hand" class="ms-2" />
                                        <ps-label class="ms-2">{{ $t("core__fe_offers_lists")}}</ps-label>
                                    </ps-route-link>

                                    <button
                                        class="flex items-center w-full p-4 cursor-pointer hover:bg-fePrimary-50 dark:hover:bg-fePrimary-900"
                                        hover="" focus="" colors="" @click='openUserSetting'>
                                        <ps-icon class="ms-2" name="setting" />
                                        <ps-label class="ms-2" textColor="">{{ $t("profile__user_setting") }}</ps-label>
                                    </button>

                                    <ps-route-link v-if="appInfoStore?.isVendorCheckoutSettingOn()" :to="{ name: 'fe_order_history' }" textSize="text-sm"
                                        class="flex items-center w-full p-4 cursor-pointer hover:bg-fePrimary-50 dark:hover:bg-fePrimary-900">
                                        <ps-icon name="order" class="ms-2" />
                                        <ps-label class="ms-2">{{ $t("core_fe__my_orders")}}</ps-label>
                                    </ps-route-link>

                                    <hr class="mx-2 mt-2 mb-2" />
                                    <ps-route-link v-if="$page.props.canAccessVendor && appInfoStore?.isVendorSettingOn()" :to="{ name: 'vendor.setSession' }"
                                        textSize="text-sm"
                                        class="flex items-center w-full p-4 cursor-pointer hover:bg-fePrimary-50 dark:hover:bg-fePrimary-900">
                                        <ps-icon name="refresh" class="ms-2" />
                                        <ps-label class="ms-2">{{ $t('core__fe_switch_to_vendor') }}</ps-label>
                                    </ps-route-link>
                                    <ps-route-link v-if="$page.props.canAccessAdminPanel" :to="{ name: 'admin.index' }"
                                        textSize="text-sm"
                                        class="flex items-center w-full p-4 cursor-pointer hover:bg-fePrimary-50 dark:hover:bg-fePrimary-900">
                                        <ps-icon name="refresh" class="ms-2" />
                                        <ps-label class="ms-2">{{ $t('core__fe_switch_to_admin') }}</ps-label>
                                    </ps-route-link>
                                    <button @click="clickLogout"
                                        class="flex items-center w-full p-4 cursor-pointer hover:bg-fePrimary-50 dark:hover:bg-fePrimary-900 ">
                                        <ps-icon name="signOut" class="ms-2 " textColor="text-fePrimary-500" />
                                        <ps-label class="ms-2" textColor="text-fePrimary-500">{{ $t('core__be_logout')
                                        }}</ps-label>
                                    </button>
                                </div>
                            </div>
                        </template>
                    </ps-dropdown>
                    <!-- end profile -->
                    <!-- <ps-route-link :to="{name: 'fe_profile' }">
                        <img alt="Placeholder" class="flex items-center justify-center object-cover w-10 h-10 bg-transparent rounded-full cursor-pointer" width='50px' height='50px'
                            v-lazy=" { src: $page.props.thumb1xUrl + '/' + $page.props.authUser?.user_cover_photo, loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_profile.png' }">
                    </ps-route-link> -->
                </div>
                <ps-label v-else @click="loginClicked"
                    class='px-4 py-2 text-sm font-medium cursor-pointer dark:border-feAccent-500'
                    textColor="text-fePrimary-500">
                    {{ $t("ps_nav_bar__login") }}
                </ps-label>
                <!-- {{ submitButtonShow }} -->
                <ps-route-link :to="{ name: $page.props.authUser != null ? 'fe_item_entry' : 'login' }" v-if="submitButtonShow == true">
                    <ps-button padding="lg:px-4 lg:py-2 p-2">
                        <ps-icon name="plus-circle" class="me-0 lg:me-2" h="24" w="24"/>
                        <span class="hidden lg:inline">{{ $t("ps_nav_bar__btn_submit_ad") }}</span>
                    </ps-button>
                </ps-route-link>
            </div>
        </div>
        <transition>
            <div v-if="activeMobileMenu"
                class="h-auto pb-1 mt-3 border border-b-2 text-fePrimary-500 dark:text-feSecondary-900 bg-feAchromatic-50 dark:bg-feAchromatic-900">
                <div class="flex flex-col gap-6 p-5">
                    <div class="h-10">
                        <img v-lazy="{ src: $page.props.thumb3xUrl + '/' + appInfoStore.appInfo.data?.frontendConfigSetting?.frontendLogo?.imgPath, loading: $page.props.sysImageUrl + '/loading_gif.gif', error: $page.props.sysImageUrl + '/default_photo.png' }"
                            @click="gotToHome" alt="Navbar logo" width="40px" height="40px"
                            class="object-cover w-auto h-10 rounded:xl" />
                    </div>
                    <ps-route-link :to="{ name: 'dashboard' }" @click="activeMobileMenu = false"
                        textSize="text-sm text-feSecondary-800 hover:text-fePrimary-500 font-medium cursor-pointer"
                        class="px-4 py-2">
                        {{ $t("ps_nav_bar__home") }}
                    </ps-route-link>
                    <ps-route-link :to="{ name: 'fe_category.index' }" @click="activeMobileMenu = false"
                        textSize="text-sm text-feSecondary-800 hover:text-fePrimary-500 font-medium cursor-pointer"
                        class="px-4 py-2">
                        {{ $t("category_list__title") }}
                    </ps-route-link>
                    <ps-route-link :to="{name: 'fe_blog' }" @click="activeMobileMenu = false"
                        textSize="text-sm text-feSecondary-800 hover:text-fePrimary-500 font-medium cursor-pointer"
                        class="px-4 py-2">
                        {{ $t("ps_nav_bar__blogs_title") }}
                    </ps-route-link>
                    <ps-route-link :to="{name: 'fe_contact_us' }" @click="activeMobileMenu = false"
                        textSize="text-sm text-feSecondary-800 hover:text-fePrimary-500 font-medium cursor-pointer"
                        class="px-4 py-2">
                        {{ $t("ps_nav_bar__contact_us_title") }}
                    </ps-route-link>
                </div>
            </div>
        </transition>

        <ps-confirm-dialog v-if="showConfirmDialog" ref="ps_confirm_dialog" />
        <user-setting-modal v-if="showUserSettingModal" ref="user_setting_modal" />
        <search-modal v-if="showSearchModal" ref="search_modal" />
    </nav>
</template>

<script>
// import PsUtils from '@templateCore/utils/PsUtils';

import { defineComponent, ref, onMounted, defineAsyncComponent } from "vue";
import { useUserStore } from "@templateCore/store/modules/user/UserStore";
import { PsValueStore } from '@templateCore/store/modules/core/PsValueStore';
import firebaseApp from 'firebase/app';
import "firebase/auth"

// import Velocity from "velocity-animate";
//import $ from "cash-dom";
import { useUserUnReadMessageStore } from "@templateCore/store/modules/chat/UserUnreadMessageStore";
import UserUnReadMessageParameterHolder from '@templateCore/object/holder/UserUnReadMessageParameterHolder';
import { useAddToCartStoreState } from '@templateCore/store/modules/addToCart/AddToCartStore';
//import AddToCartParameterHolder from '@templateCore/object/holder/AddToCartParameterHolder';

import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
import PsDropdown from '@template1/vendor/components/core/dropdown/PsDropdown.vue';
import PsLine from "@template1/vendor/components/core/line/PsLine.vue";
import PsRouteLink from '@template1/vendor/components/core/link/PsRouteLink.vue';
import PsLabel from "@template1/vendor/components/core/label/PsLabel.vue";
import PsButton from "@template1/vendor/components/core/buttons/PsButton.vue";
import { router } from '@inertiajs/vue3';
import PsConst from '@templateCore/object/constant/ps_constants';
const PsConfirmDialog = defineAsyncComponent(() => import('@template1/vendor/components/core/dialog/PsConfirmDialog.vue'));
import PsUtils from '@templateCore/utils/PsUtils';
import { usePsAppInfoStoreState } from '@templateCore/store/modules/appinfo/AppInfoStore'

import { trans } from 'laravel-vue-i18n';
import { useThemeStore } from "../../../../../../../../../resources/js/store/Utilities/ThemeStore";

const UserSettingModal = defineAsyncComponent(() => import('@template1/vendor/components/modules/user/UserSettingModal.vue'));
const SearchModal = defineAsyncComponent(() => import('@template1/vendor/components/modules/search/SearchModal.vue'));

export default defineComponent({
    components: {
        PsIcon,
        PsDropdown,
        PsLine,
        PsRouteLink,
        PsLabel,
        PsButton,
        PsRouteLink,
        PsConfirmDialog,
        UserSettingModal,
        SearchModal,
    },
    props: {
        topOfPage: {
            type: Boolean,
            default: false
        },
        uploadSetting: {
            type: String
        }

    },
    setup(props) {

        const ps_confirm_dialog = ref();
        const search_modal = ref();
        const activeMobileMenu = ref(false);
        const userProvider = useUserStore();
        const userProfile = ref();
        const userunreadmsgStore = useUserUnReadMessageStore();
        const holder = new UserUnReadMessageParameterHolder();
        const AddToCartStore = useAddToCartStoreState();
        //const AddToCartParameterHolder = new AddToCartParameterHolder();
        const submitButtonShow = ref();
        const currentPage = ref(route().current());
        const vendorExists = ref(false);
        const totalQuantity = ref(0);
        const appInfoStore = usePsAppInfoStoreState();
        const showSearchModal = ref(false);
        const showUserSettingModal = ref(false);
        const showConfirmDialog = ref(false);

        const user_setting_modal = ref();

        let psValueStore = PsValueStore();

        const themeStore = useThemeStore();
        
        const loginUserId = psValueStore.getLoginUserId();
        holder.userId = loginUserId;
        holder.deviceToken = localStorage.deviceToken;

        async function loadMessage() {
            if( holder.userId != null
                && holder.userId != "nologinuser") {
                await userunreadmsgStore.postUserUnreadMessageCount(holder);
                await AddToCartStore.getAllItemFromCart(loginUserId);
                await AddToCartStore.totalQuantity;

            }
        }

        onMounted(() => {
            loadMessage();
            isSubmitButtonShow();
        })

        function userNameClicked() {
            PsValueStore.psValueStore.loadData();
            psValueStore = PsValueStore.psValueStore;
        }

        function gotToHome() {
            router.get(route('dashboard'));
        }

        router.on('finish', (event) => {
            currentPage.value = route().current();
        })

        function toggleMobileMenu(bol = true) {
            if (bol) {
                activeMobileMenu.value = !activeMobileMenu.value;
            }
        }

        async function searchClicked() {
            showSearchModal.value = true;
            await PsUtils.waitingComponent(search_modal);
            search_modal.value.openModal();
        }

        function enter(el, done) {
            // Velocity(
            // 	el,
            // 	"slideDown",
            // 	{
            // 	duration: 300
            // 	},
            // 	{
            // 	complete: done
            // 	}
            // );
        }

        function leave(el, done) {
            // Velocity(
            // 	el,
            // 	"slideUp",
            // 	{
            // 	duration: 300
            // 	},
            // 	{
            // 	complete: done
            // 	}
            // );
        }

        async function clickLogout() {
            // psValueStore.logout();
            showConfirmDialog.value = true;
            await PsUtils.waitingComponent(ps_confirm_dialog);
            ps_confirm_dialog.value.openModal(
                trans('core__be_logout'),
                trans('logout_dialog_msg'),
                trans('chat__confirm'),
                trans('chat__cancel')
                ,
                () => {
                    firebaseApp.auth().signOut();
                    router.post(route('logout'));
                },
                () => {
                    PsUtils.log('cancel');
                }
            );
            // router.get(route('dashboard'));
        }
        function registerClicked() {

            if (activeMobileMenu.value) {
                activeMobileMenu.value = false;
            }

            router.get(route('login'));
        }
        function loginClicked() {

            if (activeMobileMenu.value) {
                activeMobileMenu.value = false;
            }
            router.get(route('login'));
        }

        async function openUserSetting() {
            showUserSettingModal.value = true;
            await PsUtils.waitingComponent(search_modal);
            user_setting_modal.value.openModal();
        }


        async function isSubmitButtonShow() {
            // alert(props.uploadSetting);
            if (loginUserId != 'nologinuser') {
                await userProvider.loadUser(loginUserId);
                const roleId = await userProvider.user.data ? userProvider.user.data.roleId : '';
                const isVerifybluemark = await userProvider.user.data ? userProvider.user.data.isVerifybluemark : '';
                if (appInfoStore.appInfo.data?.uploadSetting == 'admin') {
                    // alert(appInfoStore.appInfo.data?.uploadSetting);
                    if(roleId == 1){
                        // alert("here");
                        submitButtonShow.value = true;
                    }else{
                        submitButtonShow.value = false
                    }
                }
                if(appInfoStore.appInfo.data?.uploadSetting == 'admin-bluemark') {
                    if (roleId == 1 || isVerifybluemark == 1) {
                        submitButtonShow.value = true
                    } else {
                        submitButtonShow.value = false
                    }
                }
                if(appInfoStore.appInfo.data?.uploadSetting == 'all'){
                    submitButtonShow.value = true
                }
                if(appInfoStore.appInfo.data?.uploadSetting == 'vendor-only'){

                    // Check if the user is an admin or a vendor
                    const vendor = await axios.get('checkVendor');
                    vendorExists.value = vendor.data.vendorExists;
                    console.log("Vendor Check:", vendorExists.value);

                    if (roleId == 1){
                        submitButtonShow.value = true;
                        console.log("User is  admin .")
                    }
                    else if (vendorExists.value) {
                        submitButtonShow.value = vendorExists.value;
                        console.log("User is vendor.")
                    }

                    else {
                        submitButtonShow.value = vendorExists.value;
                        console.log("User is neither admin nor vendor.")
                    }
                }

            }
            else {
                submitButtonShow.value = false
                // if(props.uploadSetting == 'all'){
                //     submitButtonShow.value = true
                // } else{
                //     submitButtonShow.value = false
                // }
            }
}


        return {
            // check,
            // toggleDarkMode,
            userunreadmsgStore,
            AddToCartStore,
            userProfile,
            themeStore,
            activeMobileMenu,
            psValueStore,
            userProvider,
            gotToHome,
            enter,
            leave,
            toggleMobileMenu,
            clickLogout,
            loginClicked,
            userNameClicked,
            registerClicked,
            searchClicked,
            ps_confirm_dialog,
            appInfoStore,
            user_setting_modal,
            search_modal,
            openUserSetting,
            loginUserId,
            isSubmitButtonShow,
            submitButtonShow,
            currentPage,
            totalQuantity,
            showSearchModal,
            showUserSettingModal,
            showConfirmDialog
            // memoryUsage
        }

    },
    computed: {
        // submitButtonShow() {
        //     // alert(this.loginUserId);
        //     if(this.loginUserId != 'nologinuser'){
        //         if (this.appInfoStore.appInfo.data?.uploadSetting == 'admin') {
        //             const test= this.userProvider.loadUser(this.loginUserId);
        //             console.log(this.userProfile.value);
        //             if(this.userProfile.value.roleId == 1){
        //                 return true
        //             }else{
        //                 return false
        //             }
        //         }
        //         if (this.appInfoStore.appInfo.data?.uploadSetting == 'admin-bluemark') {
        //             if(this.userProfile.value.roleId == 1 || this.userProfile.value.isVerifybluemark == 1){
        //                 return true
        //             }else{
        //                 return false
        //             }
        //         }
        //         else{
        //             return true
        //         }
        //     }else{
        //         return true;
        //     }
        // }
    }
});
</script>
