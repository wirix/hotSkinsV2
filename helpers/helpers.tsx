import { firstLevelRouteId } from "../interfaces/firstLevelRoute.interface";
import { csgoItem, shopData } from "../interfaces/items.interface";

export const firstLevelRoute = [
  { route: 'shop', name: 'магазин', id: firstLevelRouteId.shop, isNavLink: true },
  { route: 'cases', name: 'Кейсы', id: firstLevelRouteId.cases, isNavLink: true },
  { route: 'inventory', name: 'Инвентарь', id: firstLevelRouteId.inventory, isNavLink: true },
  { route: 'profile', name: 'Профиль', id: firstLevelRouteId.profile, isNavLink: false },
  { route: 'settings', name: 'Настройки', id: firstLevelRouteId.settings, isNavLink: false },
  { route: 'auth', name: 'Настройки', id: firstLevelRouteId.auth, isNavLink: false },
];

export const pushUrlAuthParams = (params: 'registration' | 'signup', router) => {
  router.push({
    pathname: '/auth',
    query: { name: params }
  });
};

export const flattenArrayOfObject = (inventory: shopData): csgoItem[] => {
  return Object.values(inventory).flatMap(itemShop => itemShop);
};

export const setFirstUpperLetter = (str: string):string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};