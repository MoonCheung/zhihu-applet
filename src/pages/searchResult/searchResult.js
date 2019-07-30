import { Block, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './searchResult.scss';

class SearchResult extends Taro.Component {
  // 构造器函数
  constructor() {
    super(...arguments);
    this.state = {
      searchKey: ''
    };
  }

  componentWillMount(options = this.$router.params || {}) {
    let that = this;
    that.setState({
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

export default SearchResult;
