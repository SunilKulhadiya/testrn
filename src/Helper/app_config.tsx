import { Dimensions } from "react-native";

  const domain = 'https://skygroupofeducation.com';
  const config = {
      BaseUrl: domain+"/school/",
      StaffImgUrl: domain+"/school/uploads/staff_images/",
      Api: "api/Webservice/",
      Url: domain+"/school/api/Webservice/",
      UrlApi: domain+"/Shukr/SkyPublicSchool/Apis/",
      BaseUrl2: domain+"/Shukr/SkyPublicSchool/Apis/",         //"/Shukr/SkyPublicSchool/Images/Logo/",
      UrlApi2: domain+"/Shukr/SkyPublicSchool/Apis/",
      DEVICEWIDTH: Dimensions.get('window').width,
      DEVICEHEIGHT: Dimensions.get('window').height,
  };
  export default config;
  