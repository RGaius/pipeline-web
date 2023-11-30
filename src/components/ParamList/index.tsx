import type {EditableFormInstance, ProColumns, ProFormInstance,} from '@ant-design/pro-components';
import {EditableProTable,} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: number;
  update_at?: number;
  children?: DataSourceType[];
};

export default () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const formRef = useRef<ProFormInstance<any>>();
  const editorFormRef = useRef<EditableFormInstance<DataSourceType>>();
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      formItemProps: () => {
        return {
          rules: [{required: true, message: '此项为必填项'}],
        };
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
        >
          编辑
        </a>,
        <a
            key="delete"
            onClick={() => {
              const tableDataSource = formRef.current?.getFieldValue(
                  'table',
              ) as DataSourceType[];
              formRef.current?.setFieldsValue({
                table: tableDataSource.filter((item) => item.id !== record.id),
              });
            }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
      <EditableProTable<DataSourceType>
          rowKey="id"
          editableFormRef={editorFormRef}
          name="table"
          controlled={false}
          recordCreatorProps={{
            position: 'bottom',
            record: () => ({id: (Math.random() * 1000000).toFixed(0)}),
            creatorButtonText: '新增',
          }}
          columns={columns}
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableRowKeys,
            actionRender: (row, config, defaultDom) => {
              return [
                defaultDom.save,
                defaultDom.delete || defaultDom.cancel,
              ];
            },
          }}
      />
  );
};