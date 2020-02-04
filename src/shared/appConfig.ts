import { environment } from './../environments/environment';

export const AppConfig = {
  hostingEnvironment: environment.hostingEnvironment,
  API_ENDPOINT_PREFIX: environment.ApiEndPoint,
  Environment_Config: {
    Production: environment.production,
  },
  Setting: {
    USER_PAGE_SIZE_FOR_LIST: 10,
    POST_PAGE_SIZE_FOR_DASHBOARD: 10,
    POST_PAGE_SIZE_FOR_USER_PROFILE: 15,
    ACTIVITIES_PAGE_SIZE: 100,
    COMMENTS_PAGE_SIZE: 10,
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
  GET_CurrentUserPostsActivities:
    AppConfig.API_ENDPOINT_PREFIX + 'api/Post/GetCurrentUserPostsActivities',
  GET_PostCommentsByPostHashId:
    AppConfig.API_ENDPOINT_PREFIX + 'api/Post/GetPostCommentsByPostHashId',
  POST_AddNewCommentForPost:
    AppConfig.API_ENDPOINT_PREFIX + 'api/Post/AddNewCommentForPost',
  DELETE_DeletePostCommentByPostHashId:
    AppConfig.API_ENDPOINT_PREFIX + 'api/Post/DeletePostCommentByPostHashId',
};
