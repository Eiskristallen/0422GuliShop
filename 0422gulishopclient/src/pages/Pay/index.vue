<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              $route.query.orderNo
            }}</em></span
          >
          <span class="fr"
            ><em class="lead">应付金额：</em
            ><em class="orange money">{{ paymentInfor.totalFee }}</em></span
          >
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>
          支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）
        </h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a href="javascript:; " class="btn" @click.prevent="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode';
export default {
  name: 'Pay',
  data() {
    return {
      paymentInfor: {},
      paymentState: 0,
    };
  },
  mounted() {
    this.getPayInfor();
  },

  methods: {
    //点击支付
    async pay() {
      /* 
      1.生成二维码
      2.弹出消息框,展示二维码图片
      3.创建定时器,一直发送请求去后台讯问支付状态
      4.根据定时器发送请求的结果判断,是否支付成功,如果支付成功则清除定时器和定时器的变量
      5.在messagebox里面写上beforeClose,在用户单击支付成功关闭支付弹窗之前,判断状态是否为成功的状态
      6.如果为成功状态,则清除定时器和定时器变量然后关闭弹窗并且跳转去支付成功页面(当状态为成功,定时器会自动判断并且清除自己),如果没成功,则保持弹窗并且不清除定时器
      7.如果点击取消,清除定时器和定时器变量
      
      
      */
      // With promises
      let wechatPayQR;
      try {
        //转换二维码,吧转换成功的图片地址赋值,下面可以使用
        wechatPayQR = await QRCode.toDataURL(this.paymentInfor.codeUrl);
      } catch (error) {
        this.$message.error('转换二维码失败,确认你的地址');
      }

      //拿取生成二维码图片的路径,然后丢到下面的html标签里面
      this.$alert(`<img src="${wechatPayQR}"/>`, '请使用微信扫码支付', {
        dangerouslyUseHTMLString: true,
        showClose: false,
        showCancelButton: true,

        confirmButtonText: '我已经成功支付',
        cancelButtonText: '支付遇到问题',
        center: true,
        beforeClose: (action, instance, done) => {
          //关闭之前的回调
          //如果不写这个回调,无论点击什么按钮,meessagebox都会强制关闭,如果写了,那么消息盒子的关闭由我们控制
          if (action === 'confirm') {
            this.paymentState === 200
              ? done()
              : this.$message.warning('没支付');
          } else if (action === 'cancel') {
            this.$message('联系管理员');
            //清除定时器
            clearInterval(this.timer);
            //不清楚这个timer,以后就没有办法创建新的定时器
            this.timer = null;
            done();
          }
        },
      })
        .then(() => {
          // if (!this.paymentState === 205) return;
          // this.$router.push('/PaySuccess');
        })
        .catch(() => {});

      //用定时器发送请求
      if (!this.timer) {
        this.timer = setInterval(async () => {
          const result = await this.$Api.reqPaymentState(
            this.paymentInfor.orderId
          );

          if (result.code === 200) {
            //成功后,清除定时器,保存当前状态(以便用户点击我已成功支付的时候去判断)
            this.paymentState = 200;
            this.$message('支付成功');
            //清除定时器
            clearInterval(this.timer);
            //不清楚这个timer,以后就没有办法创建新的定时器
            this.timer = null;
            this.$msgbox.close();
            this.$router.push('/PaySuccess');
          } else if (result.code === 205) {
            this.paymentState = 205;
          } else if (result.code === 201) {
            this.paymentState = 201;
          }
        }, 2000);
      }
    },
    async getPayInfor() {
      const result = await this.$Api.reqPaymentInfor(this.$route.query.orderNo);
      if (result.code === 200) {
        this.paymentInfor = result.data;
      } else {
        alert('获取支付信息失败');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px '微软雅黑';
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>
