<template>
        <div class="modal" :class="{sale: theme === 'sale'}">
            <h1>{{ header }}</h1>
            <p>{{ text }}</p>
        </div >
</template>

<script>
    export default {
        props: ['header', 'text'],
    }

</script>

<style>
.modal{
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
}

.backdrop{
    top:0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}

.modal h1 {
    color: #03cfb4;
    border: none;
    padding: 0;
}

.modal p {
    font-style: normal;
}
</style>