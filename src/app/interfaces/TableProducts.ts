export interface TableId {
    value: number;
    is_edit: boolean;
    type: string;
}

export interface TableType {
    value: string;
    is_edit: boolean;
    type: string;
}

export interface TableName {
    value: string;
    is_edit: boolean;
    type: string;
}

export interface Description {
    value: string;
    is_edit: boolean;
    type: string;
}

export interface AttributeCount {
    value: number;
    is_edit: boolean;
    type: string;
}

export interface RowsCount {
    value: number;
    is_edit: boolean;
    type: string;
}

export interface CreatedOn {
    value: string;
    is_edit: boolean;
    type: string;
}

export interface CreatedBy {
    value: string;
    is_edit: boolean;
    type: string;
}

export interface UpdatedOn {
    value: string;
    is_edit: boolean;
    type: string;
}

export interface UpdatedBy {
    value: string;
    is_edit: boolean;
    type: string;
}

export interface IsStandard {
    value: boolean;
    is_edit: boolean;
    type: string;
}

export interface IsActive {
    value: boolean;
    is_edit: boolean;
    type: string;
}

export interface Property {
    is_edit: boolean;
    is_delete: boolean;
}

export interface RelatedTable {
    id: number;
    name: string;
}

export interface StandardTableProducts {
    is_table_exist?: boolean;
    table_id: TableId;
    table_type: TableType;
    table_name: TableName;
    description: Description;
    attribute_count: AttributeCount;
    rows_count: RowsCount;
    created_on: CreatedOn;
    created_by: CreatedBy;
    updated_on: UpdatedOn;
    updated_by: UpdatedBy;
    is_standard: IsStandard;
    is_active: IsActive;
    property: Property;
    related_table: RelatedTable[];
}
