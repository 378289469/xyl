<template>
	<div id="course">
		<h2>课程介绍</h2>
		<img src="./imgs/cover.png" alt="person" />
		<p>
			{{introduce}}
			<span @click="to('CourseIntroduce')">全文</span>
    </p>
		<!-- <div @click="to('Study', {}, token)">
			<h3>{{courselearners}}</h3>
		</div> -->
	</div>
</template>

<script>
import { mapState } from 'vuex'
import routerMain from '../../../router/main.js'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['courseintroduce', 'courselearners']),
    token () {
      return this.$api.getStorage('userinfo')
    },
    introduce () {
      const { courseintroduce } = this
      let introduce = ''
      try {
        introduce = courseintroduce.replace(/<\/?.+?>/g, '')// 去掉所有html标签
        introduce = introduce.replace(/&\/?.+?;/g, '')// 去掉转义符
        introduce = introduce.slice(0, 65)// 提取前65字符
      } catch (error) {}
      return introduce
    }
  },
  methods: {
    ...routerMain
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#course {
	width: 90%;
	height: 25%;
	background: url('./imgs/bg.png') no-repeat;

	h2 {
		position: absolute;
		top: -22px;
		left: 0;
		bottom: 0;
		right: 0;
		margin: 0 auto;
		width: 127px;
		height: 44px;
		background: url('./imgs/title.png') no-repeat;
		color: white;
		font-size: 20px;
		line-height: 52px;
    text-align center;
	}

	img {
		display: block;
		position: absolute;
    width: 30%
		top: 33px;
		left: 11px;
	}

	p {
		position: absolute;
		top: 33px;
		right: 14px;
    width: 60%;
    height: 20%;
		color: #333333;
		text-align: left;
		font-size: 14px;
		line-height: 22px;

		span {
			color: #914800;
		}
	}

	div {
		position: absolute;
		left: 50%;
    transform: translateX(-50%)
		bottom: 2px;
		width: 329px;
		height: 88px;
		background: url('./imgs/study.png');

		h3 {
			position: absolute;
			left: 182px;
			top: 45px;
			color: #3D0804;
		}
	}
}
</style>
