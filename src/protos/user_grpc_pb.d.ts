// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as user_pb from "./user_pb";

interface IUserService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    signIn: IUserService_ISignIn;
    signUp: IUserService_ISignUp;
    signOut: IUserService_ISignOut;
    resetPassword: IUserService_IResetPassword;
    changeEmail: IUserService_IChangeEmail;
}

interface IUserService_ISignIn extends grpc.MethodDefinition<user_pb.SignInSignUpRequest, user_pb.UserResponse> {
    path: "/user.User/SignIn";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.SignInSignUpRequest>;
    requestDeserialize: grpc.deserialize<user_pb.SignInSignUpRequest>;
    responseSerialize: grpc.serialize<user_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserResponse>;
}
interface IUserService_ISignUp extends grpc.MethodDefinition<user_pb.SignInSignUpRequest, user_pb.UserResponse> {
    path: "/user.User/SignUp";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.SignInSignUpRequest>;
    requestDeserialize: grpc.deserialize<user_pb.SignInSignUpRequest>;
    responseSerialize: grpc.serialize<user_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserResponse>;
}
interface IUserService_ISignOut extends grpc.MethodDefinition<user_pb.EmptyRequest, user_pb.EmptyResponse> {
    path: "/user.User/SignOut";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.EmptyRequest>;
    requestDeserialize: grpc.deserialize<user_pb.EmptyRequest>;
    responseSerialize: grpc.serialize<user_pb.EmptyResponse>;
    responseDeserialize: grpc.deserialize<user_pb.EmptyResponse>;
}
interface IUserService_IResetPassword extends grpc.MethodDefinition<user_pb.EmailRequest, user_pb.UserResponse> {
    path: "/user.User/ResetPassword";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.EmailRequest>;
    requestDeserialize: grpc.deserialize<user_pb.EmailRequest>;
    responseSerialize: grpc.serialize<user_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserResponse>;
}
interface IUserService_IChangeEmail extends grpc.MethodDefinition<user_pb.EmailRequest, user_pb.UserResponse> {
    path: "/user.User/ChangeEmail";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.EmailRequest>;
    requestDeserialize: grpc.deserialize<user_pb.EmailRequest>;
    responseSerialize: grpc.serialize<user_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserResponse>;
}

export const UserService: IUserService;

export interface IUserServer {
    signIn: grpc.handleUnaryCall<user_pb.SignInSignUpRequest, user_pb.UserResponse>;
    signUp: grpc.handleUnaryCall<user_pb.SignInSignUpRequest, user_pb.UserResponse>;
    signOut: grpc.handleUnaryCall<user_pb.EmptyRequest, user_pb.EmptyResponse>;
    resetPassword: grpc.handleUnaryCall<user_pb.EmailRequest, user_pb.UserResponse>;
    changeEmail: grpc.handleUnaryCall<user_pb.EmailRequest, user_pb.UserResponse>;
}

export interface IUserClient {
    signIn(request: user_pb.SignInSignUpRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    signIn(request: user_pb.SignInSignUpRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    signIn(request: user_pb.SignInSignUpRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    signUp(request: user_pb.SignInSignUpRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    signUp(request: user_pb.SignInSignUpRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    signUp(request: user_pb.SignInSignUpRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    signOut(request: user_pb.EmptyRequest, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    signOut(request: user_pb.EmptyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    signOut(request: user_pb.EmptyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    resetPassword(request: user_pb.EmailRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    resetPassword(request: user_pb.EmailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    resetPassword(request: user_pb.EmailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    changeEmail(request: user_pb.EmailRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    changeEmail(request: user_pb.EmailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    changeEmail(request: user_pb.EmailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
}

export class UserClient extends grpc.Client implements IUserClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public signIn(request: user_pb.SignInSignUpRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public signIn(request: user_pb.SignInSignUpRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public signIn(request: user_pb.SignInSignUpRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public signUp(request: user_pb.SignInSignUpRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public signUp(request: user_pb.SignInSignUpRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public signUp(request: user_pb.SignInSignUpRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public signOut(request: user_pb.EmptyRequest, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public signOut(request: user_pb.EmptyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public signOut(request: user_pb.EmptyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.EmptyResponse) => void): grpc.ClientUnaryCall;
    public resetPassword(request: user_pb.EmailRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public resetPassword(request: user_pb.EmailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public resetPassword(request: user_pb.EmailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public changeEmail(request: user_pb.EmailRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public changeEmail(request: user_pb.EmailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public changeEmail(request: user_pb.EmailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
}
