export class PostDto {
  // public id: number;
  public postHashId: string;
  public uploadBy: number;
  public contentLink: string;
  public isCurrentUserLikedPost: boolean;
  public uploadOn: string;
  public totalLikes: number;
  public uploadedByUserName: string;
  public uploadedUserAvatar: string;
  public totalComments: number;
  public uploadedByUserHashId: string;
}

export class UploadPostDto {
  public imageContent: string;
  public description: string;
}
