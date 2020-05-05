<template>
	<div id="course">
		<h2>课程介绍</h2>
		<img src="./imgs/person.png" alt="person" />
		<p>
			{{introduce}}
			<span @click="to('/CourseIntroduce')">全文</span>
		</p>
		<div @click="go('/study')">
			<h3>{{courselearners}}</h3>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['courseintroduce', 'courselearners']),
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
    to (path) {
      this.$router.push(path)
    },
    go (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#course {
	position: absolute;
	top: 112px;
	left: 14px;
	width: 346px;
	height: 248px;
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
	}

	img {
		display: block;
		position: absolute;
		top: 33px;
		left: 11px;
	}

	p {
		position: absolute;
		top: 33px;
		right: 14px;
		width: 212px;
		height: 106px;
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
		left: 9px;
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
