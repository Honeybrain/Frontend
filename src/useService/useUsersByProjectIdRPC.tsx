import React from "react";
import { transport } from "../../../environment";
import { UserClient } from '@protos/user.client';
import { ProjectUsersRequest } from '@protos/user';
import AuthContext from "@contexts/AuthContext";

const useUsersByProjectIdRPC = () => {
  const client = React.useMemo(() => new UserClient(transport), []);
  const { token } = React.useContext(AuthContext);

  const usersByProjectId = React.useCallback( async (projectId: string) => {
    const request: ProjectUsersRequest = ProjectUsersRequest.create();
    if (token) {
      request.token = token;
    }
    request.projectId = projectId;
    const ProjectUsersResponse = await client.usersByProjectId(request, {});
    return ProjectUsersResponse.response.users;
  }, []);

  return {
    usersByProjectId,
  };

};

export default useUsersByProjectIdRPC;