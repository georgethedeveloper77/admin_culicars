<template>
    <div>
       <ps-modal ref="psmodal"  line="hidden" maxWidth="534px" :isClickOut='false' class='h-full  ' bodyHeight="max-h-75" theme="px-4 py-8 sm:p-8 rounded-lg">
        <template #title>
             <!-- Item entry title -->
            <div class="flex justify-between items-start">
                    <ps-label v-if="limitProvider.buyadList?.data != null && limitProvider.buyadList?.data[0]?.user?.remainingPost == 0 " textColor="text-lg font-semibold text-feSecondary-800 mb-2">{{ $t("limit_item_modal__quota_running_out.") }}</ps-label>
                    <div class="flex flex-wrap">
                        <ps-label class="text-lg  text-feSecondary-800 me-2"> {{ $t('limit_item_modal__limit') }} </ps-label>
                        <ps-label class="text-lg"> {{ $t('limit_item_modal__limit_post_buy') }} </ps-label>
                    </div>
                <ps-icon class="cursor-pointer dark:text-feSecondary-500" name="close" w="24" h="24" @click="psmodal.toggle(false)"/>
            </div>
        </template>
        <template #body>
            <!-- End Item entry title -->
            <!-- Start Input Field for md .. -->
            <div class="flex flex-col mt-1 sm:mt-7">
                <!-- Start Left Screen -->
                <div class="">
                    <div class="flex flex-col w-full">
                        <ps-label class="font-medium text-base">{{ $t('promote_item_modal__choose_package') }}  </ps-label>
                        <div class="flex flex-col w-full mt-3 gap-2 sm:gap-4" id="r1">
                            <ps-radio-2 class="border px-2 py-2 rounded"
                            v-for="selectData in packageprovider.packageList.data"
                            :key="selectData.packageId"
                            :value="selectData"
                            v-model:selectedValue="selected"
                            :class="{ 'border-fePrimary-500': selected === selectData }"
                              >
                               <template #title >
                                    <div>
                                        <ps-label class='ms-2 pl-1 text-sm font-semibold text-feSecondary-800'>{{selectData.paymentInfo.value}}</ps-label>
                                        <ps-label class='ms-2  pl-1 mt-1 text-sm text-feSecondary-800'>{{ selectData.paymentAttributes.count }} {{ $t('limit_item_modal__post') }} </ps-label>

                                    </div>
                                </template>
                                <template #price>
                                    <ps-label class='text-sm'><span class="font-light">{{ selectData.paymentAttributes?.currencySymbol }}</span> {{ formatPrice(selectData.paymentAttributes.price) }}</ps-label>
                                </template>
                            </ps-radio-2>

                        </div>

                        <!-- end Ads days -->
                     </div>
                </div>
                <!-- End Left Screen -->

            </div>
            <!-- End Input Field -->

        </template>
        <template #footer>
            <ps-label class="mt-6 sm:mt-7 font-medium text-base"> {{ $t('promote_item_modal__pay_with') }}  </ps-label>
            <div class="grid grid-cols-3 sm:grid-cols-3 gap-4 mt-6">
                <ps-button colors="bg-transparent dark:bg-feSecondary-50 h-16" border="border hover:shadow" hover="none" v-if="appInfoStore.appInfo.data?.paypalEnable == '1'" class=""  rounded="rounded-lg" @click="paymentClicked('PAYPAL')" >
                    <img v-lazy="{ src: $page.props.sysImageUrl + '/paypal.png' }" alt=""
                               class="w-full h-full object-contain bottom-0"
                                >
                </ps-button>

                <ps-button colors="bg-transparent  dark:bg-feSecondary-50 h-16" border="border hover:shadow" hover="none" v-if="appInfoStore.appInfo.data?.stripeEnable == '1'" class=""  rounded="rounded-lg" @click="paymentClicked('STRIPE')" >
                    <img v-lazy="{ src: $page.props.sysImageUrl + '/stripe.png' }" alt=""
                               class="w-full h-full object-contain bottom-0"
                                >
                </ps-button>
                <ps-button colors="bg-transparent dark:bg-feSecondary-50 h-16" border="border hover:shadow" hover="none" v-if="appInfoStore.appInfo.data?.razorEnable == '1'" class="" rounded="rounded-lg" @click="paymentClicked('RAZOR')" >
                    <img v-lazy="{ src: $page.props.sysImageUrl + '/razorpay.png' }" alt=""
                               class="w-full h-full object-contain bottom-0"
                                >
                </ps-button>
                <ps-button colors="bg-transparent dark:bg-feSecondary-50 h-16" border="border hover:shadow" hover="none" v-if="appInfoStore.appInfo.data?.payStackEnabled == '1'" class=""  rounded="rounded-lg" @click="paymentClicked('PAYSTACK')" >
                    <img v-lazy="{ src: $page.props.sysImageUrl + '/paystack.png' }" alt=""
                               class="w-full h-full object-contain bottom-0"
                                >
                </ps-button>
                <ps-button colors="bg-transparent dark:bg-feSecondary-50 h-16" v-if="appInfoStore.appInfo.data?.offlineEnabled == '1'" class="" border="border hover:shadow" hover="none" padding="px-8 py-4" rounded="rounded-lg" @click="paymentClicked('OFFLINE')" >
                    <ps-icon class=" dark:text-feSecondary-800 pr-1" name="wallet" w="20" h="20"/>
                                <ps-label textColor=" font-semibold" >Offline</ps-label>
                </ps-button>
                <ps-button colors="bg-transparent dark:bg-feSecondary-50 h-16" border="border hover:shadow" hover="none" v-if="appInfoStore.appInfo.data?.flutterwaveEnabled == '1'" class=""  rounded="rounded-lg" @click="paymentClicked('FLUTTERWAVE')" >
                    <img v-lazy="{ src: $page.props.sysImageUrl + '/flutterwave.png' }" alt=""
                               class="w-full h-full object-contain bottom-0"
                                >
                </ps-button>
            </div>
        </template>
    </ps-modal>
    <stripe-payment-modal ref="stripe_payment_modal" />

    <paypal-payment-modal ref="paypal_payment_modal" />

    <ps-warning-dialog-2 ref="ps_warning_dialog" />

    <offline-payment-modal ref="offline_payment_modal" />

    <ps-error-dialog ref="ps_error_dialog" />
    <input-email-modal ref="input_email" />
 </div>

