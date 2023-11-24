export enum RolesType {
  owner = 'owner',
  admin = 'admin',  
}

 export type UserRoleType = Record<string, Record<string, RolesType>>;

 export type FamilyGroupRoleType = Record<string, Record<string, RolesType>>;

 export type EnhancedFamilyGroupRoleType = Record<string, RolesType>;
