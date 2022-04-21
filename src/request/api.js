import request from './request'

// export const RegisterApi =(params)=>{ request.post('/register',params)}

// export const LoginApi =(params)=>{ request.post('/login',params)}


export const RegisterApi = (params) => request.post('/register', params)

// 登录
export const LoginApi = (params) => request.post('/login', params)


//请求文章列表
export const ArticleListApi = (params) => request.get('/article', {params})

//添加文章
export const ArticleAddApi = (params) => request.post('/article/add',params)

// 查看文章
export const ArticleSearchApi = (params) => request.get(`/article/${params.id}`)

//重新提交文章
export const ArticleUpdateApi = (params) => request.put('/article/update',params)

//删除文章
export const ArticleDelApi = (params) => request.post('/article/remove',params)

//获取用户资料
export const UserSearchApi = () => request.get('/info')

//更新用户资料
export const UserUpdateApi = (params) => request.put('/info',params)
