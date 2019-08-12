import { View, Image, Text, Input } from '@tarojs/components';
import PropTypes from 'prop-types';
import Taro from '@tarojs/taro';
import './index.scss';

class SearchInput extends Taro.Component {
  constructor() {
    super(...arguments);
    this.state = {
      historyList: []
    };
  }
  // 用于检查props类型
  static propTypes = {
    show: PropTypes.bool,
    value: PropTypes.string,
    showMack: PropTypes.func,
    hideMask: PropTypes.func
  };
  // 默认Props值
  static defaultProps = {
    show: null,
    value: '',
    showMack: () => {},
    hideMask: () => {}
  };

  //利用externalClasses 可定义若个外部样式表，不是全局覆盖
  static externalClasses = ['market-class'];

  // 用来搜索历史方法函数
  searchTopic = event => {
    event.preventDefault();
    let that = this;
    console.log(`同步:`, that.state.historyList);
    event.detail.value &&
      that.state.historyList.indexOf(event.detail.value) === -1 &&
      that.setState(
        {
          historyList: that.state.historyList.concat(event.detail.value)
        },
        () => {
          // 这个函数内可拿到setState之后的值
          Taro.setStorageSync('searchHistory', { data: that.state.historyList });
        }
      );
    Taro.navigateTo({
      url: '../../pages/searchResult/searchResult?key=' + event.detail.value
    });
  };
  // 删除搜索历史每条item
  clearItem = event => {
    let that = this;
    // 获取当前点击的Index
    let index = event.target.dataset.index;
    that.state.historyList.splice(index, 1);
    that.setState(
      {
        historyList: that.state.historyList
      },
      () => {
        Taro.setStorageSync('searchHistory', { data: that.state.historyList });
      }
    );
  };
  // 删除全部搜索历史
  clearAll = () => {
    let that = this;
    Taro.removeStorageSync('searchHistory');
    that.setState({
      historyList: []
    });
  };

  //在组件挂载后立即调用
  componentDidMount() {}

  render() {
    const { show, value, showMack, hideMask } = this.props;
    const { historyList } = this.state;
    return (
      <View className="search-component">
        <View className="search-input market-class" onClick={showMack}>
          <Image className="search-input-icon" src={require('../../assets/images/search.png')} />
          <Text className="search-input-text">搜索内容提问</Text>
        </View>
        {/*  搜索栏隐藏或者提问蒙层  */}
        <View className={'search-mask ' + (show ? 'show' : 'hide')}>
          <View className="search-input-wrap">
            <Image className="search-mask-icon" src={require('../../assets/images/search.png')} />
            <Input
              className="search-mask-input market-class"
              type="text"
              confirmType="search"
              focus={show}
              value={value}
              autoFocus={show}
              placeholderStyle="color:#cdcdcd"
              placeholder="搜索想知道内容"
              onConfirm={this.searchTopic}
            />
            <Text className="search-mask-cancel" onClick={hideMask}>
              取消
            </Text>
          </View>
          {historyList.length > 0 && (
            <View className="search-history">
              <View className="search-history-title">搜索历史</View>
              {historyList.map((item, index) => {
                return (
                  <View className="search-item" key={index.id}>
                    <Image className="search-icon-time" src={require('../../assets/images/time.png')} />
                    <Text className="search-item-text">{item}</Text>
                    <Image
                      className="search-icon-del"
                      data-index={index}
                      onClick={this.clearItem}
                      src={require('../../assets/images/del-item.png')}
                    />
                  </View>
                );
              })}
              {historyList.length > 1 && (
                <View className="search-clear-all" onClick={this.clearAll}>
                  <Image className="search-del-all" src={require('../../assets/images/del-all.png')} />
                  <Text className="search-del-text">清空搜索历史</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default SearchInput;
