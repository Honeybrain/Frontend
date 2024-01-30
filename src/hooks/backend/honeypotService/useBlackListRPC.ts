import React from "react";
import { transport } from "../../../environment";
import { BlacklistClient } from '@protos/blacklist.client';
import { GetBlackListRequest, PutWhiteListRequest, PutBlackListRequest, BlockCountryRequest, GetBlockCountryRequest} from '@protos/blacklist';

const useBlackListRPC = () => {
  const client = React.useMemo(() => new BlacklistClient(transport), []);
  const [blacklist, setBlacklist] = React.useState<string[] | undefined>();
  const controller = new AbortController();

  const getBlackList = React.useCallback(async () => {
    const request: GetBlackListRequest = GetBlackListRequest.create();

    const stream = client.getBlackList(request, { abort: controller.signal });
    stream.responses.onNext((message) => {
      setBlacklist(message?.ips);
    });
  }, []);

  const putBlackList = React.useCallback(async (ip: string) => {
    const request: PutBlackListRequest = PutBlackListRequest.create();
    request.ip = ip;
    await client.putBlackList(request, {});
  }, []);

  const putWhiteList = React.useCallback(async (ip: string) => {
    const request: PutWhiteListRequest = PutWhiteListRequest.create();
    request.ip = ip;
    await client.putWhiteList(request, {});;
  }, []);

  const blockCountry = React.useCallback(async (country: string) => {
    const request: BlockCountryRequest = BlockCountryRequest.create();
    request.countryCode = country;
    await client.blockCountry(request, {});;
  }, []);

  const unblockCountry = React.useCallback(async (country: string) => {
    const request: BlockCountryRequest = BlockCountryRequest.create();
    request.countryCode = country;
    await client.unblockCountry(request, {});;
  }, []);

  const getBlockedCountries = React.useCallback(async () => {
    const request = GetBlockCountryRequest.create();
    try {
      const call = client.getBlockCountry(request, {});
      const response = await call.response;
      return response.countries;
    } catch (error) {
      console.error('Error fetching blocked countries:', error);
      throw error;
    }
  }, [client]);  

  React.useEffect(() => {
    getBlackList();

    return () => {
      controller.abort();
    }
  }, []);

  return {
    blockCountry,
    unblockCountry,
    blacklist,
    putBlackList,
    putWhiteList,
    getBlockedCountries,
  };
};

export default useBlackListRPC;
