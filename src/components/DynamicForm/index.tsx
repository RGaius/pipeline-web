import React from 'react';
import FormRender, {useForm} from 'form-render';

interface DynamicFormProps {
  value?: any;
  onChange?: (value: any) => void;
  schema: object,
  formProps?: object,
  beforeFinish?: (value: any) => any
}

const DynamicForm: React.FC<DynamicFormProps> = ({value = {}, onChange, schema, formProps = {}}) => {
  const form = useForm();
  const watch = {
    '#': (val: any) => {
      console.log("val:", val)
      onChange && onChange(form.getValues(true))
    },
  };
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