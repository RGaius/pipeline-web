import {ModalForm,} from '@ant-design/pro-components';
import type {FormInstance} from 'antd/es/form';
import React, {useState} from 'react';
import {ModalFormProps} from "@ant-design/pro-form/es/layouts/ModalForm";

const useModalForm = (modalProps: ModalFormProps, Slot: React.FC<any>) => {
  const [visible, setVisible] = useState(false);
  const open = () => {
    setVisible(true);
  };
  const FormModal = (slotProps: any) => {
    const ref = React.useRef<FormInstance>();
    return (
        <ModalForm
            open={visible}
            onOpenChange={setVisible}
            {...modalProps}
        >
          <Slot ref={ref} {...slotProps}/>
        </ModalForm>
    );
  };

  return {
    open,
    FormModal,
  };
};
export default useModalForm;