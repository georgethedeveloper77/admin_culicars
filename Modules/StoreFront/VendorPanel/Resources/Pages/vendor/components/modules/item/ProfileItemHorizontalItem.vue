<template>
    <div class="cursor-pointer w-full h-auto" v-on:click="onClick != null ? onClick(item) : null">
        <!-- Pscard -->
        <ps-card class="flex w-full bg-feAchromatic-50 flex-col lg:rounded-lg shadow-sm"
            v-if="item?.adType == PsConst.NORMAL_AD || item?.adType == PsConst.PAID_AD" :enabledHover="true">


            <div class="lg:px-0 lg:py-0 px-1 py-1" :class="showProfile ? 'rounded-b-xl lg:rounded-b-2xl ' : 'rounded-xl lg:rounded-2xl'">
                <div class="h-44 relative z-0">

                    <!-- Image -->
                    <ps-route-link class="absolute z-10" :to="{ name: 'fe_item_detail', query: { item_id: item.id } }">
                        <div class="overflow-hidden h-44 w-full">
                            <img alt="Placeholder" class="overflow-hidden transform transition duration-500 hover:scale-110  rounded-t-lg object-cover  w-screen h-44 " width="640px" height="360px"
                            v-lazy="{ src: $page.props.thumb2xUrl + '/' + item.defaultPhoto.imgPath, loading: $page.props.sysImageUrl + '/loading_gif.gif', error: $page.props.sysImageUrl + '/default_photo.png' }" />
                        </div>
                    </ps-route-link>

                    <!-- Favourite -->
                    <div v-if="!isOwner" class="absolute z-20 bg-feAchromatic-50 dark:bg-feSecondary-800 rounded w-10 h-10 flex justify-center items-center right-2 top-2" @click="favouriteClicked(item.id)">
                        <ps-icon textColor="text-fePrimary-500 dark:text-feAchromatic-50" :name="item.isFavourited == '1' ? 'heart' : 'heart-outline'" h="24" w="24" />
                    </div>

                    <!-- Pending -->
                    <div v-if="item.status == '0'" class="absolute bg-feWarning-500 rounded px-2 py-1 flex justify-center items-center left-2 top-2 z-20">
                        <ps-label class="text-xs lg:text-sm text-center font-medium" textColor="text-feAchromatic-50 "> {{ $t('core_fe__pending') }}</ps-label>
                    </div>

                    <!-- Publish -->
                    <div v-else-if="item.status == '1'">

                        <!-- Discount -->
                        <div v-if="item.isDiscount == '1'" class="absolute bg-fePrimary-500 rounded px-2 py-1 flex justify-center items-center left-2 top-2 z-20">
                            <ps-label class="text-xs lg:text-sm text-center font-medium" textColor="text-feAchromatic-50 ">{{ item.percent }}{{ $t('item_horizontal_item__discount') }}</ps-label>
                            
                            <!-- Featured -->
                            <div v-if="item.isPaid == '1'" class="absolute bg-feSuccess-500 rounded px-2 py-1 left-0 top-8">
                                <ps-label class="text-xs lg:text-sm font-medium text-center" textColor="text-feAchromatic-50 "> {{ $t('item_horizontal_item__featured') }}</ps-label>
                            </div>
                        </div>

                        <!-- Featured -->
                        <div v-else-if="item.isPaid == '1'" class="absolute bg-feSuccess-500 rounded px-2 py-1 flex justify-center items-center left-2 top-2 z-20">
                            <ps-label class="text-xs lg:text-sm text-center font-medium" textColor="text-feAchromatic-50 "> {{ $t('item_horizontal_item__featured') }}</ps-label>
                        </div>
                    </div>

                    <!-- Disable -->
                    <div v-else-if="item.status == '2'" class="absolute bg-feSecondary-300 rounded px-2 py-1 flex justify-center items-center left-2 top-2 z-20">
                        <ps-label class="text-xs lg:text-sm text-center font-medium" textColor="text-feSecondary-500 "> {{ $t('core_fe__disabled') }}</ps-label>
                    </div>

                    <!-- Reject -->
                    <div v-else-if="item.status == '3'" class="absolute bg-feError-500 rounded px-2 py-1 flex justify-center items-center left-2 top-2 z-20">
                        <ps-label class="text-xs lg:text-sm text-center font-medium" textColor="text-feAchromatic-50 "> {{ $t('core_fe__rejected') }}</ps-label>
                    </div>

                    <!-- Sold out -->
                    <div class="absolute left-2 bottom-2  z-20">
                        <ps-label v-if="item && item.isSoldOut == '1'" class="py-1 px-2 text-sm rounded bg-fePrimary-500 font-medium " textColor="text-feAchromatic-50 ">{{ $t('item_horizontal_item__sold_out') }}</ps-label>
                    </div>

                </div>

                <ps-route-link :to="{ name: 'fe_item_detail', query: { item_id: item.id } }">

                    <!-- Item Title -->
                    <ps-label v-if="!notShowTitle" class="ps-1 pt-1 font-normal text-sm" textColor="text-feSecondary-600 dark:text-feSecondary-200">{{ item ? item.title : '' }}</ps-label>

                    <!-- Item Price -->
                    <div v-if="appInfoStore.appInfo.data?.psAppSetting?.SelectedPriceType != PsConst.NO_PRICE">
                        <div class="ps-1 flex flex-row items-center justify-start" v-if="item.isDiscount == '1' && appInfoStore.appInfo.data?.mobileSetting?.is_show_discount == '1'">
                            <ps-label v-if="appInfoStore.appInfo.data?.psAppSetting?.SelectedPriceType == PsConst.NORMAL_PRICE" class="line-through me-2 font-semibold text-xs " textColor="text-feSecondary-500 "> 
                                {{ item && appInfoStore.appInfo.data?.psAppSetting?.SelectedPriceType == PsConst.NORMAL_PRICE? item.itemCurrency.currencySymbol : '' }} 
                                {{ formatPrice(item ? item.originalPrice : '') }}
                            </ps-label>
                            <ps-label class="font-semibold text-xs lg:text-base" textColor="text-fePrimary-500 "> 
                                {{ item && appInfoStore.appInfo.data?.psAppSetting?.SelectedPriceType == PsConst.NORMAL_PRICE ? item.itemCurrency.currencySymbol : '' }} 
                                {{ formatPrice(item ? item.price : '') }}
                            </ps-label>
                        </div>
                        <ps-label v-else class="ps-1 font-semibold text-base" textColor="text-fePrimary-500 "> 
                            {{ item && appInfoStore.appInfo.data?.psAppSetting?.SelectedPriceType == PsConst.NORMAL_PRICE ? item.itemCurrency.currencySymbol : '' }}
                            {{ formatPrice(item ? item.originalPrice : '') }}
                        </ps-label>
                    </div>

                    <!-- Location -->
                    <div v-if="!notShowTitle" :class="showProfile ? 'pb-0' : 'pb-2'" class="ps-1 flex items-center  rtl:space-x-reverse space-x-2.5">
                        <ps-icon textColor="text-feSecondary-400 dark:text-feAchromatic-500" name="location-marker"
                            h="14" w="14" class="text-feSecondary-400 me-1" viewBox="0 0 14 14" />
                        <ps-label class="truncate font-normal text-sm" textColor="text-feSecondary-400 dark:text-feSecondary-200">
                            {{ item ? item.itemLocation.name : '' }}
                        </ps-label>
                    </div>

                </ps-route-link>
            </div>

            <!-- Profile -->
            <ps-route-link :to="{ name: 'fe_other_profile', params: { userId: item?.user?.userId } }">
                <div v-if="showProfile" class="pt-1 pb-2 flex flex-row items-center no-underline justify-between text-feAchromatic-900 leading-none px-2 rounded-b-xl lg:rounded-b-2xl">
                    <div class="relative">
                        <!-- Profile Image -->
                        <img alt="Placeholder" class="rounded-full bg-transparent lg:w-8 lg:h-8 w-6 h-6 flex items-center justify-center object-cover"
                            width="50px" height="50px"  v-lazy="{ src: $page.props.thumb1xUrl + '/' + item?.user?.userCoverPhoto, loading: $page.props.sysImageUrl + '/loading_gif.gif', error: $page.props.sysImageUrl + '/default_photo.png' }">
                        
                        <!-- Blue Mark -->
                        <div v-if="item.user.isVerifybluemark == '1'" class="w-3 h-3 bg-feInfo-500 rounded-full flex justify-center items-center absolute bottom-0 right-0">
                            <ps-icon name="bluemark" textColor="text-feSecondary-50" w="8" h="8" />
                        </div>
                    </div>

                    <ps-label class="ms-2 mt-1 text-sm flex-grow">
                        <!-- Profile Name -->
                        <span class="flex truncate text-xs text-feSecondary-800 dark_text-feSecondary-300"> 
                            {{ item.user.userName.length > 12 ? item.user.userName.slice(0, 12) + ' ...' : item.user.userName }} 
                        </span>

                        <!-- Date -->
                        <span class=" font-light text-xs text-feSecondary-500 dark_text-feSecondary-500">
                            {{ item ? moment(item.addedDate).format($page.props.dateFormat) : '' }} 
                        </span>
                    </ps-label>
                </div>
            </ps-route-link>

        </ps-card>
        <!-- Google ad -->
        <ps-card class="flex flex-col w-full lg:h-72 h-52 mx-auto lg:mt-12 lg:mb-12 mt-8 mb-6" v-if="item?.adType == PsConst.GOOGLE_AD">
            <ps-ad-sense adFormat="square" adStyle="display:inline-block; width: 160px; height: 160px;"
                adStyleSm="display:inline-block; width: 160px; height: 160px;"
                adStyleLg="display:inline-block; width: 160px; height: 160px;"/>
        </ps-card>
        <!-- END Pscard -->
    </div>

    <ps-loading-dialog ref="ps_loading_dialog" />
