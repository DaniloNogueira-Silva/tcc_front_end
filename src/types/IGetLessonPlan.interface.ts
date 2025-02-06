import { IGetClassesResponse } from "./IGetClasses.interface";
import { IGetUserResponse } from "./IGetUser.interface";

export interface IGetLessonPlanResponse {
  id: string;
  name: string;
  theme: string;
  classes?: IGetClassesResponse[];
  teacher?: IGetUserResponse;
}
