import React, {useEffect, useState, useRef} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import {icons} from '../../constants';
import PanAndPinch from '../../components/PanAndPinch';
import ChooseTextinputStyles from '../../components/ChooseTextinputStyles';
import Picker from '../../components/Picker';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateIcon,
  removeIcon,
  updateResource,
  removeResource,
  addResource,
} from '../../redux/actions/IconAction';
import {transform} from '@babel/core';
const DATA = [
  {
    icon: 'https://static.vecteezy.com/system/resources/previews/000/571/419/original/vector-network-icon.jpg',
    id: 1,
  },
  {
    icon: 'https://static.vecteezy.com/system/resources/previews/000/551/599/original/user-icon-vector.jpg',
    id: 2,
  },
  {
    icon: 'https://static.vecteezy.com/system/resources/previews/000/150/752/original/free-update-icon-vector-collection.jpg',
    id: 3,
  },
  {
    icon: 'https://tse4.mm.bing.net/th?id=OIP.bwb4tI2v-svBFxB_fZcoVQHaJ4&pid=Api&P=0&w=126&h=168',
    id: 4,
  },
  {
    icon: 'https://tse3.mm.bing.net/th?id=OIP.xOwGC3MnX56NFDLncE8MAgHaHa&pid=Api&P=0&w=165&h=165',
    id: 5,
  },
  {
    icon: 'https://static.vecteezy.com/system/resources/previews/000/435/774/original/vector-direction-icon.jpg',
    id: 6,
  },
  {
    icon: 'https://tse4.mm.bing.net/th?id=OIP.AXk-fYRwU3FTAHV5SCLl5wHaFg&pid=Api&P=0&w=213&h=158',
    id: 7,
  },
  {
    icon: 'https://tse2.mm.bing.net/th?id=OIP.qlO8Doemk0ret1fCjjnf5wHaHa&pid=Api&P=0&w=183&h=183',
    id: 8,
  },
];

