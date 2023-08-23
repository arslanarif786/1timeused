const routes = [{
  path: '/login',
  component: () => import('src/pages/LoginPage.vue'),
},
{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [{
    path: '',
    component: () => import('pages/IndexPage.vue'),
  },
  {
    path: '/account',
    component: () => import('src/pages/AccountPage.vue')
  },
  {
    path: '/wishlist',
    component: () => import('src/pages/WishlistPage.vue')
  },
  {
    path: '/account_setting',
    component: () => import('src/pages/AccountSetting.vue'),
    meta: {
      auth: true
    }

  },
  {
    path: '/suggestion',
    component: () => import('src/pages/SuggestionPage.vue')
  },
  // { path: '/terms', component: () => import('src/pages/TermsPage.vue') },
  // { path: '/privacy_policy', component: () => import('src/pages/PrivacyPolicy.vue') },
  {
    path: '/about_us',
    component: () => import('src/pages/AboutUs.vue')
  },
  {
    path: '/category',
    component: () => import('src/pages/CategoryMobile.vue')
  },
  {
    path: '/seller_profile/:id',
    component: () => import('src/pages/SellerProfile.vue')
  },
  {
    path: '/donation',
    component: () => import('src/pages/DonationPage.vue')
  },
  {
    path: '/category/:slug',
    component: () => import('src/pages/SubCategory.vue')
  },
  {
    path: '/subcategory-product/:id',
    component: () => import('src/pages/SubCategoryProduct.vue')
  },
  {
    path: '/product_details/:slug',
    component: () => import('src/pages/ProductDetails.vue'),
  },
  {
    path: '/search',
    name: "Search",
    component: () => import('src/pages/SearchPage.vue')
  },
  {
    path: '/notifications',
    component: () => import('src/pages/NotificationPage.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/chat/:id?',
    component: () => import('src/pages/ChatNew.vue'),
    meta: {
      auth: true
    }
  },

  {
    path: '/my_products',
    component: () => import('src/pages/MyProducts.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/add_product',
    component: () => import('src/pages/ProductForm.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/edit_product/:id',
    name: "EditProduct",
    component: () => import('src/pages/ProductForm.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/card',
    component: () => import('src/pages/CardPage.vue')
  },

  ]
},
{
  path: '/signup',
  component: () => import('src/pages/SignupPage.vue'),
},
{
  path: '/forgot',
  component: () => import('src/pages/ForgotPassword.vue'),
},
{
  path: '/reset_password',
  component: () => import('src/pages/ResetPassword.vue'),
},

// Always leave this as last one,
{
  path: '/:catchAll(.*)*',
  component: () => import('pages/ErrorNotFound.vue')
}
]

export default routes
