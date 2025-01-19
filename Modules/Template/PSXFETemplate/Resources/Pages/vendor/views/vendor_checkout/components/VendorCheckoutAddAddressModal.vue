<template>
    <ps-modal ref="psmodal" line="hidden" :isClickOut='false' maxWidth="936px" bodyHeight="" theme="rounded-lg dark:bg-feAchromatic-800">
        <template #title>
            <div class="px-6 py-7 flex items-center justify-between border-b dark:border-feAchromatic-700">
                <ps-label textColor="font-semibold text-2xl text-feSecondary-800 dark:text-feAchromatic-50">{{ $t(title) }}</ps-label>
                <ps-icon name="close" class="cursor-pointer" w="24" h="24" @click="closeModal()"/>
            </div>
        </template>
        <template #body>
            <div class="max-h-96 overflow-y-scroll pb-4">
                <div class="flex gap-4 px-4 mt-6 flex-col sm:flex-row">
                    <div class="w-full">
                        <ps-label textColor="text-base mb-2 dark:text-feAchromatic-200">{{ $t("first_name") }} <span class="text-feError-800 font-medium ms-1">*</span></ps-label>
                        <ps-input type="text" class="w-full rounded" defaultBorder="border border-feSecondary-200 hover:border-feSecondary-400 dark:border-feAchromatic-500" v-model:value="paramHolder.firstName" :placeholder="$t('first_name')"/>
                    </div>
                    <div class="w-full">
                        <ps-label textColor="text-base mb-2 dark:text-feAchromatic-200">{{ $t("last_name") }} <span class="text-feError-800 font-medium ms-1">*</span></ps-label>
                        <ps-input type="text" class="w-full rounded" defaultBorder="border border-feSecondary-200 hover:border-feSecondary-400 dark:border-feAchromatic-500" v-model:value="paramHolder.lastName" :placeholder="$t('last_name')"/>
                    </div>
                </div>
                <div class="flex gap-4 px-4 mt-4 flex-col sm:flex-row">
                    <div class="w-full">
                        <ps-label textColor="text-base mb-2 dark:text-feAchromatic-200">{{ $t("credit_card_view__email") }} <span class="text-feError-800 font-medium ms-1">*</span></ps-label>
                        <ps-input type="email" class="w-full rounded" defaultBorder="border border-feSecondary-200 hover:border-feSecondary-400 dark:border-feAchromatic-500" v-model:value="paramHolder.email" :placeholder="$t('credit_card_view__email')"/>
                    </div>
                    <div class="w-full">
                        <ps-label textColor="text-base mb-2 dark:text-feAchromatic-200">{{ $t("phone_number") }} <span class="text-feError-800 font-medium ms-1">*</span></ps-label>
                        <ps-input-group v-model:value="phoneNumber" padding="" theme="dark:bg-feAchromatic-900 text-feSecondary-800 dark:text-feSecondary-400" background="border dark:border-feAchromatic-500 rounded" :placeholder="$t('phone_number')" @keyup="validateNumberInput(phoneNumber)">
                            <template #leftButton>
                                <ps-dropdown align="left" class='w-full' @onClick="loadPhone" shadow="">
                                    <template #filter>
                                        <div class="w-56">
                                            <ps-input-with-right-icon class="rounded-xl flex-1 "
                                                @keyup.enter="filterPhoneUpdate(phoneKeyword)" v-model:value="phoneKeyword"
                                                v-bind:placeholder="$t('phone_code_by_country')">
                                                <template #icon>
                                                    <ps-icon textColor="text-feSecondary-400 dark:text-feAchromatic-500"
                                                        name="search" class='cursor-pointer'
                                                        @click="filterPhoneUpdate(phoneKeyword)" />
                                                </template>
                                            </ps-input-with-right-icon>
                                        </div>
                                    </template>
                                    <template #select>
                                        <ps-dropdown-select :showCenter="true" :selectedValue="countryCode" border="" shadow="" />
                                    </template>
                                    <template #list>
                                        <div class="rounded-md shadow-xs w-56 ">
                                            <div class="pt-2 z-30 ">
                                                <div v-if="phoneStore.phoneList.data == null">
                                                    <ps-label class='p-2 flex' @click="loadPhone">{{
                                                        $t("item_entry__loading")
                                                    }} </ps-label>
                                                </div>
                                                <div v-else>
                                                    <div v-for="selectData in phoneStore.phoneList.data"
                                                        :key="selectData.id"
                                                        class="w-56 flex py-4 px-2 hover:bg-fePrimary-50 dark:hover:bg-fePrimary-900 cursor-pointer items-center"
                                                        @click="countryCode = selectData.country_code">

                                                        <ps-label class="ms-2"
                                                            >
                                                            {{ selectData.country_code }} </ps-label>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <template #loadmore>
                                        <div class="mb-2 w-56">
                                            <div v-if="phoneStore.phoneList.data != null && phoneStore.loading.value == true"
                                                class='mt-4 ms-4 flex'>
                                                <ps-label> {{ $t("item_entry__loading") }}</ps-label>
                                            </div>

                                            <ps-label class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"
                                                v-if="!phoneStore.isNoMoreRecord.value" @click="loadPhone"> {{
                                                    $t("item_entry__load_more") }} </ps-label>
                                        </div>
                                    </template>
                                </ps-dropdown>
                            </template>
                        </ps-input-group>
                        <ps-label class="lg:mt-2 mt-1  w-full text-xs" textColor="text-feError-500" v-if="validations.phone"> {{ $t("Phone number field must be numeric.") }} </ps-label>
                    </div>
                </div>
                <div class="flex gap-4 px-4 mt-4">
                    <div class="w-full">
                        <ps-label textColor="text-base mb-2 dark:text-feAchromatic-200">{{ $t("address") }} <span class="text-feError-800 font-medium ms-1">*</span></ps-label>
                        <ps-textarea rows="4" v-model:value="paramHolder.address" :placeholder="$t('address')"/>
                    </div>
                </div>
                <div class="flex gap-4 px-4 mt-4 flex-col sm:flex-row">
                    <div class="w-full">
                        <ps-label textColor="text-base mb-2 dark:text-feAchromatic-200">{{ $t("country") }} <span class="text-feError-800 font-medium ms-1">*</span></ps-label>
                        <ps-input type="text" class="w-full rounded" defaultBorder="border border-feSecondary-200 hover:border-feSecondary-400 dark:border-feAchromatic-500" v-model:value="paramHolder.country" :placeholder="$t('country')"/>
                    </div>
                    <div class="w-full">
                        <ps-label textColor="text-base mb-2 dark:text-feAchromatic-200">{{ $t("state") }} <span class="text-feError-800 font-medium ms-1">*</span></ps-label>
                        <ps-input type="text" class="w-full rounded" defaultBorder="border border-feSecondary-200 hover:border-feSecondary-400 dark:border-feAchromatic-500" v-model:value="paramHolder.state" :placeholder="$t('state')"/>
                    </div>
                </div>
                <div class="flex gap-4 px-4 mt-4 flex-col sm:flex-row">
                    <div class="w-full">
                        <ps-label textColor="text-base mb-2 dark:text-feAchromatic-200">{{ $t("city") }} <span class="text-feError-800 font-medium ms-1">*</span></ps-label>
                        <ps-input type="text" class="w-full rounded" defaultBorder="border border-feSecondary-200 hover:border-feSecondary-400 dark:border-feAchromatic-500" v-model:value="paramHolder.city" :placeholder="$t('city')"/>
                    </div>
                    <div class="w-full">
                        <ps-label textColor="text-base mb-2 dark:text-feAchromatic-200">{{ $t("postal_code") }} <span class="text-feError-800 font-medium ms-1">*</span></ps-label>
                        <ps-input type="text" class="w-full rounded" defaultBorder="border border-feSecondary-200 hover:border-feSecondary-400 dark:border-feAchromatic-500" v-model:value="paramHolder.postalCode" :placeholder="$t('postal_code')"/>
                    </div>
                </div>
                <div class="flex flex-col gap-4 px-4 mt-4">
                    <ps-checkbox-value :title="$t('core_fe__set_as_default_shipping_address')" v-model:value="saveShippingNextTime" theme="me-3 w-5 h-5 rounded dark:text-feAchromatic-200"/>
                    <ps-checkbox-value :title="$t('core_fe__set_as_default_billing_address')" v-model:value="saveBillingNextTime" theme="me-3 w-5 h-5 rounded dark:text-feAchromatic-200"/>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex items-center justify-center gap-4 p-4 bg-feAchromatic-100 dark:bg-feAchromatic-700 rounded-b-lg">
                <ps-button class="w-32" @click="saveClick()">{{ $t('core_fe__save') }}</ps-button>
                <ps-button class="w-32" colors="bg-feAchromatic-50 text-feSecondary-800" focus="" hover="hover:bg-feAchromatic-200" @click="closeModal()">{{ $t('core_fe__cancel') }}</ps-button>
            </div>
        </template>
    </ps-modal>
    <ps-error-dialog ref="ps_error_dialog" />
