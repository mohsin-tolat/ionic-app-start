import { PostDto } from './postDto';
import { UserDto } from './userDto.model';

export class CommentDto {
  public commentHashId: string;
  public commentedBy: UserDto;
  public postDetails: PostDto;
  public commentedOn: string;
  public content: string;
}
