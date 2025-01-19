<template>
    
    <Head :title="$t('category_list__title')" />
    
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28">
                <div class="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
                    
                    <ps-breadcrumb-2 :items="breadcrumb" class="mb-6 sm:mb-0" />
                    
                    <div class="flex justify-end">

                        <!-- Search -->
                        <ps-input-with-right-icon v-on:keyup.enter="handleCategorySearch" v-model:value="categoryStore.paramHolder.keyword" class="w-full sm:w-80" padding="py-2 px-4 h-10" v-bind:placeholder="$t('category__fe_search')" >
                            <template #icon>                                
                                <ps-icon v-if="categoryStore.paramHolder.keyword == ''" name="search" class='cursor-pointer'/>
                                <ps-icon v-else @click="[categoryStore.paramHolder.keyword = '',handleCategorySearch()]" name="cross" class='cursor-pointer'/>
                            </template>
                        </ps-input-with-right-icon>
                        
                        <!-- Sorting -->
                        <ps-dropdown                             
                            horizontalAlign="right" h="h-auto" class="ms-4" rounded="rounded-lg" >
                            <template #select>
                                <ps-dropdown-select 
                                    class="h-10 w-10 sm:w-auto sm:ps-4 ps-2.5"                                     
                                    text="text-sm font-medium text-feAchromatic-800 dark:text-feAchromatic-100 hidden sm:inline" 
                                    iconTheme="text-feAchromatic-800 ms-2 hidden sm:inline" 
                                    leftIcon="filter" 
                                    leftIconTheme="inline sm:hidden" 
                                    :selectedValue="activeSortingName" 
                                    :placeholder="$t('sort_by')" />
                            </template>
                            <template #list>
                                <div class="shadow-xs bg-feAchromatic-50 dark:bg-feSecondary-800 w-44"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu">
                                    <div v-for="sort in currentsorting" :key="sort.id" 
                                        class="flex items-center px-2 py-4 cursor-pointer hover:bg-fePrimary-50 dark:hover:bg-feSecondary-500"  
                                        @click="handleCategorySorting(sort)" >
                                            <span class="ms-2 text-feSecondary-800 dark:text-feSecondary-200" 
                                                :class="sort.id==activeSortingId ? 'font-semibold' : ''"  >
                                                {{ $t("core__fe_name") }}: {{sort.name}} </span>
                                    </div>
                                </div>
                            </template>
                        </ps-dropdown>
                    </div>                    
                </div>
                
                <!-- Category List -->
                <div class="w-full mt-8 mb-8">
                    <div v-if="categoryStore.itemList?.data != null" class="grid grid-cols-4 gap-4 sm:grid-cols-4 md:grid-cols-9 lg:grid-cols-12 xl:gap-6 sm:gap-6 ">
                        <div class="w-full col-span-4 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-3" v-for="category in categoryStore.itemList.data" :key="category.catId">
                            <ps-route-link
                                :to="{name: appInfoStore?.isShowSubCategory() ? 'fe_sub_category' : 'fe_item_list',
                                query: {
                                    cat_id: category.catId,
                                    cat_name: category.catName,
                                    status: 1} }"
                                @click="handleCategoryTouchCount(category.catId)">
                                <category-horizontal-item  :category="category" />
                            </ps-route-link>
                        </div>                            
                    </div>

                    <ps-no-result v-if="categoryStore.loading.value == false && categoryStore.itemList?.data == null " @onClick="handleLoadMoreCategory"  />

                    <ps-button v-if="categoryStore.loading.value == false" class="mx-auto mt-6 font-medium" @click="handleLoadMoreCategory" :class="categoryStore.isNoMoreRecord.value ? 'hidden' : ''"> {{ $t("category_list__load_more") }} </ps-button>
                    <ps-button v-if="categoryStore.loading.value" class="mx-auto mt-8 font-medium" @click="handleLoadMoreCategory" :disabled="true"> {{ $t("category_list__loading") }} </ps-button>
                       
                </div>
            </div>            
        </template>
    </ps-content-container>
</template>

<script>
import PsFrontendLayout from '@template1/vendor/components/layouts/container/PsFrontendLayout.vue';

export default {
    name: 'CategoryListView',
    layout: PsFrontendLayout
};
</script>

<script setup>
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import { trans } from 'laravel-vue-i18n';
import PsApi from '@templateCore/api/common/PsApi';
import PsConst from '@templateCore/object/constant/ps_constants';

import PsContentContainer from '@template1/vendor/components/layouts/container/PsContentContainer.vue';
import PsRouteLink from '@template1/vendor/components/core/link/PsRouteLink.vue';
import PsBreadcrumb2 from '@template1/vendor/components/core/breadcrumbs/PsBreadcrumb2.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsDropdown from '@template1/vendor/components/core/dropdown/PsDropdown.vue';
import PsDropdownSelect from '@template1/vendor/components/core/dropdown/PsDropdownSelect.vue';
import CategoryHorizontalItem from '@template1/vendor/components/modules/category/CategoryHorizontalItem.vue';
import PsInputWithRightIcon from '@template1/vendor/components/core/input/PsInputWithRightIcon.vue';
import PsNoResult from "@template1/vendor/components/modules/list/PsNoResult.vue";

import { useCategoryStoreState } from "@templateCore/store/modules/category/CategoryStore";
import { useTouchCountStoreState } from '@templateCore/store/modules/category/TouchCountStore';
import { PsValueStore } from "@templateCore/store/modules/core/PsValueStore";

import TouchCountParameterHolder from '@templateCore/object/holder/TouchCountParameterHolder';

const props = defineProps({
    mobileSetting: Object,
    categories : Object
});
   
const breadcrumb = ref([
    {
        label: trans('item_list__home'),
        url: route('dashboard')
    },
    {
        label: trans('category_list__title'),
        color: "text-fePrimary-500"
    }
]);


onMounted(() => {
    // First time loading
    loadDataList(true);
});


// Init Stores
const psValueStore = PsValueStore();
const categoryStore = useCategoryStoreState('fe-category-list');
const loginUserId = psValueStore.getLoginUserId();


// Loading Categories
categoryStore.setLimit(props.mobileSetting);

async function loadDataList(initial = false) {
    if(initial && await PsApi.checkIsEmpty(props.categories)){
        categoryStore.setCategoryList(props.categories);
    } else {
        categoryStore.resetCategoryList(loginUserId, categoryStore.paramHolder);
    }    
}

function handleLoadMoreCategory() {
    categoryStore.loadItemList(loginUserId, categoryStore.paramHolder);
}


// Search
function handleCategorySearch() {
    loadDataList();
}


// Sorting
const currentsorting = [
    {
        id:"0",
        orderBy:"name",
        orderType:PsConst.FILTERING__ASC,
        name:"A to Z"
    },
    {
        id:"1",
        orderBy:"name",
        orderType:PsConst.FILTERING__DESC,
        name:"Z to A"
    }
];
let activeSortingId = ref('');
let activeSortingName = ref('');

function handleCategorySorting(value) {
    activeSortingId.value = value.id;
    activeSortingName.value = value.name;
    categoryStore.paramHolder.orderBy = value.orderBy;
    categoryStore.paramHolder.orderType = value.orderType;
    loadDataList();
}


// Touch Count Update
const touchCountStore = useTouchCountStoreState();
const touchCountHolder = new TouchCountParameterHolder();

function handleCategoryTouchCount(catId){
    touchCountHolder.typeName = 'category';
    touchCountHolder.typeId = catId;
    touchCountHolder.userId = loginUserId;
    touchCountStore.postTouchCount(loginUserId, touchCountHolder);    
}

</script>
