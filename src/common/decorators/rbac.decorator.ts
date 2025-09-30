import {SetMetadata} from "@nestjs/common";

export enum EGroup {
  Blog = "Blog",
  User = "User",
}
export enum EPermission {
  Write = "Write",
  Read = "Read",
  Delete = "Delete",
  Update = "Update",
}
export const AccessGroupKey = "ACCESS_GROUP_KEY";
export const AccessGroup = (key: EGroup) => SetMetadata(AccessGroupKey, key);

export const AccessPermissionKey = "ACCESS_PERMISSION_KEY";
export const CanAccess = (key: EPermission) =>
  SetMetadata(AccessPermissionKey, key);

export const JustForCondition = () => SetMetadata("empty", undefined);