</template>

<script>
// store
import { defineComponent, ref } from 'vue';
import { trans } from 'laravel-vue-i18n';
import { usePhoneStore } from '@templateCore/store/modules/item/PhoneStore';
import { PsValueStore } from "@templateCore/store/modules/core/PsValueStore";
import { useVendorShippingBillingStoreState } from "@templateCore/store/modules/vendor_checkout/VendorShippingBillingStore";

// holder
import ShippingAndBillingParameterHolder from '@templateCore/object/holder/ShippingAndBillingParameterHolder';
import PhoneParameterHolder from '@templateCore/object/holder/PhoneParameterHolder';
import ShippingAddressParameterHolder from '@templateCore/object/holder/ShippingAddressParameterHolder';
import BillingAddressParameterHolder from '@templateCore/object/holder/BillingAddressParameterHolder';

// components
import PsModal from '@template1/vendor/components/core/modals/PsModal.vue';
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
import PsInput from '@template1/vendor/components/core/input/PsInput.vue';
import PsInputGroup from '@template1/vendor/components/core/input/PsInputGroup.vue';
import PsInputWithRightIcon from '@template1/vendor/components/core/input/PsInputWithRightIcon.vue';
import PsTextarea from '@template1/vendor/components/core/textarea/PsTextarea.vue';
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsCheckboxValue from '@template1/vendor/components/core/checkbox/PsCheckboxValue.vue';
import PsDropdown from '@template1/vendor/components/core/dropdown/PsDropdown.vue';
import PsDropdownSelect from '@template1/vendor/components/core/dropdown/PsDropdownSelect.vue';
import PsErrorDialog from '@template1/vendor/components/core/dialog/PsErrorDialog.vue';

    export default defineComponent({
        name: "AddNewAddressModal",
        components: {
            PsModal,
            PsLabel,
            PsIcon,
            PsInput,
            PsInputGroup,
            PsInputWithRightIcon,
            PsTextarea,
            PsButton,
            PsCheckboxValue,
            PsDropdown,
            PsDropdownSelect,
            PsErrorDialog,
        },
        props: {
            id: {
                type: String,
                default: ""
            },
            addressType: {
                type: String,
                default: ""
            }
        },
        setup(props){
            // stores
            const phoneStore = usePhoneStore('phoneList');
            const psValueStore = PsValueStore();
            const shippingBillingStore = useVendorShippingBillingStoreState('detail');

            // holders
            // const addressParamHolder = new ShippingAndBillingParameterHolder();
            const shippingAddressParamHolder = new ShippingAddressParameterHolder();
            const billingAddressParamHolder = new BillingAddressParameterHolder();
            const phoneParameterHolder = new PhoneParameterHolder();
            const addressParamHolder = shippingBillingStore.shippingAndBillingParameterHolder;

            // ref
            const psmodal = ref();
            const ps_error_dialog = ref();
            const title = ref(trans('core_fe__add_new_address'));
            const loginUserId = psValueStore.getLoginUserId();
            const countryCode = ref("");
            const phoneNumber = ref("");
            const phoneKeyword = ref("");
            const saveBillingNextTime = ref(true);
            const saveShippingNextTime = ref(true);
            const type = ref();
            const paramHolder = ref({
                id : '',
                firstName : '',
                lastName : '',
                email : '',
                address : '',
                country : '',
                state : '',
                city : '',
                postalCode : '',
            });
            const validations = ref({});

            async function openModal(addressType, address = null){
                type.value = addressType;
                psmodal.value.toggle(true);
                await loadPhone();
                countryCode.value = phoneStore.phoneList?.data[0]?.country_code;
                addressParamHolder.isSaveBillingInfoForNextTime = 0;
                addressParamHolder.isSaveShippingInfoForNextTime = 0;
                if(address != null){
                    title.value = trans('core_fe__edit_address');
                    let phoneArr = address.phoneNo.split('-');
                    countryCode.value = phoneArr[0];
                    phoneNumber.value = phoneArr[1];

                    paramHolder.value.id = address.id;
                    paramHolder.value.firstName = address.firstName;
                    paramHolder.value.lastName = address.lastName;
                    paramHolder.value.email = address.email;
                    paramHolder.value.address = address.address;
                    paramHolder.value.country = address.country;
                    paramHolder.value.state = address.state;
                    paramHolder.value.city = address.city;
                    paramHolder.value.postalCode = address.postalCode;
                    saveBillingNextTime.value = address.isSaveBillingInfoForNextTime == '1' ? true : false;
                    saveShippingNextTime.value = address.isSaveShippingInfoForNextTime == '1' ? true : false;
                }
            }

            function closeModal(){
                validations.value = {};
                paramHolder.value = {};
                phoneNumber.value = "";
                title.value = trans('core_fe__add_new_address');
                psmodal.value.toggle(false);
            }

            async function loadPhone() {
                await phoneStore.loadPhoneCountryCode(loginUserId, phoneParameterHolder.resetParameterHolder());
            }

            function filterPhoneUpdate(value) {
                phoneParameterHolder.keyword = value;
                phoneStore.filterPhoneUpdate(loginUserId, phoneParameterHolder);
            }

            function validateNumberInput(value){
                validations.value.phone = isNaN(value) ? true : false;
            }

            async function saveClick(){
                let response;
                if(type.value == 'shipping'){
                    shippingAddressParamHolder.id = paramHolder.value.id
                    shippingAddressParamHolder.firstName = paramHolder.value.firstName
                    shippingAddressParamHolder.lastName = paramHolder.value.lastName
                    shippingAddressParamHolder.email = paramHolder.value.email
                    shippingAddressParamHolder.phoneNo = countryCode.value.concat("-",phoneNumber.value);
                    shippingAddressParamHolder.address = paramHolder.value.address
                    shippingAddressParamHolder.country = paramHolder.value.country
                    shippingAddressParamHolder.state = paramHolder.value.state
                    shippingAddressParamHolder.city = paramHolder.value.city
                    shippingAddressParamHolder.postalCode = paramHolder.value.postalCode
                    shippingAddressParamHolder.isSaveBillingInfoForNextTime = saveBillingNextTime.value ? "1" : "0";
                    shippingAddressParamHolder.isSaveShippingInfoForNextTime = saveShippingNextTime.value ? "1" : "0";

                    if(shippingAddressParamHolder.id == '' || shippingAddressParamHolder.id == undefined){
                        response = await shippingBillingStore.addNewShippingAddress(loginUserId, shippingAddressParamHolder);
                    }else{
                        response = await shippingBillingStore.updateShippingAddress(loginUserId, shippingAddressParamHolder);
                    }
                }
                if(type.value == 'billing'){
                    billingAddressParamHolder.id = paramHolder.value.id
                    billingAddressParamHolder.firstName = paramHolder.value.firstName
                    billingAddressParamHolder.lastName = paramHolder.value.lastName
                    billingAddressParamHolder.email = paramHolder.value.email
                    billingAddressParamHolder.phoneNo = countryCode.value.concat("-",phoneNumber.value);
                    billingAddressParamHolder.address = paramHolder.value.address
                    billingAddressParamHolder.country = paramHolder.value.country
                    billingAddressParamHolder.state = paramHolder.value.state
                    billingAddressParamHolder.city = paramHolder.value.city
                    billingAddressParamHolder.postalCode = paramHolder.value.postalCode
                    billingAddressParamHolder.isSaveBillingInfoForNextTime = saveBillingNextTime.value ? "1" : "0";
                    billingAddressParamHolder.isSaveShippingInfoForNextTime = saveShippingNextTime.value ? "1" : "0";

                    if(billingAddressParamHolder.id == '' || billingAddressParamHolder.id == undefined){
                        response = await shippingBillingStore.addNewBillingAddress(loginUserId, billingAddressParamHolder);
                    }else{
                        response = await shippingBillingStore.updateBillingAddress(loginUserId, billingAddressParamHolder);
                    }
                }
                if(response.data?.status == 'success'){
                    shippingBillingStore.resetDefaultShippingBillingAddress(loginUserId);
                    closeModal()
                }
                if(response.data == null || response.status == 2){
                    ps_error_dialog.value.openModal('',response.message);
                }

            }

            return {
                psmodal,
                title,
                phoneStore,
                addressParamHolder,
                countryCode,
                phoneNumber,
                phoneKeyword,
                saveBillingNextTime,
                saveShippingNextTime,
                validations,
                paramHolder,
                ps_error_dialog,
                openModal,
                closeModal,
                loadPhone,
                filterPhoneUpdate,
                validateNumberInput,
                saveClick,
            }
        }
    })
</script>

