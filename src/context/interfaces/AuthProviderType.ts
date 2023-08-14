import { UserInfo } from "./UserInfo";

export interface AuthProviderType {
    userInfo: UserInfo;
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}