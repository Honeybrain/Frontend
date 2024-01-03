import React from "react";
import { transport } from "../../../environment";
import { MobileClient } from '@protos/mobile.client';
import { WireguardConfigRequest, WireguardConfigResponse } from "@protos/mobile";

const useMobileRPC = () => {
  const client = React.useMemo(() => new MobileClient(transport), []);

  const getWireguardConfig = React.useCallback(async (): Promise<string> => {
    const request: WireguardConfigRequest = WireguardConfigRequest.create();

    const signinResponse = await client.getWireguardConfig(request, {});
    return signinResponse.response.base64Image;
  }, []);

  return {
    getWireguardConfig,
  };
};

export default useMobileRPC;
