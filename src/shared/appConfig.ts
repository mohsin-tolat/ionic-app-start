import { environment } from './../environments/environment';

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
  GET_UserListBasedOnSearch:
    AppConfig.API_ENDPOINT_PREFIX + 'api/User/GetUserDetailsBasedOnSearch',
  POST_FollowUser: AppConfig.API_ENDPOINT_PREFIX + 'api/User/FollowUser',
  POST_UnFollowUser: AppConfig.API_ENDPOINT_PREFIX + 'api/User/UnFollowUser',
  GET_UserDetails: AppConfig.API_ENDPOINT_PREFIX + 'api/User/GetUserDetails',
  GET_AllOpenPosts: AppConfig.API_ENDPOINT_PREFIX + 'api/Post/GetAllOpenPosts',
  GET_PostByHashId: AppConfig.API_ENDPOINT_PREFIX + 'api/Post/GetPostByHashId',
  POST_UploadPost: AppConfig.API_ENDPOINT_PREFIX + 'api/Post/UploadPost',
  GET_CurrentUserProfile:
    AppConfig.API_ENDPOINT_PREFIX + 'api/User/GetCurrentUserProfile',
  DELETE_PostFromDatabaseAndStorage:
    AppConfig.API_ENDPOINT_PREFIX + 'api/Post/DeletePostByHashId',
};
