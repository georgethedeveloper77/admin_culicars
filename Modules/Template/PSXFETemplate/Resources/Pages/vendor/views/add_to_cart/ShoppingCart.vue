<template>
    <Head :title="$t('category_list__title')" />
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28">
                <div class="flex flex-col sm:flex-row">
                    <div class="flex flex-row mt-6 sm:mt-0">
                        <ps-breadcrumb-2 :items="breadcrumb" /></div>
                </div>

                <ps-warning-toast :showWarningToast="showWarningToast" message="please_select_item"/>

                <div v-if="addToCartStore.cart?.data == null">
                    <div class="flex flex-col items-center justify-center w-auto gap-2 p-4 rounded-b-lg h-160 dark:border-feAchromatic-800">
                        <img class="h-auto w-120"
                             v-lazy="{ src: $page.props.sysImageUrl + '/no_item_in_cart.png', loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }" />
                        <ps-label textColor="text-xl font-semibold text-base dark:text-feAchromatic-200 font-medium text-feSecondary-500 text-center w-[413px]" >
                            {{$t('no_items_in_cart')}}
                        </ps-label>
                        <ps-label textColor="text-base dark:text-feAchromatic-200 font-medium text-feSecondary-500 text-center w-[413px]" >
                            {{$t('no_item_description')}}
                        </ps-label>
                        <ps-route-link :to = "{ name: 'dashboard' }" >
                            <span>
                                <ps-button class="w-full cursor-pointer"> {{ $t('explore')}}</ps-button>
                            </span>

                        </ps-route-link>
                    </div>
                </div>

                <div v-if="addToCartStore.cart?.data != null">
                    <div class="flex flex-col mt-10 md:flex-row">

                        <div class="flex-row flex-1 mb-6">
                            <shopping-cart-item-list @updateItemCount="updateItemCount" :priceFormat="appInfoStore?.appInfo?.data?.mobileSetting?.price_format"/>
                        </div>

                        <!-- Order Summary Only show in md or more lager Screen size-->
                        <div class="w-full md:w-80 md:ml-5">
                            <div class="px-3 pb-5 mb-8 rounded-md shadow-md dark:bg-feAchromatic-800">
                                <ps-label class="pt-3 mb-5 text-2xl font-bold " textColor="text-feSecondary-800 dark:text-feAchromatic-50">
                                {{ $t('order_summary') }} </ps-label>

                                <div class="container">
                                    <div class="flex items-start">

                                        <div class="flex flex-col">
                                            <!-- Title -->
                                            <div class="mb-2 overflow-hidden max-w-auto whitespace-nowrap">
                                                <ps-label class="font-normal overflow-ellipsis" textColor="text-feSecondary-500 dark:text-feSecondary-300">{{ productStore.item.data?.title }}</ps-label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- SubTotal -->
                                <div class="flex flex-row items-center justify-between mt-6" v-if = " addToCartStore.cart?.data">
                                    <ps-label class="text-normal" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ $t('subtotal') }}</ps-label>
                                    <ps-label class="text-normal" textColor="text-feSecondary-800 dark:text-feSecondary-300" >{{ addToCartStore.cart?.data?.vendorCurrencySymbol }}{{ formatPrice(addToCartStore.cart?.data?.subTotal) }}</ps-label>
                                </div>

                                <!-- Discount -->
                                <div class="flex flex-row items-center justify-between mt-5" v-if = "addToCartStore.cart?.data">
                                    <ps-label class="text-normal" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ $t('discount') }}</ps-label>
                                    <ps-label class="text-normal" textColor="text-fePrimary-500" >-{{ addToCartStore.cart?.data?.vendorCurrencySymbol }}{{ formatPrice(addToCartStore.cart?.data?.totalDiscount) }}</ps-label>
                                </div>

                                <!-- Delivery Charges -->
                                <div class="flex flex-row items-center justify-between mt-5">
                                    <ps-label class="text-normal" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ $t('delivery_charges') }}</ps-label>
                                    <ps-label class="text-normal" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ addToCartStore.cart?.data?.vendorCurrencySymbol }}{{ formatPrice(addToCartStore.cart?.data?.deliveryFee) }}</ps-label>
                                </div>

                                <!-- <ps-label textColor="flex items-center justify-between">
                                    <ps-label textColor="text-base text-feSecondary-800 dark:text-feAchromatic-200">{{ $t("delivery_charges") }}</ps-label>
                                    <ps-label textColor="text-base text-feSecondary-800 dark:text-feAchromatic-200">{{ addToCartStore.cart?.data?.vendorCurrencySymbol }}{{ formatPrice(addToCartStore.cart?.data?.deliveryFee) }}</ps-label>
                                </ps-label> -->

                                <div class="my-6 border-t border-feAchromatic-100 dark:border-feAchromatic-800"></div>

                                <!-- Total -->
                                <div class="flex flex-row items-center justify-between my-5" v-if = "addToCartStore.cart?.data">
                                    <ps-label class="text-lg font-bold" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ $t('total') }}</ps-label>
                                    <ps-label class="text-lg font-bold" textColor="text-feSecondary-800 dark:text-feSecondary-300" >{{ addToCartStore.cart?.data?.vendorCurrencySymbol }}{{ formatPrice(addToCartStore.cart?.data?.total) }}</ps-label>
                                </div>

                                <!-- Checkout -->
                                <!-- <ps-route-link :to="{ name: selectedItemCount == 0 ? '':'fe_vendor_checkout' }" >
                                </ps-route-link> -->
                                <ps-button class="w-full cursor-pointer"
                                    @click="checkoutClick()"
                                    :disabled="addToCartStore.cart?.data?.items.filter((item) => item.isSoldOut == 0).length == 0 || isVendorExpired">
                                    {{ $t('core_fe__checkout') }} <span class="ms-1"> ({{ selectedItemCount }}) </span>
                                </ps-button>

                                <div class="flex flex-col items-center justify-center mt-3">
                                    <ps-label class="text-sm text-center">
                                        {{ $t('read_and_agreed_to') }}
                                        <span class="cursor-pointer text-fePrimary-500" @click="termsAndConditionClick">
                                            {{$t('order_summary_terms_and_conditions')}}
                                        </span>
                                    </ps-label>
                                    <ps-label class="text-sm cursor-pointer" >
                                        <ps-route-link :to="{name: 'fe_privacy' }" textColor="text-fePrimary-500" textSize="text-sm">
                                            {{ $t("footer__privacy_policy") }}
                                        </ps-route-link>
                                    </ps-label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <ps-loading-dialog ref="ps_loading_dialog" class='z-40'/>
            <ps-warning-dialog-2 ref="ps_warning_dialog" />
            <ps-error-dialog ref="ps_error_dialog" />
        </template>
    </ps-content-container>
