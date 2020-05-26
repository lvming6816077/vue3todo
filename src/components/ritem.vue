<template>
  <div class="recycle-item" :class="{completed:item.isCompleted}">
    <div class="item-checkbox">
      <input type="checkbox" class="checkbox" disabled="disabled">
    </div>
    <div class="item-content">
      <div class="break-all">{{item.content}}</div>
    </div>
    <div class="item-revert" @click="revertItem" title="恢复"></div>
  </div>
</template>

<script>
  
  /**
   * 单条已删除事项组件
   */
  export default {
    name: 'rtime',
    props: {
      item: {
        type: Object // 接收父组件传递的事项数据
      }
    },
    setup(props,context){

      function revertItem() {

        context.emit('revert', this.item)
      }

      return {
        revertItem
      }
    }
  }
</script>

<style>
  .recycle-item {
    display: flex;/* 设置弹性布局 */
    align-items: center;/* 设置内容交叉轴方向居中 */
    margin-bottom: 16px;/* 设置外下边距 */
    background: #fff;/* 设置背景颜色 */
    padding: 10px;/* 设置内边距 */
    border-radius: 5px;/* 设置圆角样式 */
    position: relative;/* 设置相对定位，让.item-delete绝对定位参照 */
  }

  .recycle-item.completed {/* 当被标记为完成时的样式 */
    text-decoration: line-through;/* 设置字体中划线 */
    opacity: .5;/* 设置透明度 */
  }

  .item-content {
    flex: 1;/* 撑满剩余位置 */
    padding-left: 10px;/* 设置左边距 */
    padding-right: 30px;/* 设置右边距 */
  }

  .item-revert {
    cursor: pointer;
    width: 25px;
    height: 25px;
    background-image: url('./revert.png');/* 设置背景图片 */
    background-size: 60% 60%;/* 设置背景尺寸 */
    background-repeat: no-repeat;/* 设置背景不重复 */
    background-position: center;/* 设置背景位置 */
    border-radius: 50%;/* 设置div为圆形 */
    position: absolute;/* 设置绝对定位 */
    right: 11px;
  }


  .item-revert:hover {
    background-color: #dbdbdb;/* 设置鼠标移入时背景颜色为#dbdbdb */
  }
</style>
