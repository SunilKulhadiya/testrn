import { StyleSheet } from 'react-native';
import config from './Constant';


const styles = StyleSheet.create({
    Pagecontainer: {
      width: config.DEVICEWIDTH,
      height: config.DEVICEHEIGHT,
    },
    Pagecontainer2: {
      flex: 1,
      width: config.DEVICEWIDTH,
      height: config.DEVICEHEIGHT,
      justifyContent: 'center',
      padding: 20,
    },
    Pagecontainer3: {
      flex: 1,
      width: config.DEVICEWIDTH,
      height: "80%",
    },
    slide: {
      flexDirection: 'column',
      width: config.DEVICEWIDTH,
      height: config.DEVICEHEIGHT * 0.8,
    },
    slideMPart: {
        width: config.DEVICEWIDTH,
        height: config.DEVICEHEIGHT * 0.8,
        alignItems: 'center',
        paddingTop: config.DEVICEHEIGHT * 0.01,
    },
    SliderPreButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#279CF5',
      borderRadius: 20,
    },
    SliderDoneButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#00C22C',
      borderRadius: 20,
    },
    SliderButtonText: {
      color: '#a9f9f9ff',
      fontSize: 14,
      fontWeight: '600',
    },
    img: {
        width: config.DEVICEWIDTH * 0.97,
    },
    H1: {
        //color: "#FFFFFF",
        textAlign: 'center',
        fontSize: 28,
        fontWeight: "900",
    },
    H2: {
        //color: "#FFFFFF",
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "700",
    },
    H3: {
        //color: "#FFFFFF",
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "600",
    },
    Textinput1: {
        height: 45,
        width: config.DEVICEWIDTH * 0.8,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    Textinput2: {
        height: 45,
        width: config.DEVICEWIDTH * 0.8,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    Textinput3: {
        height: 45,
        width: config.DEVICEWIDTH * 0.7,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    text1:{
        //color: "#FFFFFF",
        fontSize: 21,
        fontWeight: '600',
        marginLeft: 10
    },
    text2:{
        //color: "#FFFFFF",
        fontSize: 17,
        marginLeft: 15
    },
    text3:{
        //color: "#FFFFFF",
        textAlign: 'center',
        fontSize: 15
    },
    text4:{
      //color: "#FFFFFF",
      textAlign: 'center',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      fontSize: 12
    },
    countryCodePicker: {
        alignSelf: 'center',
      },
      togglerContainerStyle: {
        backgroundColor: '#baffc0',
        borderRadius: 10,
        padding: 5,
      },
      togglerLabelStyle: {
        fontSize: 20,
      },
      searchInputStyle: {
        borderColor: '#888888',
        borderWidth: 1,
        height: 36,
        borderRadius: 10,
        paddingHorizontal: 10,
      },
      pickerItemLabelStyle: {
        marginLeft: 10,
        marginVertical: 10,
        alignSelf: 'center',
      },
      pickerItemContainerStyle: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'center',
      },
      Appbar: {
        width: config.DEVICEWIDTH,
        height: config.DEVICEHEIGHT * 0.1,
        backgroundColor: "#FF9F0B",
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 12,
        flexDirection: 'row',
      },
      ScreenAppBarBackground: {
        width: config.DEVICEWIDTH,
        height: config.DEVICEHEIGHT * 0.07,
        backgroundColor: "#FF9F0B",
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 12,
        flexDirection: 'row',
      },
      HAppbar: {
        width: config.DEVICEWIDTH,
        height: config.DEVICEHEIGHT * 0.07,
        backgroundColor: "#FF9F0B",
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'center',
        padding: 8,
        paddingStart: 15,
        flexDirection: 'row',
        position: 'relative'
      },
      SettingAppbar: {
        width: config.DEVICEWIDTH,
        height: config.DEVICEHEIGHT * 0.01,
        backgroundColor: "#FFFFFF",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        flexDirection: 'row',
      },
      ProfileImage: {
        width: 50,
        height: 50,
        backgroundColor: "#08B5BB",
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 40,
        padding: 12,
      },
      ProfileImage2: {
        width: 80,
        height: 80,
        backgroundColor: "#08B5BB",
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 40,
        padding: 12,
      },
      IconSize1: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      IconSize2: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
      },
      IconSize3: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
      },
      IconSize4: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
      },
      RectangleCard: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.97,    //0.85,      //0.9,
        height: config.DEVICEHEIGHT * 0.2,         //0.48,
        borderRadius: 8,
        backgroundColor: "#4D5956",
      },
      ContainerFW: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.95,    //0.85,      //0.9,
      },
      Container1: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.1,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.1,         //0.48,
      },
      Container2: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.2,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.2,         //0.48,
      },
      Container2_3: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.22,
        height: config.DEVICEWIDTH * 0.23,
        borderRadius: 10
      },
      Container3: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.3,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.3,         //0.48,
      },
      Container4: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.4,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.4,         //0.48,
      },
      Container5: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.5,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.5,         //0.48,
      },
      CircularCard: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.15,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.15,         //0.48,
        borderRadius: 30,
        padding: 5,
      },
      SquarCard: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.15,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.15,         //0.48,
        borderRadius: 7,
        padding: 5,
      },
      SquarCard2: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.25,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.25,         //0.48,
        borderRadius: 7,
        padding: 5,
      },
      SquarCard3: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.35,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.35,         //0.48,
        borderRadius: 7,
        padding: 5,
      },
      SquarCard4: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.45,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.45,         //0.48,
        borderRadius: 7,
        padding: 5,
      },
      SquarCard5: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.55,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.55,         //0.48,
        borderRadius: 7,
        padding: 5,
      },
      SquarCardFull: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.97,    //0.85,      //0.9,
        height: config.DEVICEWIDTH * 0.97,         //0.48,
        borderRadius: 7,
        padding: 5,
      },
      Banners: {
        alignContent: 'center',
        width: config.DEVICEWIDTH * 0.95,    //0.85,      //0.9,
        height: config.DEVICEHEIGHT * 0.2,         //0.48,
        borderRadius: 7,
        padding: 5,
      },

      FeatArtcard: {
        alignItems: 'center',
        borderRadius: 8,
        width: config.DEVICEWIDTH * 0.97,   //0.85,
        height: config.DEVICEHEIGHT * 0.2,
        marginTop: 0,
      },
      FeatArtLabel: {
        borderTopLeftRadius: 8,
        color: "#FFFFFF",
        fontSize: 17,
        paddingTop: 1,
        paddingLeft: 5,
      },
      FeatArtLabelText: {
        fontSize: 12,
        color: '#C8C8C8',
        fontWeight: '600',
        paddingLeft: 10,
        paddingRight: 5,
        paddingTop: 2,
        marginBottom: 5,
      },
    

  });

  export default styles;