</template>

<script lang="ts">
/// Razorpay
import 'https://checkout.razorpay.com/v1/checkout.js';

import { Head } from '@inertiajs/vue3';
import PsContentContainer from '@template1/vendor/components/layouts/container/PsContentContainer.vue';

import { usePsAppInfoStoreState } from '@templateCore/store/modules/appinfo/AppInfoStore';
import { useVendorInfoStoreState } from '@templateCore/store/modules/vendor/VendorInfoStore';
import PsConst from '@templateCore/object/constant/ps_constants';

import {  ref,onMounted,computed,reactive, onUnmounted, watch } from 'vue';
import PsWarningDialog2 from '@template1/vendor/components/core/dialog/PsWarningDialog2.vue';
import PsBreadcrumb2 from "@template1/vendor/components/core/breadcrumbs/PsBreadcrumb2.vue";
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsLabelHeader4 from '@template1/vendor/components/core/label/PsLabelHeader4.vue';
import PsLoadingDialog from '@template1/vendor/components/core/dialog/PsLoadingDialog.vue';
import PsFrontendLayout from '@template1/vendor/components/layouts/container/PsFrontendLayout.vue';
import PsNoResult from "@template1/vendor/components/modules/list/PsNoResult.vue";
import PsInput from '@template1/vendor/components/core/input/PsInput.vue';
import PsDropdown from '@template1/vendor/components/core/dropdown/PsDropdown.vue';
import PsDropdownSelect from '@template1/vendor/components/core/dropdown/PsDropdownSelect.vue';
import PsInputWithRightIcon from '@template1/vendor/components/core/input/PsInputWithRightIcon.vue';
import PsTextarea from '@template1/vendor/components/core/textarea/PsTextarea.vue';
import PsRouteLink from '@template1/vendor/components/core/link/PsRouteLink.vue';
import PsErrorDialog from '@template1/vendor/components/core/dialog/PsErrorDialog.vue';
import ShoppingCartItemList from './components/ShoppingCartItemList.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
// import InputEmailModal from '@template1/vendor/components/modules/email/InputEmailModal.vue';
import { trans } from 'laravel-vue-i18n';

