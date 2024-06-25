# Recipe

<p align="center">
  <img src="public/assets/logo.png" alt="Logo" />
</p>

## Table of Content

- [About The Project](#about-the-project)
- [Usage](#usage)
- [Installation](#installation)
- [Documentation](#documentation)
- [Visit](#visit)
- [Other References](#other-references)

## About The Project
Recipe merupakan website untuk eksplorasi tentang berbagai resep makanan, selain itu user juga bisa berbagi resep yang sudah dibuat agar bisa dilihat banyak orang. pengguna juga bisa menandai resep yang disukai dan ingin disimpan jika ingin melihat resep tersebut di lain waktu.

## Usage
This website is built using [Vite + React](https://vitejs.dev/) the next-js framework. The web design and responsiveness are achieved with [Tailwind](https://tailwindcss.com/). For API management, the website utilizes the [Axios Library](https://axios-http.com/) to ensure neatness and efficiency. The site employs [react-redux](https://react-redux.js.org/) for state management, making the state flow cleaner, more efficient, and easier to control. For routing, the website uses the [react-router-dom](https://reactrouter.com/en/main) library to simplify the routing process. website ini menggunakan library cookie-next untuk menyimpan token yang digunakan sebagai data autentikasi ke dalam cookies.

## Installation

Steps to install and set up this project on your local machine.

1. Clone the repository:
    ```bash
    git clone https://github.com/nizuma666/recipe-next-js.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

## Usage

- Run the following command to start the project:
    ```bash
    npm run dev
    ```
    or
    ```bash
    yarn dev
    ```

## Documentation
### 1. Landing Page
This is the first page visited when accessing Peworld.
![landing-desktop](public/doc-readme-reipe/dashboard.png)

### 2. Login
Halaman login membutuhkan email dan password sebagai akses untuk menambah, like, save suatu recipe serta mengunjungi profil. button login akan enable jika semua form sudah diisi.
![login](public/doc-readme-reipe/login.png)

### 4. Register
Halaman register ini membutuhkan beberapa data yang wajib diisi dan button akan enable jika sudah semua form diisi.
![register](public/doc-readme-reipe/register.png)

### 5. Profile
Halaman ini berisi tentang list recipe yang sudah dibuat, list recipe yang disukai serta recipe yang sudah disimpan. list recipe yang sudah dibuat terdapat fitur untuk mengedit dan menghapus recipe, untuk list like dan save terdapat fitur untuk menghapus recipe yang sebelumnya sudah di like maupun save.
![profile](public/doc-readme-reipe/profile.png)

### 6. Add & Edit Recipe
Halaman ini berisi form yang dibutuhkan untuk menambah recipe. ketika ingin mengedit recipe yang sudah dibuat juga akan ditampilkan halaman dengan form yang sama.
![add-edit-recipe](public/doc-readme-reipe/add-edit-recipe.png)

### 7. Detail Recipe
Halaman ini berisi detail informasi tentang recipe yang dikunjungi. pada halaman ini terdapat fitur untuk like dan save namun harus login terlebih dahulu.
![detailrecipe](public/doc-readme-reipe/detail-recipe.png)

## Visit
If you are interested in seeing the website directly, please visit [this link](https://recipe-alpha-vert.vercel.app/).

## Other References
- :rocket: [HTML](https://www.duniailkom.com/tutorial-belajar-html-dan-index-artikel-html/)
- :rocket: [CSS](https://www.duniailkom.com/tutorial-belajar-css-dan-index-artikel-css/)
- :rocket: [Javascript](https://www.duniailkom.com/tutorial-belajar-javascript-dan-index-artikel-javascript/)
- 🚀 [Cookie-Next](https://www.npmjs.com/package/cookies-next)