</template>

<script lang='ts'>

/// Razorpay
import 'https://checkout.razorpay.com/v1/checkout.js';

// Libs
import {defineComponent, ref,onMounted } from 'vue';


// Compone
import PsModal from '@template1/vendor/components/core/modals/PsModal.vue';
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsRadio from '@template1/vendor/components/core/radio/PsRadio.vue';
import PsRadio2 from '@template1/vendor/components/core/radio/PsRadio2.vue';
import PsErrorDialog from '@template1/vendor/components/core/dialogs/PsErrorDialog.vue';
import PsWarningDialog2 from '@template1/vendor/components/core/dialog/PsWarningDialog2.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';

import StripePaymentModal from '@template1/vendor/components/modules/credit/StripePaymentModal.vue';
import PaypalPaymentModal from '@template1/vendor/components/modules/credit/PaypalPaymentModal.vue';
import OfflinePaymentModal from '@template1/vendor/components/modules/credit/OfflinePaymentModal.vue';
import InputEmailModal from '@template1/vendor/components/modules/email/InputEmailModal.vue';

// Providers
import { usePsAppInfoStoreState } from '@templateCore/store/modules/appinfo/AppInfoStore';
import { PsValueStore } from '@templateCore/store/modules/core/PsValueStore';
import { useUserStore } from "@templateCore/store/modules/user/UserStore";
import { usePackageStoreState } from "@templateCore/store/modules/package/PackageStore";
import ItemLimitParameterHolder from '@templateCore/object/holder/ItemLimitParameterHolder';
import AppInfoParameterHolder from '@templateCore/object/holder/AppInfoParameterHolder';
import { useLimitAdItemStoreState } from "@templateCore/store/modules/limit/LimitAdItemStore";
import { useItemPromotionStoreState } from '@templateCore/store/modules/promotion/ItemPromotionStore';

import PsStatus from '@templateCore/api/common/PsStatus';
import { trans } from 'laravel-vue-i18n';import PsConst from '@templateCore/object/constant/ps_constants';

import PaystackPop from '@paystack/inline-js';
import PsUtils from '@templateCore/utils/PsUtils';
import format from 'number-format.js';

import {useFlutterwave} from "flutterwave-vue3ts"

