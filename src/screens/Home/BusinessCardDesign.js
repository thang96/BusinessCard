import React, {
  useEffect,
  useState,
  useRef,
  startTransition,
  useCallback,
} from 'react';
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
const BusinessCardDesign = () => {
  const [limitationHeight, setLimitationHeight] = useState(0);
  const [limitationWidth, setLimitationWidth] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [size, setSize] = useState({width: 100, height: 100});
  const [numberPage, setNumberPage] = useState(1);
  // console.log(numberPage);
  const dispatch = useDispatch();
  const resources = useSelector(state => state.resource.resourceStore ?? []);
  const color = useSelector(state => state.color.colorStore ?? []);
  const svg = useSelector(state => state.listSvg.svgStore ?? []);
  const navigation = useNavigation();
  const drawerNavigation = navigation.getParent('ChooseTheme');
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
  const [typeCard, setTypeCard] = useState(false);
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

  const [refreshing, setRefreshing] = useState(false);

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
            <TouchableOpacity
              style={{height: 45, width: 50, marginRight: 15}}
              onPress={() => {
                navigation.navigate('CreateColor');
              }}>
              <Image source={icons.editColor} style={{height: 45, width: 45}} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChooseTextinputStyles');
              }}
              style={styles.buttonText}>
              <Image style={{width: 30, height: 30}} source={icons.text} />
            </TouchableOpacity>

            {resources[selectedIndex]?.type === 'text' ? (
              <TouchableOpacity
                onPress={() => editText()}
                style={styles.buttonText}>
                <Image
                  style={{width: 30, height: 30}}
                  source={icons.edittext}
                />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  height: 45,
                  width: 50,
                  marginRight: 15,
                }}
              />
            )}
            <View style={{flex: 1}} />
            <TouchableOpacity
              disabled={resources.length <= 0 ? false : true}
              onPress={() => changeSizeCard()}
              style={{
                height: 45,
                width: 50,
                borderRadius: 5,
                backgroundColor:
                  resources.length <= 0 ? 'rgba(248,248,255,0.3)' : 'red',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 5,
              }}>
              <Image
                style={{width: 35, height: 35}}
                source={typeCard ? icons.square : icons.rectangle}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Image
                style={{width: 20, height: 20, tintColor: 'rgb(0,0,225)'}}
                source={icons.savefile}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={styles.listIcon}>
              <ScrollView
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
                  // if (isScrollToTop(nativeEvent)) {
                  //   if (numberPage === 1) return;
                  //   if (numberPage === 2) {
                  //     setNumberPage(numberPage - 1);
                  //     setNumberPage(getListSvg(svgimages));
                  //   } else if (numberPage === 3) {
                  //     setNumberPage(numberPage - 1);
                  //     dispatch(getListSvg(svgvehicle));
                  //   }
                  // }
                }}
                scrollEventThrottle={400}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                style={styles.viewItem}>
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
