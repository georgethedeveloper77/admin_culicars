<template>
    <ps-modal ref="psmodal" maxWidth="450px" :isClickOut='false' class="z-50" >
        <template #title>
            <ps-label-title> {{ $t("ps_loading_dialog__please_wait") }} </ps-label-title>
        </template>
        <template #body>
            <ps-label> {{ message }} </ps-label>
        </template>
        <template #footer>
        </template>
    </ps-modal>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue';
import PsModal from '../Modals/PsModal.vue';
import PsLabelTitle from '../Label/PsLabelTitle.vue';
import PsLabel from '../Label/PsLabel.vue';
import { trans } from 'laravel-vue-i18n';

export default defineComponent({
    components : {
        PsModal,
        PsLabel,
        PsLabelTitle
    },
    setup() {
        const psmodal = ref();
        const message = ref(trans('core.ps_loading_dialog__loading'));

        function openModal() {
            psmodal.value.toggle(false);//to close loading modal in any page
        }

        function closeModal() {
            psmodal.value.toggle(false);
        }

        function setMessage(messageStr) {
            message.value = messageStr;
        }
        return {
            psmodal,
            openModal,
            closeModal,
            message,
            setMessage
        }
    },
})
</script>
