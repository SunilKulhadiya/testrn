import { Dimensions } from "react-native";

//const GEMINI_API_KEY = 'AIzaSyDFr2i0AZN_PWktoMdbB6YPHeIxC-3djY0'; // add your gemini api key here

//const GEMINI_API_KEY = 'AIzaSyCXTVHIyCWBioY2mq6NtfPMcJqdkjOFleU';
const GEMINI_API_KEY = 'AIzaSyALF0OqJ6hg33_yakaQBp6rxUARCS5k3X4';

const GEMINI_BASE_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const AppConstant = {
  DEVICE_WIDTH: Dimensions.get('window').width,
  DEVICE_HEIGHT: Dimensions.get('window').height,

  GEMINI_BASE_URL,
  GEMINI_APPLY_URL: `${GEMINI_BASE_URL}?key=${GEMINI_API_KEY}`,
};

export default AppConstant;