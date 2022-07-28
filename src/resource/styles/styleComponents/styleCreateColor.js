import {StyleSheet} from 'react-native';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,255,255,0.5)',
    flexDirection: 'row',
  },

  eachView: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  eachView2: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
  },
  viewColor: {
    width: 200,
    height: 80,
    marginTop: 70,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  textColor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)',
    marginTop: 10,
  },
  colorName: {
    height: 50,
    marginTop: 20,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
