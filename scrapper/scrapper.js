import { Builder, By, Key, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';

const opt = new Options();
//opt.headless();
const driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(opt)
  .build();
const actions = driver.actions({ async: true });

const textClasses = ['body', 'title'];
const buttonClasses = [];
//const textClasses = [];
const tagsToSearch = [];
//const buttonClasses = ['linkButton'];

//const tagsToSearch = ['img'];
//const tagsToSearch = ['img', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

const builderElementType = 'pagepadding';

const textTags = ['div'];
const linkTags = ['a'];
const buttonsTags = ['a'];
const imageTags = ['img'];

const hoverCssAttributes = ['backgroundColor'];

const nonTextCssAttributes = [
  'backgroundOpacity',
  'backgroundColor',
  'backgroundImage',
  'borderColor',
  'borderWidth',
  'borderRadius',
  'borderStyle',
  'shadow',
  'background',
  'color',
  'fontFamily',
  'fontSize',
  'border',
];
const textCssAttributes = [
  'color',
  'font-size',
  'font-family',
  'font-weight',
  'font-style',
  'text-align',
  'line-height',
  'text-decoration-line',
];

const imageAttributes = ['src'];

const linkAttributes = ['href'];

const convertArrayToObj = (array) => Object.assign({}, ...array);

const getElementTagName = async (element) => await element.getTagName();
const getElementLocation = async (element) => await element.getRect();

const getElementHoverStyle = async (element) => {
  const hoverStyle = {};
  for (const cssProp of hoverCssAttributes) {
    await actions.move({ origin: element }).perform();
    hoverStyle[cssProp] = await element.getCssValue(cssProp);
  }
  return hoverStyle;
};

const getElementType = (elementTagName) =>
  textTags.includes(elementTagName)
    ? 'text'
    : buttonsTags.includes(elementTagName)
    ? 'button'
    : elementTagName;

const getElementAttributes = async (element, elementStyle) => {
  const elementTagName = await getElementTagName(element);
  const elementLocation = await getElementLocation(element);

  const getAttributesArray = () => [
    ...(linkTags.includes(elementTagName) ? [...linkAttributes] : []),
    ...(imageTags.includes(elementTagName) ? [...imageAttributes] : []),
  ];

  const textAttributeStyle = Object.entries(elementStyle)
    .map(([cssProp, style]) => `${cssProp}:${style}`)
    .join(';');

  const buildTextAttribute = async () => {
    const childDomElements = (
      await element.getAttribute('innerHTML')
    ).replaceAll(/ class="[A-Za-z0-9]*"/g, '');

    const domElement = `<${elementTagName} style="${textAttributeStyle}">${childDomElements}<${elementTagName}/>`;
    return domElement.replace(/\s\s+/g, ' ');
  };

  const attributesArray = [];
  for (const attribute of getAttributesArray()) {
    attributesArray.push({
      [attribute]: await element.getAttribute(attribute),
    });
  }
  const elementType = getElementType(elementTagName);
  const elementAttributes = {
    type: elementType,
    style: {
      ...elementStyle,
      ...(elementType === 'button' && {
        hover: await getElementHoverStyle(element),
      }),
    },
    text: textTags.includes(elementTagName)
      ? await buildTextAttribute()
      : await element.getText(),
    x: elementLocation.x,
    y: elementLocation.y,
    height: elementLocation.height,
    width: elementLocation.width,
    'z-index': await element.getCssValue('z-index'),
    rotation: (await element.getCssValue('rotation')) || '0',
    ...convertArrayToObj(attributesArray),
  };
  return elementAttributes;
};

const getComponentCountMap = (elements) =>
  convertArrayToObj(
    Object.entries(elements).map(([tag, elements]) => ({
      [tag]: elements.length,
    }))
  );

const getElementCssAttributes = async (element, elementTagName) => {
  const cssAttributes = [];

  for (const cssProp of textTags.includes(elementTagName)
    ? textCssAttributes
    : nonTextCssAttributes) {
    cssAttributes.push({ [cssProp]: await element.getCssValue(cssProp) });
  }

  return convertArrayToObj(cssAttributes);
};

const buildElementObject = async (element) => {
  console.log('element', element);
  const elementTagName = await getElementTagName(element);

  const elementCssAttributes = await getElementCssAttributes(
    element,
    elementTagName
  );

  const elementAttributes = await getElementAttributes(
    element,
    elementCssAttributes
  );
  console.log('elementAttributes', elementAttributes);
  return;
  return elementAttributes;
};

const getBuilderObject = (url, componentCountMap, components) => {
  return {
    url,
    type: builderElementType,
    redirectUrl: url,
    componentCountMap,
    components: components.flat(),
  };
};

const getElementsObject = async (whatToSearch, getElements) => {
  const elements = [];
  for (const searchKey of whatToSearch) {
    elements.push(await getElements(searchKey));
  }

  return convertArrayToObj(elements);
};

const scrapUrl = async (url) => {
  console.log('scrapper has started..');

  const getElementsByClassName = async (className) => ({
    [className]: await driver.findElements(By.className(className)),
  });

  const getElementsByTag = async (tag) => ({
    [tag]: await driver.findElements(By.css(tag)),
  });

  try {
    await driver.get(url);

    const domElementsObject = await getElementsObject(
      tagsToSearch,
      getElementsByTag
    );
    const textElementsObject = await getElementsObject(
      textClasses,
      getElementsByClassName
    );

    const buttonElementsObject = await getElementsObject(
      buttonClasses,
      getElementsByClassName
    );

    const allElementsObject = {
      ...domElementsObject,
      ...textElementsObject,
      ...buttonElementsObject,
    };

    const componentCountMap = getComponentCountMap(allElementsObject);

    const elementAttributes = [];
    for (const elements of Object.values(allElementsObject)) {
      for (const element of elements) {
        elementAttributes.push(await buildElementObject(element));
      }
    }

    // const elementAttributes = await Promise.all(
    //   Object.values(allElementsObject).map(
    //     async (elements) =>
    //       await Promise.all(
    //         elements.map(async (element) => await buildElementObject(element))
    //       )
    //   )
    // );

    const builderObject = getBuilderObject(
      url,
      componentCountMap,
      elementAttributes
    );
    //console.log('builderObject', builderObject);
    console.log('scrapping complete..');
    return builderObject;
  } catch (error) {
    console.error(error);
  } finally {
    //await driver.quit();
  }
};

export const runScrapper = async (url) => await scrapUrl(url);
