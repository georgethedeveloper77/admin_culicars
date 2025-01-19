<template>
    <div class="w-full flex sm:justify-between flex-col md:flex-row gap-4">
        <div class="overflow-x-auto">
            <div class="flex ">
                <ps-label @click="changeOrderStatus(0)"
                    :textColor="[navThemes, activeStatus==0 ? 'border-fePrimary-500 text-fePrimary-500' : 'dark:border-feAchromatic-700 text-feAchromatic-800 dark:text-feAchromatic-400']">
                    {{ $t('core_fe__all') }}
                    <ps-label textColor="w-5 h-5 text-feAchromatic-800 dark:text-feAchromatic-400 rounded-full bg-feAchromatic-200 dark:bg-feAchromatic-700 flex items-center justify-center">{{ orderHistoryList.allOrderCount }}</ps-label>
                </ps-label>

                <ps-label @click="changeOrderStatus(PsConst.OrderPendingStatus)"
                    :textColor="[navThemes, activeStatus==PsConst.OrderPendingStatus ? 'border-fePrimary-500 text-fePrimary-500' : 'dark:border-feAchromatic-700 text-feAchromatic-800 dark:text-feAchromatic-400']">
                    {{ $t('core_fe__pending') }}
                    <ps-label textColor="w-5 h-5 text-feAchromatic-800 dark:text-feAchromatic-400 rounded-full bg-feAchromatic-200 dark:bg-feAchromatic-700 flex items-center justify-center">{{ orderHistoryList.pendingOrderCount }}</ps-label>
                </ps-label>

                <ps-label @click="changeOrderStatus(PsConst.OrderApprovedStatus)"
                    :textColor="[navThemes, activeStatus==PsConst.OrderApprovedStatus ? 'border-fePrimary-500 text-fePrimary-500' : 'dark:border-feAchromatic-700 text-feAchromatic-800 dark:text-feAchromatic-400']">
                    {{ $t('core_fe__approved') }}
                    <ps-label textColor="w-5 h-5 text-feAchromatic-800 dark:text-feAchromatic-400 rounded-full bg-feAchromatic-200 dark:bg-feAchromatic-700 flex items-center justify-center">{{ orderHistoryList.approvedOrderCount }}</ps-label>
                </ps-label>

                <ps-label @click="changeOrderStatus(PsConst.OrderDeliveringStatus)"
                    :textColor="[navThemes, activeStatus==PsConst.OrderDeliveringStatus ? 'border-fePrimary-500 text-fePrimary-500' : 'dark:border-feAchromatic-700 text-feAchromatic-800 dark:text-feAchromatic-400']">
                    {{ $t('core_fe__delivering') }}
                    <ps-label textColor="w-5 h-5 text-feAchromatic-800 dark:text-feAchromatic-400 rounded-full bg-feAchromatic-200 dark:bg-feAchromatic-700 flex items-center justify-center">{{ orderHistoryList.deliveringOrderCount }}</ps-label>
                </ps-label>

                <ps-label @click="changeOrderStatus(PsConst.OrderDeliveredStatus)"
                    :textColor="[navThemes, activeStatus==PsConst.OrderDeliveredStatus ? 'border-fePrimary-500 text-fePrimary-500' : 'dark:border-feAchromatic-700 text-feAchromatic-800 dark:text-feAchromatic-400']">
                    {{ $t('core_fe__delivered') }}
                    <ps-label textColor="w-5 h-5 text-feAchromatic-800 dark:text-feAchromatic-400 rounded-full bg-feAchromatic-200 dark:bg-feAchromatic-700 flex items-center justify-center">{{ orderHistoryList.deliveredOrderCount }}</ps-label>
                </ps-label>
            </div>
        </div>

        <div class="" >
            <ps-dropdown horizontalAlign="right" class='lg:mt-2 mt-1  md:w-full dark:bg-feAchromatic-800'
                >
                <template #select>
                    <ps-dropdown-select :showCenter="true" :selectedValue="$t(activeSortingName)" />
                </template>
                <template #list>
                    <div class="rounded-md shadow-xs w-56 pt-2 z-30">
                        <div v-for="sort in sortingArr" :key="sort.id"
                            class="w-72 flex py-4 px-2 hover:bg-fePrimary-50 dark:hover:bg-feSecondary-500 cursor-pointer items-center"
                            @click="orderingFilterClicked(sort)">
                            <ps-label class="ms-2"
                                :class="sort.id == activeSortingArrId ? ' font-medium' : 'font-light'">
                                {{ $t(sort.title) }} </ps-label>
                        </div>
                    </div>
                </template>
            </ps-dropdown>
        </div>
    </div>
</template>

<script>
import { onMounted, onUnmounted, ref, defineComponent, computed} from 'vue';
import PsConst from '@templateCore/object/constant/ps_constants'

import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import PsRouteLink from '@template1/vendor/components/core/link/PsRouteLink.vue';
import PsDropdown from '@template1/vendor/components/core/dropdown/PsDropdown.vue';
import PsDropdownSelect from '@template1/vendor/components/core/dropdown/PsDropdownSelect.vue';

    export default defineComponent({
        name: 'OrderListNavBar',
        components: {
            PsLabel,
            PsRouteLink,
            PsDropdown,
            PsDropdownSelect
        },
        props: {
            orderHistoryList: Object,
        },
        setup(props, {emit}) {
            const activeStatus = ref(0);
            const activeSort = ref({
                id: 0,
                title: "core_fe__most_recent",
                orderBy: "added_date",
                type: 'desc'
            });
            const navThemes = 'px-3 py-2 flex gap-3 items-center cursor-pointer border-b-4';
            const sortingArr = [
                {
                    id: 0,
                    title: "core_fe__most_recent",
                    orderBy: "added_date",
                    type: 'desc'
                },
                {
                    id: 1,
                    title: "core_fe__oldest",
                    orderBy: "added_date",
                    type: 'asc'
                },
                {
                    id: 2,
                    title: "core_fe__price_high_to_low",
                    orderBy: "total_price",
                    type: 'desc'
                },
                {
                    id: 3,
                    title: "core_fe__price_low_to_high",
                    orderBy: "total_price",
                    type: 'asc'
                }
            ];
            const activeSortingArrId = ref(0);
            const activeSortingName = ref('core_fe__most_recent');

            function changeOrderStatus(status){
                activeStatus.value = status;
                emit('changeOrderStatus', status, activeSort.value);
            }

            function orderingFilterClicked(sort){
                activeSort.value = sort;
                activeSortingName.value = sort.title;
                emit('changeOrderStatus', activeStatus.value, sort);
            }

            return {
                sortingArr,
                activeSortingArrId,
                changeOrderStatus,
                activeStatus,
                orderingFilterClicked,
                activeSortingName,
                PsConst,
                navThemes
            }
        }
    })
</script>
