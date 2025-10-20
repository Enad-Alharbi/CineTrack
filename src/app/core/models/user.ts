/**
 * Main User interface that defines the structure of a user in our application.
 * Contains all the data we need to store and manage for each user including
 * their personal information and movie/show lists.
 * 
 * IMPORTANT: This is for educational purposes only!
 * In a real application:
 * - Never store passwords in plain text
 * - Always use proper password hashing (e.g., bcrypt)
 * - Implement proper authentication with a secure backend
 * - Use HTTPS for all authentication requests
 */
export interface User {
  readonly id: string;
  email: string;
  password: string;      // For educational purposes only! Never store plain text passwords in real apps
  username: string;
  readonly createdAt: Date;
  lists: {
    readonly watchlist: number[];
    readonly watched: number[];
    readonly favorites: number[];
  };
}

/**
 * UserCredentials interface defines the data needed for user login.
 * Contains only the essential fields (email and password) required
 * for authentication.
 */
export interface UserCredentials {
  email: string;
  password: string;
}

/**
 * CreateUserDTO (Data Transfer Object) interface defines the data needed
 * when creating a new user (registration). Extends UserCredentials to include
 * username, which is required for registration but not for login.
 */
export interface CreateUserDTO extends UserCredentials {
  username: string;
}