<template>
    <div class="">
        <search-and-popular-category-list-card
            v-if = isShowSearchAndPopularCategoryComponent
            :bannerImgPath="appInfoStore.appInfo.data?.frontendConfigSetting?.frontendBanner?.imgPath"
            :showSubCat="appInfoStore?.isShowSubCategory()"
            :getAllPopularCategoryList = $props.getAllPopularCategoryList
            :limit = "$props.mobileSetting?.category_loading_limit ?? 6"/>
        <div v-if = !isShowSearchAndPopularCategoryComponent class="h-28"></div>
        <category-horizontal-list
            v-if = isShowCategoryHorizontalListComponent
            :isShow = isShowCategoryHorizontalListComponent
            :showSubCat="appInfoStore?.isShowSubCategory()"
            :getAllCategorieHorizontalList = $props.getAllCategorieHorizontalList
            :limit = "$props.mobileSetting?.category_loading_limit ?? 6" />

        <how-it-works-card v-if="$page.props.project?.base_project_id !== 28 && isShowHowItsWorkComponent"/>

        <dashboard-vendor-horizontal-list
            v-if="appInfoStore?.isVendorSettingOn() && isShowVendorHorizontalListComponent"
            :getAllVendorList="$props.getAllVendorList"
        />


        <featured-item-horizontal-list
            v-if = isShowFeatureItemHorizontalListComponent
            :getAllFeatureItemHorizontalList = $props.getAllFeatureItemHorizontalList
            :limit="$props.mobileSetting?.featured_item_loading_limit ?? 12" />

        <ps-ad-sense
            :adsDisplayId=adsDisplayId
            :adsClient=adsClient
            :isDisplayGoogleAdsense=isDisplayGoogleAdsense
        />

        <div class="xl:w-feLarge lg:w-large md:w-full px-4 md:px-6 lg:px-0 mx-auto">
            <item-horizontal-list
                v-if = isShowRecentItemHorizontalListComponent
                item_list_name="dashboard_recent"
                :items=$props.getAllRecentItemHorizontalList
                :limit="$page.props.mobileSetting?.recent_item_loading_limit ?? 12"/>
            <item-horizontal-list
                v-if = isShowPopularItemHorizontalListComponent
                item_list_name="dashboard_popular"
                :items=$props.getAllPopularItemHorizontalList
                :limit="$page.props.mobileSetting?.popular_item_loading_limit ?? 12"/>

            <dashboard-vendor-card v-if="appInfoStore?.isVendorSettingOn() && isShowVendorCardComponent"/>


            <item-horizontal-list
                v-if = isShowDiscountItemHorizontalListComponent
                item_list_name="dashboard_discount"
                :items=$props.getAllDiscountItemHorizontalList
                :limit="$page.props.mobileSetting?.discount_item_loading_limit ?? 12"/>

            <package-horizontal-list
                v-if="appInfoStore?.isPaidAppOn() && isShowPackageHorizontalListComponent"
                :getAllPackageHorizontalList=$props.getAllPackageHorizontalList
            />

            <top-seller-horizontal-list
                v-if = isShowTopSellerHorizontalListComponent
                :getAllTopSellerHorizontalList=$props.getAllTopSellerHorizontalList
            />

            <blog-horizontal-list :getAllBlogList = $props.getAllBlogList v-if = isShowBlogHorizontalListComponent />
        </div>

        <mobile-showcase-card
            v-if = isShowMobileShowCaseComponent
            :appBrandingImagePath="appInfoStore.appInfo.data?.frontendConfigSetting?.appBrandingImage?.imgPath"/>

        <!-- <div v-if = !isShowMobileShowCaseComponent class="h-10"></div> -->

        <ps-account-dialog v-if="showAccountModel" ref="ps_account_dialog"
            :loginUserId="loginUserId"
            :usernameError="usernameError"
            :passwordError="passwordError" />

    </div>
</template>

<script lang="ts">

// Libs
import { Head } from '@inertiajs/vue3';
import { ref, defineAsyncComponent, onMounted, onUnmounted, onBeforeUnmount, onBeforeMount } from 'vue';
import { trans } from 'laravel-vue-i18n';

// Components
import SearchAndPopularCategoryListCard from './components/DashboardSearchAndPopularCategoryListCard.vue';
import CategoryHorizontalList from './components/DashboardCategoryHorizontalList.vue';
import HowItWorksCard from './components/DashboardHowItWorksCard.vue';
import FeaturedItemHorizontalList from './components/DashboardFeaturedItemHorizontalList.vue';
import ItemHorizontalList from './components/DashboardItemHorizontalList.vue';
import PackageHorizontalList from './components/DashboardPackageHorizontalList.vue';
import TopSellerHorizontalList from './components/DashboardTopSellerHorizontalList.vue';
import BlogHorizontalList from './components/DashboardBlogHorizontalList.vue';
import MobileShowcaseCard from './components/DashboardMobileShowcaseCard.vue';
import DashboardVendorCard from "./components/DashboardVendorCard.vue";
import DashboardVendorHorizontalList from './components/DashboardVendorHorizontalList.vue';
const PsAccountDialog = defineAsyncComponent(() => import('@template1/vendor/components/core/dialogs/PsAccountDialog.vue'));
import PsFrontendLayout from '@template1/vendor/components/layouts/container/PsFrontendLayout.vue';
import PsAdSense from '@template1/vendor/components/core/adsense/PsAdSense.vue';

