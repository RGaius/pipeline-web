import React, {useImperativeHandle} from 'react';
import FormRender, {useForm} from 'form-render';

interface DynamicFormProps {
  value?: any;
  instanceRef: any,
  onChange?: (value: any) => void;
  schema: object,
  formProps?: object,
  beforeFinish?: (value: any) => any
}

const DynamicForm: React.FC<DynamicFormProps> = ({value = {}, onChange, instanceRef, schema, formProps = {}}) => {
  const form = useForm();
  const watch = {
    '#': (val: any) => {
      onChange && onChange(val)
    },
  };
  useImperativeHandle(instanceRef, () => {
    // 将校验方法暴露出去，方便外部表单提交时，触发校验
    return {
      async validator() {
        return form.validateFields()
      }
    };
  });
  return (
    <FormRender
      form={form}
      schema={schema}
      footer={false}
      displayType={'row'}
      removeHiddenData={false}
      preserve={false}
      onMount={() => {
        form.setValues(value)
      }}
      watch={watch}
      {...formProps}
    />
  );
};
export default DynamicForm;
