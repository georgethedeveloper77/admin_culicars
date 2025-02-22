import { PsObject } from "@templateCore/object/core/PsObject";


export default class CustomizeUiDetail extends PsObject<CustomizeUiDetail> {

    id: string = '';
    name: string = '';
    coreKeysId: string = '';
    addedDate: string = '';
    addedDateStr: string = '';
    isEmptyObject: string = '';


    init(
        id: string,
        name: string,
        coreKeysId: string,
        addedDate: string,
        addedDateStr: string,
        isEmptyObject: string,

    ) {
        this.id = id;
        this.name = name;
        this.coreKeysId = coreKeysId;
        this.addedDate = addedDate;
        this.addedDateStr = addedDateStr;
        this.isEmptyObject = isEmptyObject;

        return this;

    }

    getPrimaryKey(): string {
        return 'custom';
    }

    toMap(object: CustomizeUiDetail): any {
        const map = {};
        map['id'] = object.id;
        map['name'] = object.name;
        map['core_keys_id'] = object.coreKeysId;
        map['added_date'] = object.addedDate;
        map['added_date_str'] = object.addedDateStr;
        map['is_empty_object'] = object.isEmptyObject;

        return map;
    }

    toMapList(objectList: CustomizeUiDetail[]): any[] {
        const mapList: any[] = [];
        for (let i = 0; i < objectList.length; i++) {
            if (objectList[i] != null) {
                mapList.push(this.toMap(objectList[i]));
            }
        }

        return mapList;
    }

    fromMap(obj: any) {
        return new CustomizeUiDetail().init(

            obj.id,
            obj.name,
            obj.core_keys_id,
            obj.added_date,
            obj.added_date_str,
            obj.is_empty_object,

        );
    }

    fromMapList(objList: any[]): CustomizeUiDetail[] {
        const productList: CustomizeUiDetail[] = [];
        for (const obj of objList as Array<CustomizeUiDetail>) {
            if (obj != null) {
                productList.push(this.fromMap(obj));
            }
        }

        return productList;
    }
}
