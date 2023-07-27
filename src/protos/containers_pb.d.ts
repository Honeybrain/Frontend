// package: containers
// file: containers.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ContainersRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContainersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ContainersRequest): ContainersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContainersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContainersRequest;
    static deserializeBinaryFromReader(message: ContainersRequest, reader: jspb.BinaryReader): ContainersRequest;
}

export namespace ContainersRequest {
    export type AsObject = {
    }
}

export class Container extends jspb.Message { 
    getName(): string;
    setName(value: string): Container;
    getStatus(): string;
    setStatus(value: string): Container;
    getIp(): string;
    setIp(value: string): Container;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Container.AsObject;
    static toObject(includeInstance: boolean, msg: Container): Container.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Container, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Container;
    static deserializeBinaryFromReader(message: Container, reader: jspb.BinaryReader): Container;
}

export namespace Container {
    export type AsObject = {
        name: string,
        status: string,
        ip: string,
    }
}

export class ContainersReply extends jspb.Message { 
    clearContainersList(): void;
    getContainersList(): Array<Container>;
    setContainersList(value: Array<Container>): ContainersReply;
    addContainers(value?: Container, index?: number): Container;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ContainersReply.AsObject;
    static toObject(includeInstance: boolean, msg: ContainersReply): ContainersReply.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ContainersReply, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ContainersReply;
    static deserializeBinaryFromReader(message: ContainersReply, reader: jspb.BinaryReader): ContainersReply;
}

export namespace ContainersReply {
    export type AsObject = {
        containersList: Array<Container.AsObject>,
    }
}
