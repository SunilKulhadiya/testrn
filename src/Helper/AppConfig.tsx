//shukr.codenova.tech@gmail.com
//api       https://api.npoint.io/8ca224d2553c71e711f4
//server    https://www.npoint.io/docs/8ca224d2553c71e711f4

import { Platform } from "react-native";

const Package = 'CareTaker';
const domain = 'https://skygroupofeducation.com/';

const TestBannerUI = 'ca-app-pub-3940256099942544/6300978111'; // Test Banner Ad Unit ID
const TestInterstitialAdUI = 'ca-app-pub-3940256099942544/1033173712'; // Test Interstitial Ad Unit ID

const TestBannerUI_ios = 'ca-app-pub-3940256099942544/2934735716'; // Test Banner Ad Unit ID
const TestInterstitialAdUI_ios = 'ca-app-pub-3940256099942544/4411468910'; // Test Interstitial Ad Unit ID

const thisVersion = '14(1.0.0)';

const AppConfig = {
  ShukrLogo: '',

  UseVersion: thisVersion,
  UseAppleAppVersion: '2(1.0.0)',

  PACKAGE: Package,
  BASEURL: 'https://skygroupofeducation.com', // will be set dynamically,
  BASEPACKAGEURL: '',
  AppLogo: '',
  BottomTabStyle: '0',

  BASEAPIURL: '',
  Image_URL: '',
  AD_API_URL: '',
  AD_IMAGE_PATH: '',

      BaseUrl: domain+"school/",
      StaffImgUrl: domain+"school/uploads/staff_images/",
      BirthdayWishImageUrl: domain+"Shukr/SkyPublicSchool/",
      Api: "api/Webservice/",
      Url: domain+"school/api/Webservice/",
      UrlApi: domain+"Shukr/SkyPublicSchool/Apis/",
      BaseUrl2: domain+"Shukr/SkyPublicSchool/Apis/",         //"/Shukr/SkyPublicSchool/Images/Logo/",
      UrlApi2: domain+"Shukr/SkyPublicSchool/Apis/",


  DisplayAds: false,
  //Testing App id
  // "android_app_id": "ca-app-pub-3940256099942544~3347511713",
  // "ios_app_id": "ca-app-pub-3940256099942544~1458002511"

        Banner1UID : 'ca-app-pub-1518443880496551/5987177080',
        Banner2UID : 'ca-app-pub-1518443880496551/6799789202',
        Banner3UID : 'ca-app-pub-1518443880496551/3361013743',
        Banner4UID : 'ca-app-pub-1518443880496551/2047932077',
        Banner5UID : 'ca-app-pub-1518443880496551/5987177080',
        Banner6UID : 'ca-app-pub-1518443880496551/6799789202',
        Banner7UID : 'ca-app-pub-1518443880496551/3361013743',
        Banner8UID : 'ca-app-pub-1518443880496551/2047932077',
        Banner9UID : 'ca-app-pub-1518443880496551/5987177080',
        Banner10UID : 'ca-app-pub-1518443880496551/6799789202',
        Banner11UID : 'ca-app-pub-1518443880496551/3361013743',
        Banner12UID : 'ca-app-pub-1518443880496551/2047932077',
        InterstitialAd: 'ca-app-pub-1518443880496551/8421768738',
  // Banner1UID: TestBannerUI,
  // Banner2UID: TestBannerUI,
  // Banner3UID: TestBannerUI,
  // Banner4UID: TestBannerUI,
  // Banner5UID: TestBannerUI,
  // Banner6UID: TestBannerUI,
  // Banner7UID: TestBannerUI,
  // Banner8UID: TestBannerUI,
  // Banner9UID: TestBannerUI,
  // Banner10UID: TestBannerUI,
  // Banner11UID: TestBannerUI,
  // Banner12UID: TestBannerUI,
  //InterstitialAd: TestInterstitialAdUI,

  Model_with_Message: 'Update available',
  New_AppUrl: '',
  LatestLiveGoogleAppVersion: thisVersion,
  ModelCloseOption: false,
  AdsShow: 'false',
  GooglePlayStoreLink: '',
  New_Apple_AppUrl: '',
  AppleAppVersion: '',
  AppleAppLink: '',
  Website: '',

  // Initialize the configuration with server URL and other parameters
  init(serverUrl: string, Shukr: string, AppLogoUrl: string,
    newAppUrl: string = '', ModelCloseOption: boolean = false,
    GoogleAdsShow: string = "null", BottomTabStyle: string = 'default',
    GooglePlayStoreLink: string = '', appleAppLink: string = '',
    Website: string = '', withMessage: string = '', 
    Google_App_Version: string = '', Apple_app_Version: string = '',
    New_apple_app_url: string = ''
  ) {
  
    const basePackageUrl = `${serverUrl}${Package}/`;

    this.ShukrLogo =  Shukr.trim().length > 3 ? `${basePackageUrl}AppMng/${Shukr}` : "";
    this.AppLogo = AppLogoUrl.trim().length > 0 ? `${basePackageUrl}AppMng/${AppLogoUrl}` : "";

    this.BASEURL = serverUrl;
    this.BASEPACKAGEURL = basePackageUrl;

    this.BASEAPIURL = `${basePackageUrl}Apis/`;
    this.Image_URL = `${basePackageUrl}Images/`;

    this.AD_API_URL = `${serverUrl}AppAds/Apis/`;
    this.AD_IMAGE_PATH = `${serverUrl}AppAds/Images/`;

    this.LatestLiveGoogleAppVersion = Google_App_Version;
    this.New_AppUrl = newAppUrl.trim().length > 0 ? newAppUrl : '';
    this.New_AppUrl = newAppUrl.trim().length > 0 ? newAppUrl : '';
    this.ModelCloseOption = ModelCloseOption;
    this.AdsShow = GoogleAdsShow ? 'true' : 'false';
    this.BottomTabStyle = BottomTabStyle;
    this.GooglePlayStoreLink = GooglePlayStoreLink.trim().length > 0 ? GooglePlayStoreLink : '';
    this.AppleAppVersion = Apple_app_Version;
    this.New_Apple_AppUrl = New_apple_app_url;
    this.AppleAppLink = appleAppLink.trim().length > 0 ? appleAppLink : '';
    this.Website = Website.trim().length > 0 ? Website : '';
    this.Model_with_Message = withMessage;
    console.log("105 , AppConfig , GoogleAdsShow : ", GoogleAdsShow);

    if (GoogleAdsShow == 'ShowAds') {
      this.DisplayAds = true;
      if(Platform.OS == "android"){
        this.Banner1UID = 'ca-app-pub-1518443880496551/5987177080';
        this.Banner2UID = 'ca-app-pub-1518443880496551/6799789202';
        this.Banner3UID = 'ca-app-pub-1518443880496551/3361013743';
        this.Banner4UID = 'ca-app-pub-1518443880496551/2047932077';

        this.Banner5UID = 'ca-app-pub-1518443880496551/6799789202';
        this.Banner6UID = 'ca-app-pub-1518443880496551/3361013743';
        this.Banner7UID = 'ca-app-pub-1518443880496551/3443161149';
        this.Banner8UID = 'ca-app-pub-1518443880496551/2047932077';

        this.Banner9UID = 'ca-app-pub-1518443880496551/5987177080';
        this.Banner10UID = 'ca-app-pub-1518443880496551/6799789202';
        this.Banner11UID = 'ca-app-pub-1518443880496551/3361013743';
        this.Banner12UID = 'ca-app-pub-1518443880496551/2047932077';
        this.InterstitialAd = 'ca-app-pub-1518443880496551/8421768738';
      }else{
        // this.Banner1UID = TestBannerUI_ios;
        // this.Banner2UID = TestBannerUI_ios;
        // this.Banner3UID = TestBannerUI_ios;
        // this.Banner4UID = TestBannerUI_ios;
        // this.Banner5UID = TestBannerUI_ios;
        // this.Banner6UID = TestBannerUI_ios;
        // this.Banner7UID = TestBannerUI_ios;
        // this.Banner8UID = TestBannerUI_ios;
        // this.Banner9UID = TestBannerUI_ios;
        // this.Banner10UID = TestBannerUI_ios;
        // this.Banner11UID = TestBannerUI_ios;
        // this.Banner12UID = TestBannerUI_ios;
        // this.InterstitialAd = TestInterstitialAdUI_ios;
      }
    }
    // if (GoogleAdsShow == 'TestAds') {
    //   this.DisplayAds = true;
    //   if(Platform.OS == "android"){
    //     this.Banner1UID = TestBannerUI;
    //     this.Banner2UID = TestBannerUI;
    //     this.Banner3UID = TestBannerUI;
    //     this.Banner4UID = TestBannerUI;
    //     this.Banner5UID = TestBannerUI;
    //     this.Banner6UID = TestBannerUI;
    //     this.Banner7UID = TestBannerUI;
    //     this.Banner8UID = TestBannerUI;
    //     this.Banner9UID = TestBannerUI;
    //     this.Banner10UID = TestBannerUI;
    //     this.Banner11UID = TestBannerUI;
    //     this.Banner12UID = TestBannerUI;
    //     this.InterstitialAd = TestInterstitialAdUI;
    //   }else{
    //     this.Banner1UID = TestBannerUI_ios;
    //     this.Banner2UID = TestBannerUI_ios;
    //     this.Banner3UID = TestBannerUI_ios;
    //     this.Banner4UID = TestBannerUI_ios;
    //     this.Banner5UID = TestBannerUI_ios;
    //     this.Banner6UID = TestBannerUI_ios;
    //     this.Banner7UID = TestBannerUI_ios;
    //     this.Banner8UID = TestBannerUI_ios;
    //     this.Banner9UID = TestBannerUI_ios;
    //     this.Banner10UID = TestBannerUI_ios;
    //     this.Banner11UID = TestBannerUI_ios;
    //     this.Banner12UID = TestBannerUI_ios;
    //     this.InterstitialAd = TestInterstitialAdUI_ios;
    //   }
    // }

    if (GoogleAdsShow == 'null' || GoogleAdsShow == null) {
      this.DisplayAds = false;
    }

    console.log("this.DisplayAds G : ", GoogleAdsShow);
    console.log("176 , AppConfig , this.DisplayAds : ", this.DisplayAds);

  }
};

export default AppConfig;