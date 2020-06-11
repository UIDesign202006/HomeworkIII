<template>
    <tr>
        <td>
            <input id="checkAll" type="checkbox" class="checkAll" @click="checkAllOrNot($event)">
        </td>
        <td>
            --
        </td>
        <td>
            宽松棉服羊羔绒外套
        </td>
        <td>
            <img src="http://pic.616pic.com/ys_b_img/00/46/64/I4P0zom0qY.jpg">
        </td>
        <td>
            $ 168.00
        </td>
        <td>
            <button @click="count--" :disabled="count === 1"> - </button>
            <!-- price -->
            {{count}}
            <button @click="count++"> + </button>
        </td>
        <td>
            <button @click="remove(index)"> Remove </button>
        </td>
    </tr>
</template>

<script>
export default {
    name:"my-cart",
    props: {
        count: 1
    }
}
</script>

<style>

</style>