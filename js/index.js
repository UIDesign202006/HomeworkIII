/**
* index.js
* @author Simon
* @description 
* @created 2020-06-06T12:07:56.038Z+08:00
* @copyright None 
* None
* @last-modified 2020-06-10T18:17:20.443Z+08:00
*/

//console.log(Vue)


Vue.component('my-cart', {
    data: function() {
        return {
            count: 1
        }
    },
    template: `
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
    `,
});

let app = new Vue({
    el:"#app",
    // Model
    data:{
        // 商品列表
        list: [
            {
                id: 1,
                name: '宽松棉服羊羔绒外套',
                price: 168.00,
                img:'http://pic.616pic.com/ys_b_img/00/46/64/I4P0zom0qY.jpg',
                count: 1
            },
            {
                id: 2,
                name: '高细跟女靴',
                price: 104.00,
                img:'http://pic.616pic.com/ys_b_img/00/65/84/pCdRTMup6Q.jpg',
                count: 1
            },
            {
                id: 3,
                name: '佳能 EF 400mm f',
                price: 41000.00,
                img: 'http://pic.616pic.com/ys_bnew_img/00/03/70/UG3bRQWf3F.jpg',
                count: 1
            },
            {
                id: 1,
                name: '意式极简真皮沙发',
                price: 4782.40,
                img:'http://pic.616pic.com/ys_bnew_img/00/13/96/EWtjew9cas.jpg',
                count: 1
            },
        ],
        // 计算总价
        checkList: []
    },
    mounted: function() {
        // 默认将 List 全选
        this.checkAll();
        this.checkAllElement(document.querySelector(".checkAll"));
    },
    computed: {
        
        // 计算总价
        
        totalPrice: function () {
            var total = 0;
            for (var i = 0; i < this.checkList.length; i++) {
                var item = this.checkList[i];
                total += item.price * item.count;
            }

            // 将 total 返回输出  -->  toLocaleString 进行四舍五入
            return total.toLocaleString();
        }
    },
    methods: {
        
        // 减少 count
        reduceCount: function (index) {
            if (this.list[index].count === 1){
                return;
            }
            app.list[index].count--;
        },

        // 增加 count
        addCount: function (index) {
            app.list[index].count++;
        },

        // Rmove Prodects
        remove: function(index) {
            console.log("remove-index:" + index);
            
            // 一次删除一个
            this.list.splice(index, 1);
            // 获取商品序号
            var id = index + 1;
            // Remove
            var $checkList = this.checkList;
            for (var i = 0; i < $checkList.length; i++) {
                var item = $checkList[i];
                // 序号匹配
                if (item.id == id) {
                    // Delete
                    $checkList.splice(i, 1);
                }
            }
        },

        // 全选 or 都不选
        checkAllOrNot: function(event) {
            // 全选
            if (event.target.checked) {
                this.checkAll();
                console.log("checkList：" + this.checkList);
            } 
            // 都不选
            else {
                console.log("All Not");
                this.checkInItems('noCheckAll');
                // 清空数组
                this.checkList.splice(0);
            }
        },
        
        // 全选
        checkAll: function() {
            console.log("全选");
            this.checkInItems('checkAll');
            //复制商品列表
            this.checkList = this.list.concat();
        },

        // 判断是否全选
        checkInItems: function(type) {
            var items = document.querySelectorAll('.checkItem');
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (type === 'checkAll') {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            }
        },

        // 勾选或不勾选
        checkItem: function(event, index) {
            console.log("checkItem");
            var element = event.target;
            var $allCheck = document.querySelector(".checkAll");
            //勾选，加入已选择列表
            if (element.checked) {
                this.checkList.push(this.list[index]);
                this.checkAllElement($allCheck);
            } 
            //不勾选，从已选择列表中去除
            else {
                this.checkList.splice(index, 1);
                $allCheck.checked = false;
            }
        },

        // 若勾选全选框
        checkAllElement: function (element) {
            //如果所有的商品都已被勾选，则勾选全选框
            
            if (this.checkList.length == this.list.length) {
                element.checked = true;
            }
        },

        add() {
            this.my-cart.push();
        }
    },
    
})