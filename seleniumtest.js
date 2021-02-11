/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */


/*eslint no-undef: "error"*/
/*eslint-env node*/
const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
const puppeteer = require('puppeteer');
const vivaldi = require('vivaldi-cookies-secure');
const cookies_json = require('./cookiesYounesse.json');

const url = 'https://fr.indeed.com/?r=us/';

const getCookies = (callback) => {
  const cookies = cookies_json;

  callback(cookies);
};




// let stat = await page.goto( initialPage, { 'waitUntil' : 'domcontentloaded' } );

// // Click on selector 1 - works ok

// selector = selectors[0];
// await page.waitForSelector( selector );
// handles = await page.$$( selector );
// handle = handles[12];
// console.log( 'Clicking on: ', await page.evaluate( el => el.href, handle ) );
// await handle.click();  // OK

// await page.waitForNavigation();


getCookies(async (cookies) => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1366,
    height: 768
  });

  try {
    await page.setCookie(...cookies);
  } catch (e) {
    console.log(e);

  }
  // dropdown-button dd-target dd-active
  // dropdown-content dd-menu
  // rbptk('rb', 'jobtype', '3');
  // <a href="/emplois?q=(r%C3%A9seaux+or+D%C3%A9veloppement+or+Javascript+or+Python+or+S%C3%A9curit%C3%A9+or+Syst%C3%A8me)&amp;l=Paris+(75)&amp;jt=internship&amp;fromage=last" rel="" role="menuitem">
  // <span class="rbLabel">Stage</span>
  // <span class="rbLabel">
  // &nbsp;(4203)</span></a>

  const SearchSelector = 'ul#icl-NavigationList-items-Homepage li.icl-NavigationList-item:first-child a';
  const StageSelector = "li[onmousedown=\"rbptk('rb', 'jobtype', '3');\"] a";
  const FilterSelector = '#filter-job-type button';
  await page.goto("https://fr.indeed.com/?r=us/");
  // Create a Map object
  // const [response] = await Promise.all([
  const link = await page.$(SearchSelector);
  const text = await (await link.getProperty('textContent')).jsonValue();
  console.log(text);


  await link.click();
  await page.waitForSelector(FilterSelector);

  const FilterLink = await page.$(FilterSelector);

  await FilterLink.click();
  await page.waitForSelector(StageSelector);


  const stageLink = await page.$(StageSelector);
  await stageLink.click();
  // page.waitForNavigation(); // The promise resolves after navigation has finished
  // page.waitForTimeout(2000)
  // .then(() => console.log('Waited a second!'));
  // page.waitForNavigation(); // The promise resolves after navigation has finished

  // page.click("li.icl-NavigationList-item");
  // ]);
  // await page.evaluate(() => window.map = new Map());
  // // Get a handle to the Map object prototype
  // const mapPrototype = await page.evaluateHandle(() => Map.prototype);
  // // Query all map instances into an array
  // const mapInstances = await page.queryObjects(mapPrototype);
  // // Count amount of map objects in heap
  // const count = await page.evaluate(maps => maps.length, mapInstances);
  // await mapInstances.dispose();
  // await mapPrototype.dispose();
  // console.log({'mapInstances' : JSON.stringify(mapInstances), 'mapPrototype': JSON.stringify(mapPrototype)});
  // html = await page.evaluate('() => document.body.innerHTML'):
  // await page.close()
  // await browser.close()
  // browser.close();
});
// Here we wait for the myfunction to finish
// and then returns a promise that'll be waited for aswell
// It's useless to wait the myfunction to finish before to return
// we can simply returns a promise that will be resolved later

// Also point that we don't use async keyword on the function because
// we can simply returns the promise returned by myfunction

// Call start