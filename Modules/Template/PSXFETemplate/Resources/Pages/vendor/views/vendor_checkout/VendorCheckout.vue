<template>
    <Head :title="$t('category_list__title')" />
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28">
                <div class="flex flex-col sm:flex-row">
                    <div class="flex flex-row mt-6 sm:mt-0">
                        <ps-breadcrumb-2 :items="breadcrumb" /></div>
                </div>

                <div class="flex flex-col mt-10 md:flex-row">
                    <div class="flex-row flex-1 mb-6">
                        <div class="pb-5 mb-6 border rounded-lg dark:bg-feAchromatic-800 dark:border-feAchromatic-700">
                            <vendor-checkout-group-title :title="$t('delivery_information')"/>
                            <!------------ For Shipping Start ------------>
                            <div class="w-full px-5">

                                <ps-label class="my-5 text-xl font-bold" textColor="text-feSecondary-800 dark:text-feAchromatic-50">{{$t('shipping_address')}} </ps-label>

                                <div v-if="!loading && shippingBillingStore.defaultShippingBillingAddress.data != null" class="flex items-center justify-between px-4 py-3 border-2 rounded dark:border-feAchromatic-700" >
                                    <div>
                                        <ps-label textColor="font-semibold dark:text-feAchromatic-200">{{ paramHolder.shippingFirstName+' '+paramHolder.shippingLastName }}</ps-label>
                                        <ps-label>{{ paramHolder.shippingPhoneNo+', '+paramHolder.shippingEmail }}</ps-label>
                                        <ps-label>{{ paramHolder.shippingAddress+', '+paramHolder.shippingCountry+', '+paramHolder.shippingState+', '+paramHolder.shippingCity+', '+paramHolder.shippingPostalCode }}</ps-label>
                                    </div>
                                    <ps-button @click="openAddressListModal('shipping', currentShippingAddressId)" colors="bg-feAchromatic-50 dark:bg-feAchromatic-800 text-feSecondary-800 dark:text-feAchromatic-200 dark:border-feAchromatic-600" border="border" focus="" hover="hover:bg-feAchromatic-200 dark:hover:bg-feAchromatic-700">{{ $t("core_fe__change") }}</ps-button>
                                </div>

                                <div v-else class="px-4 py-3 border-2 border-dashed rounded hover:border-feAchromatic-500 dark:border-feSecondary-400 dark:hover:border-feSecondary-100" @click="openAddressModal('shipping')">
                                    <ps-button class="flex items-center w-full gap-2" colors="" justify="" padding="px-0 py-2" hover="" focus="">
                                        <ps-icon textColor="font-medium text-fePrimary-500 " name="plus" w="24" h="24"/>
                                        <ps-label textColor="text-sm font-medium text-fePrimary-500 ">{{ $t('core_fe__add_new_address') }}</ps-label>
                                    </ps-button>
                                </div>

                            </div>
                            <!------------ For Shipping End ------------>

                            <!------------ For billing Start ------------>
                            <div class="w-full px-5">

                                <ps-label class="my-5 text-xl font-bold" textColor="text-feSecondary-800 dark:text-feAchromatic-50">
                                    {{ $t('billing_address') }} </ps-label>

                                <div v-if="!loading && shippingBillingStore.defaultShippingBillingAddress.data != null" class="flex items-center justify-between px-4 py-3 border-2 rounded dark:border-feAchromatic-700">
                                    <div>
                                        <ps-label textColor="font-semibold dark:text-feAchromatic-200">{{ paramHolder.billingFirstName+' '+paramHolder.billingLastName }}</ps-label>
                                        <ps-label>{{ paramHolder.billingPhoneNo+', '+paramHolder.billingEmail }}</ps-label>
                                        <ps-label>{{ paramHolder.billingAddress+', '+paramHolder.billingCountry+', '+paramHolder.billingState+', '+paramHolder.billingCity+', '+paramHolder.billingPostalCode }}</ps-label>
                                    </div>
                                    <ps-button @click="openAddressListModal('billing', currentBillingAddressId)" colors="bg-feAchromatic-50 dark:bg-feAchromatic-800 text-feSecondary-800 dark:text-feAchromatic-200 dark:border-feAchromatic-600" border="border" focus="" hover="hover:bg-feAchromatic-200 dark:hover:bg-feAchromatic-700">{{ $t("core_fe__change") }}</ps-button>
                                </div>

                                <div v-else class="px-4 py-3 border-2 border-dashed rounded hover:border-feAchromatic-500 dark:border-feSecondary-400 dark:hover:border-feSecondary-100" @click="openAddressModal('billing')">
                                    <ps-button class="flex items-center w-full gap-2" colors="" justify="" padding="px-0 py-2" hover="" focus="">
                                        <ps-icon textColor="font-medium text-fePrimary-500 " name="plus" w="24" h="24"/>
                                        <ps-label textColor="text-sm font-medium text-fePrimary-500 ">{{ $t('core_fe__add_new_address') }}</ps-label>
                                    </ps-button>
                                </div>

                            </div>
                            <!------------ For billing End ------------>
                        </div>
                        <div class="mb-6 border rounded-lg dark:bg-feAchromatic-800 dark:border-feAchromatic-700">
                            <vendor-checkout-group-title :title="$t('payment_method')"/>

                            <div class="grid grid-cols-3 gap-4 p-4 sm:grid-cols-3">
                                <ps-button colors="bg-transparent dark:bg-feAchromatic-800 h-20" focus="none" border="border border-2 dark:border-feAchromatic-700 dark:hover:border-fePrimary-500 focus:border-fePrimary-500 dark:focus:border-fePrimary-500 hover:shadow" hover="none" v-if="vendorInfoStore.isPaypalEnabled()" class=""  rounded="rounded-lg" @click="paymentClicked('PAYPAL')" >
                                    <img v-lazy="{ src: $page.props.sysImageUrl + '/paypal.png', loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }" alt=""
                                            class="bottom-0 object-contain w-full h-full lg:px-8"
                                                >
                                </ps-button>

                                <ps-button colors="bg-transparent dark:bg-feAchromatic-800 h-20" focus="none" border="border border-2 dark:border-feAchromatic-700 dark:hover:border-fePrimary-500 focus:border-fePrimary-500 dark:focus:border-fePrimary-500 hover:shadow" hover="none" v-if="vendorInfoStore.isStripeEnabled()" class=""  rounded="rounded-lg" @click="paymentClicked('STRIPE')" >
                                    <img v-lazy="{ src: $page.props.sysImageUrl + '/stripe.png', loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }" alt=""
                                            class="bottom-0 object-contain w-full h-full lg:px-8"
                                                >
                                </ps-button>
                                <ps-button colors="bg-transparent dark:bg-feAchromatic-800 h-20" focus="none" border="border border-2 dark:border-feAchromatic-700 dark:hover:border-fePrimary-500 focus:border-fePrimary-500 dark:focus:border-fePrimary-500 hover:shadow" hover="none" v-if="vendorInfoStore.isRazorEnabled()" class="" rounded="rounded-lg" @click="paymentClicked('RAZOR')" >
                                    <img v-lazy="{ src: themeStore.dark ? $page.props.sysImageUrl + '/razorpay_dark.png' : $page.props.sysImageUrl + '/razorpay.png', loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }" alt=""
                                            class="bottom-0 object-contain w-full h-full lg:px-8"
                                                >
                                </ps-button>
                                <ps-button colors="bg-transparent dark:bg-feAchromatic-800 h-20" focus="none" border="border border-2 dark:border-feAchromatic-700 dark:hover:border-fePrimary-500 focus:border-fePrimary-500 dark:focus:border-fePrimary-500 hover:shadow" hover="none" v-if="vendorInfoStore.isPaystackEnabled()" class=""  rounded="rounded-lg" @click="paymentClicked('PAYSTACK')" >
                                    <img v-lazy="{ src: themeStore.dark ? $page.props.sysImageUrl + '/paystack_dark.png' : $page.props.sysImageUrl + '/paystack.png', loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }" alt=""
                                            class="bottom-0 object-contain w-full h-full lg:px-8"
                                                >
                                </ps-button>

                                <ps-button v-show="false" colors="bg-transparent dark:bg-feAchromatic-800 h-20" focus="none" v-if="appInfoStore.appInfo.data?.offlineEnabled == '1'" class="" border="border border-2 dark:border-feAchromatic-700 dark:hover:border-fePrimary-500 focus:border-fePrimary-500 dark:focus:border-fePrimary-500 hover:shadow" hover="none" padding="px-8 py-4" rounded="rounded-lg" @click="paymentClicked('OFFLINE')" >
                                    <ps-icon class="pr-1 dark:text-feSecondary-800" name="wallet" w="20" h="20"/>
                                                <ps-label textColor=" font-semibold" >Offline</ps-label>
                                </ps-button>

                                <ps-button colors="bg-transparent dark:bg-feAchromatic-800 h-20" focus="none" border="border border-2 dark:border-feAchromatic-700 dark:hover:border-fePrimary-500 focus:border-fePrimary-500 dark:focus:border-fePrimary-500 hover:shadow" hover="none" v-if="vendorInfoStore.isCodEnabled()" class=""  rounded="rounded-lg" @click="paymentClicked('Cash_On_Delivery')" >
                                    <img v-lazy="{ src: themeStore.dark ? $page.props.sysImageUrl + '/cashondelivery_dark.png' : $page.props.sysImageUrl + '/cashondelivery.png', loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }" alt=""
                                            class="bottom-0 object-contain w-full h-full lg:px-8"
                                                >
                                </ps-button>
                                <ps-button colors="bg-transparent dark:bg-feAchromatic-800 h-20" focus="none" border="border border-2 dark:border-feAchromatic-700 dark:hover:border-fePrimary-500 focus:border-fePrimary-500 dark:focus:border-fePrimary-500 hover:shadow" hover="none" v-if="vendorInfoStore.isFlutterwaveEnabled()" class=""  rounded="rounded-lg" @click="paymentClicked('FLUTTERWAVE')" >
                                    <img v-lazy="{ src: themeStore.dark ? $page.props.sysImageUrl + '/flutterwave.png' : $page.props.sysImageUrl + '/flutterwave.png', loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }" alt=""
                                            class="bottom-0 object-contain w-full h-full lg:px-8"
                                                >
                                </ps-button>
                            </div>
                        </div>
                        <cart-item-list v-if="!singleItemCheckout" :priceFormat="appInfoStore?.appInfo?.data?.mobileSetting?.price_format"/>
                    </div>

                    <!-- Order Summary Only show in md or more lager Screen size-->
                    <div v-if="singleItemCheckout" class="w-full md:w-80 md:ml-5">
                        <div class="px-3 pb-5 mb-8 rounded-md shadow-md dark:bg-feAchromatic-800">
                            <ps-label class="pt-3 mb-5 text-2xl font-bold " textColor="text-feSecondary-800 dark:text-feAchromatic-50">
                            {{ $t('order_summary') }} </ps-label>

                            <div class="container">
                                <div class="flex items-start">
                                    <!-- Image -->
                                    <img v-if="galleryProvider.galleryList.data != null"
                                    class="object-cover w-32 h-32 mr-2 overflow-hidden"
                                    v-lazy="{ src: $page.props.uploadUrl + '/' + galleryProvider?.galleryList?.data[0].imgPath, loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }"
                                    />
                                    <img v-else
                                    class="object-cover w-32 h-32 mr-2 overflow-hidden"
                                    v-lazy="{ src: $page.props.sysImageUrl+'/loading_gif.gif', loading: $page.props.sysImageUrl+'/loading_gif.gif', error: $page.props.sysImageUrl+'/default_photo.png' }"
                                    />
                                    <div class="flex flex-col">
                                        <!-- Warning Msg -->
                                        <div v-if="inStock < 10" class="mb-1">
                                            <ps-label  class="mb-1 text-sm" textColor="text-feError-500">Only {{ inStock }} Items In Stock</ps-label>
                                        </div>
                                        <div v-if="productStore.isSoldOut(loginUserId)" class="mb-1">
                                            <ps-label  class="mb-1 text-sm" textColor="text-feError-500">{{ $t("item_list__sold_item") }}</ps-label>
                                        </div>

                                        <!-- Title -->
                                        <div class="mb-2 overflow-hidden max-w-auto whitespace-nowrap">
                                            <ps-label class="font-normal overflow-ellipsis" textColor="text-feSecondary-500 dark:text-feSecondary-300">{{ productStore.item.data?.title }}</ps-label>
                                        </div>

                                        <div class="flex flex-row items-center mb-1">
                                            <!-- original price -->
                                            <div v-if="productStore.isItemDiscount()">
                                                <ps-label textColor="line-through font-sm font-semibold text-feAchromatic-700 dark:text-feAchromatic-200">
                                                    {{ productStore.item?.data?.itemCurrency?.currencySymbol }}{{ formatPrice(productStore.item?.data?.originalPrice)}}
                                                </ps-label>
                                            </div>

                                            <!-- Discount Price -->
                                            <ps-label textColor="font-semibold text-xl text-fePrimary-500 ml-1">{{ productStore.item?.data?.itemCurrency?.currencySymbol }}{{ productStore.item?.data?.price }}</ps-label>
                                        </div>
                                        <!-- Qty -->
                                        <ps-label class="mb-1 font-base" textColor="text-feSecondary-600 dark:text-feSecondary-300">{{ $t('order_summary_qty') }} {{ query.qty }}x</ps-label>

                                        <!-- Edit Order -->
                                        <ps-route-link :to="{ name: 'fe_item_detail', query: { item_id: query.itemId } }">
                                            <ps-label class="mb-1 font-normal underline cursor-pointer underline-offset-4" textColor="text-fePrimary-500">{{ $t('edit_order') }}</ps-label>
                                        </ps-route-link>

                                    </div>
                                </div>
                            </div>

                            <!-- SubTotal -->
                            <div class="flex flex-row items-center justify-between mt-6">
                                <ps-label class="text-normal" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ $t('subtotal') }}</ps-label>
                                <ps-label class="text-normal" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ productStore.item?.data?.itemCurrency?.currencySymbol }}{{ formatPrice(getSubTotal()) }}</ps-label>
                            </div>

                            <!-- Discount -->
                            <div class="flex flex-row items-center justify-between mt-5">
                                <ps-label class="text-normal" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ $t('discount') }}</ps-label>
                                <ps-label class="text-normal" textColor="text-fePrimary-500">-{{ productStore.item?.data?.itemCurrency?.currencySymbol }}{{ formatPrice(getDiscount()) }}</ps-label>
                            </div>

                            <!-- Delivery Charges -->
                            <div class="flex flex-row items-center justify-between mt-5">
                                <ps-label class="text-normal" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ $t('delivery_charges') }}</ps-label>
                                <ps-label v-if="vendorInfoStore.isDeliverySettingOn()" class="text-normal" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ productStore.item?.data?.itemCurrency?.currencySymbol }}{{ formatPrice(vendorInfoStore.getDeliveryCharges()) }}</ps-label>
                                <ps-label v-else class="text-normal" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ productStore.item?.data?.itemCurrency?.currencySymbol }}{{ formatPrice(0) }}</ps-label>
                            </div>

                            <div class="my-6 border-t border-feAchromatic-100 dark:border-feAchromatic-800"></div>

                            <!-- Total -->
                            <div class="flex flex-row items-center justify-between my-5">
                                <ps-label class="text-lg font-bold" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ $t('total') }}</ps-label>
                                <ps-label class="text-lg font-bold" textColor="text-feSecondary-800 dark:text-feSecondary-300">{{ productStore.item?.data?.itemCurrency?.currencySymbol }}{{ formatPrice(getTotal()) }}</ps-label>
                            </div>

                            <!-- Place Order -->
                            <ps-button :disabled="productStore.item?.data?.isSoldOut == '1' || vendorInfoStore.vendor?.data?.expireStatus == 2" class="w-full cursor-pointer" @click="clickPlaceOrder">{{ $t('place_order') }}</ps-button>

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

                    <div v-else class="w-full md:w-80 md:ml-5">
                        <div class="px-4 py-3 border rounded-lg dark:bg-feAchromatic-800 dark:border-feAchromatic-800">
                            <ps-label textColor="text-xl font-semibold text-feSecondary-800 dark:text-feAchromatic-50">{{ $t("order_summary") }}</ps-label>
                            <div class="flex flex-col gap-3 py-4 border-b-2 dark:border-feAchromatic-700">
                                <ps-label textColor="flex items-center justify-between">
                                    <ps-label textColor="text-base text-feSecondary-800 dark:text-feAchromatic-200">{{ $t("subtotal") }}</ps-label>
                                    <ps-label textColor="text-base text-feSecondary-800 dark:text-feAchromatic-200">{{ addToCartStore.cart?.data?.vendorCurrencySymbol }}{{ formatPrice(addToCartStore.cart?.data?.subTotal) }}</ps-label>
                                </ps-label>
                                <ps-label textColor="flex items-center justify-between">
                                    <ps-label textColor="text-base text-feSecondary-800 dark:text-feAchromatic-200">{{ $t("discount") }}</ps-label>
                                    <ps-label textColor="text-base text-fePrimary-500">-{{ addToCartStore.cart?.data?.vendorCurrencySymbol }}{{ formatPrice(addToCartStore.cart?.data?.totalDiscount) }}</ps-label>
                                </ps-label>
                                <ps-label textColor="flex items-center justify-between">
                                    <ps-label textColor="text-base text-feSecondary-800 dark:text-feAchromatic-200">{{ $t("delivery_charges") }}</ps-label>
                                    <ps-label textColor="text-base text-feSecondary-800 dark:text-feAchromatic-200">{{ addToCartStore.cart?.data?.vendorCurrencySymbol }}{{ formatPrice(addToCartStore.cart?.data?.deliveryFee) }}</ps-label>
                                </ps-label>
                            </div>
                            <ps-label textColor="flex items-center justify-between my-4">
                                <ps-label textColor="text-xl font-medium text-feSecondary-800 dark:text-feAchromatic-200">{{ $t("total") }}</ps-label>
                                <ps-label textColor="text-xl font-medium text-feSecondary-800 dark:text-feAchromatic-200">{{ addToCartStore.cart?.data?.vendorCurrencySymbol }}{{ formatPrice(addToCartStore.cart?.data?.total) }}</ps-label>
                            </ps-label>
                            <ps-button :disabled="isAllItemSoldOut || vendorInfoStore.vendor?.data?.expireStatus == 2" @click="basketPlaceOrder()" class="w-full">{{ $t("place_order") }}</ps-button>
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
            <ps-loading-dialog ref="ps_loading_dialog" class='z-40'/>
            <ps-warning-dialog-2 ref="ps_warning_dialog" />
            <vendor-paypal-modal ref="vendor_paypal_payment_modal" />
            <vendor-stripe-payment-modal ref="stripe_payment_modal" />
            <ps-error-dialog ref="ps_error_dialog" />
            <input-email-modal ref="input_email" />
            <add-new-address-modal ref="add_new_address_modal"/>
            <address-list-modal ref="address_list_modal" @updateAddress="updateAddress"/>
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

