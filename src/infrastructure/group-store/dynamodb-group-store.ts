import {
  createConnection,
  EntityManager,
  getEntityManager,
} from "@typedorm/core";
import { DocumentClientV3 } from "@typedorm/document-client";
import { FileStore } from "file-store";
import { globalTable } from "infrastructure/dynamodb-global/dynamo-global-table";
import {
  GroupModel,
  GroupModelLatest,
} from "infrastructure/group-store/groups-model";
import {
  Group,
  GroupStore,
  GroupWithData,
  groupMetadata,
  GroupSearch,
} from "topics/group";

export class DyanmoDBGroupStore extends GroupStore {
  entityManager: EntityManager;
  dataFileStore: FileStore;

  constructor(documentClient: DocumentClientV3, dataFileStore: FileStore) {
    super();
    createConnection({
      table: globalTable,
      entities: [GroupModel, GroupModelLatest],
      documentClient,
    });
    this.entityManager = getEntityManager();
    this.dataFileStore = dataFileStore;
  }

  public async latests(): Promise<{ [name: string]: Group }> {
    const latestsGroupsItems = await this.entityManager.find(
      GroupModelLatest,
      {},
      {
        queryIndex: "GSI1",
      }
    );
    const latests: { [name: string]: Group } = {};
    for (const group of latestsGroupsItems.items) {
      const groupMetadata = group.toGroupMetadata();
      latests[group.name] = {
        ...groupMetadata,
        data: () => this.dataFileStore.read(this.filename(groupMetadata)),
      };
    }
    return latests;
  }

  public async search({ groupName, latest }: GroupSearch): Promise<Group[]> {
    const groupsItem = latest
      ? await this.entityManager.find(GroupModelLatest, {
          name: groupName,
        })
      : await this.entityManager.find(GroupModel, {
          name: groupName,
        });

    const groups = groupsItem.items.map((group) => {
      const groupMetadata = group.toGroupMetadata();
      return {
        ...groupMetadata,
        data: () => this.dataFileStore.read(this.filename(groupMetadata)),
      };
    });
    return groups;
  }

  public async save(group: GroupWithData): Promise<void> {
    const groupMain = GroupModel.fromGroupMetadata(groupMetadata(group));
    await this.dataFileStore.write(this.filename(group), group.data);
    await this.entityManager.create(groupMain);
    const groupLatest = GroupModelLatest.fromGroupMetadata(
      groupMetadata(group)
    );
    await this.entityManager.create(groupLatest, {
      overwriteIfExists: true,
    });
  }

  /* istanbul ignore next */
  public async reset(): Promise<void> {
    throw new Error("Not implemented in dynamodb store");
  }

  /* istanbul ignore next */
  public async all(): Promise<Group[]> {
    throw new Error("Not implemented in dynamodb store");
  }
}