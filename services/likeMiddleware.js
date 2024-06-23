import { MiddlewareAPI } from 'redux';
import { GetTokenFromLocalStorage } from './GetToken';
import { getCookie } from 'cookies-next';

const authMiddleware = () => (next) => (action) => {
  const token = getCookie("token");

  // Daftar aksi yang memerlukan autentikasi
  const actionsRequiringAuth = [
    'LIKE_RECIPE_REQUEST',
    'SAVE_RECIPE_REQUEST',
    'FETCH_LIKED_RECIPES_REQUEST',
    'FETCH_SAVED_RECIPES_REQUEST',
  ];

  // Cek apakah aksi memerlukan autentikasi dan token tidak tersedia
  if (actionsRequiringAuth.includes(action.type) && !token) {
    alert('Anda harus login terlebih dahulu untuk melakukan aksi ini.');
    return; // Menghentikan eksekusi aksi jika tidak ada token
  }

  // Lanjutkan eksekusi aksi
  next(action);
};

export default authMiddleware;
