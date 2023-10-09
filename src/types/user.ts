interface IUser {
  userName: string;
  email: string;
  photoURL: string;
  roles: string[];
  preferences: Record<string, any>;
}

export default IUser;
