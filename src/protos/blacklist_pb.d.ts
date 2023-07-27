// package: blacklist
// file: blacklist.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetBlackListRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBlackListRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBlackListRequest): GetBlackListRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBlackListRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBlackListRequest;
    static deserializeBinaryFromReader(message: GetBlackListRequest, reader: jspb.BinaryReader): GetBlackListRequest;
}

export namespace GetBlackListRequest {
    export type AsObject = {
    }
}

export class GetBlackListReply extends jspb.Message { 
    getIps(): string;
    setIps(value: string): GetBlackListReply;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBlackListReply.AsObject;
    static toObject(includeInstance: boolean, msg: GetBlackListReply): GetBlackListReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBlackListReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBlackListReply;
    static deserializeBinaryFromReader(message: GetBlackListReply, reader: jspb.BinaryReader): GetBlackListReply;
}

export namespace GetBlackListReply {
    export type AsObject = {
        ips: string,
    }
}

export class PutBlackListRequest extends jspb.Message { 
    getIp(): string;
    setIp(value: string): PutBlackListRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PutBlackListRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PutBlackListRequest): PutBlackListRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PutBlackListRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PutBlackListRequest;
    static deserializeBinaryFromReader(message: PutBlackListRequest, reader: jspb.BinaryReader): PutBlackListRequest;
}

export namespace PutBlackListRequest {
    export type AsObject = {
        ip: string,
    }
}

export class PutBlackListReply extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PutBlackListReply.AsObject;
    static toObject(includeInstance: boolean, msg: PutBlackListReply): PutBlackListReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PutBlackListReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PutBlackListReply;
    static deserializeBinaryFromReader(message: PutBlackListReply, reader: jspb.BinaryReader): PutBlackListReply;
}

export namespace PutBlackListReply {
    export type AsObject = {
    }
}