</template>

<script lang="ts">

// Components
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsCard from '@template1/vendor/components/core/card/PsCard.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
import PsConst from '@templateCore/object/constant/ps_constants';
import PsAdSense from '@template1/vendor/components/core/adsense/PsAdSense.vue';
import PsLoadingDialog from '@template1/vendor/components/core/dialog/PsLoadingDialog.vue';
import format from 'number-format.js';
import PsRouteLink from '@template1/vendor/components/core/link/PsRouteLink.vue';
import moment from "moment";

//language
import { trans } from 'laravel-vue-i18n';
import { PsValueStore } from "@templateCore/store/modules/core/PsValueStore";
// Objects
import Product from '@templateCore/object/Product';
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';

// Providers
import { usePsValueHolderState } from '@templateCore/object/core/PsValueHolder';
import { usePsAppInfoStoreState } from '@templateCore/store/modules/appinfo/AppInfoStore';
import { useProductStore } from '@templateCore/store/modules/item/ProductStore';
import { useFavouriteItemStoreState } from "@templateCore/store/modules/item/FavouriteItemStore";
import { useFollowerItemStoreState } from "@templateCore/store/modules/item/FollowerItemStore";
import AppInfoParameterHolder from '@templateCore/object/holder/AppInfoParameterHolder';
import FollowItemParameterHolder from '@templateCore/object/holder/FollowItemParameterHolder';
export default {
    name: "ItemHorizontalItem",
    components: {
        PsLabel,
        PsCard,
        PsIcon,
        PsAdSense,
        PsRouteLink,
        PsLoadingDialog
    },
    props: {
        item: { type: Product },
        notShowTitle: { type: Boolean, default: false },
        onClick: Function,
        storeName: { type: String, default: "" }
    },
    setup(props) {
        // Inject Provider
        const ps_loading_dialog = ref();

        PsValueStore.psValueStore = usePsValueHolderState();
        const productStore = useProductStore(props.storeName);
        const FavouriteItemProvider = useFavouriteItemStoreState();
        const followerItemStore = useFollowerItemStoreState();
        const psValueStore = PsValueStore();
        const loginUserId = psValueStore.getLoginUserId();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        const followerItemHolder = new FollowItemParameterHolder();
        appInfoParameterHolder.userId = loginUserId;
        const appInfoStore = usePsAppInfoStoreState();
        const showProfile = ref(false);
        const isOwner = ref(props.item.user.userId == loginUserId ? true : false);

        if(appInfoStore?.appInfo?.data?.mobileSetting?.is_show_owner_info == '1'){
            showProfile.value = true;
        }

        function formatPrice(value) {
            if (value.toString() == '0' && appInfoStore.appInfo.data?.psAppSetting?.SelectedPriceType == PsConst.NORMAL_PRICE) {
                return trans('item_price__free');
            } else {
                if (appInfoStore.appInfo.data?.psAppSetting?.SelectedPriceType == PsConst.PRICE_RANGE) {
                    const floatValue = parseFloat(value);
                    const intValue = parseInt(floatValue);
                    if (intValue > 5) {
                        return '$'.repeat(5);
                    }
                    if (intValue < 1) {
                        return '$'.repeat(1);
                    }
                    return '$'.repeat(intValue);
                } else {
                    return format(appInfoStore?.appInfo?.data?.mobileSetting?.price_format, value);
                }
            }
        }
        async function favouriteClicked(itemId) {
            if (loginUserId && loginUserId != PsConst.NO_LOGIN_USER) {
                ps_loading_dialog.value.closeModal();
                if (props.item.isFavourited == '1') {
                    ps_loading_dialog.value.message = trans('item_detail__removing_item_from_favourite');
                } else {
                    ps_loading_dialog.value.message = trans('item_detail__adding_item_to_favourite');
                }
                await FavouriteItemProvider.postFavourite(itemId, loginUserId);
                await refleshData();
                ps_loading_dialog.value.closeModal();
            }
            else {
                router.get(route('login'));
            }
        }
        async function refleshData() {
            if (props.storeName == '') {
                await followerItemStore.refleshFollowerItemList(loginUserId, followerItemHolder);
            } else if (props.storeName == 'favourite') {
                await FavouriteItemProvider.resetFavouriteItemList(loginUserId);
            } else {
                await productStore.refleshProductList(loginUserId, productStore.paramHolder);
                await FavouriteItemProvider.resetFavouriteItemList(loginUserId);
            }
        }
        return {
            appInfoStore,
            formatPrice,
            PsConst,
            psValueStore,
            favouriteClicked,
            ps_loading_dialog,
            showProfile,
            moment,
            isOwner
        }
    }
}
</script>
