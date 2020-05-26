<template>
  <div class="todo-item" :class="{completed:state.isCompleted}">
    <div class="item-checkbox">
      <input type="checkbox" class="checkbox" v-model="state.isCompleted">
    </div>
    <div class="item-content">{{item.content}}</div>
    <div class="item-delete" @click="deleteItem" title="删除"></div>
  </div>
</template>

<script>
  import {reactive,watch} from 'vue'
  /**
   * 单条事项组件
   */
  export default {
    name: 'titem',
    props: {
      item: { // 接收父组件传递的事项数据
        type: Object
      }
    },
    setup(props,context){
      const state = reactive({
        item: props.item,
        isCompleted: props.item.isCompleted || false// 默认从事项数据中获取，否则为false
      })

      function deleteItem() {

        context.emit('delete', state.item)
      }

      // 使用监听属性监听isCompleted改变
      watch(
        () => state.isCompleted,
        (val, oldVal) => {

          state.item.isCompleted = val
          // 通知父组件更改事项的状态数据
          context.emit('complete', state.item)
        }
      )


      return {
        state,
        deleteItem
      }
    }
  }
</script>

<style>
  .todo-item {
    display: flex;/* 设置弹性布局 */
    align-items: center;/* 设置内容交叉轴方向居中 */
    margin-bottom: 16px;/* 设置外下边距 */
    background: #fff;/* 设置背景颜色 */
    padding: 10px;/* 设置内边距 */
    border-radius: 5px;/* 设置圆角样式 */
    position: relative;/* 设置相对定位，让.item-delete绝对定位参照 */
  }

  .todo-item.completed {/* 当被标记为完成时的样式 */
    text-decoration: line-through;/* 设置字体中划线 */
    opacity: .5;/* 设置透明度 */
  }

  .item-checkbox .checkbox {
    cursor: pointer;
  }

  .item-content {
    flex: 1;/* 撑满剩余位置 */
    padding-left: 10px;/* 设置左边距 */
    padding-right: 30px;/* 设置右边距 */
  }

  .item-delete {
    cursor: pointer;
    width: 25px;
    height: 25px;
    background-image: url('./delete.png');/* 设置背景图片 */
    background-size: 60% 60%;/* 设置背景尺寸 */
    background-repeat: no-repeat;/* 设置背景不重复 */
    background-position: center;/* 设置背景位置 */
    border-radius: 50%;/* 设置div为圆形 */
    position: absolute;/* 设置绝对定位 */
    right: 11px;
  }

  .item-delete:hover {/* 设置鼠标移入时背景颜色为#dbdbdb */
    background-color: #dbdbdb;
  }
</style>
