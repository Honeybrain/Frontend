// package: blacklist
// file: blacklist.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as blacklist_pb from "./blacklist_pb";

interface IBlackListService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getBlackList: IBlackListService_IGetBlackList;
    putBlackList: IBlackListService_IPutBlackList;
}

interface IBlackListService_IGetBlackList extends grpc.MethodDefinition<blacklist_pb.GetBlackListRequest, blacklist_pb.GetBlackListReply> {
    path: "/blacklist.BlackList/GetBlackList";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<blacklist_pb.GetBlackListRequest>;
    requestDeserialize: grpc.deserialize<blacklist_pb.GetBlackListRequest>;
    responseSerialize: grpc.serialize<blacklist_pb.GetBlackListReply>;
    responseDeserialize: grpc.deserialize<blacklist_pb.GetBlackListReply>;
}
interface IBlackListService_IPutBlackList extends grpc.MethodDefinition<blacklist_pb.PutBlackListRequest, blacklist_pb.PutBlackListReply> {
    path: "/blacklist.BlackList/PutBlackList";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<blacklist_pb.PutBlackListRequest>;
    requestDeserialize: grpc.deserialize<blacklist_pb.PutBlackListRequest>;
    responseSerialize: grpc.serialize<blacklist_pb.PutBlackListReply>;
    responseDeserialize: grpc.deserialize<blacklist_pb.PutBlackListReply>;
}

export const BlackListService: IBlackListService;

export interface IBlackListServer {
    getBlackList: grpc.handleServerStreamingCall<blacklist_pb.GetBlackListRequest, blacklist_pb.GetBlackListReply>;
    putBlackList: grpc.handleUnaryCall<blacklist_pb.PutBlackListRequest, blacklist_pb.PutBlackListReply>;
}

export interface IBlackListClient {
    getBlackList(request: blacklist_pb.GetBlackListRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<blacklist_pb.GetBlackListReply>;
    getBlackList(request: blacklist_pb.GetBlackListRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<blacklist_pb.GetBlackListReply>;
    putBlackList(request: blacklist_pb.PutBlackListRequest, callback: (error: grpc.ServiceError | null, response: blacklist_pb.PutBlackListReply) => void): grpc.ClientUnaryCall;
    putBlackList(request: blacklist_pb.PutBlackListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blacklist_pb.PutBlackListReply) => void): grpc.ClientUnaryCall;
    putBlackList(request: blacklist_pb.PutBlackListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blacklist_pb.PutBlackListReply) => void): grpc.ClientUnaryCall;
}

export class BlackListClient extends grpc.Client implements IBlackListClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getBlackList(request: blacklist_pb.GetBlackListRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<blacklist_pb.GetBlackListReply>;
    public getBlackList(request: blacklist_pb.GetBlackListRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<blacklist_pb.GetBlackListReply>;
    public putBlackList(request: blacklist_pb.PutBlackListRequest, callback: (error: grpc.ServiceError | null, response: blacklist_pb.PutBlackListReply) => void): grpc.ClientUnaryCall;
    public putBlackList(request: blacklist_pb.PutBlackListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: blacklist_pb.PutBlackListReply) => void): grpc.ClientUnaryCall;
    public putBlackList(request: blacklist_pb.PutBlackListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: blacklist_pb.PutBlackListReply) => void): grpc.ClientUnaryCall;
}