// Providers
import { PsValueStore } from "@templateCore/store/modules/core/PsValueStore";
import { usePsAppInfoStoreState } from '@templateCore/store/modules/appinfo/AppInfoStore';
import { useAuthStore } from '../../../../../../../../resources/js/store/AuthStore';
import { useAddToCartStoreState } from '@templateCore/store/modules/addToCart/AddToCartStore';
// Holders
import AppInfoParameterHolder from '@templateCore/object/holder/AppInfoParameterHolder';
import UserExistParameterHolder from '@templateCore/object/holder/UserExistParameterHolder';
import UserCreateParameterHolder from '@templateCore/object/holder/UserCreateParameterHolder';

import PsUtils from '@templateCore/utils/PsUtils';
import _ from 'lodash';

export default {
    name: "DashboardView",
    components: {
        Head,
        PsAdSense,
        ItemHorizontalList,
        FeaturedItemHorizontalList,
        CategoryHorizontalList,
        HowItWorksCard,
        SearchAndPopularCategoryListCard,
        PackageHorizontalList,
        TopSellerHorizontalList,
        BlogHorizontalList,
        MobileShowcaseCard,
        PsAccountDialog,
        DashboardVendorCard,
        DashboardVendorHorizontalList
    },
    props: {
        errors: Object,
        mobileSetting: Object,
        project: Object,
        dashboardScreenInfos: Object,
        searchAndPopularCategoryComponentIds : Array,
        categoryHorizontalListComponentIds : Array,
        howItsWorkComponentIds : Array,
        vendorHorizontalListComponentIds : Array,
        featureItemHorizontalListComponentIds : Array,
        recentItemHorizontalListComponentIds : Array,
        popularItemHorizontalListComponentIds : Array,
        vendorCardComponentIds : Array,
        discountItemHorizontalListComponentIds : Array,
        packageHorizontalListComponentIds : Array,
        topSellerHorizontalListComponentIds : Array,
        blogHorizontalListComponentIds : Array,
        mobileShowCaseComponentIds : Array,
        adsClient : String,
        adsDisplayId : String,
        isDisplayGoogleAdsense: Number,
        getAllPopularCategoryList: Array,
        getAllCategorieHorizontalList: Array,
        getAllBlogList: Array,
        getAllFeatureItemHorizontalList: Array,
        getAllRecentItemHorizontalList: Array,
        getAllPopularItemHorizontalList: Array,
        getAllDiscountItemHorizontalList: Array,
        getAllPackageHorizontalList: Array,
        getAllTopSellerHorizontalList: Array,
        getAllVendorList: Array
    },
    layout: PsFrontendLayout,

    setup(props) {
        const psValueStore = PsValueStore();
        const ps_account_dialog = ref();
        const showAccountModel = ref(false);
        const authStore = useAuthStore();
        const AddToCartStore = useAddToCartStoreState();
        const userParamHolder = new UserExistParameterHolder();
        const userCreateParamHolder = new UserCreateParameterHolder();
        let usernameError = ref();
        let passwordError = ref();
        let isShowSearchAndPopularCategoryComponent = ref(1);
        let isShowCategoryHorizontalListComponent = ref(1);
        let isShowHowItsWorkComponent = ref(1);
        let isShowVendorHorizontalListComponent = ref(1);
        let isShowFeatureItemHorizontalListComponent = ref(1);
        let isShowRecentItemHorizontalListComponent = ref(1);
        let isShowPopularItemHorizontalListComponent = ref(1);
        let isShowVendorCardComponent = ref(1);
        let isShowDiscountItemHorizontalListComponent = ref(1);
        let isShowPackageHorizontalListComponent = ref(1);
        let isShowTopSellerHorizontalListComponent = ref(1);
        let isShowBlogHorizontalListComponent = ref(1);
        let isShowMobileShowCaseComponent = ref(1);

        const appInfoStore = usePsAppInfoStoreState();
        const loginUserId = psValueStore.getLoginUserId();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        async function checkUserAccount(username, hasPassword) {
            ps_account_dialog.value.openModal(
                trans('dashboard_modal_user_info'),
                trans('item_detail__confirm_to_mark_as_sold'),
                trans('core__fe_update_user'),
                trans('item_detail__cancel'),
                username,
                hasPassword,

                async () => {
                    userCreateParamHolder.username = ps_account_dialog.value.form.username
                    userCreateParamHolder.loginUserId = loginUserId
                    userCreateParamHolder.loginMethod = "checkFromDashboard"

                    if (hasPassword == 'false') {
                        userCreateParamHolder.password = ps_account_dialog.value.form.password
                    }

                    usernameError.value = '';
                    passwordError.value = '';
                    const UserLogindata = await authStore.createUserwithUsername(userCreateParamHolder);
                    if (UserLogindata.data.status == 'error') {
                        usernameError.value = authStore.isEmpty(UserLogindata.data.message.username) ? '' : UserLogindata.data.message.username[0]
                        passwordError.value = authStore.isEmpty(UserLogindata.data.message.password) ? '' : UserLogindata.data.message.password[0]
                    }
                    if (UserLogindata.data.status == 'success') {
                        ps_account_dialog.value.closeModal();
                    }
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );
        }

        onMounted(async () => {
            appInfoParameterHolder.userId = loginUserId;
            // appInfoStore.loadAppInfo(appInfoParameterHolder);
            // AddToCartStore.getAllItemFromCart(loginUserId);
            if (loginUserId !== 'nologinuser') {
                userParamHolder.id = loginUserId
                userParamHolder.loginMethod = "checkFromDashboard"
                const UserLogindata = await authStore.existUser(userParamHolder);
                if (UserLogindata.data.message.user.username == '' || UserLogindata.data.message.user.hasPassword == 'false') {
                    showAccountModel.value = true;
                    await PsUtils.waitingComponent(ps_account_dialog);
                    await checkUserAccount(UserLogindata.data.message.user.username, UserLogindata.data.message.user.hasPassword);
                }

            }

        });
        onBeforeUnmount(() => {

            PsUtils.log('onBeforeUnmount')
        });
        onBeforeMount(() => {
            if(!_.isEmpty(props.dashboardScreenInfos) && props.dashboardScreenInfos !== undefined){
                if(props.dashboardScreenInfos.components.length > 0){

                    props.dashboardScreenInfos.components.forEach(component => {

                        if(props.searchAndPopularCategoryComponentIds !== undefined){
                            if(props.searchAndPopularCategoryComponentIds.includes(component.id)){
                                isShowSearchAndPopularCategoryComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.categoryHorizontalListComponentIds !== undefined){
                            if(props.categoryHorizontalListComponentIds.includes(component.id)){
                                isShowCategoryHorizontalListComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.howItsWorkComponentIds !== undefined){
                            if(props.howItsWorkComponentIds.includes(component.id)){
                                isShowHowItsWorkComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.vendorHorizontalListComponentIds !== undefined){
                            if(props.vendorHorizontalListComponentIds.includes(component.id)){
                                isShowVendorHorizontalListComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.featureItemHorizontalListComponentIds !== undefined){
                            if(props.featureItemHorizontalListComponentIds.includes(component.id)){
                                isShowFeatureItemHorizontalListComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.recentItemHorizontalListComponentIds !== undefined){
                            if(props.recentItemHorizontalListComponentIds.includes(component.id)){
                                isShowRecentItemHorizontalListComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.popularItemHorizontalListComponentIds !== undefined){
                            if(props.popularItemHorizontalListComponentIds.includes(component.id)){
                                isShowPopularItemHorizontalListComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.vendorCardComponentIds !== undefined){
                            if(props.vendorCardComponentIds.includes(component.id)){
                                isShowVendorCardComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.discountItemHorizontalListComponentIds !== undefined){
                            if(props.discountItemHorizontalListComponentIds.includes(component.id)){
                                isShowDiscountItemHorizontalListComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.packageHorizontalListComponentIds !== undefined){
                            if(props.packageHorizontalListComponentIds.includes(component.id)){
                                isShowPackageHorizontalListComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.topSellerHorizontalListComponentIds !== undefined){
                            if(props.topSellerHorizontalListComponentIds.includes(component.id)){
                                isShowTopSellerHorizontalListComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.blogHorizontalListComponentIds !== undefined){
                            if(props.blogHorizontalListComponentIds.includes(component.id)){
                                isShowBlogHorizontalListComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                        if(props.mobileShowCaseComponentIds !== undefined){
                            if(props.mobileShowCaseComponentIds.includes(component.id)){
                                isShowMobileShowCaseComponent.value = parseInt(component.attributes.is_show);
                            }
                        }

                    });

                }

            }
        });
        onUnmounted(() => {
            PsUtils.log('unmounting success')
        });

        return {
            appInfoStore,
            PsValueStore,
            AddToCartStore,
            ps_account_dialog,
            checkUserAccount,
            loginUserId,
            usernameError,
            passwordError,
            showAccountModel,
            isShowSearchAndPopularCategoryComponent,
            isShowCategoryHorizontalListComponent,
            isShowHowItsWorkComponent,
            isShowVendorHorizontalListComponent,
            isShowFeatureItemHorizontalListComponent,
            isShowRecentItemHorizontalListComponent,
            isShowPopularItemHorizontalListComponent,
            isShowVendorCardComponent,
            isShowDiscountItemHorizontalListComponent,
            isShowPackageHorizontalListComponent,
            isShowTopSellerHorizontalListComponent,
            isShowBlogHorizontalListComponent,
            isShowMobileShowCaseComponent,
        };
    },
};
</script>


