function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

export const subscription = async () => {
    const register = await navigator.serviceWorker.register('/src/assets/sw.js')

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_PUBLIC_VAPID_KEY)
    })

    const rawState = localStorage.getItem('auth')
    const {state} = JSON.parse(rawState ?? '')
    

    await fetch(import.meta.env.VITE_BACKEND_URL + 'webpush/subscribe', {
        method: "post",
        headers: {
            'authorization': 'Bearer '+state.token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription),
        credentials: 'include'
    })

}