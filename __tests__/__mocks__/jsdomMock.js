/*eslint-disable no-console */
const JSDOMEnvironment = require("jest-environment-jsdom");

module.exports = class CustomizedJSDomEnvironment extends JSDOMEnvironment {
  constructor(config) {
    const _config = Object.assign(config, {
      testEnvironmentOptions: {
        beforeParse(window) {
          window.document.childNodes.length === 0;
          window.alert = msg => {
            console.log(msg);
          };
          window.matchMedia = () => ({
            addListener: () => {},
            removeListener: () => {}
          });
          window.scrollTo = () => {};
        }
      }
    });
    super(_config);
    this.global.jsdom = this.dom;
  }

  teardown() {
    this.global.jsdom = null;
    return super.teardown();
  }
};
