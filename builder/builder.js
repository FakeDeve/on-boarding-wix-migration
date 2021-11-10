import { Builder, By, Key, until } from 'selenium-webdriver';
import { sleep } from '../helpers.js';

const builderUrl =
  'https://editor.wix.com/html/editor/web/renderer/edit/cb65a734-e079-4ce7-9e02-3293dadea1e6?metaSiteId=8d508b47-711c-4f28-b08a-51b1b6022725&editorSessionId=d2b005bc-87b4-4d59-b96d-6605f42b8df3';

const cookies = [
  {
    domain: '.wix.com',
    expiry: 1636293786,
    httpOnly: false,
    name: '_wixAB3|6d33b2c3-c5f3-4b61-845f-c8cadab74bdc',
    path: '/',
    secure: false,
    value:
      '97651#1|130803#1|150438#4|171893#2|175264#1|182661#2|185798#2|199602#1|200674#4|203287#2|205715#2|207438#1|218208#2|220536#1|225455#1|232564#1|233548#1|236860#1|239251#2|261000#1|261108#2|268709#1|269779#2|272282#1|275276#1|275281#1|275566#2|276744#2|277343#1|277449#2|277909#2|278984#2|280629#2|280816#2|281144#2|281218#2|283453#2|283806#1|284033#1|285029#2|285483#2|286064#1|286464#1|286488#2|287023#1|287039#2|287210#2|287817#2|289342#2|289793#1|289862#1|290052#2|290785#1|292338#2|292918#9|292971#1',
  },
  {
    domain: 'editor.wix.com',
    expiry: 1636279436,
    httpOnly: false,
    name: 'fedops.logger.defaultOverrides',
    path: '/',
    secure: false,
    value:
      '%7B%22paramsOverridesForApp%22%3A%7B%22restaurants-bm-my-orders.pages.index%22%3A%7B%22is_rollout%22%3Atrue%7D%2C%22restaurants-call-center%22%3A%7B%22is_rollout%22%3Atrue%7D%2C%22responsive-editor-migration%22%3A%7B%22is_rollout%22%3Atrue%7D%2C%22responsive-editor-common-infra%22%3A%7B%22is_rollout%22%3Atrue%7D%2C%22editorx-santa-editor-bridge%22%3A%7B%22is_rollout%22%3Atrue%7D%7D%7D',
  },
  {
    domain: '.wix.com',
    expiry: 1699351374,
    httpOnly: false,
    name: '_ga',
    path: '/',
    secure: false,
    value: 'GA1.1.530188244.1636279332',
  },
  {
    domain: '.wix.com',
    expiry: 1636279974,
    httpOnly: false,
    name: '__utmt',
    path: '/',
    secure: false,
    value: '1',
  },
  {
    domain: '.wix.com',
    expiry: 1652047374,
    httpOnly: false,
    name: '__utmz',
    path: '/',
    secure: false,
    value:
      '248670552.1636279374.1.1.utmcsr=users.wix.com|utmccn=(referral)|utmcmd=referral|utmcct=/',
  },
  {
    domain: '.editor.wix.com',
    expiry: 1636281185,
    httpOnly: false,
    name: 'bSession',
    path: '/',
    sameSite: 'None',
    secure: true,
    value: 'f9c04f6b-50cb-4c3a-b85e-99b4227b7366|1',
  },
  {
    domain: '.wix.com',
    httpOnly: false,
    name: '__utmc',
    path: '/',
    secure: false,
    value: '248670552',
  },
  {
    domain: '.wix.com',
    expiry: 1699351374,
    httpOnly: false,
    name: '__utma',
    path: '/',
    secure: false,
    value: '248670552.530188244.1636279332.1636279374.1636279374.1',
  },
  {
    domain: '.wix.com',
    expiry: 1644055381,
    httpOnly: false,
    name: '_fbp',
    path: '/',
    sameSite: 'Lax',
    secure: false,
    value: 'fb.1.1636279335135.2131360559',
  },
  {
    domain: '.wix.com',
    expiry: 1642068171,
    httpOnly: false,
    name: 'wixClient',
    path: '/',
    sameSite: 'None',
    secure: true,
    value:
      'danielmashukov||VERIFIED_OPT_IN|0|1636279371675|1642068171675|6d33b2c3-c5f3-4b61-845f-c8cadab74bdc|{}|wix',
  },
  {
    domain: '.wix.com',
    expiry: 1636279957,
    httpOnly: false,
    name: '_px3',
    path: '/',
    sameSite: 'Lax',
    secure: false,
    value:
      '5e7b94eec7c8b3ebe2bba47d38806f37ffdeb9384bf1e42c4de4124fbbd278a0:QXpSCie2Rh9SGUcM6XTYGXwlJGIwGd/dAeKxitjVyrY1EkbUCyPOMpMYqDCWHBmfznrj2Dms/+ziJH4BxrwFug==:1000:hMqvR8dWd5Jqn+TwRCZt10cACRI0x7OQuOWgje/5jkfT3RXgoJSP49Qr4/upoodeEd3FAlf+1ivAyo8jPwmjZAnm/RA5c77ij531K+xqe4VgCCmhmhS6MtDucyO5yUXarAzUlYhg8XmaOJd5wWz2ubXVYWOjDJKLhQ1oGP3HPzIDhZ0QMgYxSJIpBtyKYsR9bryDBDYO4hZufNOqJUOzmg==',
  },
  {
    domain: '.wix.com',
    expiry: 1644055330,
    httpOnly: false,
    name: '_wixCIDX',
    path: '/',
    sameSite: 'None',
    secure: true,
    value: '5730346a-24b4-4fec-b205-50d0cc73f366',
  },
  {
    domain: '.wix.com',
    expiry: 1636365774,
    httpOnly: false,
    name: '_gid',
    path: '/',
    secure: false,
    value: 'GA1.2.1038322860.1636279332',
  },
  {
    domain: '.wix.com',
    expiry: 1644055371,
    httpOnly: false,
    name: 'userType',
    path: '/',
    secure: false,
    value: 'REGISTERED',
  },
  {
    domain: '.wix.com',
    expiry: 1793959371,
    httpOnly: false,
    name: 'wixLanguage',
    path: '/',
    sameSite: 'Lax',
    secure: false,
    value: 'en',
  },
  {
    domain: '.wix.com',
    expiry: 1644055371,
    httpOnly: false,
    name: '_wixUIDX',
    path: '/',
    sameSite: 'None',
    secure: true,
    value: '379289189|6d33b2c3-c5f3-4b61-845f-c8cadab74bdc',
  },
  {
    domain: '.wix.com',
    httpOnly: false,
    name: '_wix_browser_sess',
    path: '/',
    secure: false,
    value: 'e019a154-6205-4f37-b5c0-7e91ef135456',
  },
  {
    domain: '.wix.com',
    expiry: 1651831386,
    httpOnly: false,
    name: '_wixAB3',
    path: '/',
    secure: false,
    value: '290223#2|227997#2',
  },
  {
    domain: '.wix.com',
    httpOnly: false,
    name: 'XSRF-TOKEN',
    path: '/',
    sameSite: 'None',
    secure: true,
    value: '1636279328|QvYpF6z2sHOm',
  },
  {
    domain: '.wix.com',
    expiry: 1644055331,
    httpOnly: false,
    name: '_gcl_au',
    path: '/',
    secure: false,
    value: '1.1.1678577581.1636279332',
  },
  {
    domain: '.wix.com',
    expiry: 1642068171,
    httpOnly: true,
    name: 'wixSession2',
    path: '/',
    sameSite: 'None',
    secure: true,
    value:
      'JWT.eyJraWQiOiJrdU42YlJQRCIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1widXNlckd1aWRcIjpcIjZkMzNiMmMzLWM1ZjMtNGI2MS04NDVmLWM4Y2FkYWI3NGJkY1wiLFwidXNlck5hbWVcIjpcImRhbmllbG1hc2h1a292XCIsXCJjb2xvcnNcIjp7fSxcInVjZFwiOlwiMjAyMS0xMS0wMVQxMjozNToyNS4wMDArMDAwMFwiLFwid3hzXCI6ZmFsc2UsXCJld3hkXCI6ZmFsc2UsXCJhb3JcIjp0cnVlLFwiYWNpXCI6XCI2ZDMzYjJjMy1jNWYzLTRiNjEtODQ1Zi1jOGNhZGFiNzRiZGNcIixcInJtYlwiOnRydWUsXCJsdmxkXCI6XCIyMDIxLTExLTA3VDEwOjAyOjUxLjY1NiswMDAwXCIsXCJsYXRoXCI6XCIyMDIxLTExLTA3VDEwOjAyOjUxLjY1NiswMDAwXCIsXCJ3eGV4cFwiOlwiMjAyMS0xMS0yMlQxMDowMjo1MS42NzQrMDAwMFwifSIsImlhdCI6MTYzNjI3OTM3MSwiZXhwIjoxNjM3NTc1MzcxfQ.e_z-MUO_xW9sm0lewsjZZwxZwJHCCJATd-IMcz5Ip2wqzrHplOn9VMZeoUDVx9AFLbfhYZKhxb_p3DM8qkA9inEhFAAs_RVK1ULCW_CWTNGeeuLedHQpcJ-wFFLEvQ2JFuY48OOAhsYM5ZjjAvE-e24gDUSbQSfuuLt5buqsfFnwFDXeFq2p37yrv3c4yQbCo1VrdmCgbcR5duLguX6Z9dC499V-UtbN7IRqua5PbslZVoe07ZYC0XPFbKjmYCzTVs7XTr0psTBPibl_2nbqmwEhdhVKk7GbmhbJf8fE86ZQNRcemAApt2Lz0ZEQxGrZmXkAgD54u97H6hLIZCP1jg',
  },
  {
    domain: '.wix.com',
    expiry: 1636281174,
    httpOnly: false,
    name: '__utmb',
    path: '/',
    secure: false,
    value: '248670552.1.10.1636279374',
  },
  {
    domain: '.wix.com',
    expiry: 1667815331,
    httpOnly: false,
    name: '_pxvid',
    path: '/',
    sameSite: 'Lax',
    secure: false,
    value: 'c6a03d57-3fb1-11ec-bb95-456f6968754a',
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

    await sleep(3000);

    await selectFrame();

    await executeScript(builderScript, builderComponents);
  } catch (error) {
    console.error(error);
  } finally {
    //await driver.quit();
  }
};

