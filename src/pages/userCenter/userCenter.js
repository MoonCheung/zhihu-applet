import { Block, View, Image, Text, Switch } from '@tarojs/components';
import { AtAvatar } from 'taro-ui';
import Taro from '@tarojs/taro';
import util from '@/utils/index';
import api from '@/api/index';
import './userCenter.scss';

class UserCenter extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      privateList: [],
      walletList: [],
      controlList: [],
      userCenterList: []
    };
  }

  config = {};
  // 获取用户列表API
  getUserCenterList = () => {
    var that = this;
    api.http('userListApi', {}, res => {
      if (res.errMsg) {
        util.showModel(res.errMsg);
      } else {
        console.log('---请求个人中心列表---');
        that.setState({
          privateList: res.privateList || [],
          walletList: res.walletList || [],
          controlList: res.controlList || [],
          userCenterList: [res.privateList].concat([res.walletList], [res.controlList])
        });
      }
    });
  };

  componentDidMount() {
    this.getUserCenterList();
  }
  render() {
    const { userCenterList } = this.state;
    return (
      <View className="container">
        <View className="userinfo">
          <View className="userinfo-avatar">
            <AtAvatar circle openData={{ type: 'userAvatarUrl' }}></AtAvatar>
          </View>
          <View>
            <View className="userinfo-nickname">
              <open-data type="userNickName" lang="zh_CN"></open-data>
            </View>
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
                      <Switch className="user-list-switch" checked={i.theme !== 'light'} />
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

export default UserCenter;
