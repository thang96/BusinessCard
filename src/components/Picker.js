import React, {useState, useMemo, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {icons} from '../constants';

const Picker = props => {
  const buttonRef = useRef();

  const {options = [], selected, onChange, placeholder} = props;

  const [isCollapse, setIsCollapse] = useState(false);
  const [layout, setLayout] = useState({x: null, y: null, width: null});

  const _options = useMemo(() => {
    console.log(selected, 'selected picker');
    if (!selected || !selected.value) return options;
    return [{label: '', value: ''}, ...options];
  }, [options, selected, placeholder]);

  const onChangeCollapse = newValue => {
    return () => {
      setIsCollapse(newValue ?? !isCollapse);
    };
  };

  const onChangeOption = item => {
    return () => {
      onChange(item);
      setIsCollapse(false);
    };
  };

  const renderItem = ({item, index}) => {
    return (
      <Pressable style={styles.buttonItem} onPress={onChangeOption(item)}>
        <Text style={styles.textItem}>{item.label}</Text>
      </Pressable>
    );
  };

  const onLayout = ({nativeEvent: {layout}}) => {
    buttonRef.current.measure((a, b, width, height, px, py) => {
      // console.log(a, b, width, height, px, py);
      // console.log('AFter: ', {...layout, top: py - layout.height});
      setLayout({...layout, top: py - layout.height});
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={buttonRef}
        onLayout={onLayout}
        onPress={onChangeCollapse()}
        style={styles.buttonSelect}>
        <Text
          numberOfLines={1}
          style={{
            marginRight: 5,
            paddingRight: 15,
            color: selected?.label ? 'rgb(112,112,112)' : 'rgb(197,196,196)',
          }}>
          {selected?.label || placeholder}
        </Text>
        <Image source={icons.sortDow} style={styles.icon}></Image>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent
        visible={isCollapse}
        onRequestClose={onChangeCollapse(false)}>
        <Pressable style={styles.modal} onPress={onChangeCollapse(false)}>
          <View
            style={{
              ...styles.modalWrapper,
              width: '93%',
              top: layout.top + layout.height / 2,
              left: '3.5%',
              maxHeight: 250,
            }}>
            <FlatList
              data={_options}
              keyExtractor={item => item.value}
              renderItem={renderItem}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
export default Picker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonSelect: {
    borderWidth: 1,
    borderColor: 'rgb(112,112,112)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  icon: {
    width: 20,
    height: 25,

    position: 'absolute',
    top: '40%',
    right: 8,
  },
  buttonItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(112,112,112,0.5)',
    alignItems: 'center',
  },
  modal: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalWrapper: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#eeeeee',
    borderRadius: 4,
  },

  textItem: {
    fontSize: 14,
    color: 'rgb(112,112,112)',
  },
});
