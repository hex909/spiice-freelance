export interface ClerkAuthError {
  status: number;
  clerkError: boolean;
  errors?: ErrorsEntity[] | null;
}
export interface ErrorsEntity {
  code: string;
  message: string;
  longMessage: string;
  meta: Meta;
}
export interface Meta {
  paramName: string;
}
