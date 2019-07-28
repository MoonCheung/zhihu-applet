import { Block, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import withWeapp from '@tarojs/with-weapp';
import './searchResult.scss';

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    searchKey: ''
  };

  componentWillMount(options = this.$router.params || {}) {
    var that = this;
    that.setData({
      searchKey: options.key
    });
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentWillUnmount() {}

  onPullDownRefresh = () => {};
  onReachBottom = () => {};
  onShareAppMessage = () => {};
  config = {};

  render() {
    const { searchKey } = this.state;
    return (
      <Block>
        <View>搜索结果页</View>
        <View>{'搜索关键词:' + searchKey}</View>
      </Block>
    );
  }
}

export default _C;
