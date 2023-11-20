import React, {forwardRef} from 'react';
import type {ProColumns} from '@ant-design/pro-components';
import {ProTable,} from '@ant-design/pro-components';
import {Button} from 'antd';
import useModalForm from "@/hooks/useModalForm";
import ResourceType from './ResourceType'
import {history} from '@umijs/max';


export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '类型',
    dataIndex: 'containers',
    // align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '操作',
    key: 'option',
    width: 120,
    valueType: 'option',
    render: () => [
      <a key="link">链路</a>,
      <a key="warn">报警</a>
    ],
  },
];

export default () => {
  const {open, FormModal: ResourceTypeModal} = useModalForm({
    title: '资源类别',
    width: '60vw',
    onFinish: async () => {
      history.replace('/resource/create')
      return true;
    },
    modalProps: {
      maskClosable: false
    },
  }, forwardRef(ResourceType))
  return (
      <>
        <ProTable<TableListItem>
            columns={columns}
            request={(params, sorter, filter) => {
              // 表单搜索项会从 params 传入，传递给后端接口。
              console.log(params, sorter, filter);
              return Promise.resolve({
                data: tableListDataSource,
                success: true,
              });
            }}
            toolbar={{
              search: {
                onSearch: (value: string) => {
                  alert(value);
                },
              },
              actions: [
                <Button
                    key="primary"
                    type="primary"
                    onClick={open}
                >
                  新建
                </Button>,
              ],
            }}
            rowKey="key"
            search={false}
        />
        <ResourceTypeModal onChange={((value: any) => {
        })} datasource={[{name: "测试", desc: "描述", code: "code"}]}/>
      </>
  );
};