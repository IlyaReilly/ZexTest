import {BaseAPI} from './BaseAPI';
import fs from "fs";
import path from "path";

export class FilesAPI extends BaseAPI {
  constructor(page) {
    super(page);
  }

  async GetActiveFiles() {
    let activeFiles = '';
    const response = await this.page.request.post(`${this.graphqlServiceUrl}`, {
      data: {"operationName": "getChildren", "variables": {"shares_limit": 1, "node_id": "LOCAL_ROOT", "children_limit": 25, "sort": "SIZE_DESC"}, "query": "query getChildren($node_id: ID!, $children_limit: Int!, $cursor: String, $sort: NodeSort!, $shares_limit: Int = 1) {\n  getNode(node_id: $node_id) {\n    id\n    name\n    ... on Folder {\n      children(limit: $children_limit, cursor: $cursor, sort: $sort) {\n        ...Child\n        shares(limit: $shares_limit) {\n          created_at\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment Child on Node {\n  ...BaseNode\n  owner {\n    id\n    full_name\n    email\n    __typename\n  }\n  updated_at\n  last_editor {\n    id\n    full_name\n    email\n    __typename\n  }\n  parent {\n    id\n    name\n    ...Permissions\n    __typename\n  }\n  __typename\n}\n\nfragment BaseNode on Node {\n  id\n  name\n  type\n  ...Permissions\n  ... on File {\n    size\n    mime_type\n    extension\n    version\n    __typename\n  }\n  flagged\n  rootId\n  __typename\n}\n\nfragment Permissions on Node {\n  permissions {\n    can_read\n    can_write_file\n    can_write_folder\n    can_delete\n    can_add_version\n    can_read_link\n    can_change_link\n    can_share\n    can_read_share\n    can_change_share\n    __typename\n  }\n  __typename\n}"},
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.data.getNode.children) {
      activeFiles = body.data.getNode.children;
    }
    return activeFiles;
  }

  async GetTrashFiles() {
    let trashFiles = '';
    const response = await this.page.request.post(`${this.graphqlServiceUrl}`, {
      data: {"operationName": "findNodes", "variables": {"shares_limit": 1, "shared_with_me": false, "folder_id": "TRASH_ROOT", "cascade": false, "limit": 25, "sort": "NAME_ASC"}, "query": "query findNodes($keywords: [String!], $flagged: Boolean, $shared_by_me: Boolean, $shared_with_me: Boolean, $folder_id: String, $cascade: Boolean, $limit: Int!, $page_token: String, $sort: NodeSort, $shares_limit: Int = 1, $direct_share: Boolean) {\n  findNodes(\n    keywords: $keywords\n    flagged: $flagged\n    shared_by_me: $shared_by_me\n    shared_with_me: $shared_with_me\n    folder_id: $folder_id\n    cascade: $cascade\n    limit: $limit\n    page_token: $page_token\n    sort: $sort\n    direct_share: $direct_share\n  ) {\n    nodes {\n      ...Child\n      shares(limit: $shares_limit) {\n        created_at\n        __typename\n      }\n      __typename\n    }\n    page_token\n    __typename\n  }\n}\n\nfragment Child on Node {\n  ...BaseNode\n  owner {\n    id\n    full_name\n    email\n    __typename\n  }\n  updated_at\n  last_editor {\n    id\n    full_name\n    email\n    __typename\n  }\n  parent {\n    id\n    name\n    ...Permissions\n    __typename\n  }\n  __typename\n}\n\nfragment BaseNode on Node {\n  id\n  name\n  type\n  ...Permissions\n  ... on File {\n    size\n    mime_type\n    extension\n    version\n    __typename\n  }\n  flagged\n  rootId\n  __typename\n}\n\nfragment Permissions on Node {\n  permissions {\n    can_read\n    can_write_file\n    can_write_folder\n    can_delete\n    can_add_version\n    can_read_link\n    can_change_link\n    can_share\n    can_read_share\n    can_change_share\n    __typename\n  }\n  __typename\n}"},
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.data.findNodes.nodes) {
      trashFiles = body.data.findNodes.nodes;
    }
    return trashFiles;
  }

  async MoveFileToTrashById(id) {
    await this.page.request.post(`${this.graphqlServiceUrl}`, {
      data: {"operationName": "trashNodes", "variables": {"node_ids": [id]}, "query": "mutation trashNodes($node_ids: [ID!]) {\n  trashNodes(node_ids: $node_ids)\n}"},
    });
  }

  async DeleteFilePermanentlyById(id) {
    await this.page.request.post(`${this.graphqlServiceUrl}`, {
      data: {"operationName": "deleteNodes", "variables": {"node_ids": [id]}, "query": "mutation deleteNodes($node_ids: [ID!]) {\n  deleteNodes(node_ids: $node_ids)\n}"},
    });
  }

  async UploadFileViaAPI() {
    const file = path.resolve("./TestData/", "test.png");
    const image = fs.readFileSync(file);
    await this.page.request.post(`${this.uploadFileRequest}`, {
      headers: {
        Accept: "*/*",
        ContentType: "multipart/form-data",
        Filename: "dGVzdC5wbmc=",
        Cookie: "UI=iris; ZX_AUTH_TOKEN=eyJhbGciOiJSUzUxMiJ9.eyJpc3MiOiI5N2IwZDg1My0zZDU5LTRiYmYtYjM2YS00NGE1Nzk2ZDlmMTEiLCJzdWIiOiI0NjllMzg1OS01ODg4LTRiNTgtYmRmZi0xNDFiMTQxNzA4NjkiLCJleHAiOjE2NjAxNjAxMjMsImp0aSI6IjViZDA1YTUzLTQ0NWYtNDIyYS04YWRkLTkyNTY1YTI2ZTA5ZSIsImlhdCI6MTY1OTk4NzMyMywiZXh0cmFfaW5mb3JtYXRpb24iOiJ7XCJkb21haW5faWRcIjpcImRkODk1Y2I0LWMwY2QtNGI3My1hNmMyLWI5YjdiNDczNjY0ZFwiLFwicHJvdG9jb2xcIjpcImh0dHBcIixcImRldmljZV9pZFwiOlwiMjg4MTIxMDktZWE0ZC00YmZkLTllZWItZjhmNmE1YTcwMTAwXCIsXCJkZXZpY2VfbW9kZWxcIjpcIkNocm9tZSAxMDQvV2luZG93cyAxMFwiLFwiZG9tYWluX3VybFwiOlwiaHR0cHM6Ly9xYS0xLmRlbW8uemV4dHJhcy5pb1wiLFwiaXBfYWRkcmVzc1wiOlwiMzcuMjE0LjIxLjE1MVwiLFwidXNlcl9hZ2VudFwiOlwiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwNC4wLjAuMCBTYWZhcmkvNTM3LjM2XCJ9Iiwic2VydmljZSI6IldlYlVJIiwidG9rZW4iOiIwXzRhMmUwNzlmODk0YWQ3OTgwNTk5NDQ2Y2I2MGQ4MGMyZmRkZjRlODVfNjk2NDNkMzMzNjNhMzQzNjM5NjUzMzM4MzUzOTJkMzUzODM4MzgyZDM0NjIzNTM4MmQ2MjY0NjY2NjJkMzEzNDMxNjIzMTM0MzEzNzMwMzgzNjM5M2I2NTc4NzAzZDMxMzMzYTMxMzYzNjMwMzEzNjMwMzEzMjMzMzczODMxM2I3NDc5NzA2NTNkMzYzYTdhNjk2ZDYyNzI2MTNiNzUzZDMxM2E2MTNiNzQ2OTY0M2QzOTNhMzgzMTM4MzkzNjM1MzEzMjM0M2IifQ.BmpauH6003kzid9GsmXOqp5ORqBNDUjksF56IU1QtmE6_kufmSmbmbTCoxxwu9CCh3f7tamD5JSblC1J9Pfo-tTDqxQlBrHauh7fCDvFHRZkrHq4_E9x8rZrCh7u3Ix1laJW6qpnw4L4UPV1Ko3ajVeHdTgttJ1QjVom8xAId-bINk9CSX0bVqAkaPKgDXAwfohR7xGUxW0iVKHtKpwdQ4K6tf6IPkZJFVFAbOPc5A0Q4GH-U-qfIc6DBbUSKwAkQifpM2Q-RKZFIIJ-4IXLYAO1sfk4LP3fAjifybNRXWOJXyhUuoUdft8NGDAHGFq9mP4eauXi5hg8k41___yXKw; ZM_AUTH_TOKEN=0_4a2e079f894ad7980599446cb60d80c2fddf4e85_69643d33363a34363965333835392d353838382d346235382d626466662d3134316231343137303836393b6578703d31333a313636303136303132333738313b747970653d363a7a696d6272613b753d313a613b7469643d393a3831383936353132343b",
      },
      multipart: {
        file:
        {
          name: file,
          mimeType: "image/png",
          buffer: image,
        },
      },
    });
  }
}
