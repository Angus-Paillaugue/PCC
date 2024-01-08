/** @type {import('./$types').LayoutLoad} */
export async function load({ data }) {
  return {
    ...data,
    getBrowserType: () => {
      const test = (regexp) => {
        return regexp.test(navigator.userAgent);
      };
      if (test(/opr\//i) || !!window.opr) {
        return 'opera';
      } else if (test(/edg/i)) {
        return 'edge';
      } else if (test(/chrome|chromium|crios/i)) {
        return 'chrome';
      } else if (test(/firefox|fxios/i)) {
        return 'firefox';
      } else if (test(/safari/i)) {
        return 'safari';
      } else if (test(/trident/i)) {
        return 'ie';
      } else if (test(/ucbrowser/i)) {
        return 'uc';
      } else if (test(/samsungbrowser/i)) {
        return 'samsung';
      } else {
        return 'Unknown';
      }
    },
  };
}
