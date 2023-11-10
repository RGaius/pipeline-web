import {ProList,} from '@ant-design/pro-components';
import {Progress, Tag} from 'antd';

const data = [
  '语雀的天空',
  'Ant Design',
  '蚂蚁金服体验科技',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
  'Ant Design Pro',
].map((item) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
  actions: [<a key="run">邀请</a>, <a key="delete">删除</a>],
  avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
      <div
          style={{
            flex: 1,
          }}
      >
        <div
            style={{
              width: 200,
            }}
        >
          <div>发布中</div>
          <Progress percent={80}/>
        </div>
      </div>
  ),
}));

export default () => {
  return (
      <ProList<any>
          ghost={false}
          itemCardProps={{ghost: false}}
          pagination={{
            defaultPageSize: 8,
            showSizeChanger: false,
          }}
          showActions="hover"
          rowSelection={{}}
          grid={{gutter: 16, column: 2}}
          onItem={(record: any) => {
            return {
              onMouseEnter: () => {
                console.log(record);
              },
              onClick: () => {
                console.log(record);
              },
            };
          }}
          metas={{
            title: {},
            subTitle: {},
            type: {},
            avatar: {},
            content: {},
          }}
          headerTitle="资源列表"
          dataSource={data}
      />
  );
};