// package: containers
// file: containers.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as containers_pb from "./containers_pb";

interface IContainersService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    streamContainers: IContainersService_IStreamContainers;
}

interface IContainersService_IStreamContainers extends grpc.MethodDefinition<containers_pb.ContainersRequest, containers_pb.ContainersReply> {
    path: "/containers.Containers/StreamContainers";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<containers_pb.ContainersRequest>;
    requestDeserialize: grpc.deserialize<containers_pb.ContainersRequest>;
    responseSerialize: grpc.serialize<containers_pb.ContainersReply>;
    responseDeserialize: grpc.deserialize<containers_pb.ContainersReply>;
}

export const ContainersService: IContainersService;

export interface IContainersServer {
    streamContainers: grpc.handleServerStreamingCall<containers_pb.ContainersRequest, containers_pb.ContainersReply>;
}

export interface IContainersClient {
    streamContainers(request: containers_pb.ContainersRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<containers_pb.ContainersReply>;
    streamContainers(request: containers_pb.ContainersRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<containers_pb.ContainersReply>;
}

export class ContainersClient extends grpc.Client implements IContainersClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public streamContainers(request: containers_pb.ContainersRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<containers_pb.ContainersReply>;
    public streamContainers(request: containers_pb.ContainersRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<containers_pb.ContainersReply>;
}