import {  ref,onMounted,computed,reactive, onUnmounted, watch, defineAsyncComponent} from 'vue';
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
import VendorPaypalModal from './components/VendorPaypalModal.vue';
import AddNewAddressModal from './components/VendorCheckoutAddAddressModal.vue';
import AddressListModal from './components/VendorCheckoutAddressListModal.vue';
import CartItemList from './components/VendorCheckoutItemList.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
// import VendorStripePaymentModal from './components/VendorStripePaymentModal.vue';
import InputEmailModal from '@template1/vendor/components/modules/email/InputEmailModal.vue';
import { trans } from 'laravel-vue-i18n';

import { PsValueStore } from "@templateCore/store/modules/core/PsValueStore";
import { useVendorCheckoutStoreState } from "@templateCore/store/modules/vendor_checkout/VendorCheckoutStore";
import { useVendorShippingBillingStoreState } from "@templateCore/store/modules/vendor_checkout/VendorShippingBillingStore";
import { useVendorItemBoughtStore } from "@templateCore/store/modules/vendor_checkout/VendorItemBoughtStore";
import { usePhoneStore } from '@templateCore/store/modules/item/PhoneStore';
import { useProductStore } from '@templateCore/store/modules/item/ProductStore';
import { useGalleryStoreState } from '@templateCore/store/modules/gallery/GalleryStore';
import { useUserStore } from "@templateCore/store/modules/user/UserStore";
import { useAddToCartStoreState } from "@templateCore/store/modules/addToCart/AddToCartStore";
import { useItemPromotionStoreState } from '@templateCore/store/modules/promotion/ItemPromotionStore';

