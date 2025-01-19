<template>
<div>
       <ps-modal ref="psmodal" line="hidden" maxWidth="480px" :isClickOut='false' class='h-full  ' bodyHeight="max-h-80" theme="p-6 border lg:rounded-2xl rounded-xl " >
        <template #title>
             <!-- Item entry title -->
            <div class="ms-8 flex flex-row justify-between">
                <div class="flex flex-wrap  ">
                    <ps-label class="font-medium text-xl lg:text-3xl me-2"> {{ $t('promote_item_modal__promote') }} </ps-label>
                    <ps-label class="font-light text-sm lg:text-xl lg:mt-2.5 mt-1.5"> {{ $t('promote_item_modal__item_promotion') }} </ps-label>
                </div>
                <ps-icon @click="isPromoteSuccessful(false)" name="close" class="text-feSecondary-500 dark:text-feAchromatic-50" w="30" h="30" />
            </div>
        </template>
        <template #body>
            <!-- End Item entry title -->
            <!-- Start Input Field for md .. -->
            <div class="h-80 overflow-y-scroll flex flex-col lg:mt-4 mt-3 px-8">
                <!-- Start Left Screen -->
                <div class="">
                    <div class="flex flex-col w-full">

                        <!-- for Ads Start Time -->
                        <ps-label class="font-medium text-sm lg:text-base mb-2"> {{ $t('promote_item_modal__ads_start_date') }}  </ps-label>
                        <div class="flex">
                            <div class="">
                                <ps-date-picker ref="startDate" class='z-50' :pickedDateProps="pickedDate"/>
                            </div>
                            <ps-time-picker class="bg-fePrimary-50 dark:bg-feAchromatic-800" v-model:hour="startTimeH"  v-model:min="startTimeM" v-model:ampm="startTimeAmpm"/>
                        </div>
                        <!-- end Ads Start Time -->

                        <ps-label class="font-medium lg:mt-4 mt-3 text-sm lg:text-base "> {{ $t('promote_item_modal__choose_package') }}  </ps-label>
                        <div class=" flex flex-col w-full " id="r1">
                            <div v-for=" selectData in promotionSetList" :key="selectData.id"  >
                            <ps-radio-1 v-if= "selectData.empty != '1'"
                            :key="selectData.id"
                            :id="selectData.id"
                            :value="selectData"
                            v-model:selectedValue="selectedPromotePlan"
                            class=" mt-3">

                              <template #title >
                                  <div v-if='selectData.type == 1'>
                                        <ps-label class='ms-0.5 font-light text-xs lg:text-sm'>{{selectData.days}} {{ $t('promote_item_modal__days') }}, {{ $t('promote_item_modal__promotion') }}</ps-label>
                                  </div>
                                  <div v-else-if='selectData.type == 2'>
                                        <div class='flex flex-row'>
                                            <div class="w-16">
                                                <ps-input  readonly v-if="selectedPromotePlan.id != '5' "  v-model:value="customPromoDate" />
                                                <ps-input class="w-16" v-else  v-model:value="customPromoDate" />
                                            </div>

                                            <ps-label class='mt-3 ms-2 font-light text-xs lg:text-sm'> {{ $t('promote_item_modal__days') }}, {{ $t('promote_item_modal__promotion') }} </ps-label>
                                        </div>
                                  </div>
                              </template>

                              <template #price>
                                    <div v-if='selectData.type == 1'>
                                        <ps-label class='font-light text-xs lg:text-sm'>{{appInfoStore?.appInfo?.data.currencySymbol}} {{ formatPrice(selectData.days * pricePerDay)}}</ps-label>
                                    </div>
                                    <div v-else-if='selectData.type == 2'>
                                        <ps-label class=' font-light text-xs lg:text-sm'>{{appInfoStore?.appInfo?.data.currencySymbol}} {{ formatPrice(customPromoDate * pricePerDay)}}</ps-label>
                                    </div>
                              </template>
                            </ps-radio-1>
                            </div>

                        </div>

                        <!-- end Ads days -->
                     </div>
                </div>
                <!-- End Left Screen -->

            </div>
            <!-- End Input Field -->

        </template>
        <template #footer>
            <ps-label class=" ms-8 font-medium text-sm lg:text-base mb-2"> {{ $t('promote_item_modal__pay_with') }}  </ps-label>
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

    <offline-payment-modal ref="offline_payment_modal" />

    <ps-error-dialog ref="ps_error_dialog" />
    <ps-success-dialog ref="ps_success_dialog" />

    <ps-loading-dialog ref="psloading"  :isClickOut='false'/>
    <ps-warning-dialog-2 ref="ps_warning_dialog" />
    <input-email-modal ref="input_email" />
    </div>

