let XHRInterceptor: any = null;

try {
  XHRInterceptor = require('react-native/Libraries/Network/XHRInterceptor');
  // @typescript-eslint/no-unused-vars
} catch {
  try {
    XHRInterceptor = require('react-native/src/private/devsupport/devmenu/elementinspector/XHRInterceptor');
  } catch {}
}

export const XHRInterceptorBase = XHRInterceptor.default;
