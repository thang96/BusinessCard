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
import Picker from './Picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {State} from 'react-native-gesture-handler';
import {addNewColor} from '../redux/features/colorSlice';
import {PickerFontFamily} from './PickerFontFamily';
import {PickerFontSize} from './PickerFontSize';
import fontfamily from '../constants/fontfamily';
import CustomPicker from './CustomPicker';
import {updateResource} from '../redux/features/resourceSlice';

const FONT_SIZES = Array.from(new Array(62)).map((_, index) => ({
  label: index + 8,
  value: index + 8,
}));

const EditTextinputStyles = props => {
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
  const colorStore = useSelector(state => state.color.colorStore);
  const dispatch = useDispatch();

  const route = useRoute();

  console.log(route?.params, 'route');
  console.log(route?.params?.params?.index, 'route');

  useEffect(() => {
    setColors(colorStore);
    setFontFamily(route?.params?.params?.fontfamily);
    setText(route?.params?.params?.value);
    setcolorText(route?.params?.params?.color);
    setFontSize(route?.params?.params?.fontsize);
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
              style={{
                height: 50,
                borderWidth: 1,
                borderColor: 'rgb(112,112,112)',
                borderRadius: 5,
                width: 110,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
              }}>
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
            const newResource = {
              type: 'text',
              value: text,
              x: route?.params?.params?.x,
              y: route?.params?.params?.y,
              width: route?.params?.params?.width,
              height: route?.params?.params?.height,
              color: colorText,
              fontfamily: fontFamily === '' ? null : fontFamily,
              fontsize: fontSize,
              bold: selectedBold,
              italic: selectedItalic,
            };
            console.log(newResource, 'resource');
            dispatch(updateResource(route?.params?.params?.index, newResource));
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eachContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  iconClose: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: -10,
    top: -10,
  },
  viewEdit: {
    height: 40,
    borderRadius: 15,
    width: 150,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  viewInput: {
    height: 95,
    borderWidth: 2,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 70,
    borderColor: 'rgb(0,255,255)',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
  },
  fontText: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'rgb(0,255,255)',
    width: '20%',
  },
  viewButton: {
    height: 40,
    borderWidth: 2,
    borderRadius: 15,
    width: 150,
    borderColor: 'rgb(169 ,169 ,169)',
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: 'rgb(169 ,169 ,169)',
  },
  viewFlat: {
    position: 'absolute',
    width: '55%',
    height: '45%',
    borderColor: 'rgba(105,105,105,0.5)',
    right: 30,
    top: 10,
    flexDirection: 'row',
    borderWidth: 1,
  },
  viewFunction: {
    width: '35%',
    height: '45%',
    borderColor: 'rgba(105,105,105,0.5)',
    marginLeft: 30,
    marginTop: 10,
    borderWidth: 1,
    flexDirection: 'column',
  },
  viewDropDown: {
    height: 50,
    width: '90%',
    marginTop: 5,
    marginLeft: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgb(112,112,112)',
    borderRadius: 5,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  viewPropDownRow: {
    height: 50,
    width: '90%',
    marginTop: 9,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldDropDow: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: 'grey',
  },
  color: {
    width: 40,
    height: 40,
    margin: 2,
    borderWidth: 1,
    borderColor: 'grey',
  },
  textEditColor: {
    fontSize: 14,
    marginHorizontal: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonEditColor: {
    backgroundColor: 'rgba(125,146,125,3)',
    height: 90,
    marginHorizontal: 5,
  },
});

export default EditTextinputStyles;
