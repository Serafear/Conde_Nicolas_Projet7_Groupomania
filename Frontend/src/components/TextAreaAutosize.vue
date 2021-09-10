<template>
<!-- Autosize text area
    box-border utilisera la taille réelle padding inclu, 
    autrement dit il ignorera le padding-->
    <textarea 
    class="textarea box-border w-80 mt-4 ml-4 border border-black shadow-lg text-black" 
     rows="2"
     :name="name"
     :id="name"
     @input="$emit('update:modelValue', $event.target.value); resize($event)"
     :value="modelValue"
    > 
     </textarea>
     <!--:value va permettre de prendre en considération le v-model
     dans le parent. -->
</template>

<script>
export default {
    name:"TextAreaAutosize",
    props: {
        name: {
            required: true,
            type: String,
        },

        modelValue: {  //changed from value to modelValue for vue3
            required: false
        }
    },
    emits: ['update:modelValue'], //needed in vue3
    methods: {
        resize(e) {
            e.target.style.height = 'auto'
            e.target.style.height= `${e.target.scrollHeight}px`
        }
    }
}
</script>