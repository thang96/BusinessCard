import React, {useEffect, useState, useRef} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import {icons, svgimages} from '../../constants';
import PanAndPinch from '../../components/PanAndPinch';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateResource,
  removeResource,
  addResource,
} from '../../redux/features/resourceSlice';
import {uuid} from '../../utilies';
const NameCard = () => {
  const [limitationHeight, setLimitationHeight] = useState(0);
  const [limitationWidth, setLimitationWidth] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [size, setSize] = useState({width: 100, height: 100});
  const dispatch = useDispatch();
  const resources = useSelector(state => state.resource.resourceStore ?? []);
  // console.log(resources);
  const color = useSelector(state => state.color.colorStore ?? []);
  const FUNCTIONBUTTON = [
    {title: 'Choose theme', onPress: null},
    {title: 'Add color', onPress: () => navigation.navigate('CreateColor')},
    {
      title: 'Add text',
      onPress: () => navigation.navigate('ChooseTextinputStyles'),
    },
    {
      title: 'Edit text',
      onPress: () => {
        resources.map(
          (
            {
              bold,
              colorIcon,
              fontfamily,
              fontsize,
              height,
              id,
              italic,
              rotate,
              type,
              value,
              width,
              x,
              y,
            },
            index,
          ) => {
            if (index === selectedIndex && type === 'text') {
              navigation.navigate('EditTextinputStyles', {
                params: {
                  bold: bold,
                  colorIcon: colorIcon,
                  fontfamily: fontfamily,
                  fontsize: fontsize,
                  height: height,
                  id: id,
                  italic: italic,
                  rotate: rotate,
                  type: type,
                  value: value,
                  width: width,
                  x: x,
                  y: y,
                  index: index,
                },
              });
            }
          },
        );
      },
    },
  ];
  const renderColor = ({item}) => (
    <TouchableOpacity
      key={item.value}
      onPress={() => updateColor(item.value)}
      style={[styles.eachViewColor, {backgroundColor: item?.value}]}
    />
  );
  const onAddNewItem = item => {
    let NewItem = {
      type: 'image',
      value: item,
      x: 0,
      y: 0,
      height: 100,
      width: 100,
      rotate: 0,
      colorIcon: 'rgb(0,0,0)',
      id: uuid(),
    };
    dispatch(addResource(NewItem));
  };
  const onTogglePressed = index => {
    return () => {
      setSelectedIndex(prevIndex => (prevIndex == index ? null : index));
      setSelectedItemIndex(index);
    };
  };
  const onRemove = id => {
    return () => {
      dispatch(removeResource(id));
    };
  };
  const renderButton = item => (
    <TouchableOpacity onPress={item.onPress} style={styles.buttonTopTab}>
      <Text style={styles.textTopTab}>{item.title}</Text>
    </TouchableOpacity>
  );
  const updateColor = colorSelected => {
    const index = selectedItemIndex;
    const _boxArray = [...resources];
    const itembox = {
      ..._boxArray[selectedItemIndex],
      x: _boxArray[selectedItemIndex].x,
      y: _boxArray[selectedItemIndex].y,
      height: _boxArray[selectedItemIndex].height,
      width: _boxArray[selectedItemIndex].width,
      colorIcon: colorSelected,
    };
    dispatch(updateResource({index, itembox}));
  };
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.viewTopTab}>
            {
              <FlatList
                horizontal
                data={FUNCTIONBUTTON}
                keyExtractor={key => key.title}
                renderItem={({item}) => renderButton(item)}
              />
            }
            <View style={{flex: 1}} />

            <TouchableOpacity style={styles.saveButton}>
              <Image
                style={{width: 20, height: 20, tintColor: 'rgb(0,0,225)'}}
                source={icons.savefile}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.listIcon}>
              <ScrollView style={styles.viewItem}>
                {Object.values(svgimages).map((IconItem, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      onAddNewItem(IconItem, index);
                    }}
                    style={styles.eachViewItem}>
                    <IconItem
                      width={'100%'}
                      height={'100%'}
                      fill="rgb(0,0,0)"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.viewColor}>
                <FlatList
                  data={color}
                  keyExtractor={key => key.name}
                  renderItem={renderColor}
                />
              </View>
            </View>
            <View
              onLayout={ev => {
                const layout = ev.nativeEvent.layout;
                setLimitationHeight(layout.height);
                setLimitationWidth(layout.width);
              }}
              style={{flex: 1}}>
              {resources.map(
                (
                  {
                    width,
                    height,
                    type,
                    x,
                    y,
                    value,
                    fontfamily,
                    fontsize,
                    bold,
                    italic,
                    colorIcon,
                    id,
                    rotate,
                  },
                  index,
                ) => {
                  const IconItem = value;
                  return (
                    <View key={id}>
                      {type === 'image' ? (
                        <PanAndPinch
                          isSelected={index === selectedIndex}
                          style={{
                            borderWidth: selectedIndex == index ? 2 : 0,
                            borderColor: 'rgb(0,255,255)',
                          }}
                          key={id}
                          height={height}
                          width={width}
                          x={x}
                          y={y}
                          rotate={rotate}
                          limitationHeight={limitationHeight}
                          limitationWidth={limitationWidth}
                          onRemove={onRemove(id)}
                          onDragEnd={boxPosition => {
                            const _boxArray = [...resources];
                            const itembox = {
                              ..._boxArray[index],
                              x: boxPosition.x,
                              y: boxPosition.y,
                              height: boxPosition.height,
                              width: boxPosition.width,
                              rotate: (boxPosition.rotate * 180) / Math.PI,
                              id: id,
                            };
                            dispatch(updateResource({index, itembox}));
                          }}
                          onResizeEnd={boxPosition => {
                            const _boxArray = [...resources];
                            const itembox = {
                              ..._boxArray[index],
                              x: boxPosition.x,
                              y: boxPosition.y,
                              height: boxPosition.height,
                              width: boxPosition.width,
                              rotate: (boxPosition.rotate * 180) / Math.PI,
                              id: id,
                            };
                            setSize({
                              width: boxPosition.width,
                              height: boxPosition.width,
                            });

                            dispatch(updateResource({index, itembox}));
                          }}
                          onRotateEnd={boxPosition => {
                            const _boxArray = [...resources];
                            const itembox = {
                              ..._boxArray[index],
                              x: boxPosition.x,
                              y: boxPosition.y,
                              height: boxPosition.height,
                              width: boxPosition.width,
                              rotate: (boxPosition.rotate * 180) / Math.PI,
                              id: id,
                            };
                            dispatch(updateResource({index, itembox}));
                          }}>
                          <TouchableWithoutFeedback
                            //
                            hitSlop={{x: size.width, y: size.height}}
                            //
                            style={[StyleSheet.absoluteFill]}
                            onPress={onTogglePressed(index)}>
                            <View
                              style={[
                                {
                                  width: size.width,
                                  height: size.height,
                                },
                              ]}>
                              {typeof value === 'string' ? (
                                <SvgUri
                                  width="100%"
                                  height="100%"
                                  uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
                                />
                              ) : (
                                <IconItem
                                  fill={colorIcon}
                                  width={resources[index].width - 4}
                                  height={resources[index].height - 4}
                                />
                              )}
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
                          key={id}
                          height={height}
                          width={width}
                          x={x}
                          y={y}
                          rotate={rotate}
                          limitationHeight={limitationHeight}
                          limitationWidth={limitationWidth}
                          onRemove={onRemove(id)}
                          onDragEnd={boxPosition => {
                            const _boxArray = [...resources];

                            const _box = {
                              ..._boxArray[index],
                              x: boxPosition.x,
                              y: boxPosition.y,
                              height: boxPosition.height,
                              width: boxPosition.width,
                              rotate: (boxPosition.rotate * 180) / Math.PI,
                              id: id,
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
                              id: id,
                            };
                            setSize({
                              width: boxPosition.width,
                              height: boxPosition.width,
                            });

                            dispatch(updateResource(index, _box));
                          }}
                          onRotateEnd={boxPosition => {
                            const _boxArray = [...resources];
                            const itembox = {
                              ..._boxArray[index],
                              x: boxPosition.x,
                              y: boxPosition.y,
                              height: boxPosition.height,
                              width: boxPosition.width,
                              rotate: (boxPosition.rotate * 180) / Math.PI,
                              id: id,
                            };
                            dispatch(updateResource({index, itembox}));
                          }}>
                          <TouchableWithoutFeedback
                            hitSlop={{x: size.width, y: size.height}}
                            style={[StyleSheet.absoluteFill, {padding: 10}]}
                            onPress={onTogglePressed(index)}>
                            <View
                              style={() => {
                                return {width: size.width, height: size.height};
                              }}>
                              <Text
                                style={{
                                  color: colorIcon,
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
                  );
                },
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  viewTopTab: {
    height: '15%',
    zIndex: 9999,
    backgroundColor: 'rgb(207,207,207)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'rgb(0,0,225)',
  },
  buttonTopTab: {
    height: 45,
    width: 150,
    marginRight: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  textTopTab: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(0,0,0,0.5)',
  },
  viewItem: {
    backgroundColor: 'rgb(207,207,207)',
    width: '70%',
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
    padding: 5,
  },
  viewColor: {
    backgroundColor: 'rgb(207,207,207)',
    width: '30%',
    height: '100%',
  },
  eachViewColor: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  listIcon: {
    width: '33%',
    backgroundColor: 'rgb(245,245,245)',
    zIndex: 9999,
    flexDirection: 'row',
  },
});
export default NameCard;
