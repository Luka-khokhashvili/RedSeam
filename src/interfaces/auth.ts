export interface RegisterBody {
  avatar: string | null;
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
}

export interface AuthResponseBody {
  user: {
    email: string;
    name: string;
    profile_photo: string;
    id: number;
  };
  token: string;
}

export interface LoginBody {
  email: string;
  password: string;
}
