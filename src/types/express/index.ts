export { };
// Use for decalare Type Requesr for passing middleware
declare global {
  namespace Express {
    export interface Request {
      uuid: string;
      email: string;
    }
  }
}
