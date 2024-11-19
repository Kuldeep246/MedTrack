export interface UserSession {
    user: {
        id: string;
        admin: boolean;
        name: string;
        email: string;
        image: string;
        
    };
}

export interface UserToken {
    sub: string;
    name: string;
    email: string;
    picture: string;
    iat: number;
    exp: number;
    jti: string;
}
