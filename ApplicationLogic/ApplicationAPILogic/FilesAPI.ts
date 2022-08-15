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

  async FilesSearchQuery(query) {
    let fileId = '';
    const response = await this.page.request.post(`${this.graphqlServiceUrl}`, {
      data: {"operationName": "findNodes", "variables": {"shares_limit": 1, "keywords": [query], "limit": 25, "sort": "NAME_ASC"}, "query": "query findNodes($keywords: [String!], $flagged: Boolean, $shared_by_me: Boolean, $shared_with_me: Boolean, $folder_id: String, $cascade: Boolean, $limit: Int!, $page_token: String, $sort: NodeSort, $shares_limit: Int = 1, $direct_share: Boolean) {\n  findNodes(\n    keywords: $keywords\n    flagged: $flagged\n    shared_by_me: $shared_by_me\n    shared_with_me: $shared_with_me\n    folder_id: $folder_id\n    cascade: $cascade\n    limit: $limit\n    page_token: $page_token\n    sort: $sort\n    direct_share: $direct_share\n  ) {\n    nodes {\n      ...Child\n      shares(limit: $shares_limit) {\n        created_at\n        __typename\n      }\n      __typename\n    }\n    page_token\n    __typename\n  }\n}\n\nfragment Child on Node {\n  ...BaseNode\n  owner {\n    id\n    full_name\n    email\n    __typename\n  }\n  updated_at\n  last_editor {\n    id\n    full_name\n    email\n    __typename\n  }\n  parent {\n    id\n    name\n    ...Permissions\n    __typename\n  }\n  __typename\n}\n\nfragment BaseNode on Node {\n  id\n  name\n  type\n  ...Permissions\n  ... on File {\n    size\n    mime_type\n    extension\n    version\n    __typename\n  }\n  flagged\n  rootId\n  __typename\n}\n\nfragment Permissions on Node {\n  permissions {\n    can_read\n    can_write_file\n    can_write_folder\n    can_delete\n    can_add_version\n    can_read_link\n    can_change_link\n    can_share\n    can_read_share\n    can_change_share\n    __typename\n  }\n  __typename\n}"},
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.data.findNodes.nodes) {
      fileId = body.data.findNodes.nodes[0].id;
    }
    return fileId;
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

  async UploadFileViaAPI(fileName) {
    const file = path.resolve("./TestData/", fileName);
    const image = fs.readFileSync(file);
    const buffer = Buffer.from(fileName);
    const fileNameBase64 = buffer.toString('base64');
    await this.page.request.post(`${this.uploadFileRequest}`, {
      headers: {
        Accept: "*/*",
        ContentType: "multipart/form-data",
        Filename: fileNameBase64,
      },
      multipart: {
        file:
        {
          name: file,
          mimeType: "image/png",
          buffer: image,
        },
        title: "Test file",
      },
    });
  }
}
