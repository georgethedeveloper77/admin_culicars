<template>
    <div class="text-center cursor-pointer w-full overflow-hidden bg-feAchromatic-50 border border-feAchromatic-100 dark:border-feAchromatic-700
                 dark:bg-feSecondary-800 rounded-x sm:rounded-xl lg:rounded-lg hover:shadow-md">

         <div class="h-44 relative flex justify-center">

            <!-- <img class="transform transition duration-500 hover:scale-110 w-full h-full object-cover"
                 v-lazy="{ src: $page.props.thumb2xUrl + '/' + category.defaultPhoto.imgPath,
                     error: $page.props.sysImageUrl+'/default_photo.png' }"
                 alt=""> -->
            <ps-lazy-image
                class="transform transition duration-500 hover:scale-110 w-full h-full object-cover"
                :src="$page.props.thumb2xUrl + '/' + category.defaultPhoto.imgPath"
                :srcPlaceholder="$page.props.thumb1xUrl + '/' + category.defaultPhoto.imgPath"
                :error="$page.props.sysImageUrl+'/default_photo.png'"
            />

             <div class="w-14 h-14 absolute -bottom-7 bg-feAchromatic-50 p-3 items-center
                         rounded-full border-2 border-white dark:bg-feSecondary-800 shadow-md">

                 <!-- <img alt="Placeholder"
                     class="w-7 h-7 transform transition duration-500 hover:scale-110 object-contain"
                     v-lazy=" { src: $page.props.thumb2xUrl + '/' + category.defaultIcon.imgPath,
                         error: $page.props.sysImageUrl+'/default_photo.png' }"> -->
                    <ps-lazy-image
                        class="w-7 h-7 transform transition duration-500 hover:scale-110 object-contain"
                        :src="$page.props.thumb1xUrl + '/' + category.defaultIcon.imgPath"
                        :srcPlaceholder="$page.props.thumb1xUrl + '/' + category.defaultIcon.imgPath"
                        :error="$page.props.sysImageUrl+'/default_photo.png'"
                    />

             </div>

         </div>

         <ps-label class="h-20 pt-9 lg:text-base sm:text-sm text-base font-medium"
             textColor="">
                 {{ category.catName.length > 20 ? category.catName.slice(0,20)+'...' : category.catName }}
         </ps-label>

     </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PsLabel from '@template1/vendor/components/core/label/PsLabel.vue';
import Category from "@templateCore/object/Category";
import PsLazyImage from '@template1/vendor/components/core/image/PsLazyImage.vue';

 export default defineComponent ({
     name : "CategoryHorizontalItem",
     props : {
         category : { type : Category } ,
     },
     components : {
        PsLabel,
        PsLazyImage
     }
 });
 </script>
