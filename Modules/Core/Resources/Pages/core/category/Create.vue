<template>
    <Head :title="$t('core__add_category')" />
    
    <ps-breadcrumb-2 :items="breadcrumb" class="mb-5 sm:mb-6 lg:mb-8" />
    
    <ps-card class="w-full h-auto">
        <div class="rounded-xl">
            <!-- Title -->
            <div class="bg-primary-50 dark:bg-primary-900 py-2.5 ps-4 rounded-t-xl">
                <ps-label-header-6 textColor="text-secondary-800 dark:text-secondary-100">{{$t('core__be_category_info')}}</ps-label-header-6>
            </div>
            
            <div class="w-full px-4 pt-6 sm:w-1/2">
            
                <!-- Category Name -->
                <ps-label class="mb-2 text-base">{{$t('core__category_label')}}<span class="text-red-500 ms-1" >*</span></ps-label>                  
                <ps-input-with-right-icon theme="text-secondary-500" 
                    rounded="rounded" 
                    :placeholder="$t('core__category_placeholder')"
                    placeholderColor="placeholder-secondary-500" 
                    :disabled="true" 
                    v-model:value="form.name">
                    <template #icon>
                        <ps-icon name="editPencil" w="20" h="20" @click="handleCategoryNameEntry"/>
                    </template>
                </ps-input-with-right-icon>
                <ps-label-caption textColor="text-red-500 " 
                    class="block mt-2">{{props.errors.name}}</ps-label-caption>
                    

                <!-- Category Photo -->
                <ps-label class="mb-2 text-base">{{$t('core__category_photo_label')}}<span class="text-red-500 ms-1">*</span></ps-label>
                <ps-label-title-3>{{ $t('core__be_recommended_size_400_200') }}</ps-label-title-3>
                <ps-image-upload uploadType="image" v-model:imageFile="form.cat_photo" />
                <ps-label-caption textColor="text-red-500 " class="block mt-2">{{ props.errors.cat_photo }}</ps-label-caption>
                
                <!-- Category Icon -->
                <ps-label class="mb-2 text-base">{{$t('core__category_icon_label')}}<span class="text-red-500 ms-1">*</span></ps-label>
                <ps-label-title-3>{{ $t('core__be_recommended_size_200_200') }}</ps-label-title-3>
                <ps-image-upload class="w-72" uploadType="icon" v-model:imageFile="form.cat_icon" />
                <ps-label-caption textColor="text-red-500 " class="block mt-2">{{ props.errors.cat_icon }}</ps-label-caption>
                    
                <!-- Publish Status -->
                <ps-label class="mb-2 text-base">{{$t('core__status_label')}}</ps-label>
                <ps-checkbox-value v-model:value="form.status" class="font-normal" :title="$t('core__publish_label')" />
                    
                <div class="flex flex-row justify-end mb-2.5">
                    <ps-button @click="handleCancel()" type="reset" class="me-4" colors="text-primary-500" hover="">{{ $t('core__be_btn_cancel') }}</ps-button>
                    <ps-submit-button 
                        ref="psSubmitButton"
                        :title="$t('core__be_btn_save')"
                        :titleSuccess="$t('core__be_btn_saved')"
                        @click="handleSubmit"
                    />
                </div>
                
            </div>
        </div>
        
        <language-update-modal 
            v-if="languageStringEntryModalVisibleRef" 
            ref="languageStringEntryModalRef" 
            @onSaved="languageStringSaved"/>

    </ps-card>
  
</template>

<script>
import PsLayout from "@/Components/PsLayout.vue";

export default {
   layout: PsLayout
};
</script>


<script setup>

import PsUtils from '@templateCore/utils/PsUtils';
import { useCategoryStoreState } from '@templateCore/store/modules/category/CategoryStore';
import { ref, defineAsyncComponent } from "vue";
import { Head, useForm } from "@inertiajs/vue3";
import PsBreadcrumb2 from "@/Components/Core/Breadcrumbs/PsBreadcrumb2.vue";
import PsInputWithRightIcon from "@/Components/Core/Input/PsInputWithRightIcon.vue";
import PsLabel from "@/Components/Core/Label/PsLabel.vue";
import PsButton from "@/Components/Core/Buttons/PsButton.vue";
import PsSubmitButton from "@/Components/Core/Buttons/PsSubmitButton.vue";
import PsLabelHeader6 from "@/Components/Core/Label/PsLabelHeader6.vue";
import PsCard from "@/Components/Core/Card/PsCard.vue";
import PsIcon from "@/Components/Core/Icons/PsIcon.vue";
import PsCheckboxValue from "@/Components/Core/Checkbox/PsCheckboxValue.vue";
import PsLabelCaption from "@/Components/Core/Label/PsLabelCaption.vue";
import PsLabelTitle3 from "@/Components/Core/Label/PsLabelTitle3.vue";
import PsImageUpload from "@/Components/Core/Upload/PsImageUpload.vue";
import { trans } from 'laravel-vue-i18n';
const LanguageUpdateModal = defineAsyncComponent(() => import('../components/LanguageUpdateModal.vue'));

const props = defineProps({
    errors: Object,
    languages: Array
});

const breadcrumb = ref([
    {
        label: trans('core__be_dashboard_label'),
        url: route('admin.index')
    },
    {
        label: trans('category_module'),
        url: route('category.index'),
    },
    {
        label: trans('core__add_category'),
        color: "text-primary-500"
    }
]);

const psSubmitButton = ref();
const languageStringEntryModalRef = ref();
const languageStringEntryModalVisibleRef = ref(false);
const languageKey = "_name";
const categoryStore = useCategoryStoreState();

let form = useForm({
    name: "",
    cat_photo: "",
    cat_icon: "",
    status: false,
    extra_caption:[],
    images:[],
    nameForm:[],
});

// Category Name Entry For Multi Languages
async function handleCategoryNameEntry() {
    await PsUtils.waitingComponent(languageStringEntryModalRef, languageStringEntryModalVisibleRef);   
    
    // Set Language Strings and Open Modal
    languageStringEntryModalRef.value.setLanguageStrings(languageKey, props.languages);    
    languageStringEntryModalRef.value.openModal(languageKey, null, true);    
}

function languageStringSaved(defaultValue, languageValues) {
    form.name = defaultValue;
    form.nameForm = languageValues;
}

// Save Category
function handleSubmit() {
    categoryStore.saveCategoryInertia(form, (status) => {
        switch(status) {
            case "before": 
                psSubmitButton.value.startLoading();
            break;
            case "success": 
                psSubmitButton.value.endLoading(true);            
            break;
            case "error": 
                psSubmitButton.value.endLoading(false);
            break;
        }        
    })
}

// Cancel Entry
function handleCancel() {
    categoryStore.navigateToCategoryIndex();
}

</script>
