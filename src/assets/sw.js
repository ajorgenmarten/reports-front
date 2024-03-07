
self.addEventListener("push", e => {
    self.registration.showNotification('title',{
        body: e.data.message,
        icon: './images/login.jpg'
    })
})