export default defineComponent({
    name: "LimitItemModal",
    components: {
        PsModal,
        PsIcon,
        PsLabel,
        PsButton,
        PsErrorDialog,
        PsRadio2,
        PsRadio,
        StripePaymentModal,
        PaypalPaymentModal,
        OfflinePaymentModal,
        PsWarningDialog2,
        InputEmailModal,
    },
   setup(_,{ emit }) {
        const psmodal = ref();
        const stripe_payment_modal = ref();
        const paypal_payment_modal = ref();
        const offline_payment_modal = ref();
        const ps_error_dialog = ref();
        const input_email = ref();
        const ps_warning_dialog = ref();
        const selected = ref();

        const packageprovider = usePackageStoreState();
        const limitProvider = useLimitAdItemStoreState();

        const itemLimitParameterHolder = new ItemLimitParameterHolder();
        const appInfoStore = usePsAppInfoStoreState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        const userProvider = useUserStore();
        const provider = useItemPromotionStoreState();

        const psValueStore = PsValueStore();
        const loginUserId = psValueStore.getLoginUserId();

        // Price Per Day
        const pricePerDay = ref(0);
        const razorKey = ref('');
        const razorId = ref('');

        const flutterwaveSuccess = ref(false);

        async function openModal() {

            psmodal.value.toggle(true);
            await limitProvider.resetPaidAdItemList(loginUserId);
            await packageprovider.packageListWithPurchasedCount(loginUserId);

            selectPackageOne();

            const info = await appInfoStore.loadAppInfo(appInfoParameterHolder);

            razorKey.value = info.data.razorKey;
            if(info.status == PsStatus.SUCCESS) {
                pricePerDay.value = parseInt(info.data.oneDay, 10);
            }else {
                pricePerDay.value = 0;
            }

        }

        function selectPackageOne() {
            if(packageprovider.packageList != null
                && packageprovider.packageList.data != null
                && packageprovider.packageList.data.length > 0 ) {
                selected.value = packageprovider.packageList.data[0];
            }
        }


        function paymentClicked(value){
            if(selected.value == null
                || selected.value.paymentInfo == null ){
                    ps_error_dialog.value.openModal('', trans("select_package"));
                    return;
            }
            if(appInfoStore.appInfo.data.mobileSetting.is_demo_for_payment == 1){
                ps_warning_dialog.value.openModal(
                    trans('payment__warning_title'),
                    trans('payment__confirm_message'),
                    trans('payment__ok'),
                    trans('credit_card_modal__cancel'),
                    () => {
                        if(value == 'PAYPAL'){
                            paypalClicked();
                        }else if(value == 'STRIPE'){
                            stripeClicked();
                        }else if(value == 'RAZOR'){
                            razorClicked();
                        }else if(value == 'PAYSTACK'){
                            paystackClicked();
                        }else if(value == 'OFFLINE'){
                            offlineClicked();
                        }else if(value == 'FLUTTERWAVE'){
                            if(PsUtils.checkFlutterwaveCurrency(selected.value.paymentAttributes.currencyShortForm)){
                                flutterwaveClicked();
                            }else{
                                ps_error_dialog.value.openModal('',
                                trans('core_fe__flutterwave_currency_not_supported',{"attribute":selected.value.paymentAttributes.currencyShortForm}));
                            }
                        }
                    },
                    () => {
                        PsUtils.log("Cancel");
                    });


            }else{
                if(value == 'PAYPAL'){
                    paypalClicked();
                }else if(value == 'STRIPE'){
                    stripeClicked();
                }else if(value == 'RAZOR'){
                    razorClicked();
                }else if(value == 'PAYSTACK'){
                    paystackClicked();
                }else if(value == 'OFFLINE'){
                    offlineClicked();
                }else if(value == 'FLUTTERWAVE'){
                    if(PsUtils.checkFlutterwaveCurrency(selected.value.paymentAttributes.currencyShortForm)){
                        flutterwaveClicked();
                    }else{
                        ps_error_dialog.value.openModal('',
                        trans('core_fe__flutterwave_currency_not_supported',{"attribute":selected.value.paymentAttributes.currencyShortForm}));
                    }
                }
            }


        }

        function stripeClicked() {

            psmodal.value.toggle(false);

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

        async function doPayment(payment) {
            itemLimitParameterHolder.userId = loginUserId;
            itemLimitParameterHolder.packageId = selected.value.paymentInfo?.id;
            itemLimitParameterHolder.paymentMethod = payment;
            itemLimitParameterHolder.paymentMethodNounce = localStorage.paymentNonce || '';
            itemLimitParameterHolder.price = selected.value.paymentAttributes.price;
            itemLimitParameterHolder.razorId = razorId.value || '';
            itemLimitParameterHolder.currency = selected.value.paymentAttributes.currencyShortForm;

            const limititem = await packageprovider.postPackageBought(loginUserId, itemLimitParameterHolder);
            psmodal.value.toggle(false);
            // console.log(limititem);
            if(limititem?.code == 201) {
                flutterwaveSuccess.value = payment == PsConst.PAYMENT_FLUTTERWAVE_METHOD.toString() ? true : false;
                localStorage.paymentNonce = "";
                location.reload();
            } else {
                localStorage.paymentNonce = "";
                ps_error_dialog.value.openModal(trans('ps_error_dialog__error'), limititem?.message, trans('core__fe_btn_ok'),
                    ()=>{
                        location.reload();
                    }
                );
            }
        }

        function paypalClicked() {
            psmodal.value.toggle(false);
            paypal_payment_modal.value.openModal(
                () => {
                    const payment = PsConst.PAYMENT_PAYPAL_METHOD.toString();
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
                "amount": parseInt(selected.value.paymentAttributes.price) * 100,
                "currency": selected.value.paymentAttributes.currencyShortForm,
                "name": trans('home__banner_header'),
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
                            key: appInfoStore?.appInfo?.data.payStackKey,
                            email: email,
                            amount: parseInt(selected.value.paymentAttributes.price) * 100,
                            currency: selected.value.paymentAttributes.currencyShortForm,
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
                key: appInfoStore?.appInfo?.data.payStackKey,
                email: email,
                amount: parseInt(selected.value.paymentAttributes.price) * 100,
                currency: selected.value.paymentAttributes.currencyShortForm,
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

        async function verify(data, payment){
            await provider.verifyTransaction(loginUserId, data.transaction_id,'')
            console.log(provider);
            if(provider.transaction?.data != null && provider.transaction?.data?.status == 'success'){
                doPayment(payment);
            }
        }

        async function flutterwaveClicked() {
            if(appInfoStore.appInfo.data?.flutterwavePublicKey == ""){
                ps_error_dialog.value.openModal('', trans('core_fe__update_flutterwave_public_key'));
            }else{
                const payment = PsConst.PAYMENT_FLUTTERWAVE_METHOD.toString();

                const returnData = await userProvider.loadUser(loginUserId);
                const userInfo = returnData.data;
                useFlutterwave({
                    amount: parseInt(selected.value.paymentAttributes.price),//amount
                    callback(data: any) {
                    //  TODO: handle callbacks
                        console.log(data);
                        verify(data, payment);
                    },
                    country: "US",
                    currency: selected.value.paymentAttributes.currencyShortForm,
                    customer: {email: userInfo.userEmail, name: userInfo.userName, phone_number: userInfo.userPhone},
                    customizations: {description: "Pay with "+trans('home__banner_header'), logo: "", title: trans('home__banner_header')},
                    meta: {
                        user_id: loginUserId,
                        token: "jdjdjdjdjd"
                    },
                    onclose(): void {
                        emit('isPromoteSuccessful',flutterwaveSuccess.value);
                    },
                    payment_options:  "card",
                    public_key: appInfoStore.appInfo.data?.flutterwavePublicKey,
                    redirect_url: undefined,
                    tx_ref: "tx_ref_"+Date.now()
                })
            }

        }

        function offlineClicked() {
            psmodal.value.toggle(false);

            offline_payment_modal.value.openModal(
                () => {
                    const payment = PsConst.PAYMENT_OFFLINE_METHOD.toString();
                    doPayment(payment);
                },
                () => {
                    PsUtils.log("Cancel");
                }
            );
        }

        function formatPrice(value) {
            if(value.toString() == '0') {
                return trans('item_price__free');
            }else {
                if(appInfoStore?.appInfo?.data?.mobileSetting?.price_format === "###,###"){
                        const formattedNumber = new Intl.NumberFormat('en-FR', {
                                                                        style: 'decimal',
                                                                        useGrouping: true,
                                                                        minimumFractionDigits: 0,
                                                                        }).format(value);
                        return formattedNumber.replace(",", ' ');
                    }else if(appInfoStore?.appInfo?.data?.mobileSetting?.price_format === "##,####"){
                        const formattedValue = parseFloat(value).toFixed(4);
                        let formattedNumberArr = formattedValue.split('.');

                        let formattedNumber = formattedNumberArr.pop();

                        formattedNumber = formattedNumberArr[0];
                        return formattedNumber.replace(/(\d)(?=(\d{4})+$)/g, '$1,');
                    }else{
                        return format(appInfoStore?.appInfo?.data?.mobileSetting?.price_format, value);
                    }
            }
        }

        return {
            psmodal,
            openModal,
            packageprovider,
            appInfoStore,
            limitProvider,
            ps_error_dialog,
            stripe_payment_modal,
            paypal_payment_modal,
            offline_payment_modal,
            selected,
            ps_warning_dialog,
            paymentClicked,
            input_email,
            formatPrice,
        }
    },
})
</script>