import { PsValueStore } from "@templateCore/store/modules/core/PsValueStore";
import { useVendorCheckoutStoreState } from "@templateCore/store/modules/vendor_checkout/VendorCheckoutStore";
// import { useVendorShippingBillingStoreState } from "@templateCore/store/modules/vendor_checkout/VendorShippingBillingStore";
import { useVendorItemBoughtStore } from "@templateCore/store/modules/vendor_checkout/VendorItemBoughtStore";
import { useProductStore } from '@templateCore/store/modules/item/ProductStore';
import { useGalleryStoreState } from '@templateCore/store/modules/gallery/GalleryStore';
import { useUserStore } from "@templateCore/store/modules/user/UserStore";
import { useAddToCartStoreState } from "@templateCore/store/modules/addToCart/AddToCartStore";
import { useVendorStore } from "@templateCore/store/modules/vendor/VendorStore";

import OrderSummaryParameterHolder from "@templateCore/object/holder/OrderSummaryParameterHolder";
import VendorItemBoughtParameterHolder from '@templateCore/object/holder/VendorItemBoughtParameterHolder';
import PsWarningToast from '@template1/vendor/components/core/toast/PsWarningToast.vue';

import { router } from '@inertiajs/vue3';
import format from 'number-format.js';

export default {
    name: 'VendorCheckout',
    components : {
        PsButton,
        PsContentContainer,
        PsBreadcrumb2,
        PsLabel,
        PsInput,
        PsLabelHeader4,
        PsNoResult,
        PsLoadingDialog,
        PsDropdownSelect,
        PsInputWithRightIcon,
        PsDropdown,
        PsTextarea,
        PsWarningDialog2,
        PsRouteLink,
        PsErrorDialog,
        Head,
        PsIcon,
        ShoppingCartItemList,
        PsWarningToast,

    },
    layout: PsFrontendLayout,
    props : ['query'],
    setup (props){

        const appInfoStore = usePsAppInfoStoreState();
        const vendorInfoStore = useVendorInfoStoreState();
        const vendorStore = useVendorStore();
        const vendorCheckoutStore = useVendorCheckoutStoreState();
        const vendorItemBoughtStore = useVendorItemBoughtStore();
        const galleryProvider = useGalleryStoreState('detail');
        const itemProvider = useProductStore();
        const productStore = useProductStore('detail');
        const userProvider = useUserStore();
        const orderSummaryParameterHolder =new OrderSummaryParameterHolder();
        const vendorItemBoughtParameterHolder = new VendorItemBoughtParameterHolder();
        const addToCartStore = useAddToCartStoreState('checkout');
        const payment = ref('');

        const ps_loading_dialog = ref();
        const ps_warning_dialog = ref();
        const ps_error_dialog = ref();

        const loading = ref(false);
        const psValueStore = PsValueStore();
        const loginUserId = psValueStore.getLoginUserId();
        const orderId = ref();

        const currencyShortForm = ref('');

        const inStock = ref(0);
        let isError= ref(true);
        const vendorId = ref();
        const vendorData = ref();
        const isVendorExpired = ref();
        const selectedItemCount = ref(0);
        const showWarningToast = ref(false);

        onMounted(async () => {
            loading.value = true;
            let cartData = await addToCartStore.getAllItemFromCart(loginUserId, 0);
            var cartItems = await addToCartStore?.cart?.data?.items;

            vendorId.value = await addToCartStore.cart?.data?.vendorId;
            vendorData.value = await vendorInfoStore.loadVendorInfo(vendorId.value);

            await vendorStore.loadVendor(vendorId.value, loginUserId, '');
            await vendorStore.vendor?.data;
            isVendorExpired.value = await vendorStore.vendor?.data?.expireStatus == 2 ? true : false;
            //alert(isVendorExpired.value)
            loading.value = false;
        });
        async function loadDataForItemDetail() {
            //await productStore.loadItem(props.query.itemId, loginUserId);
            await addToCartStore.getAllItemFromCart(loginUserId);
            await galleryProvider.resetGalleryList(loginUserId, props.query.itemId, PsConst.ITEM__RELATED_TYPE);

        }
        function formatPrice(value){
            return format(appInfoStore?.appInfo?.data?.mobileSetting?.price_format, value);
        }

        function updateItemCount(value){
            selectedItemCount.value = value.length;
        }


        function getSubTotal(){
            let cartItems = addToCartStore?.cart?.data?.items;
            let totalSubtotal = 0;

            cartItems.forEach(item => {
                let subtotal = parseFloat(item.originalPrice) * parseInt(item.quantity);
                totalSubtotal += subtotal;
            });
            console.log('Total Subtotal:', totalSubtotal);
            let currencySymbol = addToCartStore?.cart?.data?.vendorCurrencySymbol;

            return currencySymbol + ' ' + totalSubtotal.toFixed(2);
        }

        function getDiscount(){
            let cartItems = addToCartStore?.cart?.data?.items;
            let totalDiscount = 0;

            cartItems.forEach(item => {
                let discount = parseFloat(item.originalPrice) - parseFloat(item.salePrice);
                totalDiscount += discount;
            });
            //alert('Total Discount:', totalDiscount);
            let currencySymbol = addToCartStore?.cart?.data?.vendorCurrencySymbol;

            return currencySymbol + ' ' + totalDiscount.toFixed(2);
        }

        function getTotal(){
            let cartItems = addToCartStore.cart.data?.items;
            let total = 0;
            let totalDiscount = 0;

            cartItems.forEach(item => {
                let subtotal = parseFloat(item.salePrice) * parseInt(item.quantity);
                total += subtotal;

                // let discount = parseFloat(item.originalPrice) - parseFloat(item.salePrice);
                // totalDiscount += discount;
                // totalDiscount = totalDiscount * parseInt(item.quantity);
            });
            // let totalDiscount = subDiscount * item.quantity;
            // let total = totalSubtotal - totalDiscount;
            //alert(total);
            let currencySymbol = addToCartStore?.cart?.data?.vendorCurrencySymbol;

            if(vendorInfoStore.isDeliverySettingOn()){
                return currencySymbol + ' ' + total + parseFloat(addToCartStore.cart.data?.deliveryFee);
            }else{
                return currencySymbol + ' ' + total.toFixed(2);
            }
        }

        function termsAndConditionClick(){
            router.get(route('fe_terms_and_ondcitions'));
        }

        function checkoutClick(){
            if(selectedItemCount.value == 0){
                showWarningToast.value = true;
                setTimeout(() => {
                    showWarningToast.value = false;
                }, 3000);
            }else{
                router.get(route('fe_vendor_checkout'));
            }
        }

        const breadcrumb = computed(() => {
            if (appInfoStore?.isShowSubCategory() || productStore.item.data?.subCategory?.id == '') {
                return [
                    {
                        label: trans('ps_nav_bar__home'),
                        url: route('dashboard')
                    },

                    {
                      label: trans('core_fe__shopping_cart'),
                      color: "text-fePrimary-500"
                    }
                    ];
            } else {
                  return [
                    {
                      label: trans('ps_nav_bar__home'),
                      url: route('dashboard')
                    },
                    {
                      label: trans('core_fe__shopping_cart'),
                      color: "text-fePrimary-500"
                    }
                ];
            }
        });

        return {
            PsConst,
            breadcrumb,
            loginUserId,
            vendorCheckoutStore,
            ps_loading_dialog,
            ps_error_dialog,
            loading,
            appInfoStore,
            vendorInfoStore,
            productStore,
            galleryProvider,
            inStock,
            getSubTotal,
            getTotal,
            getDiscount,
            termsAndConditionClick,
            ps_warning_dialog,
            // mode,
            addToCartStore,
            ShoppingCartItemList,
            useVendorStore,
            vendorStore,
            isVendorExpired,
            formatPrice,
            updateItemCount,
            selectedItemCount,
            checkoutClick,
            showWarningToast
        }
    },

}
</script>
