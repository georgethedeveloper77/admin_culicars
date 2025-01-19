<template>
    <ps-modal ref="psmodal" line="hidden" maxWidth="472px" :isClickOut='false' class='h-full' bodyHeight="max-h-81" theme="p-6 border rounded" bgColor="bg-feAchromatic-50 dark:bg-feAchromatic-800">
        <template #title>
            <div class="w-full flex justify-between h-6">
                <ps-label textColor="text-xl font-semibold text-feSecondary-800 dark:text-feAchromatic-50">{{ $t('core_fe__vendor_application') }}</ps-label>
                <ps-icon class="cursor-pointer dark:text-feSecondary-500" name="close" w="24" h="24" @click="psmodal.toggle(false)"/>
            </div>
        </template>
        <template #body>
            <div class="mt-6">
                <ps-label textColor="text-base font-medium text-feSecondary-800 dark:text-feAchromatic-200">{{ $t('core_fe__user_name') }} <span class="text-fePrimary-500">*</span></ps-label>
                <ps-input :disabled="true" type="text" v-model:value="userStore.user.data.userName" ref="user_name" />
            </div>
            <div class="mt-4">
                <ps-label textColor="text-base font-medium text-feSecondary-800 dark:text-feAchromatic-200">{{ $t('core_fe__email') }} <span class="text-fePrimary-500">*</span></ps-label>
                <ps-input type="email" v-model:value="holder.email" ref="email" :placeholder="$t('core_fe__email_placeholder')"/>
            </div>
            <div class="mt-4">
                <ps-label textColor="text-base font-medium text-feSecondary-800 dark:text-feAchromatic-200">{{ $t('core_fe__vendor_name') }} <span class="text-fePrimary-500">*</span></ps-label>
                <ps-input type="text" v-model:value="holder.vendorName" ref="vendor_name" :placeholder="$t('core_fe__vendor_name_placeholder')"/>
            </div>
            <div class="mt-4">
                <ps-label textColor="text-base font-medium text-feSecondary-800 dark:text-feAchromatic-200">{{ $t('core_fe__business_document') }} <span class="text-fePrimary-500">*</span></ps-label>
                <ps-file-upload v-model:documentFile="holder.document" :title="document" :placeholder="$t('core_fe__or_drop_files')"/>
            </div>
            <div class="mt-4">
                <ps-label textColor="text-base font-medium text-feSecondary-800 dark:text-feAchromatic-200">{{ $t('core_fe__cover_letter') }} <span class="text-fePrimary-500">*</span></ps-label>
                <ps-textarea rows="4" v-model:value="holder.coverLetter" :placeholder="$t('core_fe__cover_letter_placeholder')"/>
            </div>
            <div class="mt-4">
                <ps-label textColor="text-base font-medium text-feSecondary-800 dark:text-feAchromatic-200">{{ $t('core_fe__vendor_currency') }} <span class="text-fePrimary-500">*</span></ps-label>
                <ps-dropdown align="left" class='  w-full' @onClick="loadCurrency">
                    <template #select>
                        <ps-dropdown-select :showCenter="true" :placeholder="$t('core_fe__choose_vendor_currency')"
                            :selectedValue="itemCurrencyStore?.itemCurrencyList?.data?.filter(currency=>currency.id == holder.currencyId)[0]?.currencyShortForm" />
                    </template>

                    <template #list>
                        <div class="rounded-md shadow-xs w-56 ">
                            <div class="pt-2 z-30 ">
                                <div v-if="itemCurrencyStore.itemCurrencyList.data == null">
                                    <ps-label class='p-2 flex' @click="loadCurrency"> {{
                                        $t("item_entry__loading")
                                    }} </ps-label>
                                </div>
                                <div v-else>
                                    <div v-for="itemcurrency in itemCurrencyStore.itemCurrencyList.data"
                                        :key="itemcurrency.id"
                                        class="w-56 flex py-4 px-2 hover:bg-fePrimary-50 dark:hover:bg-fePrimary-900 cursor-pointer items-center"
                                        @click="currencyFilterClicked(itemcurrency)">
                                        <ps-label class="ms-2"
                                            :class="itemcurrency.id == holder.currencyId ? ' font-bold' : ''">
                                            {{ itemcurrency.currencyShortForm }} ({{ itemcurrency.currencySymbol }}) </ps-label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template #loadmore>
                        <div class="mb-2 w-56">
                            <div v-if="itemCurrencyStore.itemCurrencyList.data != null
                                && itemCurrencyStore.loading.value == true" class='mt-4 ms-4 flex'>
                                <ps-label> {{ $t("item_entry__loading") }} </ps-label>
                            </div>
                            <ps-label v-if="!itemCurrencyStore.isNoMoreRecord.value"
                                class="flex mt-4 ms-4 mb-2 underline font-bold cursor-pointer"
                                @click="loadCurrency"> {{ $t("item_entry__load_more") }} </ps-label>
                        </div>
                    </template>
                </ps-dropdown>
                <ps-label textColor="text-xs text-feSecondary-400 mt-2">{{$t("core_fe__vendor_currency_note")}}</ps-label>
            </div>
            <ps-label textColor="my-4 text-sm text-feSecondary-800 flex gap-1">
                <span class="dark:text-feAchromatic-200">{{ $t('core_fe__by_applying_you_agree_to_the') }} </span>
                <span @click="privacyPolicy()" class="text-fePrimary-500 cursor-pointer">{{ $t('core_fe__privacy_policy') }}</span>
            </ps-label>
            <div v-if="isError" class="p-4 mt-2 rounded bg-fePrimary-50 border border-fePrimary-500">
                <ps-label textColor="text-fePrimary-500 font-medium">{{ error }}</ps-label>
            </div>
            <privacy-modal v-if="showPrivacyModal" ref="privacy_modal" />
        </template>
        <template #footer>
            <div class="w-full flex flex-col gap-4">
                <ps-button @click="submit()">{{ $t('core__fe_apply') }}</ps-button>
                <ps-button colors="hover:text-feAchromatic-50 dark:text-feAchromatic-200" border="border" @click="closeModal()">{{ $t('core_fe__cancel') }}</ps-button>
            </div>
        </template>
    </ps-modal>
    <ps-loading-dialog ref="ps_loading_dialog"/>

    <vendor-choose-subscription-plan-modal v-if="showSubscriptionPlanModal" ref="vendor_choose_subscription_plan_modal"/>
