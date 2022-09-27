import {getTrackInfo} from "@/api/match/track/track";
import {reactive, toRefs} from "vue";

const options = reactive({
    optionsTrack: [],
    optionsGroup: [],
    optionsCategory: [],
})

const {optionsTrack, optionsGroup, optionsCategory} = toRefs(options);

function trackChange(val) {
    optionsTrack.value.forEach(option => {
        if (option.id === val) {
            optionsGroup.value = option.children[0].children
            optionsCategory.value = option.children[1].children
        }
    })
}

getTrackInfo().then(res => {
    optionsTrack.value = res.data
})


export default {
    trackChange,
    optionsTrack,
    optionsGroup,
    optionsCategory
}
