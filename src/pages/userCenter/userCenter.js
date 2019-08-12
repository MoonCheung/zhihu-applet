import { AtAvatar, AtList, AtListItem } from 'taro-ui';
import { View } from '@tarojs/components';
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

  config = {
    navigationBarTitleText: '信息'
  };
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
            <AtList className="user-list" key={index.id}>
              {item.map((i, itemIndex) => {
                return (
                  <View className="user-list-item" key={itemIndex.id}>
                    <AtListItem className="user-list-title" arrow="right" title={i.title} thumb={i.icon} />
                  </View>
                );
              })}
            </AtList>
          );
        })}
      </View>
    );
  }
}

export default UserCenter;
