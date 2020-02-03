import { PostDto } from './postDto';
import { UserDto } from './userDto.model';

export class ActivityDto {
  public post: PostDto;
  public activityDoneByUser: UserDto;
  public activityDoneOn: string;
  public isLike: boolean;
  public isComment: boolean;
}
