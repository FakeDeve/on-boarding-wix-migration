import { Builder, By, Key, until } from 'selenium-webdriver';
import { sleep } from '../helpers.js';
import { USER_ID, META_SITE_ID } from '../constants.js';
import axios from 'axios';

const builderUrl = `https://editor.wix.com/html/editor/web/renderer/edit/${USER_ID}?metaSiteId=${META_SITE_ID}&editorSessionId=23887be5-0796-4c0f-ac2f-5c0489ed67de`;

const cookies = [
  {
    domain: '.wix.com',
    expiry: 1636633534,
    httpOnly: false,
    name: '_wixAB3|a1bc6756-ab98-410f-a099-302a3d39b41f',
    path: '/',
    secure: false,
    value:
      '130803#1|150438#4|175264#2|182661#2|185798#1|200674#4|205715#1|213671#2|225455#1|269779#1|275566#1|277909#2|281144#1|286464#1|287210#2|287454#2|289342#2|294268#1|296773#2|297192#2',
  },
  {
    domain: '.wix.com',
    expiry: 1636622727,
    httpOnly: false,
    name: '_wixAB3|6d33b2c3-c5f3-4b61-845f-c8cadab74bdc',
    path: '/',
    secure: false,
    value:
      '175264#1|296773#2|292918#9|287039#2|150438#4|295088#2|295988#1|286064#1|295818#1|276744#2|218208#2|285483#2|261000#1|236860#1|280816#2|283806#1|213671#2|281144#2|239251#2|284033#1|292338#2|272282#1|275276#1|171893#2|287210#2|277343#1|269779#2|294027#2|278984#2|97651#1|225455#1|287454#1|200674#4|290785#1|297106#1|185798#2|203287#2|289342#2|182661#2|233548#1|286464#1|275281#1|287023#1|297192#2|232564#1|207438#1|205715#2|275566#2|277909#2|280629#2|286488#2|290052#2|199602#1|293491#2|285029#2|130803#1',
  },
  {
    domain: '.wix.com',
    httpOnly: false,
    name: '_wix_browser_sess',
    path: '/',
    secure: false,
    value: 'b8962c53-152c-41a8-a667-d25bd661077e',
  },
  {
    domain: '.wix.com',
    expiry: 1644395122,
    httpOnly: false,
    name: '_wixUIDX',
    path: '/',
    sameSite: 'None',
    secure: true,
    value: '736042268|a1bc6756-ab98-410f-a099-302a3d39b41f',
  },
  {
    domain: '.wix.com',
    expiry: 1794299122,
    httpOnly: false,
    name: 'wixLanguage',
    path: '/',
    sameSite: 'Lax',
    secure: false,
    value: 'en',
  },
  {
    domain: '.wix.com',
    expiry: 1644395122,
    httpOnly: false,
    name: 'userType',
    path: '/',
    secure: false,
    value: 'REGISTERED',
  },
  {
    domain: '.wix.com',
    expiry: 1642407922,
    httpOnly: false,
    name: 'wixClient',
    path: '/',
    sameSite: 'None',
    secure: true,
    value:
      'danielmashukov2||VERIFIED_OPT_IN|0|1636619122740|1642407922740|a1bc6756-ab98-410f-a099-302a3d39b41f|{}|wix',
  },
  {
    domain: '.wix.com',
    expiry: 1636619673,
    httpOnly: false,
    name: '_px3',
    path: '/',
    sameSite: 'Lax',
    secure: false,
    value:
      'ad018707cfc5b35d58e121c41179c7fd2221efd5f35f6afaaf7c11b3a38fc0ff:7bNMQLjxuuIpuweLB4zCnIobVq2e1fnGEopyfB1HBmh7KpaOgEoxeRcNo+WUkFtXczjKFwXyI+liP/ZfsKjXsw==:1000:ikmdC2aCUAlFBw3NOKvqbujwyZPNkxa/TMFKdXrwoZVfDqSNWywqT54tbGn+6OgH9p91246oDXb3nxORGbsvcizvlubEjYWPHWoh1XL/OJfRVemp0dJz0xpaWX9QdRXBQq7b51TIOvSf4TJ5zF6i8NLzNn7FgxtV8yS2otpDXwfnXZJGSNw64P3Z0K/gKkLvv/ZytVlZzQTOdDdVlDxRZw==',
  },
  {
    domain: '.wix.com',
    expiry: 1642407922,
    httpOnly: true,
    name: 'wixSession2',
    path: '/',
    sameSite: 'None',
    secure: true,
    value:
      'JWT.eyJraWQiOiJrdU42YlJQRCIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1widXNlckd1aWRcIjpcImExYmM2NzU2LWFiOTgtNDEwZi1hMDk5LTMwMmEzZDM5YjQxZlwiLFwidXNlck5hbWVcIjpcImRhbmllbG1hc2h1a292MlwiLFwiY29sb3JzXCI6e30sXCJ1Y2RcIjpcIjIwMjEtMTEtMTFUMDc6Mjk6MTguMDAwKzAwMDBcIixcInd4c1wiOnRydWUsXCJld3hkXCI6dHJ1ZSxcImFvclwiOnRydWUsXCJhY2lcIjpcImExYmM2NzU2LWFiOTgtNDEwZi1hMDk5LTMwMmEzZDM5YjQxZlwiLFwicm1iXCI6dHJ1ZSxcImx2bGRcIjpcIjIwMjEtMTEtMTFUMDg6MjU6MjIuNzIxKzAwMDBcIixcImxhdGhcIjpcIjIwMjEtMTEtMTFUMDg6MjU6MjIuNzIxKzAwMDBcIixcInd4ZXhwXCI6XCIyMDIxLTExLTI2VDA4OjI1OjIyLjczOCswMDAwXCJ9IiwiaWF0IjoxNjM2NjE5MTIyLCJleHAiOjE2Mzc5MTUxMjJ9.I98I_sKy2oYX-U_aOZyAHPsV_uOw84z9t_NQSGEVGQ35eWzxquXU2uiqDI-gajQek2ulg4xTgQsLmfNgezQfn1bBNh0jSsUJiYNKqta-jK0lwPbZ4g8ptzMq-ZjfwpGDcMzPbu2QFliQvyk3o2bq-c6XF_D-xh8Ph5mq0RzOIdCE3qDzMNrIuVyHNnHxdKI0P16ZnkKdnLxuu7MrmZTLOlLJM-BB3jcT4R6LTErLWo8WxoU4U1PH_0HLvRyRHa1t94EgXvsAZm4q6dbRNo-4Bu1k4_cqEUUeBT-cBNXlHXBZNzuD0k_daHjJ3-_HGgpMNWwQf8nrvjo7WkHfSdPXRg',
  },
  {
    domain: '.wix.com',
    expiry: 1668155067,
    httpOnly: false,
    name: '_pxvid',
    path: '/',
    sameSite: 'Lax',
    secure: false,
    value: 'c95d5dca-42c8-11ec-b8c1-6a4251414254',
  },
  {
    domain: '.wix.com',
    expiry: 1644395066,
    httpOnly: false,
    name: '_wixCIDX',
    path: '/',
    sameSite: 'None',
    secure: true,
    value: '5bd63401-8ef6-43aa-8591-b6dcbd0ca03c',
  },
  {
    domain: '.wix.com',
    expiry: 1652171134,
    httpOnly: false,
    name: '_wixAB3',
    path: '/',
    secure: false,
    value: '290223#1',
  },
  {
    domain: '.wix.com',
    httpOnly: false,
    name: 'XSRF-TOKEN',
    path: '/',
    sameSite: 'None',
    secure: true,
    value: '1636619065|FXwF1QQn6rmy',
  },
];

