<template>
    <ps-modal ref="psmodal" line="hidden" :isClickOut='false' maxWidth="936px" bodyHeight="" theme="rounded-lg" bgColor="bg-feAchromatic-50 dark:bg-feAchromatic-800">
        <template #title>
            <div class="px-6 py-7 flex items-center justify-between border-b dark:bg-feAchromatic-800 dark:border-feAchromatic-700">
                <ps-label textColor="font-semibold text-2xl text-feSecondary-800 dark:text-feAchromatic-50">{{ $t(title) }}</ps-label>
                <ps-icon name="close" class="cursor-pointer" w="24" h="24" @click="closeModal()"/>
            </div>
        </template>
        <template #body>
            <div class="h-96 overflow-y-auto px-4 pt-5 flex flex-col gap-4">
                <div v-for="address in addressList" :key="address.id" class="p-4 border dark:border-feAchromatic-700 rounded-lg flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <input type="radio" @change="handleAddress(address)" name="address" :id="address.id" :checked="defalutAddressId==address.id" class="cursor-pointer w-4 h-4 bg-transparent text-fePrimary-500 checked:bg-fePrimary-500 hover:bg-fePrimary-500 checked:hover:bg-fePrimary-500 focus:ring-1 focus:ring-fePrimary-500 focus:bg-fePrimary-500">
                        <label class="" :for="address.id">
                            <ps-label textColor="font-semibold dark:text-feAchromatic-200">{{ address.firstName+" "+address.lastName }}</ps-label>
                            <ps-label>{{ address.phoneNo+", "+address.email }}</ps-label>
                            <ps-label>{{ address.address+", "+address.country+", "+address.state+", "+address.city+", "+address.postalCode }}</ps-label>
                            <div class="flex flex-wrap gap-2 mt-3">
                                <ps-label v-if="address.isSaveShippingInfoForNextTime == 1" textColor="text-fePrimary-600 bg-fePrimary-50 px-2 py-1 rounded text-xl font-medium">{{ $t('core_fe__default_shipping_address') }}</ps-label>
                                <ps-label v-if="address.isSaveBillingInfoForNextTime == 1" textColor="text-fePrimary-600 bg-fePrimary-50 px-2 py-1 rounded text-xl font-medium">{{ $t('core_fe__default_billing_address') }}</ps-label>
                            </div>
                        </label>
                    </div>
                    <ps-button @click="editClick(address)" colors="bg-feAchromatic-50 text-feSecondary-800 dark:bg-feAchromatic-800 dark:text-feAchromatic-200" border="border dark:border-feAchromatic-500" focus="" hover="hover:bg-feAchromatic-200 dark:hover:bg-feAchromatic-700">{{ $t("core_fe__edit") }}</ps-button>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex items-center justify-center gap-4 p-4 bg-feAchromatic-100 dark:bg-feAchromatic-700 rounded-b-lg">
                <ps-button class="w-72" @click="addNewAddressClick()">{{ $t('core_fe__add_new_address') }}</ps-button>
                <!-- <ps-button class="w-32" colors="bg-feAchromatic-50 text-feSecondary-800" focus="" hover="hover:bg-feAchromatic-200" @click="closeModal()">{{ $t('cancle') }}</ps-button> -->
            </div>
        </template>
    </ps-modal>
    <add-new-address-modal ref="add_new_address_modal" />
</template>

<script>
// store
import { defineComponent, ref } from 'vue';
import { trans } from 'laravel-vue-i18n';
import { PsValueStore } from "@templateCore/store/modules/core/PsValueStore";
import { useVendorShippingBillingStoreState } from "@templateCore/store/modules/vendor_checkout/VendorShippingBillingStore";

// components
import PsModal from '@template1/vendor/components/core/modals/PsModal.vue';
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import AddNewAddressModal from './VendorCheckoutAddAddressModal.vue';

    export default defineComponent({
        name: "AddressListModal",
        components: {
            PsModal,
            PsLabel,
            PsIcon,
            PsButton,
            AddNewAddressModal,
        },
        props: {
            id: {
                type: String,
                default: ""
            },
            addressType: {
                type: String,
                default: "billing"
            }
        },
        setup(props, {emit}){
            // stores
            const shippingBillingStore = useVendorShippingBillingStoreState('detail');
            const psValueStore = PsValueStore();

            // ref
            const psmodal = ref();
            const add_new_address_modal = ref();
            const title = ref(trans('shipping_address'));
            const loginUserId = psValueStore.getLoginUserId();
            const addressList = ref();
            const defalutAddressId = ref();
            const selectedAddress = ref();
            const type = ref();

            async function openModal(addressType, selectedAddressId){
                psmodal.value.toggle(true);
                type.value = addressType;
                defalutAddressId.value = selectedAddressId;
                console.log(defalutAddressId.value)
                if(addressType == 'shipping'){
                    title.value = trans('shipping_address');
                    await shippingBillingStore.resetShippingAddressList(loginUserId);
                    // defalutAddressId.value = shippingBillingStore.defaultShippingBillingAddress.data.shippingId;
                    addressList.value = shippingBillingStore.shippingAddressList.data;
                }else{
                    title.value = trans('billing_address');
                    await shippingBillingStore.resetBillingAddressList(loginUserId);
                    // defalutAddressId.value = shippingBillingStore.defaultShippingBillingAddress.data.billingId;
                    addressList.value = shippingBillingStore.billingAddressList.data;
                }
            }

            function closeModal(){
                shippingBillingStore.shippingAddressList.data = null;
                shippingBillingStore.billingAddressList.data = null;
                defalutAddressId.value = null;
                addressList.value = null;
                psmodal.value.toggle(false);
            }

            function handleAddress(address){
                selectedAddress.value = address;
                emit('updateAddress', selectedAddress.value, type.value);
            }

            function editClick(address){
                psmodal.value.toggle(false);
                add_new_address_modal.value.openModal(type.value, address);
            }

            function saveClick(){
                emit('updateAddress', selectedAddress.value, type.value);
                psmodal.value.toggle(false);
            }

            function addNewAddressClick(){
                psmodal.value.toggle(false);
                add_new_address_modal.value.openModal(type.value);
            }

            return {
                psmodal,
                add_new_address_modal,
                title,
                shippingBillingStore,
                addressList,
                defalutAddressId,
                openModal,
                closeModal,
                handleAddress,
                editClick,
                saveClick,
                addNewAddressClick,
            }
        }
    })
</script>

