# Synapsis Test

Ini adalah project Single Page App menggunakan framework NEXT.js, 
project ini tentang blogs dan CRUD users yang diambil data nya dari gorest.co.in 

## Features

- Menampilkan data posts/ blogs dari fake API https://gorest.co.in/public/v2/posts menggunakan FETCH
- Menampilkan data comments yang sesuai dengan data posts dari fake API https://gorest.co.in/public/v2/comments menggunakan FETCH
- Menampilkan data users (READ) yang sesuai dengan data posts dari fake API https://gorest.co.in/public/v2/users/791 menggunakan AXIOS dan melakukan pagination
- Bisa menambahkan data user (CREATE) dengan fake API https://gorest.co.in/public/v2/users menggunakan AXIOS
- Bisa mengedit data user (UPDATE) dengan fake API https://gorest.co.in/public/v2/users menggunakan AXIOS
- Bisa menghapus data user (DELETE) dengan fake API https://gorest.co.in/public/v2/users menggunakan AXIOS
- Bisa mencari data user (SEARCH) secara Client Side

## Tech

This app uses several open-source projects to work correctly:

- [NEXT.js] - The React Framework for the Web
- [node.js] - evented I/O for the backend
- [Axios] - Promise based HTTP client for the browser and node.js
- [react-toastify] - A ReactJS component to render a notification
- [react-paginate] - A ReactJS component to render a pagination.
- [Visual Studio Code] - awesome text editor
- [markdown-it] - Markdown parser done right. Fast and easy to extend.

## Installation

This app requires [Node.js](https://nodejs.org/) v18+ to run.

```sh
npm install
```
## Run in production mode
```sh
npm run build
npm start
```
## Run in development mode
```sh
npm run dev
```

## License

MIT

**Free Software**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [NEXT.js]: <https://nextjs.org/>
   [node.js]: <https://nodejs.org/>
   [Axios]: <https://axios-http.com/docs/intro/>
   [Visual Studio Code]: <https://code.visualstudio.com/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [react-toastify]: <https://www.npmjs.com/package/react-toastify>
   [react-paginate]: <https://www.npmjs.com/package/react-paginate>
