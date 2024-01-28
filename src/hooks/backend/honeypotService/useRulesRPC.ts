import React from "react";
import { transport } from "../../../environment";
import { RulesClient } from "@protos/rules.client";
import { GetRulesRequest, PutNewFiltersRequest, PutNewRulesRequest } from "@protos/rules";

const useRulesRPC = () => {
  const client = React.useMemo(() => new RulesClient(transport), []);

  const getDetectionRules = React.useCallback(async () => {
    const request = GetRulesRequest.create();
    return client.getDetectionRules(request, {}).response;
  }, []);

  const putRules = React.useCallback(
    async (rulesData) => {
      const request = PutNewRulesRequest.create();
      request.rules = rulesData;
      return client.putNewDetectionRules(request, {}).response;
    },
    [],
  );

  const putFilters = React.useCallback(
    async (filtersData) => {
      const request = PutNewFiltersRequest.create();
      request.filters = filtersData;
      return client.putNewDetectionFilters(request, {}).response;
    },
    [],
  );

  return { getDetectionRules, putRules, putFilters };
};

export default useRulesRPC;