</template>

<script lang='ts'>
import 'https://checkout.razorpay.com/v1/checkout.js';
// Libs
import {defineComponent, reactive, ref } from 'vue';
import PsUtils from '@templateCore/utils/PsUtils';

// Compone
import PsModal from '@template1/vendor/components/core/modals/PsModal.vue';
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsTimePicker from '@template1/vendor/components/core/picker/PsTimePicker.vue';
import PsDatePicker from '@template1/vendor/components/core/picker/PsDatePicker.vue';
import PsErrorDialog from '@template1/vendor/components/core/dialog/PsErrorDialog.vue';
import PsSuccessDialog from '@template1/vendor/components/core/dialog/PsSuccessDialog.vue';
import PsRadio1 from '@template1/vendor/components/core/radio/PsRadio1.vue';
import PsInput from '@template1/vendor/components/core/input/PsInput.vue';
import StripePaymentModal from '@template1/vendor/components/modules/credit/StripePaymentModal.vue';
import PaypalPaymentModal from '@template1/vendor/components/modules/credit/PaypalPaymentModal.vue';
import OfflinePaymentModal from '@template1/vendor/components/modules/credit/OfflinePaymentModal.vue';
import PsLoadingDialog from '@template1/vendor/components/core/dialog/PsLoadingDialog.vue';
import PsWarningDialog2 from '@template1/vendor/components/core/dialog/PsWarningDialog2.vue';
import InputEmailModal from '@template1/vendor/components/modules/email/InputEmailModal.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';

// Providers
import { usePsAppInfoStoreState } from '@templateCore/store/modules/appinfo/AppInfoStore';
import { PsValueStore } from '@templateCore/store/modules/core/PsValueStore';
import { useUserStore } from "@templateCore/store/modules/user/UserStore";
import AppInfoParameterHolder from '@templateCore/object/holder/AppInfoParameterHolder';
import ItemPaidHistoryParameterHolder from '@templateCore/object/holder/ItemPaidHistoryParameterHolder';
import { useItemPromotionStoreState } from '@templateCore/store/modules/promotion/ItemPromotionStore';

import PsStatus from '@templateCore/api/common/PsStatus';
import { trans } from 'laravel-vue-i18n';
import PsConst from '@templateCore/object/constant/ps_constants';
import format from 'number-format.js';
// import PsConfig from '@template1/config/PsConfig';
import PaystackPop from '@paystack/inline-js';
import {useFlutterwave} from "flutterwave-vue3ts"

