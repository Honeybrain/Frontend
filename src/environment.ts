import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";

const BACKEND_URL: string = "http://localhost:8080";

const transport = new GrpcWebFetchTransport({
  baseUrl: BACKEND_URL,
});

export {
  BACKEND_URL,
  transport,
};
