// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class SignInSignUpRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): SignInSignUpRequest;
    getPassword(): string;
    setPassword(value: string): SignInSignUpRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SignInSignUpRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SignInSignUpRequest): SignInSignUpRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SignInSignUpRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SignInSignUpRequest;
    static deserializeBinaryFromReader(message: SignInSignUpRequest, reader: jspb.BinaryReader): SignInSignUpRequest;
}

export namespace SignInSignUpRequest {
    export type AsObject = {
        email: string,
        password: string,
    }
}

export class UserResponse extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): UserResponse;
    getToken(): string;
    setToken(value: string): UserResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UserResponse): UserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserResponse;
    static deserializeBinaryFromReader(message: UserResponse, reader: jspb.BinaryReader): UserResponse;
}

export namespace UserResponse {
    export type AsObject = {
        message: string,
        token: string,
    }
}

export class EmptyRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmptyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmptyRequest;
    static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
    export type AsObject = {
    }
}

export class EmptyResponse extends jspb.Message { 
    getMessage(): string;
    setMessage(value: string): EmptyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmptyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: EmptyResponse): EmptyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmptyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmptyResponse;
    static deserializeBinaryFromReader(message: EmptyResponse, reader: jspb.BinaryReader): EmptyResponse;
}

export namespace EmptyResponse {
    export type AsObject = {
        message: string,
    }
}

export class EmailRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): EmailRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EmailRequest.AsObject;
    static toObject(includeInstance: boolean, msg: EmailRequest): EmailRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EmailRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EmailRequest;
    static deserializeBinaryFromReader(message: EmailRequest, reader: jspb.BinaryReader): EmailRequest;
}

export namespace EmailRequest {
    export type AsObject = {
        email: string,
    }
}
