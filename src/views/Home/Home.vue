<template>
  <div>
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <Course/>
    <Activity>
      <div class="top" slot="top">
        <span class="icon1"></span>
        <span class="icon2"></span>
        <h2>活动内容</h2>
        <span class="more">查看更多</span>
        <span class="iconfont icon-right btn"></span>
      </div>
    </Activity>
    <Teachers/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header/Header'
import Course from '../../components/Home/Course/Course'
import Activity from '../../components/Home/Activity/Activity'
import Teachers from '../../components/Home/Teachers/Teachers'

export default {
  components: {
    Header,
    Course,
    Activity,
    Teachers
  }
}
</script>
