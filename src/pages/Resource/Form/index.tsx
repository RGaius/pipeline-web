import {useRef} from "react";
import {FooterToolbar, PageContainer, ProForm, ProFormText,ProFormTextArea} from '@ant-design/pro-components';
import {Card, Form} from 'antd';
import {DynamicForm} from "@/components";

const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 14},
  fieldCol: 14,
}
const defaultVal = {
  content: {
    input: 'input',
    select: 'a'
  }
}
const schema = {
  type: 'object',
  properties: {
    host: {
      title: '数据库IP',
      type: 'string',
      widget: 'input',
      required: true
    },
    port: {
      title: '端口',
      type: 'number',
      widget: 'inputNumber',
      rules: [{"message": "请输入数据库端口", "required": true}],
      required: true,
      defaultValue: 3306,
      props: {
        "max": 65525,
        "min": 100,
      }
    },
    username: {
      title: '账号',
      type: 'string',
      widget: 'input',
      required: true,
      rules: [{"message": "请输入账号", "required": true}]
    },
    password: {
      title: '密码',
      type: 'string',
      widget: 'input',
      required: true,
      rules: [{"message": "请输入密码", "required": true}]
    },
    database: {
      title: '数据库',
      type: 'string',
      widget: 'input',
      required: true,
      rules: [{"message": "请输入数据库", "required": true}]
    },
    driverClass: {
      title: '连接驱动',
      type: 'string',
      widget: 'input',
      required: true,
      defaultValue: "com.mysql.cj.jdbc.Driver",
      visible: false,
      rules: [{"message": "请输入连接驱动", "required": true}]
    },
    urlFormat: {
      title: '数据库连接格式',
      type: 'string',
      widget: 'input',
      required: true,
      visible: false,
      defaultValue: "jdbc:mysql://${host}:${port}/${database}",
      rules: [{"message": "数据库连接格式", "required": true}]
    },
    paramList: {
      title: '连接参数',
      type: 'object',
      widget: 'ParamsList',
      tooltip: '该参数用于连接建立',
    }
  }
}
export default () => {
  // 动态表单引用
  const formRef = useRef<any>();
  return (
    <PageContainer title="输入表单">
      <Card>
        <ProForm
          {...formItemLayout}
          layout={'horizontal'}
          initialValues={defaultVal}
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          }}
          onFinish={async (values) => console.log(values)}
        >
          <ProFormText
            name="name"
            label="名称"
            placeholder="请输入资源名称"
            rules={[{ required: true }]}
          />
          <ProFormTextArea
            name="desc"
            label="描述"
          />
          <Form.Item
            name="content"
            noStyle
            rules={[{validator: () => formRef.current.validator()}]}
          >
            <DynamicForm instanceRef={formRef} schema={schema} formProps={{...formItemLayout}}/>
          </Form.Item>
        </ProForm>
      </Card>
    </PageContainer>
  );
};
