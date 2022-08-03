import {BaseAPI} from './BaseAPI';

export class FilesAPI extends BaseAPI {
  constructor(page) {
    super(page);
  }

  async GetFiles() {
    let files = '';
    const response = await this.page.request.post(`${this.getFilesRequest}`, {
      data: {"operationName":"getChildren","variables":{"shares_limit":1,"node_id":"LOCAL_ROOT","children_limit":25,"sort":"SIZE_DESC"},"query":"query getChildren($node_id: ID!, $children_limit: Int!, $cursor: String, $sort: NodeSort!, $shares_limit: Int = 1) {\n  getNode(node_id: $node_id) {\n    id\n    name\n    ... on Folder {\n      children(limit: $children_limit, cursor: $cursor, sort: $sort) {\n        ...Child\n        shares(limit: $shares_limit) {\n          created_at\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment Child on Node {\n  ...BaseNode\n  owner {\n    id\n    full_name\n    email\n    __typename\n  }\n  updated_at\n  last_editor {\n    id\n    full_name\n    email\n    __typename\n  }\n  parent {\n    id\n    name\n    ...Permissions\n    __typename\n  }\n  __typename\n}\n\nfragment BaseNode on Node {\n  id\n  name\n  type\n  ...Permissions\n  ... on File {\n    size\n    mime_type\n    extension\n    version\n    __typename\n  }\n  flagged\n  rootId\n  __typename\n}\n\nfragment Permissions on Node {\n  permissions {\n    can_read\n    can_write_file\n    can_write_folder\n    can_delete\n    can_add_version\n    can_read_link\n    can_change_link\n    can_share\n    can_read_share\n    can_change_share\n    __typename\n  }\n  __typename\n}"},
    });
    const body = JSON.parse((await response.body()).toString());
    if (body.data.getNode.children) {
      files = body.data.getNode.children;
    }
    return files;
  }

  async MoveFileToTrashById(id) {
    await this.page.request.post(`${this.deleteFileRequest}`, {
      data: {"operationName":"trashNodes","variables":{"node_ids":[id]},"query":"mutation trashNodes($node_ids: [ID!]) {\n  trashNodes(node_ids: $node_ids)\n}"},
    });
  }

  async DeleteFilePermanently(id) {
    await this.page.request.post(`${this.deleteFileRequest}`, {
      data: {"operationName":"deleteNodes","variables":{"node_ids":[id]},"query":"mutation deleteNodes($node_ids: [ID!]) {\n  deleteNodes(node_ids: $node_ids)\n}"},
    });
  }
}
