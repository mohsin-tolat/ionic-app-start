import { environment } from 'src/environments/environment';

export const AppConfig = {
  hostingEnvironment: environment.hostingEnvironment,
  API_ENDPOINT_PREFIX: environment.ApiEndPoint,
  Environment_Config: {
    Production: environment.production,
  },
};

export const UrlConfig = {
  GET_ALL_NEW_POSTS_URL:
    AppConfig.API_ENDPOINT_PREFIX + 'api/Post/GetAllNewPosts/',
};
