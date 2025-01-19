<template>
    <ps-content-container>
        <template #content>
            <div class="sm:mt-32 lg:mt-36 mt-28 mb-6">
                <div class="flex flex-col sm:flex-row mb-6">
                    <div class="flex flex-row sm:mt-0 mt-6">
                        <ps-breadcrumb-2 :items="breadcrumb" />
                    </div>
                </div>
                <ps-label textColor="text-2xl font-semibold text-feAchromatic-800 dark:text-feAchromatic-50 mb-6">{{ $t('core_fe__my_orders') }}</ps-label>

                <order-list-nav-bar-vue :orderHistoryList="orderHistoryList" @changeOrderStatus="changeOrderStatus"/>

                <div class="mt-4" v-for="(orderHistory,index) in orderHistoryList.orderHistory" :key="index">
                    <order-item :order="orderHistory"/>
                </div>

                <div class="flex flex-col  sm:flex-row sm:justify-between sm:items-center mt-5 sm:mt-6 lg:mt-8 gap-4">
                    <ps-label class="text-secondary-600 text-base font-normal " >
                        {{ $t('core__be_table_showing') }}
                        {{ " " }}
                        <span class="font-medium">{{ orderHistoryList?.meta?.total > 0 ? ( orderHistoryList?.meta?.current_page - 1) *  orderHistoryList?.meta?.per_page + 1 : 0 }}</span>
                        {{ " " }}
                        {{ $t('core__be_table_to') }}
                        {{ " " }}
                        <span class="font-medium">{{
                                orderHistoryList?.meta?.current_page * orderHistoryList?.meta?.per_page > orderHistoryList?.meta?.total ? orderHistoryList?.meta?.total :  orderHistoryList?.meta?.current_page * orderHistoryList?.meta?.per_page
                        }}</span>
                        {{ " " }}
                        {{ $t('core__be_table_of') }}
                        {{ " " }}
                        <span class="font-medium">{{ orderHistoryList?.meta?.total }}</span>
                        {{ " " }}
                        {{ $t('core__be_table_entries') }}
                    </ps-label>

                    <div class="sm:mt-4 flex justify-center align-middle  rtl:space-x-reverse space-x-1"  >
                        <span v-for="(link,index) in orderHistoryList?.meta?.links" :key="index" class="h-8 rounded bg-white dark:bg-secondaryDark-black">
                            <div class="flex">
                                <ps-button v-if="index == 0"  hover="" focus="" @click="getOrderHistory(index)"
                                    colors="bg-background dark:text-feAchromatic-50 dark:bg-backgroundDark hover:bg-secondary-100" class="mt-0.5 "
                                    padding="py-2 px-2"
                                    border="border border-feAchromatic-200 dark:border-feAchromatic-700 ">
                                    <ps-icon class="block rtl:hidden" name="doubleArrowLeft" w="16" h="16"  />
                                    <ps-icon class="hidden rtl:block" name="doubleArrowRight" w="16" h="16"  />
                                </ps-button>

                                <ps-button v-else-if="index == Object.keys(orderHistoryList?.meta?.links).length -1" @click="getOrderHistory(orderHistoryList?.meta?.last_page)"
                                    colors="bg-background dark:text-feAchromatic-50 dark:bg-backgroundDark hover:bg-secondary-100" class="mt-0.5 "
                                    padding="py-2 px-2"  hover="" focus=""
                                    border="border border-feAchromatic-200  dark:border-feAchromatic-700">
                                    <ps-icon class="block rtl:hidden" name="doubleArrowRight" w="16" h="16"  />
                                    <ps-icon class="hidden rtl:block" name="doubleArrowLeft" w="16" h="16"  />
                                </ps-button>

                                <ps-button v-else rounded="rounded dark:text-feAchromatic-50" @click="getOrderHistory(link.label)" :border="link.active ? 'border border-fePrimary-500 rounded' : 'border border-secondary-200  dark:border-feAchromatic-700 rounded'"
                                    :colors="link.active ? 'bg-fePrimary-500 dark:bg-fePrimary-500 text-white dark:text-feAchromatic-50' : 'bg-background dark:bg-backgroundDark hover:bg-secondary-100 dark:hover-bg-fePrimary-600'" hover=""
                                    padding='py-2 px-4'
                                    >
                                    {{link.label}}
                                </ps-button>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </ps-content-container>
</template>

<script>
import { onMounted, onUnmounted, ref, defineComponent, computed} from 'vue';
import { router } from '@inertiajs/vue3';
import { trans } from 'laravel-vue-i18n';

import PsContentContainer from '@template1/vendor/components/layouts/container/PsContentContainer.vue';
import PsFrontendLayout from '@template1/vendor/components/layouts/container/PsFrontendLayout.vue';
import PsBreadcrumb2 from "@template1/vendor/components/core/breadcrumbs/PsBreadcrumb2.vue";
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import OrderListNavBarVue from './components/OrderListNavBar.vue';
import OrderItem from '@template1/vendor/components/modules/order/OrderItem.vue';
import PsButton from '@template1/vendor/components/core/buttons/PsButton.vue';
import PsIcon from '@template1/vendor/components/core/icons/PsIcon.vue';

import { useOrderHistoryStore } from '@templateCore/store/modules/orderHistory/OrderHistoryStore'
import { PsValueStore } from "@templateCore/store/modules/core/PsValueStore";

    export default defineComponent({
        name: 'OrderList',
        components: {
            PsContentContainer,
            PsBreadcrumb2,
            PsLabel,
            OrderListNavBarVue,
            OrderItem,
            PsButton,
            PsIcon
        },
        layout: PsFrontendLayout,
        setup(){
            const orderHistoryStore = useOrderHistoryStore();
            const paramHolder = orderHistoryStore.holder;

            const psValueStore = PsValueStore();
            const loginUserId = psValueStore.getLoginUserId();

            const orderHistoryList = ref([]);
            const orderStatus = ref();

            const breadcrumb = computed(() => {
                return [
                    {
                        label: trans('ps_nav_bar__home'),
                        url: route('dashboard')
                    },
                    {
                      label: trans('core_fe__my_orders'),
                      color: "text-fePrimary-500"
                    }
                ];
            });

            onMounted(async() => {
                resetOrderHistory();
            });

            function changeOrderStatus(status, sort){
                // console.log(sort);
                paramHolder.orderStatus = status;
                paramHolder.orderBy = sort.orderBy;
                paramHolder.orderType = sort.type;
                paramHolder.page = 1;
                resetOrderHistory()
            }

            function getOrderHistory(page){
                paramHolder.page = page;
                resetOrderHistory();
            }

            async function resetOrderHistory(){
                await orderHistoryStore.resetOrderHistoryList(loginUserId, paramHolder);
                orderHistoryList.value = orderHistoryStore.orderHistoryList?.data;
                // console.log(orderHistoryList.value);
            }

            return {
                breadcrumb,
                orderHistoryStore,
                orderHistoryList,
                getOrderHistory,
                changeOrderStatus,
            }
        }
    })
</script>
