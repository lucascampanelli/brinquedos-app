'use-strict';



// Nome do cache que será guardado
const CACHE_NAME = "brinquedo-app-estatico";

// Arquivos que serão armazenados em cache
const FILES_TO_CACHE = [

    'css/bootstrap.min.css',
    'css/styles.css',
    'icons/bx-child.svg',
    'imgs/favicon.ico',
    'imgs/logo.webp',
    'js/app.js',
    'js/bootstrap.bundle.min.js',
    'offline.html'

];



// Instalação do Service Worker

// Adicionando função ao evento "install" do componente que roda este script
self.addEventListener('install', (evento) => {

    console.log("Service Worker em instalação");


    evento.waitUntil(

        caches.open(CACHE_NAME).then((cache) => {

            console.log("Service Worker está adicionando o cache estático");

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});



// Ativando o Service Worker

// Adicionando uma função ao evento 'Activate' do componente que está rodando este script
self.addEventListener('activate', (evt) => {

    console.log("Service Worker em ativação");

    evt.waitUntil(

        caches.keys().then(keyList => {

            return Promise.all(keyList.map((key) => {

                if(key !== CACHE_NAME) {

                    return caches.delete(key);

                }

            }))

        })

    )

    self.clients.claim();

});



// Responder página offline do app

// Adicionando uma função ao evento "fetch" do componente que está rodando este script
self.addEventListener("fetch", (evento) => {

    if(evento.request.mode != "navigate")
        return;

    evento.respondWith(

        fetch(evento.request).catch(() => {

            return caches.open(CACHE_NAME).then((cache) => {
                
                return cache.match('offline.html');

            })

        })

    )

})