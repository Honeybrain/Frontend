import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";

const BACKEND_URL: string = "/api";

const transport = new GrpcWebFetchTransport({
  baseUrl: BACKEND_URL,
});

export {
  BACKEND_URL,
  transport,
};
