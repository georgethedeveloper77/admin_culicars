<template>
    <div v-if="itemListProvider.hasData() != null || itemListProvider.loading.value" class="mt-5 mb-10">
        <div class="flex items-center justify-between">
            <ps-label-header-5 class="font-semibold">{{ $t(title) }}</ps-label-header-5>
            <ps-route-link :to="{ name: 'fe_item_list', query: params['query'] }">
                <ps-button class="flex flex-row" padding="p-2 sm:px-4 sm:py-2" shadow="shadow-sm" rounded="rounded" hover=""
                    focus="" border="border border-feSecondary-200 dark:border-feSecondary-800"
                    colors="bg-feAchromatic-50 text-feSecondary-800 dark:bg-feSecondary-800 dark:text-feSecondary-200">
                    <ps-label class="hidden sm:inline">{{ $t("list_fe__view_all_label") }}</ps-label>
                    <ps-icon class="block sm:ms-2 rtl:hidden" textColor="dark:text-feSecondary-200" name="rightChervon"
                        h="24" w="24" />
                    <ps-icon class="hidden sm:ms-2 rtl:block" textColor="dark:text-feSecondary-200" name="leftChervon"
                        h="24" w="24" />
                </ps-button>
            </ps-route-link>
        </div>
        <item-horizontal-swiper class="mt-6 sm:mb-0"
            :itemList="itemListProvider.itemList?.data"
            :filteredList="filteredItemList"
            :isLoading="itemListProvider.loading.value"
            :storeName="item_list_name" />
    </div>
</template>

<script>

// Libs
import { onMounted , ref} from 'vue';
// Components
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import ItemHorizontalSwiper from "@template1/vendor/components/modules/item/ItemHorizontalSwiper.vue";
import PsLabelHeader5 from '@template1/vendor/components/core/label/PsLabelHeader5.vue';
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsRouteLink from '@template1/vendor/components/core/link/PsRouteLink.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';
// Providers
import { useProductStore } from "@templateCore/store/modules/item/ProductStore";
import { PsValueStore } from "@templateCore/store/modules/core/PsValueStore";
// Holder
import ProductParameterHolder from '@templateCore/object/holder/ProductParameterHolder';

export default {
    name: 'DashboardItemHorizontalList',
    components: {
        ItemHorizontalSwiper,
        PsLabel,
        PsLabelHeader5,
        PsButton,
        PsRouteLink,
        PsIcon
    },
    props: {
        item_list_name: {
            type: String,
            default: 'dashboard_recent'
        },
        limit: {
            type: Number,
            default: 12
        },
        items: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        const psValueStore = PsValueStore();
        const loginUserId = psValueStore.getLoginUserId();
        const itemListProvider = useProductStore(props.item_list_name);

        const filteredItemList = ref([]);


        let title = '';
        switch (props.item_list_name) {
            case 'dashboard_recent':
                itemListProvider.paramHolder = new ProductParameterHolder().getLatestParameterHolder();
                title = 'home__fe_recently_added';
                break;
            case 'dashboard_popular':
                itemListProvider.paramHolder = new ProductParameterHolder().getPopularParameterHolder();
                title = 'dashboard__popular';
                break;
            case 'dashboard_discount':
                itemListProvider.paramHolder = new ProductParameterHolder().getDiscountParameterHolder();
                title = 'dashboard__discount';
                break;
        }
        itemListProvider.limit = props.limit;
        let params = itemListProvider.paramHolder.getUrlParamsAndQuery();


        onMounted(async () => {
            await itemListProvider.resetProductList(loginUserId, itemListProvider.paramHolder);
            // await itemListProvider.resetProductListProps(props.items);
            filteredItemList.value = itemListProvider.itemList?.data.filter(item => item?.vendor?.name == null || item?.vendor?.name == '');
        });

        return {
            title,
            itemListProvider,
            params,
            filteredItemList
        }
    }

}
</script>
