const domain = process.env.NEXT_PUBLIC_DOMAIN;
export const apiUrls = {
  shop: {
    getShopData: domain + 'shop'
  },
  cases: {
    getCasesData: domain + 'cases'
  },
  case: {
    getCaseDataById: (id) => domain + 'case/' + id 
  }
};