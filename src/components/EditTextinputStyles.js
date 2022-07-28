import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {icons, colos} from '../constants';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import fontfamily from '../constants/fontfamily';
import CustomPicker from './CustomPicker';
import {updateResource} from '../redux/features/resourceSlice';
import styles from '../resource/styles/styleComponents/styleEditTextinputStyles';

const FONT_SIZES = Array.from(new Array(62)).map((_, index) => ({
  label: index + 8,
  value: index + 8,
}));

const EditTextinputStyles = props => {
  const [colorText, setcolorText] = useState('black');
  const [text, setText] = useState('');
  const [selectedBold, setSelectedBold] = useState(false);
  const [selectedItalic, setSelectedItalic] = useState(false);
  const [fontFamily, setFontFamily] = useState(null);
  const [fontSize, setFontSize] = useState(30);
  const [isChoosingFont, setIsChoosingFont] = useState(false);
  const [isChoosingSize, setIsChoosingSize] = useState(false);
  const [colors, setColors] = useState(null);
  const [index, setIndex] = useState(null);

  const colorStore = useSelector(state => state.color.colorStore);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    setSelectedBold(route?.params?.params?.bold);
    setcolorText(route?.params?.params?.colorIcon);
    setFontFamily(route?.params?.params?.fontfamily);
    setFontSize(route?.params?.params?.fontsize);
    setIndex(route?.params?.params?.index);
    setSelectedItalic(route?.params?.params?.italic);
    setText(route?.params?.params?.value);

    setColors(colorStore);
  }, [colorStore, route]);
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
              style={styles.toggleChoosingSize}>
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
          title={'Edit text'}
          textColor={'white'}
          style={styles.viewEdit}
          backgroundColor={text.trim() == '' ? 'grey' : 'rgb(0,255,255)'}
          onPress={() => {
            const itembox = {
              type: 'text',
              x: route?.params?.params?.x,
              y: route?.params?.params?.y,
              width: route?.params?.params?.width,
              height: route?.params?.params?.height,
              rotate: route?.params?.params?.rotate,
              id: route?.params?.params?.id,
              value: text,
              colorIcon: colorText,
              fontfamily: fontFamily,
              fontsize: fontSize,
              bold: selectedBold,
              italic: selectedItalic,
            };
            dispatch(updateResource({index, itembox}));
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};

export default EditTextinputStyles;