</template>

<script>
import { defineComponent, onMounted, ref, defineAsyncComponent } from 'vue';
import { usePsAppInfoStoreState } from "@templateCore/store/modules/appinfo/AppInfoStore";
import { useUserStore } from "@templateCore/store/modules/user/UserStore";
import { PsValueStore } from '@templateCore/store/modules/core/PsValueStore';
import { useVendorStore } from '@templateCore/store/modules/vendor/VendorStore';
import { useItemCurrencyStoreState } from '@templateCore/store/modules/item/ItemCurrencyStore';
import PsConst from '@templateCore/object/constant/ps_constants';
import { useVendorApplicationStore } from '@templateCore/store/modules/vendor/VendorApplicationStore';
import { useForm } from "@inertiajs/vue3";

import VendorApplicationParameterHolder from '@templateCore/object/holder/VendorApplicationParameterHolder';

import PsModal from '@template1/vendor/components/core/modals/PsModal.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsInput from '@template1/vendor/components/core/input/PsInput.vue';
import PsTextarea from '@template1/vendor/components/core/textarea/PsTextarea.vue';
// import PsFileUpload from '@template1/vendor/components/core/Uploads/PsFileUpload.vue';
import PsFileUpload from '../item/PsFileUpload.vue';
import PsLoadingDialog from '@template1/vendor/components/core/dialog/PsLoadingDialog.vue';
const VendorChooseSubscriptionPlanModal = defineAsyncComponent(()=>import('@template1/vendor/components/modules/vendor/VendorChooseSubscriptionPlanModal.vue'));
const PrivacyModal = defineAsyncComponent(()=>import('@template1/vendor/components/modules/privacy/PrivacyModal.vue'));
import PsDropdown from '@template1/vendor/components/core/dropdown/PsDropdown.vue';
import PsDropdownSelect from '@template1/vendor/components/core/dropdown/PsDropdownSelect.vue';
import PsUtils from '@templateCore/utils/PsUtils';