const NameCard = () => {
  const [limitationHeight, setLimitationHeight] = useState(0);
  const [limitationWidth, setLimitationWidth] = useState(0);
  const [resizable, setResizable] = useState(false);
  const [draggable, setdDaggable] = useState(false);

  const [data, setData] = useState(DATA);

  const dispatch = useDispatch();
  // const icon = useSelector(state => state?.Icon?.icon);

  const resources = useSelector(state => state?.Icon?.resources ?? []);
  // useEffect(() => {
  //   setData(DATA);
  // }, [data, icon]);

  const onAddNewItem = item => {
    let NewItem = {
      type: 'image',
      value: item,
      x: 0,
      y: 0,
      height: 100,
      width: 100,
    };
    dispatch(addResource(NewItem));
  };

  const [selectedIndex, setSelectedIndex] = useState(null);

  const onTogglePressed = index => {
    return () => {
      setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
      setResizable(!resizable);
      setdDaggable(!draggable);
    };
  };
  const onRemove = index => {
    return () => {
      dispatch(removeResource(index));
    };
  };

  const [kt, setKT] = useState({width: 100, height: 100});

  useEffect(() => {
    Orientation.lockToLandscape();
  });
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.viewTitle}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Svg');
            }}
            style={styles.addTitle}>
            <Text>Chọn chủ đề</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChooseTextinputStyles');
            }}
            style={styles.addText}>
            <Text>Thêm text</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.viewItem}>
            <FlatList
              data={data}
              keyExtractor={key => key.icon}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    onAddNewItem(item.icon);
                  }}
                  style={styles.eachViewItem}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    resizeMode="stretch"
                    source={{uri: item.icon}}></Image>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.eachView}>
            <View
              style={{
                height: '100%',
                padding: 15,
              }}>
              <View
                onLayout={ev => {
                  const layout = ev.nativeEvent.layout;
                  setLimitationHeight(layout.height);
                  setLimitationWidth(layout.width);
                }}
                style={styles.viewCard}>
                {resources.map(
                  (
                    {
                      width,
                      height,
                      type,
                      x,
                      y,
                      value,
                      color,
                      fontfamily,
                      fontsize,
                      bold,
                      italic,
                    },
                    index,
                  ) => (
                    <View key={index}>
                      {type === 'image' ? (
                        <PanAndPinch
                          isSelected={index === selectedIndex}
                          style={{
                            borderWidth: selectedIndex == index ? 2 : 0,
                            borderColor: 'rgb(0,255,255)',
                          }}
                          key={index}
                          height={height}
                          width={width}
                          x={x}
                          y={y}
                          limitationHeight={limitationHeight}
                          limitationWidth={limitationWidth}
                          onRemove={onRemove(index)}
                          onDragEnd={boxPosition => {
                            const _boxArray = [...resources];

                            const _box = {
                              ..._boxArray[index],
                              x: boxPosition.x,
                              y: boxPosition.y,
                              height: boxPosition.height,
                              width: boxPosition.width,
                            };

                            dispatch(updateResource(index, _box));
                          }}
                          onResizeEnd={boxPosition => {
                            const _boxArray = [...resources];
                            const _box = {
                              ..._boxArray[index],
                              x: boxPosition.x,
                              y: boxPosition.y,
                              height: boxPosition.height,
                              width: boxPosition.width,
                            };
                            setKT({
                              width: boxPosition.width,
                              height: boxPosition.width,
                            });

                            dispatch(updateResource(index, _box));
                          }}>
                          <TouchableWithoutFeedback
                            style={[StyleSheet.absoluteFill]}
                            onPress={onTogglePressed(index)}>
                            <View
                              style={[
                                {width: kt.width, height: kt.height},
                                // {transform: [{rotate: '45deg'}]},
                              ]}>
                              <Image
                                resizeMode="cover"
                                style={{
                                  width: resources[index].width - 4,
                                  height: resources[index].height - 4,
                                }}
                                source={{uri: value}}
                              />
                            </View>
                          </TouchableWithoutFeedback>
                        </PanAndPinch>
                      ) : type === 'text' ? (
                        <PanAndPinch
                          isSelected={index === selectedIndex}
                          style={{
                            borderWidth: selectedIndex == index ? 2 : 0,
                            borderColor: 'rgb(0,255,255)',
                          }}
                          key={index}
                          height={height}
                          width={width}
                          x={x}
                          y={y}
                          limitationHeight={limitationHeight}
                          limitationWidth={limitationWidth}
                          onRemove={onRemove(index)}
                          onDragEnd={boxPosition => {
                            const _boxArray = [...resources];

                            const _box = {
                              ..._boxArray[index],
                              x: boxPosition.x,
                              y: boxPosition.y,
                              height: boxPosition.height,
                              width: boxPosition.width,
                            };

                            dispatch(updateResource(index, _box));
                          }}
                          onResizeEnd={boxPosition => {
                            const _boxArray = [...resources];
                            const _box = {
                              ..._boxArray[index],
                              x: boxPosition.x,
                              y: boxPosition.y,
                              height: boxPosition.height,
                              width: boxPosition.width,
                            };
                            setKT({
                              width: boxPosition.width,
                              height: boxPosition.width,
                            });

                            dispatch(updateResource(index, _box));
                          }}>
                          <TouchableWithoutFeedback
                            style={[StyleSheet.absoluteFill, {padding: 10}]}
                            onPress={onTogglePressed(index)}>
                            <View
                              style={() => {
                                return {width: kt.width, height: kt.height};
                              }}>
                              <Text
                                style={{
                                  color: color,
                                  fontFamily: fontfamily,
                                  fontSize: fontsize,
                                  fontStyle: italic ? 'italic' : 'normal',
                                  fontWeight: bold ? 'bold' : 'normal',
                                }}>
                                {value}
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        </PanAndPinch>
                      ) : null}
                    </View>
                  ),
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(169, 169, 169)',
  },
  viewTitle: {
    width: '100%',
    height: '15%',
    backgroundColor: 'rgb(0,255,255)',
    flexDirection: 'row',
  },
  viewItem: {
    backgroundColor: 'rgb(0,255,255)',
    width: '25%',
    height: '100%',
  },
  eachViewItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    width: '95%',
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  eachView: {flex: 1},

  viewCard: {flex: 1, backgroundColor: 'white'},
  addText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00CCFF',
    marginHorizontal: 5,
    marginVertical: 2,
    width: 150,
    borderRadius: 10,
  },
  addTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00CCFF',
    marginHorizontal: 5,
    marginVertical: 2,
    width: 180,
    borderRadius: 10,
  },
});

export default NameCard;
