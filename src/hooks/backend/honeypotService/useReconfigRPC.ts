import React from "react";
import { transport } from "../../../environment";
import { ReconfigureClient } from "@protos/reconfig.client";
import { ReconfigRequest } from '@protos/reconfig';

const useReconfigRPC = () => {
    const client = React.useMemo(() => new ReconfigureClient(transport), []);

    const reconfigure = React.useCallback(async (config: string) => {
        const request: ReconfigRequest = ReconfigRequest.create();
        request.config = config;
        await client.reconfigHoneypot(request, {});
    }, []);

    return {
        reconfigure,
    };
};

export default useReconfigRPC;