export default defineComponent({
    name: 'VendorApplicationModal',
    components: {
        PsModal,
        PsIcon,
        PsLabel,
        PsButton,
        PsInput,
        PsTextarea,
        PsFileUpload,
        PrivacyModal,
        PsLoadingDialog,
        PsDropdown,
        PsDropdownSelect,
        VendorChooseSubscriptionPlanModal
    },
    props:{
        vendorId: String,
        storeName: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const isUpdate = ref(props.vendorId == null ? false : true);
        const appInfo = usePsAppInfoStoreState();
        const userStore = useUserStore();
        const psValueStore = PsValueStore();
        const itemCurrencyStore = useItemCurrencyStoreState('vendor-application');
        const vendorStore = useVendorStore(props.storeName);
        const vendorApplicationStore = useVendorApplicationStore();
        const loginUserId = psValueStore.getLoginUserId();
        const holder = ref(new VendorApplicationParameterHolder());

        const vendor_choose_subscription_plan_modal = ref();
        const showSubscriptionPlanModal = ref(false);
        const showPrivacyModal = ref(false);

        const psmodal = ref();
        const document = ref();
        const isError = ref(false);
        const error = ref();
        const privacy_modal = ref();
        const agreePrivacyPolicy = ref();
        const ps_loading_dialog = ref();

        async function loadInfo() {
            await userStore.loadUser(loginUserId);
            await itemCurrencyStore.resetItemCurrencyList(loginUserId);
            if(isUpdate.value){
                await vendorStore.loadVendor(props.vendorId, loginUserId, loginUserId);
                holder.value.id = vendorStore.vendor.data.vendorApplication.id;
                holder.value.email = vendorStore.vendor.data.email;
                holder.value.vendorName = vendorStore.vendor.data.name;
                holder.value.coverLetter = vendorStore.vendor.data.vendorApplication.coverLetter;
                holder.value.currencyId = vendorStore.vendor.data.currencyId;
                // holder.value.document = vendorStore.vendor.data.vendorApplication.document;
                document.value = vendorStore.vendor.data.vendorApplication.document;
            }
            // console.log(document.value);
        }

        function openModal() {
            loadInfo();
            psmodal.value.toggle(true);
        }

        function closeModal() {
            psmodal.value.toggle(false);
        }

        function isAcceptPrivacy(isAccept) {
            agreePrivacyPolicy.value = isAccept;
        }

        async function privacyPolicy() {
            showPrivacyModal.value = true;
            await PsUtils.waitingComponent(privacy_modal);
            privacy_modal.value.openModal(isAcceptPrivacy);
        }

        function loadCurrency() {
            itemCurrencyStore.loadItemCurrencyList(loginUserId);
        }

        function currencyFilterClicked(value) {
            holder.value.currencyId = value.id;
        }

        async function submit() {
            isError.value = false;
            ps_loading_dialog.value.openModal();
            let response = await vendorApplicationStore.submitVendorApplication(loginUserId, holder.value.id, holder.value.email, holder.value.vendorName, holder.value.coverLetter, holder.value.document, holder.value.currencyId);
            if(response.data != null && response.status == 1){
                psmodal.value.toggle(false);
                ps_loading_dialog.value.closeModal();
                if(appInfo.vendorSubScriptionSetting() != PsConst.VendorWithFree){
                    showSubscriptionPlanModal.value = true;
                    await PsUtils.waitingComponent(vendor_choose_subscription_plan_modal);
                    vendor_choose_subscription_plan_modal.value.openModal(response.data.vendorApplication.vendorId);
                }else{
                    location.reload();
                }
            }else{
                ps_loading_dialog.value.closeModal();
                isError.value = true;
                error.value = response.message;
            }
        }

        return {
            psmodal,
            privacy_modal,
            openModal,
            closeModal,
            userStore,
            vendorStore,
            holder,
            submit,
            document,
            isError,
            error,
            privacyPolicy,
            agreePrivacyPolicy,
            ps_loading_dialog,
            vendor_choose_subscription_plan_modal,
            itemCurrencyStore,
            loadCurrency,
            currencyFilterClicked,
            showSubscriptionPlanModal,
            showPrivacyModal,
        }
    },
})
</script>