export default defineComponent({
    name: "PromoteItemModal",
    components: {
        PsModal,
        PsLabel,
        PsButton,
        PsTimePicker,
        PsDatePicker,
        PsErrorDialog,
        PsSuccessDialog,
        PsRadio1,
        PsInput,
        PsIcon,
        StripePaymentModal,
        PaypalPaymentModal,
        OfflinePaymentModal,
        PsLoadingDialog,
        PsWarningDialog2,
        InputEmailModal
    },
   setup(_, { emit }) {
        const currentDate = new Date();
        const psmodal = ref();
        const psloading = ref();
        const ps_warning_dialog = ref();
        const stripe_payment_modal = ref();
        const paypal_payment_modal = ref();
        const offline_payment_modal = ref();
        const startDate = ref();
        const startTimeH = ref('0');
        const startTimeM = ref('0');
        const startTimeAmpm = ref('1');
        const pickedDate = ref(new Date());
        const ps_error_dialog = ref();
        const ps_success_dialog = ref();
        const input_email = ref();
        const customPromoDate = ref(1);
        let promoteitemId = '';
        // const isPromoteSuccessful = ref(true);

        // Init Provider
        const appInfoStore = usePsAppInfoStoreState();
        const appInfoParameterHolder = new AppInfoParameterHolder();
        const userProvider = useUserStore();
        const promoteParameterHolder = new ItemPaidHistoryParameterHolder();
        const provider = useItemPromotionStoreState();
        const psValueStore = PsValueStore();
        const loginUserId = psValueStore.getLoginUserId();
        appInfoParameterHolder.userId = loginUserId;

        const radioSelectedList = reactive({id:2, name:"Apple"});

        // Price Per Day
        const pricePerDay = ref(0);
        const razorKey = ref('');
        const razorId = ref('');
        const isDemoForPayment = ref(false);
        const flutterwaveSuccess = ref(false);

        const promotionSetList = reactive([
                {
                    id:"1", days:7, type:1, empty : '1'
                },
                {
                    id:"2", days:14, type:1, empty : '1'
                },
                {
                    id:"3", days:30, type:1, empty : '1'
                },
                {
                    id:"4", days:60, type:1, empty : '1'
                },
                {
                    id:"5", days:1, type:2, empty : '0'
                }
            ]);
        const selected = {id:"1", days:7, type:1};
        const selectedPromotePlan = reactive(selected);

        async function openModal(itemIdStr) {
            console.log("promoItemId + " + itemIdStr);
            promoteitemId = itemIdStr;
            psmodal.value.toggle(true);
            getCurrentTime();
            await loadUserData();
        }

        function getCurrentTime() {
            const now = new Date();
            now.setHours(now.getHours() + 2);
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'

            const minutesStr = minutes < 10 ? '0' + minutes : minutes;
            const secondsStr = seconds < 10 ? '0' + seconds : seconds;

            startTimeH.value = hours.toString();
            startTimeM.value = minutesStr.toString();
            startTimeAmpm.value = ampm == 'AM' ? '1' : '2';
            // return `${hours}:${minutesStr}:${secondsStr} ${ampm}`;
        }



        // async function closeModal(){
        //     psmodal.value.toggle(false);
        //     // isPromoteSuccessful.value = false;
        // }

        async function isPromoteSuccessful(val){
            this.$emit('isPromoteSuccessful',val);
            psmodal.value.toggle(false);
        }


        async function loadUserData() {
            const info = await appInfoStore.loadAppInfo(appInfoParameterHolder);
            if(appInfoStore.appInfo.data.mobileSetting.is_demo_for_payment == PsConst.ONE){
                isDemoForPayment.value = true;
            }
            if(appInfoStore.appInfo.data.mobileSetting.promote_first_choice_day == '' || appInfoStore.appInfo.data.mobileSetting.promote_first_choice_day == '0'){
                promotionSetList[0].empty = '1';
            }else{
                promotionSetList[0].empty = '0';
                promotionSetList[0].days = parseInt(appInfoStore.appInfo.data.mobileSetting.promote_first_choice_day);
            }

            if(appInfoStore.appInfo.data.mobileSetting.promote_second_choice_day == '' || appInfoStore.appInfo.data.mobileSetting.promote_second_choice_day == '0'){
                promotionSetList[1].empty = '1';
            }else{
                promotionSetList[1].empty = '0';
                promotionSetList[1].days = parseInt(appInfoStore.appInfo.data.mobileSetting.promote_second_choice_day);
            }
            if(appInfoStore.appInfo.data.mobileSetting.promote_third_choice_day == '' || appInfoStore.appInfo.data.mobileSetting.promote_third_choice_day == '0'){
                promotionSetList[2].empty = '1';
            }else{
                promotionSetList[2].empty = '0';
                promotionSetList[2].days = parseInt(appInfoStore.appInfo.data.mobileSetting.promote_third_choice_day);
            }
            if(appInfoStore.appInfo.data.mobileSetting.promote_fourth_choice_day == '' || appInfoStore.appInfo.data.mobileSetting.promote_fourth_choice_day == '0'){
                promotionSetList[3].empty = '1';
            }else{
                promotionSetList[3].empty = '0';
                promotionSetList[3].days = parseInt(appInfoStore.appInfo.data.mobileSetting.promote_fourth_choice_day);
            }


            razorKey.value = info.data.razorKey;
            if(info.status == PsStatus.SUCCESS) {
                pricePerDay.value = parseInt(info.data.psAppSetting.oneDay, 10);
            }else {
                pricePerDay.value = 0;
            }
        }

        function stripeClicked() {
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            let m = parseInt(startTimeM.value, 10);
            let s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();

            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('',
                trans('promote_item_modal__date_invalid_error'));
            }else {
                let amountStr = '';
                let daysStr = '';
                const startDateTimeStr = PsUtils.timeStampToDateString(selectedDate);
                const startDateTimestampStr = PsUtils.getTimeStampDividedByOneThousand(selectedDate);
                if(selectedPromotePlan.type == 1) {
                    amountStr = ( selectedPromotePlan.days * pricePerDay.value ).toString();
                    daysStr = selectedPromotePlan.days.toString();

                } else {
                    amountStr = ( customPromoDate.value * pricePerDay.value ).toString();
                    daysStr = customPromoDate.value.toString();

                }

                psmodal.value.toggle(false);

                stripe_payment_modal.value.openModal(
                    () => {
                        const payment = PsConst.PAYMENT_STRIPE_METHOD.toString();
                        doPayment(payment,
                                promoteitemId,
                                amountStr,
                                daysStr,
                                startDateTimeStr,
                                startDateTimestampStr);
                    },
                    () => {
                        emit('isPromoteSuccessful',false);
                        PsUtils.log("Cancel");
                    }
                );
            }
        }

        async function doPayment(payment,promoteitemId,amountStr,daysStr,startDateTimeStr,startDateTimestampStr) {
            psloading.value.openModal();
            promoteParameterHolder.itemId = promoteitemId;
            promoteParameterHolder.amount = amountStr;
            promoteParameterHolder.startDate = startDateTimeStr;
            promoteParameterHolder.howManyDay = daysStr;
            promoteParameterHolder.paymentMethod = payment;
            promoteParameterHolder.paymentMethodNounce = localStorage.paymentNonce || '';
            promoteParameterHolder.razorId = razorId.value || '';
            promoteParameterHolder.startTimeStamp = startDateTimestampStr;

            const paiditem = await provider.postItemPromotion(promoteParameterHolder, loginUserId);
            psloading.value.closeModal();
            psmodal.value.toggle(false);
            console.log(paiditem);
            if(paiditem?.data?.code == 201) {
                flutterwaveSuccess.value = payment == PsConst.PAYMENT_FLUTTERWAVE_METHOD.toString() ? true : false;
                ps_success_dialog.value.openModal('', trans('core_fe__item_promote_success'));
            } else {
                emit('isPromoteSuccessful',false);
                ps_error_dialog.value.openModal('', paiditem?.data?.message);
                // location.reload();
            }
        }

        function paymentClicked(value){
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            let m = parseInt(startTimeM.value, 10);
            let s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();

            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('',
                trans('promote_item_modal__date_invalid_error'));
            }else {
                console.log("is_demo_for_payment = " + appInfoStore.appInfo.data.mobileSetting.is_demo_for_payment);
                if(isDemoForPayment.value){
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
                                if(PsUtils.checkFlutterwaveCurrency(appInfoStore?.appInfo?.data.currencyShortForm)){
                                    flutterwaveClicked();
                                }else{
                                    ps_error_dialog.value.openModal('',
                                    trans('core_fe__flutterwave_currency_not_supported',{"attribute":appInfoStore?.appInfo?.data.currencyShortForm}));
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
                        if(PsUtils.checkFlutterwaveCurrency(appInfoStore?.appInfo?.data.currencyShortForm)){
                            flutterwaveClicked();
                        }else{
                            ps_error_dialog.value.openModal('',
                                trans('core_fe__flutterwave_currency_not_supported',{"attribute":appInfoStore?.appInfo?.data.currencyShortForm})
                            );
                        }
                    }
                }
            }

        }

        function paypalClicked() {
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            const m = parseInt(startTimeM.value, 10);
            const s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();

            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('',
                trans('promote_item_modal__date_invalid_error'));
            }else {
                let amountStr = '';
                let daysStr = '';
                const startDateTimeStr = PsUtils.timeStampToDateString(selectedDate);
                const startDateTimestampStr = PsUtils.getTimeStampDividedByOneThousand(selectedDate);
                if(selectedPromotePlan.type == 1) {
                    amountStr = ( selectedPromotePlan.days * pricePerDay.value).toString();
                    daysStr = selectedPromotePlan.days.toString();
                } else {
                    amountStr = ( customPromoDate.value * pricePerDay.value).toString();
                    daysStr = customPromoDate.value.toString();
                }

                psmodal.value.toggle(false);

                paypal_payment_modal.value.openModal(
                    () => {
                        const payment = PsConst.PAYMENT_PAYPAL_METHOD.toString();
                        doPayment(payment,
                                promoteitemId,
                                amountStr,
                                daysStr,
                                startDateTimeStr,
                                startDateTimestampStr);
                    },
                    () => {
                        emit('isPromoteSuccessful',false);
                        PsUtils.log("Cancel");
                    }
                );

            }
        }

        async function verify(data, payment, promoteitemId, amountStr, daysStr, startDateTimeStr, startDateTimestampStr){
            await provider.verifyTransaction(loginUserId, data.transaction_id,'')
            console.log(provider);
            if(provider.transaction?.data != null && provider.transaction?.data?.status == 'success'){
                doPayment(payment, promoteitemId, amountStr, daysStr, startDateTimeStr, startDateTimestampStr);
            }
        }

        async function flutterwaveClicked() {
            const payment = PsConst.PAYMENT_FLUTTERWAVE_METHOD.toString();
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            const m = parseInt(startTimeM.value, 10);
            const s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();

            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('',
                trans('promote_item_modal__date_invalid_error'));
            }else if(appInfoStore.appInfo.data?.flutterwavePublicKey == ""){
                ps_error_dialog.value.openModal('', trans('core_fe__update_flutterwave_public_key'));
            }else {
                let amountStr = '';
                let daysStr = '';
                const startDateTimeStr = PsUtils.timeStampToDateString(selectedDate);
                const startDateTimestampStr = PsUtils.getTimeStampDividedByOneThousand(selectedDate);
                if(selectedPromotePlan.type == 1) {
                    amountStr = ( selectedPromotePlan.days * pricePerDay.value).toString();
                    daysStr = selectedPromotePlan.days.toString();
                } else {
                    amountStr = ( customPromoDate.value * pricePerDay.value).toString();
                    daysStr = customPromoDate.value.toString();
                }

                psmodal.value.toggle(false);

                const returnData = await userProvider.loadUser(loginUserId);
                const userInfo = returnData.data;

                useFlutterwave({
                    amount: parseInt(amountStr),//amount
                    callback(data: any) {
                    //  TODO: handle callbacks
                        console.log(data);
                        verify(data, payment, promoteitemId, amountStr, daysStr, startDateTimeStr, startDateTimestampStr);
                    },
                    country: "US",
                    currency: appInfoStore?.appInfo?.data.currencyShortForm,
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

        async function razorClicked() {
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            let m = parseInt(startTimeM.value, 10);
            let s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();

            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('',
                trans('promote_item_modal__date_invalid_error'));
            }else {
                let amountStr = '';
                let daysStr = '';
                const startDateTimeStr = PsUtils.timeStampToDateString(selectedDate);
                const startDateTimestampStr = PsUtils.getTimeStampDividedByOneThousand(selectedDate);

                if(selectedPromotePlan.type == 1) {
                    amountStr = (selectedPromotePlan.days * pricePerDay.value).toString();
                    daysStr = selectedPromotePlan.days.toString();
                } else {
                    amountStr = (customPromoDate.value * pricePerDay.value).toString();
                    daysStr = customPromoDate.value.toString();
                }
                const returnData = await userProvider.loadUser(loginUserId);
                const userInfo = returnData.data;
                //for razor ui
                const options =
                {
                    "key": razorKey.value, // Enter the Key ID generated from the Dashboard
                    "amount": parseInt(amountStr) * 100,
                    "currency": appInfoStore?.appInfo?.data.currencyShortForm,
                    "name": trans('home__banner_header'),
                    "prefill": {
                        "name": userInfo.userName,
                        "email": userInfo.userEmail,
                        "contact": userInfo.userPhone
                    },
                    "theme": {
                        "color": "#0e9f6e"
                    },
                    // This handler function will handle the success payment
                    "handler": async function (response) {
                        // Submit response.razorpay_payment_id to your server
                        razorId.value =  response.razorpay_payment_id;
                        const payment = PsConst.PAYMENT_RAZOR_METHOD.toString();
                        doPayment(payment,
                                promoteitemId,
                                amountStr,
                                daysStr,
                                startDateTimeStr,
                                startDateTimestampStr);
                    },
                };
                const rzp1 = new (window as any).Razorpay(options);
                rzp1.open();
                rzp1.on('payment.failed', function (response)
                {
                    // alert(response.error);
                });
            }

        }

        async function paystackClicked() {
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            const m = parseInt(startTimeM.value, 10);
            const s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();

            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('',
                trans('promote_item_modal__date_invalid_error'));
            }else {
                let amountStr = '';
                let daysStr = '';
                const startDateTimeStr = PsUtils.timeStampToDateString(selectedDate);
                const startDateTimestampStr = PsUtils.getTimeStampDividedByOneThousand(selectedDate);

                if(selectedPromotePlan.type == 1) {
                    amountStr = (selectedPromotePlan.days * pricePerDay.value).toString();
                    daysStr = selectedPromotePlan.days.toString();
                } else {
                    amountStr = (customPromoDate.value * pricePerDay.value).toString();
                    daysStr = customPromoDate.value.toString();
                }
                psmodal.value.toggle(false);

                // appInfoStore.loadAppInfo(appInfoParameterHolder);
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
                                amount: parseInt(amountStr) * 100,
                                currency: appInfoStore?.appInfo?.data.currencyShortForm,
                                callback: async function(response){
                                    PsUtils.log(response);
                                    // Payment complete! Reference: ' + response.reference;
                                    const payment = PsConst.PAYMENT_PAY_STACK_METHOD.toString();
                                    doPayment(payment,
                                            promoteitemId,
                                            amountStr,
                                            daysStr,
                                            startDateTimeStr,
                                            startDateTimestampStr);
                                },
                                onClose: function(){
                                    // alert("close");
                                    // user closed popup
                                    emit('isPromoteSuccessful',false);
                                }

                            });
                            paystack.openIframe();
                        },
                        () => {
                            emit('isPromoteSuccessful',false);
                            console.log('cancel');
                        } );
                }else{
                    const paystack = PaystackPop.setup({
                        key: appInfoStore?.appInfo?.data.payStackKey,
                        email: email,
                        amount: parseInt(amountStr) * 100,
                        currency: appInfoStore?.appInfo?.data.currencyShortForm,
                        callback: async function(response){
                            PsUtils.log(response);
                            // Payment complete! Reference: ' + response.reference;
                            const payment = PsConst.PAYMENT_PAY_STACK_METHOD.toString();
                            doPayment(payment,
                                    promoteitemId,
                                    amountStr,
                                    daysStr,
                                    startDateTimeStr,
                                    startDateTimestampStr);
                        },
                        onClose: function(){
                            // alert("close");
                            // user closed popup
                            emit('isPromoteSuccessful',false);
                        }

                    });
                    paystack.openIframe();
                }

            }
        }

        function offlineClicked() {
            const day = parseInt(startDate.value.pickedDate.getDate(), 10);
            const month = parseInt(startDate.value.pickedDate.getMonth(), 10) ;
            const year = parseInt(startDate.value.pickedDate.getFullYear(), 10);
            let h = parseInt('');
            const m = parseInt(startTimeM.value, 10);
            const s = 0;
            if(startTimeAmpm.value == '1') {
                h = parseInt(startTimeH.value, 10);
            } else {
                h = parseInt(startTimeH.value, 10) + 12;
            }

            const selectedDate = new Date(year, month, day, h, m, s ).getTime();
            const currentDate = new Date().getTime();

            if(selectedDate < currentDate) {
                ps_error_dialog.value.openModal('',
                trans('promote_item_modal__date_invalid_error'));
            }else {
                let amountStr = '';
                let daysStr = '';
                const startDateTimeStr = PsUtils.timeStampToDateString(selectedDate);
                const startDateTimestampStr = PsUtils.getTimeStampDividedByOneThousand(selectedDate).toString();
                if(selectedPromotePlan.type == 1) {
                    amountStr = (selectedPromotePlan.days * pricePerDay.value).toString();
                    daysStr = selectedPromotePlan.days.toString();
                } else {
                    amountStr = ( customPromoDate.value * pricePerDay.value ).toString();
                    daysStr = customPromoDate.value.toString();
                }

                psmodal.value.toggle(false);
                offline_payment_modal.value.openModal(
                    () => {
                        const payment = PsConst.PAYMENT_OFFLINE_METHOD.toString();
                        doPayment(payment,
                                promoteitemId,
                                amountStr,
                                daysStr,
                                startDateTimeStr,
                                startDateTimestampStr);
                    },
                    () => {
                        emit('isPromoteSuccessful',false);
                        PsUtils.log("Cancel");
                    }
                );
            }
        }

        function formatPrice(value) {
            if(value.toString() == '0') {
                return trans('item_price__free');
            }else {
                // return format(appInfoStore?.appInfo?.data?.mobileSetting?.price_format, value)
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
            flutterwaveClicked,
            appInfoStore,
            psmodal,
            openModal,
            psloading,
            startDate,
            startTimeH,
            startTimeM,
            startTimeAmpm,
            pickedDate,
            ps_error_dialog,
            ps_success_dialog,
            promotionSetList,
            radioSelectedList,
            customPromoDate,
            pricePerDay,
            selectedPromotePlan,
            stripe_payment_modal,
            paypal_payment_modal,
            offline_payment_modal,
            ps_warning_dialog,
            paymentClicked,
            input_email,
            formatPrice,
            // closeModal
            isPromoteSuccessful,
        }
    },
})
</script>
