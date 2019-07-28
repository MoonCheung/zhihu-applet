import { Block, View, Image, Text, Switch } from '@tarojs/components';
import qcloud from '@/vendor/wafer2-client-sdk/index';
import withWeapp from '@tarojs/with-weapp';
import Taro from '@tarojs/taro';
import util from '@/utils/index';
import api from '@/api/index';
import config from '@/config';
import './userCenter.scss';

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '' /* 以上登录模块 */,
    privateList: [],
    walletList: [],
    controlList: [],
    userCenterList: []
  };
  getSetting = () => {
    console.log('---获取用户授权---');
    var that = this;
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          Taro.authorize({
            scope: 'scope.userInfo',
            success() {
              that.login();
            }
          });
        } else {
          that.data.logged ? that.getUserInfo() : that.login();
        }
      },
      fail(error) {
        console.log('获取授权失败:', error);
      }
    });
  };
  login = () => {
    if (this.data.logged) return;

    util.showBusy('正在登录');
    var that = this;

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功');
          that.setData({
            userInfo: result,
            logged: true
          });
          console.log('首次登录，存储用户信息');
          Taro.setStorage({
            key: 'userInfo',
            data: that.data.userInfo
          });
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              that.setData({
                userInfo: result.data.data,
                logged: true
              });
              console.log('非首次登录，存储用户信息');
              Taro.setStorage({
                key: 'userInfo',
                data: that.data.userInfo
              });
            },

            fail(error) {
              util.showModel('请求失败', error);
              console.log('request fail', error);
            }
          });
        }
      },

      fail(error) {
        util.showModel('登录失败', error);
        console.log('登录失败', error);
      }
    });
  };
  getUserInfo = () => {
    var that = this;
    console.log('---获取用户信息---');
    Taro.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo;
        var nickName = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl;
        var gender = userInfo.gender; //性别 0：未知、1：男、2：女
        var province = userInfo.province;
        var city = userInfo.city;
        var country = userInfo.country;
        that.setData({
          userInfo: userInfo,
          logged: true
        });
        console.log('请求用户信息，存储用户信息');
        Taro.setStorage({
          key: 'userInfo',
          data: that.data.userInfo
        });
      },
      fail: function() {
        that.getSetting();
      }
    });
  };
  // 获取用户列表API
  getUserCenterList = () => {
    var that = this;
    api.http('userListApi', {}, res => {
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        console.log('---请求个人中心列表---');
        that.setData({
          privateList: res.privateList || [],
          walletList: res.walletList || [],
          controlList: res.controlList || [],
          userCenterList: [res.privateList].concat(
            [res.walletList],
            [res.controlList]
          )
        });
      }
    });
  };

  componentDidMount() {
    this.getUserInfo();
    this.getUserCenterList();
  }

  config = {};

  render() {
    const { logged, userInfo, userCenterList } = this.state;
    return (
      <View className="container">
        <View className="userinfo" onClick={this.getUserInfo}>
          <Image
            className="userinfo-avatar"
            src={
              logged ? userInfo.avatarUrl : '/assets/images/user-unlogin.png'
            }
            backgroundSize="cover"
          />
          <View>
            <Text className="userinfo-nickname">
              {logged ? userInfo.nickName : '点击测试登录接口'}
            </Text>
            {/*  <text class="userinfo-nickname" wx:if="{{logged}}">{{userInfo.lastLoginTime}}</text>  */}
            <View className="userinfo-tip">查看个人主页或编辑简介</View>
          </View>
        </View>
        {/*  用户列表信息   */}
        {userCenterList.map((item, index) => {
          return (
            <View className="user-list" key={index.id}>
              {item.map((i, index) => {
                return (
                  <View className="user-list-item" key={index.id}>
                    <Image className="user-list-icon" src={i.icon} />
                    <Text className="user-list-title">{i.title}</Text>
                    {i.moreLink && (
                      <Image
                        className="user-list-more"
                        src={require('../../assets/images/to-more.png')}
                      />
                    )}
                    {i.theme && (
                      <Switch
                        className="user-list-switch"
                        checked={i.theme !== 'light'}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

export default _C;
