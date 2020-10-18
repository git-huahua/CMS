<template>
  <div>
    <div id="broadcast">
      <div class="login-box animate__animated animate__bounceInDown">
        <h2>{{loginName}}</h2>
        <form>
          <div class="user-box">
            <a-form-model
              :model="form"
              :label-col="labelCol"
              :wrapper-col="wrapperCol"
              :rules="rules"
              ref="ruleForm"
            >
              <a-form-model-item label="用户名" prop="username">
                <a-input v-model="form.username" />
              </a-form-model-item>
              <a-form-model-item label="密码" prop="pwd">
                <a-input v-model="form.pwd" type="password" />
              </a-form-model-item>
            </a-form-model>
          </div>
          <a href="#" @click="login">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
             登录
          </a>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import "~a/js/particles.js";
import 'animate.css/animate.css'
export default {
  data() {
    return {
      loginName:process.env.VUE_APP_NAME,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      form: {
        username: "",
        pwd: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 5, message: "长度需在1~5位之间", trigger: "blur" },
        ],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let { data:{success} } = await this.$post("/user/login", {
                username: this.form.username,
                pwd:this.$encrypt(this.form.pwd)
          });
          //将this.form中的密码传到this.$encrypt方法中加密传给后台，this.$encrypt中如何加密由后端决定       
          if (success) {
              sessionStorage.setItem(this.KEY_WORDS.SESSION_NAME,this.form.username) 
              //先存，否则先跳转路由再存，路由跳转了，还没存，导致判断为未登录状态，还在login页面
              this.$router.push('/home')
              this.$welcomeMsg()             
          }
        }
      });
    },
  },
  mounted() {
    particlesJS("broadcast", {
      particles: {
        color: "#4b6eaf",
        shape: "circle", // "circle", "edge" or "triangle"
        opacity: 1,
        size: 4,
        size_random: true,
        nb: 50,
        line_linked: {
          enable_auto: true,
          distance: 100,
          color: "#4b6eaf",
          opacity: 1,
          width: 1,
          condensed_mode: {
            enable: false,
            rotateX: 600,
            rotateY: 600,
          },
        },
        anim: {
          enable: true,
          speed: 1,
        },
      },
      interactivity: {
        enable: true,
        mouse: {
          distance: 250,
        },
        detect_on: "canvas", // "canvas" or "window"
        mode: "grab",
        line_linked: {
          opacity: 0.5,
        },
        events: {
          onclick: {
            enable: true,
            mode: "push", // "push" or "remove" (particles)
            nb: 4,
          },
        },
      },
      /* Retina Display Support */
      retina_detect: true,
    });
  },
};
</script>

<style lang='scss'>
#broadcast {
  background: linear-gradient(#141e30, #243b55);
  width: 100vw;
  height: 100vh;
}
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
.ant-form label {
  color: #fff;
}
.login-box {
  position: absolute;
  top: 20%;
  left: 35%;
  width: 400px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
  }
  form {
    text-align: center;
    a {
      position: relative;
      display: inline-block;
      padding: 10px 20px;
      color: #03e9f4;
      font-size: 16px;
      text-decoration: none;
      text-transform: uppercase;
      overflow: hidden;
      transition: 0.5s;
      margin-top: 40px;
      letter-spacing: 4px;
      &:hover {
        background: #03e9f4;
        color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
          0 0 100px #03e9f4;
      }
      span {
        position: absolute;
        display: block;
        &:nth-child(1) {
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #03e9f4);
          animation: btn-anim1 1s linear infinite;
        }
        &:nth-child(2) {
          top: -100%;
          right: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, transparent, #03e9f4);
          animation: btn-anim2 1s linear infinite;
          animation-delay: 0.25s;
        }
        &:nth-child(3) {
          bottom: 0;
          right: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(270deg, transparent, #03e9f4);
          animation: btn-anim3 1s linear infinite;
          animation-delay: 0.5s;
        }
        &:nth-child(4) {
          bottom: -100%;
          left: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(360deg, transparent, #03e9f4);
          animation: btn-anim4 1s linear infinite;
          animation-delay: 0.75s;
        }
      }
    }
  }
}
@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}
@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}
</style>