const createButtonForBuilder = (button) => {
  const buttonStyle = button.style;

  return {
    componentType: 'wixui.StylableButton',
    style: {
      style: {
        properties: {
          '$st-css': `$st-css": ":import{\n    -st-from: 'wix-ui-santa/index.st.css';\n    -st-named: StylableButton\n}\n.root{\n    -st-extends: StylableButton;\n    transition: all 0.2s ease, visibility 0s;\n    border-radius: ${buttonStyle.borderRadius};\n    background: ${buttonStyle.backgroundColor};\n    border: ${buttonStyle.border}\n}\n.root:hover{\n    border: 0px solid rgb(0,0,0);\n    background: ${buttonStyle.hover.backgroundColor}\n}\n.root:hover::label{\n    color: value(site_1_5)\n}\n.root:disabled{\n    background: #E2E2E2\n}\n.root:disabled::label{\n    color: #8F8F8F\n}\n.root:disabled::icon{\n    fill: #8F8F8F\n}\n.root::container{\n    transition: inherit\n}\n.root::label{\n    transition: inherit;\n    margin: 0px 4px 0px 0px;\n    letter-spacing: 0.1em;\n    color: value(site_1_1);\n    font-size: ${buttonStyle.fontSize};\n    font-weight: normal;\n    font-style: normal;\n    font-family: futura-lt-w01-book,futura-lt-w05-book,sans-serif\n}\n.root::icon{\n    transition: inherit;\n    width: 10px;\n    height: 10px;\n    margin: 0px 0px 0px 4px;\n    fill: value(site_1_1);\n    display: none\n}\n.root:hover::icon{\n    fill: value(site_1_5)\n}`,
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
  builderJSON.map((item) =>
    item.type === 'button'
      ? createButtonForBuilder(item)
      : item.type === 'text'
      ? createTextForBuilder(item)
      : null
  );

// const createExecutableScript = (component) => {
//   documentServices.components.add({ id: 'c1dmp', type: 'DESKTOP' }, component);
// };

export const runBuilder = async (builderJSON) => {
  console.log('builder has started..');

  // await build(
  //   createExecutableScript(createComponentsForBuilder(builderJSON.components))
  // );

  //console.log(builderJSON);

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
