<template>
  <ps-modal ref="psmodal" line="hidden" maxWidth="1200px" :isClickOut='false' class='h-full w-9/10' bodyHeight="max-h-[600px]" theme="p-6 border rounded" bgColor="bg-feAchromatic-50 dark:bg-feAchromatic-800">
      <template #title>
          <div class="flex justify-end w-full h-6">
              <ps-icon class="cursor-pointer dark:text-feSecondary-500" name="close" w="24" h="24" @click="psmodal.toggle(false)"/>
          </div>
      </template>
      <template #body>
        <div class="flex justify-center w-full">
            <ps-label textColor="text-4xl font-semibold text-fePrimary-500 text-feAchromatic-50">{{ $t("vendor_choose_subscription") }}</ps-label>
        </div>
        <div class="flex flex-wrap justify-center mt-5 mb-10">
            <div class="text-xl font-normal text-center w-140 text-feSecondary-800 dark:text-feAchromatic-200">{{ $t("vendor_choose_subscription_description") }}</div>
        </div>
        <div class="flex flex-row justify-center w-full h-96" >
            <splide :options="options" :has-track="false" class="w-full">
            <splide-track>
                <splide-slide v-for="plan in vendorSubScriptionStore.subScriptionList?.data" :key="plan.id">
                    <vendor-choose-subscription-plan-item :plan="plan" :vendorId="vendorId"/>
                </splide-slide>
            </splide-track>

            <div :class="'splide__arrows splide__arrows--'+ languageStore.getLanguageDir()">
                <button
                    class="w-10 h-10 p-2 rounded shadow-sm bg-feSecondary-50 dark:bg-feSecondary-800 splide__arrow--prev"
                    type="button"
                    aria-label="Previous slide"
                    aria-controls="splide01-track"
                >
                    <ps-icon textColor="dark:text-feSecondary-200" name="arrowNarrowRight" h="23" w="23" viewBox="0 -3 9 20"/>
                </button>
                <button
                    class="w-10 h-10 p-2 rounded shadow-sm bg-feSecondary-50 dark:bg-feSecondary-800 splide__arrow--next"
                    type="button"
                    aria-label="Next slide"
                    aria-controls="splide01-track"
                >
                    <ps-icon textColor="dark:text-feSecondary-200" name="arrowNarrowRight" h="23" w="23" viewBox="0 -3 9 20"/>
                </button>
            </div>
        </splide>       
        </div>
      </template>
  </ps-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import { PsValueStore } from '@templateCore/store/modules/core/PsValueStore';
import { useVendorSubScriptionStoreState } from '@templateCore/store/modules/vendorSubScription/VendorSubScriptionStore';
import PsModal from '@template1/vendor/components/core/modals/PsModal.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsInput from '@template1/vendor/components/core/input/PsInput.vue';
import PsTextarea from '@template1/vendor/components/core/textarea/PsTextarea.vue';
import PsFileUpload from '../item/PsFileUpload.vue';
import PrivacyModal from '@template1/vendor/components/modules/privacy/PrivacyModal.vue';
import PsLoadingDialog from '@template1/vendor/components/core/dialog/PsLoadingDialog.vue';
import VendorChooseSubscriptionPlanItem from './VendorChooseSubscriptionPlanItem.vue';
import { useLanguageStore } from '../../../../../../../../../resources/js/store/Localization/LanguageStore';

export default defineComponent({
  name: 'VendorChooseSubscriptionPlanModal',
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
      VendorChooseSubscriptionPlanItem,
      Splide,
        SplideSlide,
        SplideTrack,
  },
  setup() {
      const psValueStore = PsValueStore();
      const loginUserId = psValueStore.getLoginUserId();
      const vendorSubScriptionStore = useVendorSubScriptionStoreState();

      const psmodal = ref();
      const isError = ref(false);
      const error = ref();
      const ps_loading_dialog = ref();
      const vendorId = ref('');
      const languageStore = useLanguageStore();
      const options = {
                rewind: true,
                gap   : '1rem',
                perPage: 3,
                focus  : 0,
                omitEnd: true,
                pagination: false,
                direction: languageStore.getLanguageDir(),
                breakpoints:{
                    1536:{
                        perPage: 3,
                        gap   : '1rem',
                    },
                    1280:{
                        perPage:3,
                        gap   : '1rem',
                    },
                    1024:{
                        perPage:2,
                        gap   : '1rem',
                    },
                    768:{
                        perPage:1,
                        gap   : '.75rem',
                    },
                    640:{
                        perPage:1,
                        gap   : '.5rem',
                    },
                    200:{
                        perPage:1
                    }
                }
            };
             
      async function openModal(id) {
          await vendorSubScriptionStore.resetVendorSubscriptionPlanList(loginUserId);
          vendorId.value = id;
          psmodal.value.toggle(true);
      }

      function closeModal() {
          psmodal.value.toggle(false);
      }

      return {
          vendorSubScriptionStore,
          psmodal,
          openModal,
          closeModal,
          isError,
          error,
          ps_loading_dialog,
          vendorId,
          options,
          languageStore,
      }
  },
})
</script>
<style scoped>
.splide__arrow--prev{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
}
.splide__arrow--next{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
}
/* right to left */
.splide__arrows--rtl .splide__arrow--prev{left:auto;right:-1em}
.splide__arrows--rtl .splide__arrow--next{right:auto;left:-1em}

/* left to right */
.splide__arrows--ltr .splide__arrow--prev{right:auto;left:-1em}
.splide__arrows--ltr .splide__arrow--next{left:auto;right:-1em}

    /* .splide{z-index: 0; padding: 0;}
@media (max-width: 640px) {

    .splide__arrow--next{
        left: calc(100% - 1.5rem);
    }
}
@media (max-width: 786px) {
    .splide__arrow--prev{
        left: -1rem;
    }
    .splide__arrow--next{
        right: -1rem;
    }
} */
</style>
