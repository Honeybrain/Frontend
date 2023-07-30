import React from "react";
import { transport } from "../../../environment";
import { ContainersRequest, Container } from '@protos/containers';
import { ContainersClient } from "@protos/containers.client";

const useContainersRPC = () => {
  const client = React.useMemo(() => new ContainersClient(transport), []);
  const [containers, setContainers] = React.useState<Container[]>();

  const streamContainers = React.useCallback(async () => {
    const request: ContainersRequest = ContainersRequest.create();

    const stream = client.streamContainers(request);
    stream.responses.onNext((message) => {
      setContainers(message?.containers);
    });
  }, []);

  React.useEffect(() => {
    streamContainers();
  }, []);

  return {
    containers,
  };
};

export default useContainersRPC;
