<template>
  <div class="recycle">
    <div class="title">
      回收站
    </div>
    <div class="no-data" v-if="state.recycleItems.length == 0">暂无已删除的事项</div>
    <ritem v-for="item in state.recycleItems" :key="item.id" :item="item" @revert="revertItem"></ritem>

  </div>
</template>

<script>
  import ritem from '../components/ritem.vue'
  import dataUtils from '../utils/dataUtils'
  import {onMounted,reactive,watch} from 'vue'
  /**
   *  回收站页面组件
   */
  export default {
    name: 'recycle',// 组件的名称，尽量和文件名一致
    components: {
      ritem
    },

    setup(){
      const state = reactive({
        recycleItems: []// 已删除事项的列表
      })

      /**
       * 从存储中获取已删除事项数据
       */
      function fetchData() {
        state.recycleItems = dataUtils.getItem('recycleList') || []
      }
      /**
       * 恢复事项
       */
      function revertItem(obj) {
        // 创建一个新数组
        let newArray = []
        // 将需要恢复的事项从已删除事项列表中剔除
        state.recycleItems.forEach((item) =>{
          if (item.id != obj.id) {
            newArray.push(item)
          }
        })
        // 赋值新数组
        state.recycleItems = newArray

        window.mitt.emit('addRevert', obj)
      }
      /**
       * 存储已删除事项列表
       */
      function storeItems(array) {
        dataUtils.setItem('recycleList', array)
      }

      watch(
        () => state.recycleItems,
        (val, oldVal) => {
          storeItems(val)// 一旦有改动立刻调用更新存储
        }
      )

      onMounted(()=>{
        window.mitt.on('addDelete', (obj) =>{
          let array = []
          // 复制原有数组内容
          state.recycleItems.forEach((item)=> {
            array.push(item)
          })

          array.push(obj)
          state.recycleItems = array
        })
        fetchData()
      })

      return {
        state,
        revertItem
      }

    }

  }
</script>
<style>
  .recycle .title {
    font-size: 24px;
    font-weight: 600;
    line-height: 27px;
    margin-bottom: 24px;
    text-align: center;
  }

  .recycle .no-data {
    text-align: center;
  }
</style>
