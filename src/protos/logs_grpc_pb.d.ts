// package: logs
// file: logs.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as logs_pb from "./logs_pb";

interface ILogsService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    streamLogs: ILogsService_IStreamLogs;
}

interface ILogsService_IStreamLogs extends grpc.MethodDefinition<logs_pb.LogRequest, logs_pb.LogReply> {
    path: "/logs.Logs/StreamLogs";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<logs_pb.LogRequest>;
    requestDeserialize: grpc.deserialize<logs_pb.LogRequest>;
    responseSerialize: grpc.serialize<logs_pb.LogReply>;
    responseDeserialize: grpc.deserialize<logs_pb.LogReply>;
}

export const LogsService: ILogsService;

export interface ILogsServer {
    streamLogs: grpc.handleServerStreamingCall<logs_pb.LogRequest, logs_pb.LogReply>;
}

export interface ILogsClient {
    streamLogs(request: logs_pb.LogRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<logs_pb.LogReply>;
    streamLogs(request: logs_pb.LogRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<logs_pb.LogReply>;
}

export class LogsClient extends grpc.Client implements ILogsClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public streamLogs(request: logs_pb.LogRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<logs_pb.LogReply>;
    public streamLogs(request: logs_pb.LogRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<logs_pb.LogReply>;
}
