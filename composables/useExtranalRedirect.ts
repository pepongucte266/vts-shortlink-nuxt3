export default function useExtranalRedirect(url: string, code: number = 302): Promise<void> {
  //check url valid
  if (/^https?:\/\//.test(url)) {
    //check if it inside server
    if(process.server) {
      const  nuxtApp = useNuxtApp();

      if(nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
        return nuxtApp.callHook("app:redirected").then(() => {
          if(nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
            return sendRedirect(nuxtApp.ssrContext.event, url, code);
          }
        });
      }
    } else {
      window.location.href = url;
    }
  }
  
  throw new Error('Invalid redirect')
}
