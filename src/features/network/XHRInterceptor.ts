//@ts-ignore
import XHRInterceptorBase from 'react-native/Libraries/Network/XHRInterceptor';

type OriginalSendCallback = (data: any, xhr: any) => void;

type Params = { method: string; url: string };
export type SendCallback = (params: Params) => Partial<Params> | void;

const originalMethod = XHRInterceptorBase.setSendCallback;

class Interceptor {
  protected _sendCallbacks: OriginalSendCallback[] = [];

  constructor() {
    this.init();
  }

  protected init() {
    XHRInterceptorBase.enableInterception();

    XHRInterceptorBase.setSendCallback = (callback: OriginalSendCallback) => {
      this._sendCallbacks.push(callback);
      originalMethod((data: any, xhr: any) => {
        this._sendCallbacks.forEach((cb) => cb(data, xhr));
      });
    };
  }

  add(cb: SendCallback) {
    XHRInterceptorBase.setSendCallback((_: any, xhr: any) => {
      const { method, url } =
        cb({
          method: xhr._method,
          url: xhr._url,
        }) || {};
      xhr._method = method || xhr._method;
      xhr._url = url || xhr._url;
    });
  }

  remove(cb: SendCallback) {
    const index = this._sendCallbacks.findIndex((callback) => callback === cb);
    if (index !== -1) {
      this._sendCallbacks.splice(index, 1);
    }
  }
}

const XHRInterceptor = new Interceptor();

export default XHRInterceptor;
