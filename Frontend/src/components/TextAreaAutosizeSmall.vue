<template>
<!-- Autosize text area
    box-border utilisera la taille réelle padding inclu, 
    autrement dit il ignorera le padding
    <textarea 
    class="textarea box-border w-52 mt-4 border border-black shadow-lg text-black" 
     rows="1"
     :name="name"
     :id="name"
     @input="$emit('update:modelValue', $event.target.value); resize($event)"
     :value="modelValue"
    > 
     </textarea>
     :value va permettre de prendre en considération le v-model
     dans le parent. 
     -->
     <textarea 
    class="textarea box-border w-52 mt-4 border border-black shadow-lg text-black" 
     rows="1"
     :name="name"
     :id="name"
     @input="resize($event)" 
     @change="$emit('update:comment', $event.target.value)"
     :value="comment"
    > 
     </textarea>
</template>

<script>
export default {
    name:"TextAreaAutosizeSmall",
    props: {
        name: {
            required: true,
            type: String,
        },

        modelValue: {  //changed from value to modelValue for vue3
            required: false,
            
        },
        comment: {
            required: false,
            
        },
        modelModifiers: {
            default: () => ({})
    },
    commentModifiers: {
         default: () => ({})
    }
    },
    emits: ['update:modelValue','update:comment'], //needed in vue3
    methods: {
        resize(e) {
            e.target.style.height = 'auto'
            e.target.style.height= `${e.target.scrollHeight}px`
        },
       /* onChangeComment(e){
            let commentValue = e.target.value 
            if(this.commentModifiers){
                commentValue = commentValue
            }
            this.$emit('update:comment', commentValue)
        }*/
    }
}
</script>