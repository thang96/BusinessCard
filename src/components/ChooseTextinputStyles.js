import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {icons, colos} from '../constants';
import Orientation from 'react-native-orientation-locker';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {addResource} from '../redux/features/resourceSlice';
import fontfamily from '../constants/fontfamily';
import CustomPicker from './CustomPicker';
import {uuid} from '../utilies';
import styles from '../resource/styles/styleComponents/styleChooseTextinputStyles';

const FONT_SIZES = Array.from(new Array(62)).map((_, index) => ({
  label: index + 8,
  value: index + 8,
}));

const ChooseTextinputStyles = props => {
  useEffect(() => {
    Orientation.lockToLandscape();
  });

  // const [modalVisible, setModalVisible] = useState(true);
  const [colorText, setcolorText] = useState('black');
  const [text, setText] = useState('');
  const [selectedBold, setSelectedBold] = useState(false);
  const [selectedItalic, setSelectedItalic] = useState(false);
  const navigation = useNavigation();
  const [fontFamily, setFontFamily] = useState('');
  const [fontSize, setFontSize] = useState(40);
  const [isChoosingFont, setIsChoosingFont] = useState(false);
  const [isChoosingSize, setIsChoosingSize] = useState(false);

  const [colors, setColors] = useState(null);

  const colorStore = useSelector(state => state?.color?.colorStore);

  const dispatch = useDispatch();
  useEffect(() => {
    setColors(colorStore);
  }, [colorStore]);
  const changeColor = item => {
    setcolorText(item.value);
  };

  const changeBold = () => {
    setSelectedBold(prev => (prev == true ? false : true));
  };
  const changeItalic = () => {
    setSelectedItalic(prev => (prev == true ? false : true));
  };
  const onToggleChoosingFont = newStatus => {
    setIsChoosingFont(prevValue => newStatus ?? !prevValue);
  };

  const onToggleChoosingSize = newStatus => {
    setIsChoosingSize(prevValue => newStatus ?? !prevValue);
  };

  const onChangeFont = newFont => {
    return () => {
      setFontFamily(newFont);
      setIsChoosingFont(false);
    };
  };
  const onChangeSize = newSize => {
    return () => {
      setFontSize(newSize);
      setIsChoosingSize(false);
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.eachContainer}>
        <View style={styles.viewFunction}>
          <TouchableOpacity
            onPress={onToggleChoosingFont}
            style={styles.viewDropDown}>
            <Text style={{color: fontFamily === '' ? 'grey' : 'black'}}>
              {fontFamily === '' || fontFamily === null
                ? 'Font Family'
                : `${fontFamily}`}
            </Text>
            <Image style={{width: 20, height: 20}} source={icons.sortDow} />
          </TouchableOpacity>
          <CustomPicker
            onPress={onChangeFont}
            open={isChoosingFont}
            data={fontfamily}
          />
          <CustomPicker
            onPress={onChangeSize}
            open={isChoosingSize}
            data={FONT_SIZES}
          />
          <View style={styles.viewPropDownRow}>
            <TouchableOpacity
              onPress={onToggleChoosingSize}
              style={styles.choosingSize}>
              <Text style={{color: 'black'}}>{fontSize}</Text>
              <Image style={{width: 20, height: 20}} source={icons.sortDow} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                changeBold();
              }}
              style={[styles.boldDropDow, {borderWidth: selectedBold ? 1 : 0}]}>
              <Image style={{height: 25, width: 25}} source={icons.B} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                changeItalic();
              }}
              style={[
                styles.boldDropDow,
                {borderWidth: selectedItalic ? 1 : 0},
              ]}>
              <Image style={{height: 25, width: 25}} source={icons.I} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewFlat}>
          <FlatList
            horizontal={false}
            numColumns={7}
            data={colors}
            keyExtractor={key => key.value}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  changeColor(item);
                }}
                key={index}
                style={[styles.color, {backgroundColor: item.value}]}
              />
            )}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('CreateColor');
            }}
            style={styles.buttonEditColor}>
            <Image
              style={{height: 40, width: 40, alignSelf: 'center', margin: 5}}
              source={icons.editColor}
            />
            <Text style={styles.textEditColor}> Edit{'\n'}colors</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewInput}>
          <CustomInput
            fontFamily={fontFamily}
            fontSize={fontSize}
            selectedItalic={selectedItalic}
            selectedBold={selectedBold}
            value={text}
            colorText={colorText}
            changeText={text => {
              setText(text);
            }}
            placeholder={'Add text'}
            style={{
              flex: 1,
            }}
          />
        </View>

        <CustomButton
          disabled={text.trim() == '' ? true : false}
          colorText={colorText}
          title={'Add text'}
          textColor={'white'}
          style={styles.viewEdit}
          backgroundColor={text.trim() == '' ? 'grey' : 'rgb(0,255,255)'}
          onPress={() => {
            const newResource = {
              type: 'text',
              value: text,
              x: 0,
              y: 0,
              width: 100,
              height: 100,
              colorIcon: colorText,
              fontfamily: fontFamily === '' ? null : fontFamily,
              fontsize: fontSize,
              bold: selectedBold,
              italic: selectedItalic,
              id: uuid(),
              rotate: 0,
            };
            dispatch(addResource(newResource));
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default ChooseTextinputStyles;
