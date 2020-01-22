import { environment } from 'src/environments/environment';

export const AppConfig = {
  hostingEnvironment: environment.hostingEnvironment,
  API_ENDPOINT_PREFIX: environment.ApiEndPoint,
  Environment_Config: {
    Production: environment.production,
  },
};

export const UrlConfig = {
  GET_AllNewPosts: AppConfig.API_ENDPOINT_PREFIX + 'api/Post/GetAllNewPosts',
  POST_AddNewUser: AppConfig.API_ENDPOINT_PREFIX + 'api/User/AddNewUser',
  POST_Authenticate: AppConfig.API_ENDPOINT_PREFIX + 'api/Login/Authenticate',
  GET_Check_Authorization:
    AppConfig.API_ENDPOINT_PREFIX + 'api/Login/CheckAuthorization',
  POST_LikeDislikePost:
    AppConfig.API_ENDPOINT_PREFIX + 'api/Post/LikeDislikePost',
};
