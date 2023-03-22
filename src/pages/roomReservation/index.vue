<template>
  <CommonPage :navBarTitle="`${roomName}预约`">

  </CommonPage>
</template>

<script>
export default {
  name: "RoomReservation",
  data() {
    return {
      roomName: null
    }
  },
  onLoad({ roomName, roomId }) {
    this.roomName = roomName
    // todo 请求room预约数据
  }
}
</script>

<style>

</style>