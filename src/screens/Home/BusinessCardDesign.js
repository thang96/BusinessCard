import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  LogBox,
  RefreshControl,
} from 'react-native';
import {icons, svgimages, svgvehicle, svgweather} from '../../constants';
import PanAndPinch from '../../components/PanAndPinch';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateResource,
  removeResource,
  addResource,
} from '../../redux/features/resourceSlice';
import {getListSvg, loadMoreSvgImage} from '../../redux/features/listSvgSlice';
import {uuid} from '../../utilies';
import styles from '../../styles/styleBusinessCardDesign';
import CustomFunctionButton from '../../components/CustomFunctionButton';

const BusinessCardDesign = () => {
  const [limitationHeight, setLimitationHeight] = useState(0);
  const [limitationWidth, setLimitationWidth] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [size, setSize] = useState({width: 100, height: 100});
  const [numberPage, setNumberPage] = useState(1);
  const resources = useSelector(state => state.resource.resourceStore ?? []);
  const color = useSelector(state => state.color.colorStore ?? []);
  const svg = useSelector(state => state.listSvg.svgStore ?? []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const drawerNavigation = navigation.getParent('ChooseTheme');
  const [refreshing, setRefreshing] = useState(false);
  const [typeCard, setTypeCard] = useState(false);
  const [sizeCard, setSizeCard] = useState({
    width: 470,
    height: 280,
    type: 'rectangle',
  });
  useEffect(() => {
    dispatch(getListSvg(svgimages));
    LogBox.ignoreAllLogs();
  }, []);

  const renderColor = ({item, index}) => (
    <TouchableOpacity
      key={item.value}
      onPress={() => updateColor(item.value, index)}
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
    };
  };
  const onRemove = id => {
    return () => {
      dispatch(removeResource(id));
    };
  };
  const updateColor = colorSelected => {
    if (selectedIndex === null) {
      return null;
    } else {
      const index = selectedIndex;
      const _boxArray = [...resources];
      const itembox = {
        ..._boxArray[selectedIndex],
        x: _boxArray[selectedIndex].x,
        y: _boxArray[selectedIndex].y,
        height: _boxArray[selectedIndex].height,
        width: _boxArray[selectedIndex].width,
        colorIcon: colorSelected,
      };
      dispatch(updateResource({index, itembox}));
    }
  };
  const editText = () => {
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
  };

  const changeSizeCard = () => {
    const rectangleSize = {
      width: 470,
      height: 280,
      type: 'rectangle',
    };
    const squareSize = {
      width: 300,
      height: 300,
      type: 'square',
    };
    setTypeCard(typeCard ? false : true);
    setSizeCard(typeCard ? rectangleSize : squareSize);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      setNumberPage(1);
      dispatch(getListSvg(svgimages));
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.viewTopTab}>
            <TouchableOpacity
              onPress={() => drawerNavigation?.toggleDrawer()}
              style={styles.buttonTopTab}>
              <Text style={styles.textTopTab}>Choose theme</Text>
            </TouchableOpacity>
            <CustomFunctionButton
              size={45}
              icon={icons.editColor}
              onPress={() => {
                navigation.navigate('CreateColor');
              }}
            />
            <CustomFunctionButton
              size={30}
              styleButton={{
                backgroundColor: 'rgba(160,82,45,0.1)',
                borderColor: 'rgb(160,82,45)',
                borderWidth: 2,
              }}
              icon={icons.text}
              onPress={() => {
                navigation.navigate('ChooseTextinputStyles');
              }}
            />
            {resources[selectedIndex]?.type === 'text' ? (
              <CustomFunctionButton
                size={30}
                styleButton={{
                  backgroundColor: 'rgba(160,82,45,0.1)',
                  borderColor: 'rgb(160,82,45)',
                  borderWidth: 2,
                }}
                icon={icons.edittext}
                onPress={() => editText()}
              />
            ) : (
              <View style={styles.hideView} />
            )}
            <View style={{flex: 1}} />
            <CustomFunctionButton
              size={30}
              styleButton={{
                backgroundColor:
                  resources.length <= 0 ? 'rgba(248,248,255,0.3)' : 'red',
              }}
              icon={typeCard ? icons.square : icons.rectangle}
              onPress={() => changeSizeCard()}
            />
            <CustomFunctionButton
              size={30}
              styleIcon={{tintColor: 'rgb(0,0,225)'}}
              icon={icons.savefile}
              onPress={() => alert('Continue')}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.listIcon}>
              <ScrollView
                style={styles.viewItem}
                onScroll={({nativeEvent}) => {
                  if (isCloseToBottom(nativeEvent)) {
                    if (numberPage === 1) {
                      setNumberPage(2);
                      dispatch(loadMoreSvgImage(svgvehicle));
                    } else if (numberPage === 2) {
                      setNumberPage(3);
                      dispatch(loadMoreSvgImage(svgweather));
                    }
                  }
                }}
                scrollEventThrottle={400}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                {Object.values(svg).map((IconItem, index) => (
                  <TouchableOpacity
                    key={index + 1}
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
            <View style={styles.viewBackgroundNameCard}>
              <View
                style={{
                  backgroundColor: 'white',
                  overflow: 'hidden',
                  width: sizeCard.width,
                  height: sizeCard.height,
                }}
                onLayout={ev => {
                  const layout = ev.nativeEvent.layout;
                  setLimitationHeight(layout.height);
                  setLimitationWidth(layout.width);
                }}>
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
                              borderWidth: index === selectedIndex ? 0.2 : 0,
                              borderColor: 'black',
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
                              }),
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
                            <TouchableOpacity
                              hitSlop={{x: size.width, y: size.height}}
                              activeOpacity={1}
                              style={[
                                StyleSheet.absoluteFill,
                                {zIndex: 99, elevation: 99},
                              ]}
                              onPress={onTogglePressed(index)}>
                              <View
                                style={() => {
                                  return {
                                    width: size.width,
                                    height: size.height,
                                  };
                                }}>
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
                            </TouchableOpacity>
                          </PanAndPinch>
                        ) : type === 'text' ? (
                          <PanAndPinch
                            isSelected={index === selectedIndex}
                            style={{
                              borderWidth: selectedIndex === index ? 0.2 : 0,
                              borderColor: 'black',
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
                            <TouchableOpacity
                              activeOpacity={1}
                              hitSlop={{x: size.width, y: size.height}}
                              style={[
                                StyleSheet.absoluteFill,
                                {zIndex: 99, elevation: 99},
                              ]}
                              onPress={onTogglePressed(index)}>
                              <View
                                style={() => {
                                  return {
                                    width: size.width,
                                    height: size.height,
                                  };
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
                            </TouchableOpacity>
                          </PanAndPinch>
                        ) : null}
                      </View>
                    );
                  },
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};
const isScrollToTop = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToTop = 0;
  return contentOffset.y <= paddingToTop;
};
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 5;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default BusinessCardDesign;
