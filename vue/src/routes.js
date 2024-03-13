export const routes = [
    {
        path: '/',
        component: () => import(/* webpackChunkName: "Common" */ './layouts/front/index.vue'),
        children: [
            {
                path: '/',
                component: () => import(/* webpackChunkName: "Common" */ '@/views/home.vue')
            },
            {
                path: 'estimate',
                component: () => import(/* webpackChunkName: "Common" */ '@/views/estimate.vue')
            },
            {
                path: 'solution',
                component: () => import(/* webpackChunkName: "Common" */ '@/views/solution.vue')
            },
            {
                path: 'suggestion',
                component: () => import(/* webpackChunkName: "Common" */ '@/views/suggestion.vue')
            },
            {
                path: 'message',
                component: () => import(/* webpackChunkName: "Common" */ '@/views/message.vue')
            },

            {
                path: 'auth',
                component: () => import(/* webpackChunkName: "Common" */ '@/layouts/empty.vue'),
                children: [
                    {
                        path: 'login',
                        component: () => import(/* webpackChunkName: "Common" */ '@/views/auth/Login.vue')
                    },
                    {
                        path: 'logout',
                        component: () => import(/* webpackChunkName: "Common" */ '@/views/auth/Logout.vue')
                    },
                    {
                        path: 'join',
                        component: () => import(/* webpackChunkName: "Common" */ '@/layouts/empty.vue'),
                        children: [
                            {
                                path: 'agree',
                                component: () => import(/* webpackChunkName: "Common" */ '@/views/auth/join/agree.vue')
                            },
                            {
                                path: 'form',
                                component: () => import(/* webpackChunkName: "Common" */ '@/views/auth/join/form.vue')
                            }
                        ]
                    },
                    {
                        path: 'find',
                        component: () => import(/* webpackChunkName: "Common" */ '@/layouts/empty.vue'),
                        children: [
                            {
                                path: 'id',
                                component: () => import(/* webpackChunkName: "Common" */ '@/views/auth/find/id.vue')
                            },
                            {
                                path: 'password',
                                component: () => import(/* webpackChunkName: "Common" */ '@/views/auth/find/password.vue')
                            }
                        ]
                    },
                    {
                        path: 'email_certification',
                        component: () => import(/* webpackChunkName: "Auth" */ '@/views/auth/EmailCertification.vue')
                    }
                ]
            },

            {
                path: 'mypage',
                component: () => import(/* webpackChunkName: "Common" */ '@/layouts/empty.vue'),
                children: [
                    {
                        path: 'home',
                        component: () => import(/* webpackChunkName: "Common" */ '@/views/mypage/home.vue')
                    },
                    {
                        path: 'update',
                        component: () => import(/* webpackChunkName: "Common" */ '@/views/mypage/update.vue')
                    }
                ]
            },

            {
                path: 'policy',
                component: () => import(/* webpackChunkName: "Common" */ '@/layouts/empty.vue'),
                children: [
                    {
                        path: 'privacy',
                        component: () => import(/* webpackChunkName: "Common" */ '@/views/policy/privacy.vue')
                    },
                    {
                        path: 'rule',
                        component: () => import(/* webpackChunkName: "Common" */ '@/views/policy/rule.vue')
                    },
                    {
                        path: 'emaildeny',
                        component: () => import(/* webpackChunkName: "Common" */ '@/views/policy/emaildeny.vue')
                    }
                ]
            },
        ]
    },

    // 관리자 페이지
    {
        path: '/admin',
        meta: { sitemap: { ignoreRoute: true } },
        component: () => import(/* webpackChunkName: "Admin" */ '@/layouts/admin/index.vue'),
        children: [
            // Auth
            {
                path: 'auth',
                component: () => import(/* webpackChunkName: "Admin" */ '@/layouts/empty.vue'),
                children: [
                    {
                        path: 'login',
                        component: () => import(/* webpackChunkName: "Admin" */ '@/views/admin/auth/login.vue')
                    },
                    {
                        path: 'logout',
                        component: () => import(/* webpackChunkName: "Admin" */ '@/views/admin/auth/logout.vue')
                    },
                ]
            },
            
            // 견적요청 관리
            {
                path: 'estimate',
                component: () => import(/* webpackChunkName: "Common" */ '@/views/admin/estimate.vue'),
            },

            // 제품/솔루션 관리
            {
                path: 'solution',
                component: () => import(/* webpackChunkName: "Common" */ '@/views/admin/solution.vue'),
            },

            // 배너 관리
            {
                path: 'banner',
                component: () => import(/* webpackChunkName: "Common" */ '@/views/admin/banner.vue'),
            },

            // 회원 관리
            {
                path: 'user',
                component: () => import(/* webpackChunkName: "Common" */ '@/views/admin/user.vue'),
            },

            // 관리자 정보수정
            {
                path: 'update',
                component: () => import(/* webpackChunkName: "Common" */ '@/views/admin/update.vue'),
            }
        ]
    }
]