const build = async (builderScript, builderComponents) => {
  const driver = await new Builder().forBrowser('chrome').build();

  const loginWithCookies = async () =>
    await Promise.all(
      cookies.map(
        async (cookie) =>
          cookie.domain === '.wix.com' &&
          (await driver.manage().addCookie(cookie))
      )
    );

  const login = async () => {
    await driver.get(builderUrl);
    //const newCookies = await driver.manage().getCookies();
    await loginWithCookies();
    await driver.get(builderUrl);
    console.log('logged in..');
  };

  const selectFrame = async () => {
    await driver
      .switchTo()
      .frame(driver.findElement(By.xpath("//iframe[@id='preview']")));
    console.log('switched frame..');
  };

  const executeScript = async (script, args) => {
    await driver.executeScript(script, ...args);
    console.log('excecuted script..');
  };

  try {
    await login();

    await sleep(7000);

    await selectFrame();

    await sleep(7000);

    await executeScript(builderScript, builderComponents);
  } catch (error) {
    console.error(error);
  } finally {
    //await driver.quit();
  }
};

const uploadImage = async (image) => {
  try {
    const { data } = await axios.post(
      `https://bo.wix.com/site-migration-site-builder/uploadImages?userId=${USER_ID}&metasiteId=${META_SITE_ID}`,
      [image],
      {
        headers: {
          authorization: 'f11f94f6-ba55-4d52-84a7-b42ce92a1ac1',
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

const createImageForBuilder = async (image) => {
  const imageWixUrl = (
    await uploadImage({
      imageName: image.name,
      imageUrl: image.src,
    })
  )[0]?.fileName;

  return {
    componentType: 'wysiwyg.viewer.components.WPhoto',
    style: 'wp2',
    data: {
      width: parseInt(image.width),
      height: parseInt(image.height),
      alt: image.alt,
      name: image.name,
      uri: imageWixUrl,
      type: 'Image',
      description: '',
    },
    layout: {
      width: parseInt(image.width),
      height: parseInt(image.height),
      x: parseInt(image.x),
      y: parseInt(image.y),
      rotationInDegrees: 0,
      scale: 1,
      fixedPosition: false,
      anchors: [],
    },
    props: 'WPhotoProperties',
  };
};

const createButtonForBuilder = (button) => {
  const buttonStyle = button.style;
  return {
    componentType: 'wixui.StylableButton',
    style: {
      style: {
        properties: {
          '$st-css': `:import{\n    -st-from: 'wix-ui-santa/index.st.css';\n    -st-named: StylableButton\n}\n.root{\n    -st-extends: StylableButton;\n    transition: all 0.2s ease, visibility 0s;\n    border-radius: ${buttonStyle.borderRadius};\n    background: ${buttonStyle.backgroundColor};\n    border: ${buttonStyle.border}\n}\n.root:hover{\n    border: 0px solid rgb(0,0,0);\n    background: ${buttonStyle.hover.backgroundColor}\n}\n.root:hover::label{\n    color: value(site_1_5)\n}\n.root:disabled{\n    background: #E2E2E2\n}\n.root:disabled::label{\n    color: #8F8F8F\n}\n.root:disabled::icon{\n    fill: #8F8F8F\n}\n.root::container{\n    transition: inherit\n}\n.root::label{\n    transition: inherit;\n    margin: 0px 4px 0px 0px;\n    letter-spacing: 0.1em;\n    color: ${buttonStyle.color};\n    font-size: ${buttonStyle.fontSize};\n    font-weight: normal;\n    font-style: normal;\n    }\n.root::icon{\n    transition: inherit;\n    width: 10px;\n    height: 10px;\n    margin: 0px 0px 0px 4px;\n    fill: value(site_1_1);\n    display: none\n}\n.root:hover::icon{\n    fill: value(site_1_5)\n}`,
        },
        groups: {},
        propertiesSource: {
          '$st-css': 'value',
        },
      },
      type: 'ComponentStyle',
      styleType: 'custom',
      compId: '',
      componentClassName: 'wixui.StylableButton',
      pageId: '',
      skin: 'wixui.skins.Skinless',
      metaData: {
        isPreset: false,
        schemaVersion: '1.0',
        isHidden: false,
        pageId: 'c1dmp',
        sig: 'kzm-16',
        basedOnSignature: 'kzm-13',
      },
      id: 'style-kvqog5ky',
    },
    layout: {
      width: button.width,
      height: button.height,
      x: button.x,
      y: button.y,
    },
    type: 'Component',
    data: {
      label: button.text,
      type: 'StylableButton',
      metaData: {
        isPreset: false,
        schemaVersion: '1.0',
        isHidden: false,
      },
    },
    props: {
      type: 'StylableButtonProperties',
      metaData: {
        isHidden: false,
        isPreset: true,
        schemaVersion: '1.0',
      },
    },
  };
};

const createTextForBuilder = (text) => ({
  parent: 'comp-kmdahhb7',
  style: {
    styleType: 'system',
    componentClassName: '',
    style: {
      groups: {},
      properties: {
        f7: 'normal normal normal 17px/1.4em proxima-n-w01-reg {color_15}',
        f6: 'normal normal normal 22px/1.4em proxima-n-w01-reg {color_15}',
        f1: 'normal normal normal 16px/1.4em din-next-w01-light {color_14}',
        f8: 'normal normal normal 15px/1.4em proxima-n-w01-reg {color_15}',
        f10: 'normal normal normal 12px/1.4em din-next-w01-light {color_14}',
        f0: 'normal normal normal 60px/1.4em proxima-n-w01-reg {color_15}',
        f5: 'normal normal normal 25px/1.4em proxima-n-w01-reg {color_15}',
        f3: 'normal normal normal 32px/1.4em proxima-n-w01-reg {color_15}',
        f9: 'normal normal normal 14px/1.4em proxima-n-w01-reg {color_15}',
        f4: 'normal normal normal 28px/1.4em proxima-n-w01-reg {color_15}',
        f2: 'normal normal normal 40px/1.4em proxima-n-w01-reg {color_15}',
      },
      propertiesSource: {
        f7: 'value',
        f6: 'value',
        f1: 'value',
        f8: 'value',
        f10: 'value',
        f0: 'value',
        f5: 'value',
        f3: 'value',
        f9: 'value',
        f4: 'value',
        f2: 'value',
      },
    },
    pageId: '',
    id: 'txtNew',
    compId: '',
    type: 'TopLevelStyle',
    metaData: {
      isHidden: false,
      sig: '6a1-115',
      pageId: 'masterPage',
      schemaVersion: '1.0',
      isPreset: true,
    },
    skin: 'wysiwyg.viewer.skins.WRichTextThemeSkin',
  },
  activeModes: {},
  data: {
    linkList: [],
    text: text.text,
    stylesMapId: 'CK_EDITOR_PARAGRAPH_STYLES',
    type: 'StyledText',
    metaData: {
      isHidden: false,
      sig: '2d2-149',
      pageId: 'mhgen',
      schemaVersion: '1.0',
      isPreset: false,
    },
  },
  componentType: 'wysiwyg.viewer.components.WRichText',
  id: 'comp-kmdakydl',
  mobileHints: {
    author: 'duplicate',
    recommendedScale: 0.8296296,
    recommendedHeight: 20,
    originalCompId: 'comp-kmdahhca1',
    recommendedWidth: 116,
    type: 'MobileHints',
    metaData: {
      isHidden: false,
      sig: 'y1n-325',
      pageId: 'mhgen',
      schemaVersion: '1.0',
      isPreset: false,
    },
  },
  layout: {
    x: text.x,
    fixedPosition: false,
    y: text.y,
    scale: 1,
    height: text.height,
    rotationInDegrees: 0,
    width: text.width,
  },
  type: 'Component',
  props: {
    packed: true,
    brightness: 1,
    type: 'WRichTextProperties',
    verticalText: false,
    metaData: {
      schemaVersion: '1.0',
      sig: 'g26-1957',
      autoGenerated: false,
      pageId: 'mhgen',
    },
  },
  metaData: {
    sig: 'y1n-1',
    pageId: 'mhgen',
  },
  skin: 'wysiwyg.viewer.skins.WRichTextThemeSkin',
});

const createComponentsForBuilder = (builderJSON) =>
  builderJSON.map(async (item) =>
    item.type === 'button'
      ? createButtonForBuilder(item)
      : item.type === 'text'
      ? createTextForBuilder(item)
      : item.type === 'img'
      ? await createImageForBuilder(item)
      : null
  );

export const runBuilder = async (builderJSON) => {
  console.log('builder has started..');

  const components = createComponentsForBuilder(builderJSON.components);

  await build(
    (...components) =>
      components.forEach((component) => {
        documentServices.components.add(
          { id: 'c1dmp', type: 'DESKTOP' },
          component
        );
      }),
    components
  );
};
