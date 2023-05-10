import { firstLevelRouteId } from "../interfaces/firstLevelRoute.interface";

export const firstLevelRoute = [
  { route: 'shop', name: 'магазин', id: firstLevelRouteId.shop, isNavLink: true },
  { route: 'cases', name: 'Кейсы', id: firstLevelRouteId.cases, isNavLink: true },
  { route: 'inventory', name: 'Инвентарь', id: firstLevelRouteId.inventory, isNavLink: true },
  { route: 'profile', name: 'Профиль', id: firstLevelRouteId.profile, isNavLink: false },
  { route: 'settings', name: 'Настройки', id: firstLevelRouteId.settings, isNavLink: false },
];

export const pushUrlAuthParams = (params: 'registration' | 'signup', router) => {
  router.push({
    pathname: '/auth',
    query: { name: params }
  });
};