import OrderSummaryParameterHolder from "@templateCore/object/holder/OrderSummaryParameterHolder";
import VendorItemBoughtParameterHolder from '@templateCore/object/holder/VendorItemBoughtParameterHolder';
import StripePaymentModal from '@template1/vendor/components/modules/credit/StripePaymentModal.vue';

import VendorCheckoutGroupTitle from './components/VendorCheckoutGroupTitle.vue';
import PsUtils from '@templateCore/utils/PsUtils';
import PsStatus from '@templateCore/api/common/PsStatus';
import PaystackPop from '@paystack/inline-js';

import { router } from '@inertiajs/vue3';
import format from 'number-format.js';
const VendorStripePaymentModal = defineAsyncComponent(() => import('./components/VendorStripePaymentModal.vue'));

import {useFlutterwave} from "flutterwave-vue3ts"
import { useThemeStore } from '../../../../../../../../resources/js/store/Utilities/ThemeStore';

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
        VendorCheckoutGroupTitle,
        PsDropdownSelect,
        PsInputWithRightIcon,
        PsDropdown,
        PsTextarea,
        PsWarningDialog2,
        PsRouteLink,
        VendorPaypalModal,
        PsErrorDialog,
        Head,
        VendorStripePaymentModal,
        InputEmailModal,
        PsIcon,
        AddNewAddressModal,
        AddressListModal,
        CartItemList,
    },
    layout: PsFrontendLayout,
    props : ['query'],
    setup (props,{ emit }){

        const appInfoStore = usePsAppInfoStoreState();
        const vendorInfoStore = useVendorInfoStoreState();
        const vendorCheckoutStore = useVendorCheckoutStoreState();
        const vendorItemBoughtStore = useVendorItemBoughtStore();
        const phoneStore = usePhoneStore('phoneList');
        const galleryProvider = useGalleryStoreState('detail');
        const itemProvider = useProductStore();
        const productStore = useProductStore('detail');
        const shippingBillingStore = useVendorShippingBillingStoreState('detail');
        const addToCartStore = useAddToCartStoreState('checkout');
        const userProvider = useUserStore();
        const provider = useItemPromotionStoreState();
        const orderSummaryParameterHolder =new OrderSummaryParameterHolder();
        const vendorItemBoughtParameterHolder = new VendorItemBoughtParameterHolder();
        const paramHolder = shippingBillingStore.shippingAndBillingParameterHolder;

        const payment = ref('');
        const input_email = ref();

        const ps_loading_dialog = ref();
        const ps_warning_dialog = ref();
        const ps_error_dialog = ref();
        const vendor_paypal_payment_modal = ref();
        const stripe_payment_modal = ref();

        const loading = ref(false);
        const psValueStore = PsValueStore();
        const loginUserId = psValueStore.getLoginUserId();
        const phoneKeyword = ref("");
        const shippingPhone = ref('');
        const billingPhone = ref('');
        const shippingPhoneCode = reactive({ 'id': 0, 'value': '', 'code': '+1' });
        const billingPhoneCode = reactive({ 'id': 0, 'value': '', 'code': '+1' });
        const isShippingSaveChecked = ref(false);
        const isBillingSaveChecked = ref(false);
        const isSameChecked = ref(false);
        const orderId = ref();
        const razorKey = ref('');
        const razorId = ref('');
        const paystackKey = ref('');
        const currencyShortForm = ref('');
        const isAllItemSoldOut = ref(false);

        const themeStore = useThemeStore();

        const inStock = ref(0);
        let isError= ref(true);

        const add_new_address_modal = ref();
        const address_list_modal = ref();
        const defaultAddress = ref({});
        const singleItemCheckout = ref('itemId' in props.query);
        const vendorId = ref();
        const currentBillingAddressId = ref();
        const currentShippingAddressId = ref();

        const flutterwaveSuccess = ref(false);

        const validation = ref({
            shippingFirstNameStatus : false,
            shippingLastNameStatus : false,
            shippingEmailStatus : false,
            shippingPhoneNoStatus : false,
            shippingAddressStatus : false,
            shippingCountryStatus : false,
            shippingStateStatus : false,
            shippingCityStatus : false,
            shippingPostalCodeStatus : false,
            billingFirstNameStatus : false,
            billingLastNameStatus : false,
            billingEmailStatus : false,
            billingPhoneNoStatus : false,
            billingAddressStatus : false,
            billingCountryStatus : false,
            billingStateStatus : false,
            billingCityStatus : false,
            billingPostalCodeStatus : false
        });

        onMounted(async () => {
            loading.value = true;
            await loadDataForItemDetail();
            razorKey.value = vendorInfoStore.getRazorKey();
            paystackKey.value = vendorInfoStore.getPaystackKey();

            loading.value = false;
        });
        async function loadDataForItemDetail() {
            if(singleItemCheckout.value){
                await productStore.loadItem(props.query.itemId, loginUserId);
                await galleryProvider.resetGalleryList(loginUserId, props.query.itemId, PsConst.ITEM__RELATED_TYPE);
                let quantity = productStore?.item?.data?.productRelation.filter((pr)=>pr.coreKeysId == 'ps-itm00046');
                inStock.value = quantity.length == 0 ? 1 : quantity[0].value;
                vendorId.value = productStore.item.data?.vendor.id;
                currencyShortForm.value = productStore?.item?.data?.itemCurrency?.currencyShortForm;
                console.log(productStore)
            }
            if(!singleItemCheckout.value){
                await addToCartStore.getAllItemFromCart(loginUserId, 1);
                vendorId.value = addToCartStore.cart?.data?.vendorId;
                currencyShortForm.value = addToCartStore.cart?.data?.vendorCurrencyShortForm;
                isAllItemSoldOut.value = addToCartStore.cart?.data?.items.filter((item)=>item.isSoldOut==0)?.length == 0 ? true : false;
            }
            await shippingBillingStore.resetDefaultShippingBillingAddress(loginUserId);
            await vendorInfoStore.loadVendorInfo(vendorId.value);

            if(shippingBillingStore.defaultShippingBillingAddress?.data != null){
                updateParamHolderValue(shippingBillingStore.defaultShippingBillingAddress.data)
            }
        }

        watch(()=>shippingBillingStore.defaultShippingBillingAddress.data, (newValue, oldValue)=>{
            updateParamHolderValue(newValue);
        });

        function updateParamHolderValue(updateValue){
            paramHolder.shippingFirstName = updateValue.shippingFirstName;
            paramHolder.shippingLastName = updateValue.shippingLastName;
            paramHolder.shippingEmail = updateValue.shippingEmail;
            paramHolder.shippingPhoneNo = updateValue.shippingPhoneNo;
            paramHolder.shippingAddress = updateValue.shippingAddress;
            paramHolder.shippingCountry = updateValue.shippingCountry;
            paramHolder.shippingState = updateValue.shippingState;
            paramHolder.shippingCity = updateValue.shippingCity;
            paramHolder.shippingPostalCode = updateValue.shippingPostalCode;
            paramHolder.isSaveShippingInfoForNextTime = updateValue.isSaveShippingInfoForNextTime;
            paramHolder.billingFirstName = updateValue.billingFirstName;
            paramHolder.billingLastName = updateValue.billingLastName;
            paramHolder.billingEmail = updateValue.billingEmail;
            paramHolder.billingPhoneNo = updateValue.billingPhoneNo;
            paramHolder.billingAddress = updateValue.billingAddress;
            paramHolder.billingCountry = updateValue.billingCountry;
            paramHolder.billingState = updateValue.billingState;
            paramHolder.billingCity = updateValue.billingCity;
            paramHolder.billingPostalCode = updateValue.billingPostalCode;
            paramHolder.isSaveBillingInfoForNextTime = updateValue.isSaveBillingInfoForNextTime;
            currentBillingAddressId.value = updateValue.billingId;
            currentShippingAddressId.value = updateValue.shippingId;
        }

        function formatPrice(value){
            return format(appInfoStore?.appInfo?.data?.mobileSetting?.price_format, value);
        }


        function openAddressModal(addressType){
            add_new_address_modal.value.openModal(addressType, null, trans('core_fe__add_new_address'));
        }

        function openAddressListModal(addressType, selectedAddressId){
            address_list_modal.value.openModal(addressType, selectedAddressId);
        }

        function getSubTotal(){
            return Number(productStore.item.data?.originalPrice * props.query.qty);
        }

        function getTotal(){
            if(!singleItemCheckout.value){
                return Number(addToCartStore.cart?.data?.total);
            }else if(vendorInfoStore.isDeliverySettingOn()){
                return Number(productStore.item.data?.price * props.query.qty + parseFloat(vendorInfoStore.getDeliveryCharges()));
            }else{
                return Number(productStore.item.data?.price * props.query.qty);
            }
        }

        function getDiscount(){
            return Number((productStore.item.data?.originalPrice - productStore.item.data?.price) * props.query.qty);
        }

        function loadPhone() {
            phoneStore.loadPhoneCountryCode(loginUserId, itemProvider.phoneparamHolder);
        }

        function filterPhoneUpdate(value) {
            itemProvider.phoneparamHolder.keyword = value;
            phoneStore.filterPhoneUpdate(loginUserId, itemProvider.phoneparamHolder);
        }

        function shippingPhoneFilterClicked(value) {
            shippingPhoneCode.code = value.country_code
            console.log(shippingPhoneCode.code);
        }
        function billingPhoneFilterClicked(value) {
            billingPhoneCode.code = value.country_code
            console.log(billingPhoneCode.code);
        }

        function updateAddress(address, type){
            if(type == 'shipping'){
                paramHolder.shippingFirstName = address.firstName;
                paramHolder.shippingLastName = address.lastName;
                paramHolder.shippingEmail = address.email;
                paramHolder.shippingPhoneNo = address.phoneNo;
                paramHolder.shippingAddress = address.address;
                paramHolder.shippingCountry = address.country;
                paramHolder.shippingState = address.state;
                paramHolder.shippingCity = address.city;
                paramHolder.shippingPostalCode = address.postalCode;
                paramHolder.isSaveBillingInfoForNextTime = address.isSaveBillingInfoForNextTime;
                paramHolder.isSaveShippingInfoForNextTime = address.isSaveShippingInfoForNextTime;
                currentShippingAddressId.value = address.id;
            }else{
                paramHolder.billingFirstName = address.firstName;
                paramHolder.billingLastName = address.lastName;
                paramHolder.billingEmail = address.email;
                paramHolder.billingPhoneNo = address.phoneNo;
                paramHolder.billingAddress = address.address;
                paramHolder.billingCountry = address.country;
                paramHolder.billingState = address.state;
                paramHolder.billingCity = address.city;
                paramHolder.billingPostalCode = address.postalCode;
                paramHolder.isSaveBillingInfoForNextTime = address.isSaveBillingInfoForNextTime;
                paramHolder.isSaveShippingInfoForNextTime = address.isSaveShippingInfoForNextTime;
                currentBillingAddressId.value = address.id;
            }
            console.log(address, type);
        }

        function validateAddress(address) {
            isError.value = false;
            for(const key in address){
                if(address[key] === ""){
                    isError.value = true;
                    console.log(key)
                }
            }
        }

        async function basketPlaceOrder() {
            let items = addToCartStore.cart?.data?.items.filter(item=>item.isSoldOut == 0).map((item)=>{
                return {
                    "item_id" : item.itemId,
                    "quantity" : item.quantity,
                    "original_price" : item.originalPrice,
                    "sale_price" : item.salePrice,
                    "sub_total" : item.subTotal,
                    "discount_price" : item.discountPrice,
                };
            })
            paramHolder.vendorId = addToCartStore.cart?.data?.vendorId;
            paramHolder.totalPrice = addToCartStore.cart?.data?.total;
            paramHolder.orderSummary = items;

            validateAddress(paramHolder);

            if(isError.value){
                ps_error_dialog.value.openModal("", trans('core_fe__address_information_are_missing'));
            }else{
                if(payment.value != ''){
                    let response = await vendorCheckoutStore.loadOrder(loginUserId, paramHolder);
                    console.log(response);
                    if(response.status == 2){
                        ps_error_dialog.value.openModal('', response.message);
                    }else{
                        orderId.value = vendorCheckoutStore.order.data?.orderId;
                        vendorItemBought();
                    }
                }else{
                    ps_error_dialog.value.openModal('', 'Choose Payment Method');
                }
            }
        }

        async function clickPlaceOrder(){

            if(loginUserId == 'nologinuser'){
                router.get(route('login'));
            }else{
                paramHolder.vendorId = productStore.item.data?.vendor.id;

                paramHolder.totalPrice = getTotal();
                paramHolder.orderSummary=[
                    {
                      "item_id" : props.query.itemId,
                      "quantity" : props.query.qty,
                      "original_price" : productStore.item.data?.originalPrice,
                      "sale_price" : productStore.item.data?.price,
                      "sub_total" : getTotal().toString(),
                      "discount_price" : getDiscount().toString()
                    }
                ];

                validateAddress(paramHolder);

                if(isError.value){
                    ps_error_dialog.value.openModal("", "Address information are missing.");
                }

                if(isError.value == false){
                    vendorCheckoutStore.paramHolder.vendorId = productStore.item.data?.vendor.id;
                    // vendorCheckoutStore.paramHolder.shippingPhoneNo = shippingPhoneCode.code.toString() + shippingPhone.value.toString();
                    // vendorCheckoutStore.paramHolder.billingPhoneNo = billingPhoneCode.code.toString() + billingPhone.value.toString();
                    // vendorCheckoutStore.paramHolder.isSaveShippingInfoForNextTime = isShippingSaveChecked.value ? "1" : "0";
                    // vendorCheckoutStore.paramHolder.isSaveBillingInfoForNextTime = isBillingSaveChecked.value ? "1" : "0";
                    vendorCheckoutStore.paramHolder.totalPrice = getSubTotal();
                    orderSummaryParameterHolder.itemId = props.query.itemId;
                    orderSummaryParameterHolder.quantity = props.query.qty;
                    orderSummaryParameterHolder.originalPrice = productStore.item.data?.originalPrice;
                    orderSummaryParameterHolder.salePrice = productStore.item.data?.price;
                    orderSummaryParameterHolder.subTotal = getSubTotal();
                    orderSummaryParameterHolder.discountPrice = getDiscount();
                    vendorCheckoutStore.paramHolder.orderSummary=[
                    {
                      "item_id" : props.query.itemId,
                      "quantity" : props.query.qty,
                      "original_price" : productStore.item.data?.originalPrice,
                      "sale_price" : productStore.item.data?.price,
                      "sub_total" : getTotal().toString(),
                      "discount_price" : getDiscount().toString()
                    }
                    ];

                    await vendorCheckoutStore.loadOrder(loginUserId, paramHolder);

                    orderId.value = vendorCheckoutStore.order.data?.orderId;

                    if(payment.value != ''){
                        console.log(payment.value);
                        vendorItemBought();
                    }else{
                        ps_error_dialog.value.openModal('', 'Choose Payment Method');
                    }
                }
            }
        }

        function vendorItemBought(){
            if(appInfoStore.appInfo.data.mobileSetting.is_demo_for_payment == 1 && payment.value !== 'Cash_On_Delivery'){
                ps_warning_dialog.value.openModal(
                    trans('payment__warning_title'),
                    trans('payment__confirm_message'),
                    trans('payment__ok'),
                    trans('credit_card_modal__cancel'),
                    () => {
                        if(payment.value == 'PAYPAL'){
                            paypalClicked();
                        }else if(payment.value == 'STRIPE'){
                            stripeClicked();
                        }else if(payment.value == 'RAZOR'){
                            razorClicked();
                        }else if(payment.value == 'PAYSTACK'){
                            paystackClicked();
                        }else if(payment.value == 'OFFLINE'){
                            offlineClicked();
                        }else if(payment.value == 'Cash_On_Delivery'){
                            cashOnDeliveryClicked();
                        }else if(payment.value == 'FLUTTERWAVE'){
                            if(PsUtils.checkFlutterwaveCurrency(currencyShortForm.value)){
                                flutterwaveClicked();
                            }else{
                                ps_error_dialog.value.openModal('',
                                trans('core_fe__flutterwave_currency_not_supported',{"attribute":currencyShortForm.value}));
                            }
                        }
                    },
                    () => {
                        PsUtils.log("Cancel");
                    });


            }else{
                if(payment.value == 'PAYPAL'){
                    paypalClicked();
                }else if(payment.value == 'STRIPE'){
                    stripeClicked();
                }else if(payment.value == 'RAZOR'){
                    razorClicked();
                }else if(payment.value == 'PAYSTACK'){
                    paystackClicked();
                }else if(payment.value == 'OFFLINE'){
                    offlineClicked();
                }else if(payment.value == 'Cash_On_Delivery'){
                    cashOnDeliveryClicked();
                }else if(payment.value == 'FLUTTERWAVE'){
                    if(PsUtils.checkFlutterwaveCurrency(currencyShortForm.value)){
                        flutterwaveClicked();
                    }else{
                        ps_error_dialog.value.openModal('',
                        trans('core_fe__flutterwave_currency_not_supported',{"attribute":currencyShortForm.value}));
                    }
                }
            }
        }

        function paymentClicked(value){
            if(value == 'PAYPAL'){
                payment.value = 'PAYPAL';
            }else if(value == 'STRIPE'){
                payment.value = 'STRIPE';
            }else if(value == 'RAZOR'){
                payment.value = 'RAZOR';
            }else if(value == 'PAYSTACK'){
                payment.value = 'PAYSTACK';
            }else if(value == 'OFFLINE'){
                payment.value = 'OFFLINE';
            }else if(value == 'Cash_On_Delivery'){
                payment.value = 'Cash_On_Delivery';
            }else if(value == 'FLUTTERWAVE'){
                payment.value = "FLUTTERWAVE";
            }
        }

        function paypalClicked(){
            console.log('paypal modal open now');
            vendor_paypal_payment_modal.value.openModal(
                () => {
                    const payment = PsConst.PAYMENT_PAYPAL_METHOD.toString();
                    doPayment(payment);
                },
                () => {
                    PsUtils.log("Cancel");
                },
                vendorId.value
            );
        }

        function cashOnDeliveryClicked(){
            const payment = PsConst.PAYMENT_COD_METHOD.toString();
            doPayment(payment);
            vendorId.value
        }

        async function verify(data, payment){
            await provider.verifyTransaction(loginUserId, data.transaction_id,vendorId.value)
            console.log(provider);
            if(provider.transaction?.data != null && provider.transaction?.data?.status == 'success'){
                doPayment(payment);
            }
        }

        async function flutterwaveClicked() {
            if(vendorInfoStore.vendorInfo?.data?.vendorFlutterwavePublicKey == ""){
                ps_error_dialog.value.openModal('', trans('core_fe__update_flutterwave_public_key'));
            }else{
                const payment = PsConst.PAYMENT_FLUTTERWAVE_METHOD.toString();
                const returnData = await userProvider.loadUser(loginUserId);
                const userInfo = returnData.data;

                useFlutterwave({
                    amount: parseFloat(getTotal()),//amount
                    callback(data: any) {
                    //  TODO: handle callbacks
                        console.log(data);
                        verify(data, payment);
                    },
                    country: "US",
                    currency: currencyShortForm.value,
                    customer: {email: userInfo.userEmail, name: userInfo.userName, phone_number: userInfo.userPhone},
                    customizations: {description: "Pay with yourCompanyname", logo: "", title: trans('home__banner_header')},
                    meta: {
                        user_id: loginUserId,
                        token: "jdjdjdjdjd"
                    },
                    onclose(): void {
                        emit('isPromoteSuccessful',flutterwaveSuccess.value);
                    },
                    payment_options:  "card",
                    public_key: vendorInfoStore.vendorInfo?.data?.vendorFlutterwavePublicKey,
                    redirect_url: undefined,
                    tx_ref: "tx_ref_"+Date.now()
                })
            }
        }

        function stripeClicked() {

            stripe_payment_modal.value.openModal(
                () => {
                    const payment = PsConst.PAYMENT_STRIPE_METHOD.toString();
                    doPayment(payment);
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );

        }

        async function razorClicked() {
            const returnData = await userProvider.loadUser(loginUserId);
            const userInfo = returnData.data;
            //for razor ui
            const options =
            {
                "key": razorKey.value, // Enter the Key ID generated from the Dashboard
                "name": "Test Company",
                "amount": parseFloat(getTotal()) * 100,
                "currency": currencyShortForm.value,
                "prefill": {
                    "email": userInfo.userEmail,
                    "name": userInfo.userName,
                    "contact": userInfo.userPhone
                },
                "theme": {
                    "color": "#0e9f6e"
                },
                // This handler function will handle the success payment
                "handler": async function (response) {
                    razorId.value =  response.razorpay_payment_id;
                    // Submit response.razorpay_payment_id to your server
                    doPayment(PsConst.PAYMENT_RAZOR_METHOD.toString())

                },
            };

            const rzp1 = new (window as any).Razorpay(options);
            rzp1.open();
            rzp1.on('payment.failed', function (response)
            {
                // alert(response.error);
            });

        }

        async function paystackClicked() {
            const returnData = await userProvider.loadUser(loginUserId);
            const userInfo = returnData.data;
            let email = userInfo.userEmail;
            if(userInfo.userEmail == "" || userInfo.userEmail == null){
                input_email.value.openModal(
                    (emailStr) => {
                         email = emailStr;
                        const paystack = PaystackPop.setup({
                            key: paystackKey.value,
                            email: email,
                            amount: parseFloat(getTotal()) * 100,
                            currency: currencyShortForm.value,
                            callback: async function(response){
                                PsUtils.log(response);
                                // Payment complete! Reference: ' + response.reference;
                                doPayment(PsConst.PAYMENT_PAY_STACK_METHOD.toString());

                            },
                            onClose: function(){
                                // alert("close");
                                // user closed popup
                            }

                        });
                        paystack.openIframe();
                    },
                     () => {
                         console.log('cancel');
                    }  );
            }else{
                const paystack = PaystackPop.setup({
                key: paystackKey.value,
                email: email,
                amount: parseFloat(getTotal()) * 100,
                currency: currencyShortForm.value,
                callback: async function(response){
                    PsUtils.log(response);
                    // Payment complete! Reference: ' + response.reference;
                    doPayment(PsConst.PAYMENT_PAY_STACK_METHOD.toString());

                },
                onClose: function(){
                    // alert("close");
                    // user closed popup
                }

            });
            paystack.openIframe();
            }

        }

        function offlineClicked(){

        }

        async function doPayment(payment) {

            vendorItemBoughtParameterHolder.userId = loginUserId;
            vendorItemBoughtParameterHolder.paymentMethod = payment;
            vendorItemBoughtParameterHolder.paymentMethodNounce =vendorItemBoughtStore.paymentNonce;
            vendorItemBoughtParameterHolder.paymentAmount = getTotal();
            vendorItemBoughtParameterHolder.razorId = razorId.value;
            vendorItemBoughtParameterHolder.isPaystack = '';
            vendorItemBoughtParameterHolder.orderId = orderId.value;
            vendorItemBoughtParameterHolder.vendorId = paramHolder.vendorId;
            vendorItemBoughtParameterHolder.currencyId = vendorInfoStore.vendorInfo?.data?.vendorCurrencyId;
            vendorItemBoughtParameterHolder.isSingleCheckout = singleItemCheckout.value ? "1" : "0";

            ps_loading_dialog.value.openModal();
            const resopne = await vendorItemBoughtStore.postVendorItemBought(loginUserId,vendorItemBoughtParameterHolder);
            ps_loading_dialog.value.closeModal();

            if(resopne.status == PsStatus.ERROR){
                ps_error_dialog.value.openModal('', resopne.message);
            }else{
                router.get(route('fe_order_successful'),{
                    'orderId' : orderId.value,
                    'itemId' : props.query.itemId
                });
            }
        }


        function termsAndConditionClick(){
            router.get(route('fe_terms_and_conditions'));
        }

        const breadcrumb = computed(() => {
            if (!singleItemCheckout.value){
                return [
                    {
                        label: trans('ps_nav_bar__home'),
                        url: route('dashboard')
                    },
                    {
                        label: trans('core_fe__shopping_cart'),
                        url: route('fe_shopping_cart',{ user_id: loginUserId })
                    },
                    {
                      label: 'Checkout',
                      color: "text-fePrimary-500"
                    }
                ];
            }else if (appInfoStore?.isShowSubCategory() || productStore.item.data?.subCategory?.id == '') {
                return [
                    {
                        label: trans('ps_nav_bar__home'),
                        url: route('dashboard')
                    },
                    {
                      label: productStore.item.data?.category?.catName,
                      url: route('fe_item_list', {
                        cat_id: productStore.item.data?.category?.catId,
                        cat_name: productStore.item.data?.category?.catName,
                        status: 1
                      })
                    },
                    {
                      label: productStore.item.data?.title,
                    },
                    {
                      label: 'Checkout',
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
                      label: productStore.item.data?.category?.catName,
                      url: route('fe_item_list', {
                        cat_id: productStore.item.data?.category?.catId,
                        cat_name: productStore.item.data?.category?.catName,
                        status: 1
                      })
                    },
                    {
                      label: productStore.item.data?.subCategory?.name,
                      url: route('fe_item_list', {
                        cat_id: productStore.item.data?.category?.catId,
                        cat_name: productStore.item.data?.category?.catName,
                        sub_cat_id: productStore.item.data?.subCategory?.id,
                        sub_cat_name: productStore.item.data?.subCategory?.name,
                        status: 1
                      })
                    },
                    {
                      label: productStore.item.data?.title,
                    },
                    {
                      label: 'Checkout',
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
            vendor_paypal_payment_modal,
            loading,
            appInfoStore,
            vendorInfoStore,
            productStore,
            shippingBillingStore,
            loadPhone,
            shippingPhone,
            billingPhone,
            filterPhoneUpdate,
            phoneKeyword,
            shippingPhoneCode,
            billingPhoneCode,
            shippingPhoneFilterClicked,
            billingPhoneFilterClicked,
            phoneStore,
            galleryProvider,
            clickPlaceOrder,
            inStock,
            getSubTotal,
            getTotal,
            getDiscount,
            termsAndConditionClick,
            validation,
            isShippingSaveChecked,
            isBillingSaveChecked,
            isSameChecked,
            paymentClicked,
            ps_warning_dialog,
            stripe_payment_modal,
            stripeClicked,
            input_email,
            openAddressModal,
            openAddressListModal,
            add_new_address_modal,
            address_list_modal,
            defaultAddress,
            updateAddress,
            paramHolder,
            themeStore,
            addToCartStore,
            basketPlaceOrder,
            singleItemCheckout,
            formatPrice,
            isAllItemSoldOut,
            currentShippingAddressId,
            currentBillingAddressId,
        }
    },

}
</script>
