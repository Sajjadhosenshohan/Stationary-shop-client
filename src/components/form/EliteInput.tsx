import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  defaultValue?: any;
};

const EliteInput = ({ type, name, label, disabled,defaultValue }: TInputProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
              defaultValue={defaultValue}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default EliteInput;
