<template>
    <Head :title="$t('user_list__users')"/>
    <ps-content-container>
        <template #content>
            <div class="mt-32 mb-10 grid grid-cols-8">
                <div class="w-full sm:col-start-2 sm:col-span-6 col-span-8 rounded border p-4 flex flex-col gap-3 dark:bg-feAchromatic-800 dark:border-feAchromatic-600">
                    <ps-label textColor="text-xl font-semibold text-feSecondary-800 dark:text-feAchromatic-200">{{ $t('core_fe__data_deletion_title') }}</ps-label>
                    <ps-label textColor="text-feSecondary-800 dark:text-feAchromatic-200">{{ $t('core_fe__data_deletion_description') }}</ps-label>

                    <ps-button @click="deleteClick()">{{ $t('core_fe__data_deletion_delete') }}</ps-button>
                </div>
            </div>
        </template>
    </ps-content-container>
    <ps-confirm-dialog ref="ps_confirm_dialog"/>
    <ps-loading-dialog ref="psloading"  :isClickOut='false'/>
</template>

<script>
import { Head } from '@inertiajs/vue3';
import { ref, defineComponent } from 'vue';
import { PsValueStore } from "@templateCore/store/modules/core/PsValueStore";
import { useUserStore } from "@templateCore/store/modules/user/UserStore";
import { router } from '@inertiajs/vue3';
import { trans } from 'laravel-vue-i18n'

import UserDeleteItemParameterHolder from '@templateCore/object/holder/UserDeleteItemParameterHolder';
import PsStatus from '@templateCore/api/common/PsStatus';

import PsContentContainer from '@template1/vendor/components/layouts/container/PsContentContainer.vue';
import PsFrontendLayout from '@template1/vendor/components/layouts/container/PsFrontendLayout.vue';
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsConfirmDialog from '@template1/vendor/components/core/dialogs/PsConfirmDialog.vue';
import PsLoadingDialog from '@template1/vendor/components/core/dialog/PsLoadingDialog.vue';

export default defineComponent({
    name: 'DataDeletionRequestForm',
    components: {
        PsContentContainer,
        Head,
        PsButton,
        PsLabel,
        PsConfirmDialog,
        PsLoadingDialog,
    },
    layout: PsFrontendLayout,
    setup(){
        const psValueStore = PsValueStore();
        const userProvider = useUserStore();
        const LoginUserId = psValueStore.getLoginUserId();
        const userdelete = new UserDeleteItemParameterHolder();

        const ps_confirm_dialog = ref();
        const psloading = ref();

        function deleteClick(){
            ps_confirm_dialog.value.openModal(
                trans('core_fe__data_deletion_confirm_title'),
                trans('core_fe__data_deletion_confirm_message'),
                trans('core_fe__data_deletion_confirm_ok'),
                trans('core_fe__cancel'),
                ()=>{
                    doDeactivate(LoginUserId);
                },
                ()=>{}
            );
        }

        async function doDeactivate(LoginUserId) {

            userdelete.userId = LoginUserId;

            psloading.value.openModal();
            const returnData = await userProvider.postDeleteUser(userdelete);
            psloading.value.closeModal();

            if(returnData.status == PsStatus.ERROR) {

                return;
            }else if(returnData.status == PsStatus.SUCCESS) {

                router.post(route('logout'));

            }

        }

        return {
            ps_confirm_dialog,
            psloading,
            deleteClick
        }
    }
})
</script>
