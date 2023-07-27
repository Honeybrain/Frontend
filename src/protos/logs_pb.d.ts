// package: logs
// file: logs.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class LogRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LogRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LogRequest): LogRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LogRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LogRequest;
    static deserializeBinaryFromReader(message: LogRequest, reader: jspb.BinaryReader): LogRequest;
}

export namespace LogRequest {
    export type AsObject = {
    }
}

export class LogReply extends jspb.Message { 
    getContent(): string;
    setContent(value: string): LogReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LogReply.AsObject;
    static toObject(includeInstance: boolean, msg: LogReply): LogReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LogReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LogReply;
    static deserializeBinaryFromReader(message: LogReply, reader: jspb.BinaryReader): LogReply;
}

export namespace LogReply {
    export type AsObject = {
        content: string,
    }
}
